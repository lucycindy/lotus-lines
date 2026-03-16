import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
function getPlainText(prop) {
  if (!prop?.rich_text) return "";
  return prop.rich_text.map((t) => t.plain_text).join("");
}

function getFilesUrls(prop) {
  if (!prop?.files) return [];
  return prop.files.map((file) => file.file?.url ?? file.external?.url ?? null).filter(Boolean);
}


function getRichText(prop) {
  if (!prop?.rich_text) return "";
  const segments = prop.rich_text;
  if (segments.length === 0) return "";

  let result = "";
  let currentText = "";
  let lastAnnotations = JSON.stringify(segments[0].annotations);
  let lastLink = segments[0].text?.link?.url;

  const flush = (text, annotations, link) => {
    let t = text;
    if (!t.trim()) return t;

    const ann = JSON.parse(annotations);
    const leadingSpace = t.match(/^\s*/)[0];
    const trailingSpace = t.match(/\s*$/)[0];
    t = t.trim();

    if (ann.bold) t = `**${t}**`;
    if (ann.italic) t = `*${t}*`;
    if (ann.strikethrough) t = `~~${t}~~`;
    if (ann.code) t = `\`${t}\``;
    if (link) t = `[${t}](${link})`;

    return leadingSpace + t + trailingSpace;
  };

  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    const ann = JSON.stringify(s.annotations);
    const link = s.text?.link?.url;

    if (ann === lastAnnotations && link === lastLink) {
      currentText += s.plain_text;
    } else {
      result += flush(currentText, lastAnnotations, lastLink);
      currentText = s.plain_text;
      lastAnnotations = ann;
      lastLink = link;
    }
  }
  result += flush(currentText, lastAnnotations, lastLink);

  return result;
}

async function getPageContent(pageId) {
  const blocks = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: startCursor,
      page_size: 100,
    });

    for (const block of response.results || []) {
      let content = "";
      let type = block.type;

      if (type === "paragraph") {
        content = getRichText(block.paragraph);
      } else if (type === "bulleted_list_item") {
        content = `- ${getRichText(block.bulleted_list_item)}`;
      } else if (type === "numbered_list_item") {
        content = `1. ${getRichText(block.numbered_list_item)}`;
      } else if (type === "heading_1") {
        content = `# ${getRichText(block.heading_1)}`;
      } else if (type === "heading_2") {
        content = `## ${getRichText(block.heading_2)}`;
      } else if (type === "heading_3") {
        content = `### ${getRichText(block.heading_3)}`;
      } else if (type === "quote") {
        content = `> ${getRichText(block.quote)}`;
      } else if (type === "callout") {
        content = `> ${getRichText(block.callout)}`;
      }

      if (content && content.trim()) {
        blocks.push({ content: content.trim(), type });
      }
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  // Pre-process blocks for list numbering
  let numberedIndex = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "numbered_list_item") {
      numberedIndex++;
      // Remove any existing manual numbering and prepend current index
      const text = b.content.replace(/^\d+\.\s+/, "");
      b.content = `${numberedIndex}. ${text}`;
    } else {
      numberedIndex = 0;
    }
  }

  // Join blocks with appropriate newlines
  let result = "";
  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];
    const prev = blocks[i - 1];

    if (prev && (
      (current.type === "bulleted_list_item" && prev.type === "bulleted_list_item") ||
      (current.type === "numbered_list_item" && prev.type === "numbered_list_item")
    )) {
      result += "\n" + current.content.trim();
    } else {
      result += (result ? "\n\n" : "") + current.content.trim();
    }
  }

  return result.replace(/\r\n/g, "\n");
}

function getTitle(prop) {
  if (!prop?.title) return "";
  return prop.title.map((t) => t.plain_text).join("");
}

function getTags(prop) {
  if (!prop?.multi_select) return [];
  return prop.multi_select.map((opt) => opt.name);
}

function getImageUrl(prop) {
  if (!prop?.files || prop.files.length === 0) return null;
  const file = prop.files[0];
  return file.file?.url ?? file.external?.url ?? null;
}

export async function getPublishedProjects() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const database = await notion.databases.retrieve({ database_id: databaseId });
  const statusEntry = Object.entries(database.properties || {}).find(
    ([, prop]) => prop && prop.type === "status",
  );
  const statusPropertyName = statusEntry ? statusEntry[0] : null;

  const results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const queryOptions = {
      database_id: databaseId,
      start_cursor: startCursor,
    };

    if (statusPropertyName) {
      queryOptions.filter = {
        property: statusPropertyName,
        status: { equals: "Published" },
      };
    }

    const response = await notion.databases.query(queryOptions);

    for (const page of response.results) {
      if (page.object !== "page") continue;

      const props = page.properties;
      const title = getTitle(props.Name ?? props.Title ?? {});
      const description = getRichText(props.Description ?? {});
      const tags = getTags(props.Tags ?? {});
      const imageUrl =
        getImageUrl(props.Image ?? {}) ??
        getImageUrl(props.Cover ?? {}) ??
        (page.cover?.file?.url ?? page.cover?.external?.url ?? null);
      const link = page.url ?? "";

      results.push({ title, description, tags, imageUrl, link });
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

export async function getBookPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      filter: {
        and: [
          { property: "section", select: { equals: "books" } },
          { property: "published", checkbox: { equals: true } },
        ],
      },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    for (const page of response.results) {
      if (page.object !== "page") continue;

      const props = page.properties;
      const Title = getTitle(props.title ?? props.Name ?? props.Title ?? {});
      const Description = getRichText(props.description ?? props.Description ?? {});
      const Body = await getPageContent(page.id);
      const CoverImage =
        props.coverImage?.url ??
        getImageUrl(props.CoverImage ?? props.Cover ?? props.Image ?? {}) ??
        (page.cover?.file?.url ?? page.cover?.external?.url ?? null);
      const Slug = getPlainText(props.slug ?? props.Slug ?? {});
      const DateString = props.Date?.date?.start ?? props.date?.date?.start ?? null;

      results.push({ Title, Description, Body, CoverImage, Slug, DateString, type: "book" });
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

export async function getEventPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      filter: {
        and: [
          { property: "section", select: { equals: "events" } },
          { property: "published", checkbox: { equals: true } },
        ],
      },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    for (const page of response.results) {
      if (page.object !== "page") continue;

      const props = page.properties;
      const Title = getTitle(props.title ?? props.Name ?? props.Title ?? {});
      const Description = getRichText(props.description ?? props.Description ?? {});
      const Body = await getPageContent(page.id);
      const CoverImage =
        props.coverImage?.url ??
        getImageUrl(props.CoverImage ?? props.Cover ?? props.Image ?? {}) ??
        (page.cover?.file?.url ?? page.cover?.external?.url ?? null);
      const Slug = getPlainText(props.slug ?? props.Slug ?? {});
      const galleryRaw = getPlainText(props.gallery ?? props.Gallery ?? {});
      const Gallery = galleryRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const DateString = props.Date?.date?.start ?? props.date?.date?.start ?? null;

      results.push({ Title, Description, Body, CoverImage, Slug, Gallery, DateString, type: "event" });
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

export async function getWritingPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      filter: {
        and: [
          { property: "section", select: { equals: "writing" } },
          { property: "published", checkbox: { equals: true } },
        ],
      },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    for (const page of response.results) {
      if (page.object !== "page") continue;

      const props = page.properties;
      const Title = getTitle(props.title ?? props.Name ?? props.Title ?? {});
      const Description = getRichText(props.description ?? props.Description ?? {});
      const Body = await getPageContent(page.id);
      const CoverImage =
        props.coverImage?.url ??
        getImageUrl(props.CoverImage ?? props.Cover ?? props.Image ?? {}) ??
        (page.cover?.file?.url ?? page.cover?.external?.url ?? null);
      const ImageCaption = getRichText(props.imageCaption ?? props.ImageCaption ?? {});
      const Slug = getPlainText(props.slug ?? props.Slug ?? {});
      const DateString = props.Date?.date?.start ?? props.date?.date?.start ?? null;

      results.push({ Title, Description, Body, CoverImage, ImageCaption, Slug, DateString, type: "writing" });
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

export async function getWebsitePosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      filter: {
        and: [
          { property: "section", select: { equals: "websites" } },
          { property: "published", checkbox: { equals: true } },
        ],
      },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    for (const page of response.results) {
      if (page.object !== "page") continue;

      const props = page.properties;
      const Title = getTitle(props.title ?? props.Name ?? props.Title ?? {});
      const Description = getRichText(props.description ?? props.Description ?? {});
      const Body = await getPageContent(page.id);
      const CoverImage =
        props.coverImage?.url ??
        getImageUrl(props.CoverImage ?? props.Cover ?? props.Image ?? {}) ??
        (page.cover?.file?.url ?? page.cover?.external?.url ?? null);
      const Slug = getPlainText(props.slug ?? props.Slug ?? {});
      const DateString = props.Date?.date?.start ?? props.date?.date?.start ?? null;

      results.push({ Title, Description, Body, CoverImage, Slug, DateString, type: "website" });
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

export async function getFloralGallery() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "section", select: { equals: "florals" } },
        { property: "published", checkbox: { equals: true } },
      ],
    },
  });

  const images = [];

  for (const page of response.results) {
    if (page.object !== "page") continue;
    const props = page.properties;
    const galleryProp = props.gallery ?? props.Gallery ?? {};

    if (galleryProp.type === "files") {
      images.push(...getFilesUrls(galleryProp));
    } else {
      const galleryRaw = getPlainText(galleryProp);
      const urls = galleryRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      images.push(...urls);
    }
  }

  return images;
}

export async function getFloralPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      filter: {
        and: [
          { property: "section", select: { equals: "florals" } },
          { property: "published", checkbox: { equals: true } },
        ],
      },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    for (const page of response.results) {
      if (page.object !== "page") continue;

      const props = page.properties;
      const Title = getTitle(props.title ?? props.Name ?? props.Title ?? {});
      const Description = getPlainText(props.description ?? props.Description ?? {});
      const Body = await getPageContent(page.id);

      let CoverImage =
        props.coverImage?.url ??
        getImageUrl(props.CoverImage ?? props.Cover ?? props.Image ?? {}) ??
        (page.cover?.file?.url ?? page.cover?.external?.url ?? null);

      if (!CoverImage) {
        // Fallback to text properties if no file property is found
        const textCover = getPlainText(props.CoverImage ?? props.Cover ?? props.Image ?? {});
        if (textCover) {
          const urlMatch = textCover.match(/(https?:\/\/[^\s\]\)]+)/);
          if (urlMatch) CoverImage = urlMatch[1];
        }
      }

      const Slug = getPlainText(props.slug ?? props.Slug ?? {});
      const DateString = props.Date?.date?.start ?? props.date?.date?.start ?? null;

      results.push({ Title, Description, Body, CoverImage, Slug, DateString, type: "floral" });
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

export async function getAboutPost() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "section", select: { equals: "about" } },
        { property: "published", checkbox: { equals: true } },
      ],
    },
    sorts: [{ timestamp: "created_time", direction: "descending" }],
    page_size: 1,
  });

  if (response.results.length === 0) return null;

  const page = response.results[0];
  const props = page.properties;
  const Title = getTitle(props.title ?? props.Name ?? props.Title ?? {});
  const Description = getRichText(props.description ?? props.Description ?? {});
  const Body = await getPageContent(page.id);
  const CoverImage =
    props.coverImage?.url ??
    getImageUrl(props.CoverImage ?? props.Cover ?? props.Image ?? {}) ??
    (page.cover?.file?.url ?? page.cover?.external?.url ?? null);
  const Slug = getRichText(props.slug ?? props.Slug ?? {});

  return { Title, Description, Body, CoverImage, Slug };
}
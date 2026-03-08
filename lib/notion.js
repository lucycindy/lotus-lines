import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Extracts plain text from a Notion rich text array.
 */
function getRichText(prop) {
  if (!prop?.rich_text) return "";
  return prop.rich_text.map((t) => t.plain_text).join("");
}

/**
 * Extracts plain text from a Notion title property.
 */
function getTitle(prop) {
  if (!prop?.title) return "";
  return prop.title.map((t) => t.plain_text).join("");
}

/**
 * Extracts tags from a Notion multi_select property.
 */
function getTags(prop) {
  if (!prop?.multi_select) return [];
  return prop.multi_select.map((opt) => opt.name);
}

/**
 * Extracts the first file/URL from a Notion files property (for image).
 */
function getImageUrl(prop) {
  if (!prop?.files || prop.files.length === 0) return null;
  const file = prop.files[0];
  return file.file?.url ?? file.external?.url ?? null;
}

/**
 * Fetches all published projects from the Notion database.
 * Automatically detects a status property if present; otherwise falls back to
 * returning all rows without a status filter.
 *
 * @returns {Promise<Array<{title: string, description: string, tags: string[], imageUrl: string|null, link: string}>>}
 */
export async function getPublishedProjects() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId || !process.env.NOTION_TOKEN) {
    throw new Error("NOTION_DATABASE_ID and NOTION_TOKEN must be set in environment");
  }

  // Discover a status property on the database, if one exists.
  // This lets your Notion schema use any status property name (e.g. "Status", "State").
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

    // Only apply a status filter if we actually found a status property.
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

      // Adjust these property names to match your Notion database
      const title = getTitle(props.Name ?? props.Title ?? {});
      const description = getRichText(props.Description ?? {});
      const tags = getTags(props.Tags ?? {});
      const imageUrl =
        getImageUrl(props.Image ?? {}) ??
        getImageUrl(props.Cover ?? {}) ??
        (page.cover?.file?.url ?? page.cover?.external?.url ?? null);
      const link = page.url ?? "";

      results.push({
        title,
        description,
        tags,
        imageUrl,
        link,
      });
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

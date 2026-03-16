import Image from "next/image";
import Link from "next/link";
import { getEventPosts, getWritingPosts, getBookPosts, getFloralPosts, getWebsitePosts } from "@/lib/notion";

// Helper to reliably parse dates for sorting
function parseDate(dateStrInput: string | null) {
  if (!dateStrInput) return 0;
  return new Date(dateStrInput).getTime();
}

export default async function Home() {
  // 1. Fetch all data
  const [events, writing, books, florals, websites] = await Promise.all([
    getEventPosts(),
    getWritingPosts(),
    getBookPosts(),
    getFloralPosts(),
    getWebsitePosts(),
  ]);

  // 2. Flatten and type
  const allPosts = [
    ...events.map(p => ({ ...p, category: "events", isWork: true })),
    ...websites.map(p => ({ ...p, category: "websites", isWork: true })),
    ...writing.map(p => ({ ...p, category: "writing", isWork: false })),
    ...books.map(p => ({ ...p, category: "books", isWork: false })),
    ...florals.map(p => ({ ...p, category: "florals", isWork: false })),
  ];

  // 3. Filter only those with dates
  const datedPosts = allPosts.filter(p => !!p.DateString);

  // 4. Sort chronologically (newest first)
  datedPosts.sort((a, b) => parseDate(b.DateString) - parseDate(a.DateString));

  return (
    <div className="w-full h-full flex flex-col items-center pb-32">
      <div className="w-full max-w-7xl px-8 md:px-[clamp(2rem,6vw,8rem)] flex flex-col gap-16 mt-6 md:mt-24">
        {datedPosts.map((post, idx) => {
          const linkHref = post.category === "florals" ? "/florals" : `/${post.category}/${post.Slug}`;

          return (
            <div key={`${post.Slug}-${idx}`} className="flex flex-col md:flex-row w-full max-w-[800px] mx-auto gap-6 md:gap-10 items-center group px-6 md:px-0">

              {/* Image Container (Left) */}
              <div className="w-full md:w-[260px] flex-shrink-0 flex items-start justify-center">
                <Link
                  href={linkHref}
                  className="flex items-start justify-start overflow-hidden w-full h-fit"
                >
                  {post.CoverImage ? (
                    <img
                      src={post.CoverImage}
                      alt={post.Title || `${post.category} cover`}
                      className="w-full md:w-[260px] max-h-[320px] object-contain object-center md:object-left-top transition-transform duration-500 group-hover:scale-[1.02] group-hover:brightness-95 mx-auto block"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 italic">no image</span>
                    </div>
                  )}
                </Link>
              </div>

              {/* Text Block (Right) */}
              <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left pt-2 md:pt-4">
                <Link href={linkHref} className="inline-block transition-colors hover:text-[#b83143] mb-1">
                  <h3 className="text-[clamp(1rem,1.2vw,1.3rem)] leading-snug text-[#000000]">
                    {post.Title}
                  </h3>
                </Link>
                <Link href={post.category === "florals" ? "/florals" : `/${post.category}`} className="inline-block transition-colors hover:text-[#b83143] group text-[#737373]">
                  <span className="italic text-[clamp(1rem,1.2vw,1.3rem)] leading-snug lowercase">
                    {post.category}
                  </span>
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

            </div>
          );
        })}

        {datedPosts.length === 0 && (
          <div className="text-center italic mt-24">
            no dated posts available yet.
          </div>
        )}
      </div>
    </div>
  );
}

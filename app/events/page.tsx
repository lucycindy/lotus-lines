import Link from "next/link";
import Image from "next/image";
import { getEventPosts } from "@/lib/notion";

export default async function EventsPage() {
  const posts = await getEventPosts();

  return (
    <div className="min-h-screen bg-[#f0efec] px-6 py-16 flex flex-col items-center">

      <h1 className="mt-8 text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        events
      </h1>
      <p className="mt-2 text-center text-[clamp(0.85rem,1vw,1rem)] text-[#737373] sm:text-base">
        coordination & assistance for weddings / corporate / social events
      </p>

      <ul className="mx-auto mt-12 w-full max-w-2xl">
        {posts.map((post, index) => (
          <li key={post.Slug || index}>
            <Link
              href={post.Slug ? `/events/${encodeURIComponent(post.Slug)}` : "#"}
              className="group flex items-center gap-6 py-8 text-black"
            >
              {post.CoverImage ? (
                <div className="relative h-[144px] w-[216px] shrink-0 overflow-hidden bg-[#e8e6e2]">
                  <Image
                    src={post.CoverImage}
                    alt={post.Title || "Event cover"}
                    fill
                    className="object-cover"
                    sizes="216px"
                  />
                </div>
              ) : null}
              <div className="flex items-center min-w-0 flex-1">
                <div className="min-w-0">
                  <h2 className="text-[clamp(1rem,1.2vw,1.3rem)] font-medium text-black group-hover:text-[#b83143] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                    {post.Title || "Untitled"}
                  </h2>
                  {post.Description ? (
                    <div className="flex items-center mt-1">
                      <p className="line-clamp-1 text-[clamp(0.9rem,1.1vw,1.15rem)] text-[#737373] italic">
                        {post.Description}
                      </p>
                      <span
                        className="shrink-0 text-[#b83143] transition-transform group-hover:translate-x-1 ml-6"
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  ) : (
                    <span
                      className="shrink-0 text-[#b83143] transition-transform group-hover:translate-x-1 mt-1 block"
                      aria-hidden
                    >
                      →
                    </span>
                  )}
                </div>
              </div>
            </Link>
            {index < posts.length - 1 ? (
              <div className="border-b border-[#d4d1cb]/40" aria-hidden />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

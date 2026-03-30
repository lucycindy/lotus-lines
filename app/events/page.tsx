import Link from "next/link";
import Image from "next/image";
import { getEventPosts } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function EventsPage() {
  const posts = await getEventPosts();

  return (
    <div className="min-h-screen content-wrapper pb-[var(--sp-3xl)]">
      <Breadcrumb section="events" />
      <div className="w-full mt-[var(--sp-md)]">
        <BackButton href="/#events" />
      </div>

      <h1 className="mt-[var(--sp-xl)] text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        events
      </h1>
      <p className="mt-[var(--sp-xs)] text-center text-[13px] md:text-[clamp(0.85rem,1vw,1rem)] text-[#737373] sm:text-base">
        coordination & assistance for weddings / corporate
      </p>

      <ul className="mt-[var(--sp-2xl)] w-full space-y-[var(--sp-md)]">
        {posts.map((post, index) => (
          <li key={post.Slug || index} id={post.Slug || undefined}>
            <div className="w-full">
              <Link
                href={post.Slug ? `/events/${encodeURIComponent(post.Slug)}` : "#"}
                className="group flex flex-col md:flex-row md:items-center py-0 text-black bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 overflow-hidden"
              >
                <div className="w-full md:w-[320px] shrink-0 flex justify-center">
                  {post.CoverImage ? (
                    <div className="relative w-full h-[280px] md:h-[144px] md:w-[216px] overflow-hidden bg-[#e8e6e2]">
                      <Image
                        src={post.CoverImage}
                        alt={post.Title || "Event cover"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 216px"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-1 items-center md:pl-[var(--sp-xl)] py-[var(--sp-md)] px-[var(--sp-sm)]">
                  <div className="min-w-0 w-full">
                    <h2 className="text-[15px] md:text-[clamp(1rem,1.2vw,1.3rem)] font-medium text-black group-hover:text-[#b83143] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                      {post.Title || "Untitled"}
                    </h2>
                    {post.Description ? (
                      <div className="flex items-center mt-[var(--sp-xs)]">
                        <p className="line-clamp-1 text-[15px] md:text-[clamp(0.9rem,1.1vw,1.15rem)] text-[#737373] italic">
                          {post.Description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

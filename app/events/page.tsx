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
      <p className="mt-[var(--sp-xs)] text-center text-[12px] text-[#737373]">
        coordination & assistance for weddings / corporate
      </p>

      <ul className="mt-[var(--sp-2xl)] w-full space-y-[var(--sp-md)]">
        {posts.map((post, index) => (
          <li key={post.Slug || index} id={post.Slug || undefined}>
            <div className="w-full">
              <Link
                href={post.Slug ? `/events/${encodeURIComponent(post.Slug)}` : "#"}
                className="group flex flex-row items-center py-0 text-black gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 w-full"
              >
                <div className="w-[30%] md:w-[25%] aspect-[4/3] flex-shrink-0">
                  {post.CoverImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={post.CoverImage}
                        alt={post.Title || "Event cover"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 30vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#e8e6e2]" />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center items-start md:pl-[var(--sp-xl)] py-[var(--sp-md)] px-[var(--sp-sm)]">
                  <div className="min-w-0 w-full pr-[var(--sp-md)]">
                    <h2 className="text-[15px] md:text-[17px] font-medium text-black group-hover:text-[#b83143] transition-colors line-clamp-1">
                      {post.Title || "Untitled"}
                    </h2>
                    {post.Description ? (
                      <div className="flex items-center mt-[var(--sp-xs)]">
                        <p className="text-[12px] md:text-[15px] text-[#737373] italic line-clamp-1">
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

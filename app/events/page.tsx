import Link from "next/link";
import Image from "next/image";
import { getEventPosts } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function EventsPage() {
  const posts = await getEventPosts();

  return (
    <div className="min-h-screen bg-[#f0efec] px-6 pb-16 flex flex-col items-center">
      <Breadcrumb section="events" />
      <div className="w-full max-w-[800px] mt-6">
        <BackButton href="/#events" />
      </div>

      <h1 className="mt-8 text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        events
      </h1>
      <p className="mt-2 text-center text-[13px] md:text-[clamp(0.85rem,1vw,1rem)] text-[#737373] sm:text-base">
        coordination & assistance for weddings / corporate
      </p>

      <ul className="mt-12 w-full">
        {posts.map((post, index) => (
          <li key={post.Slug || index} id={post.Slug || undefined}>
            <div className="mx-auto max-w-[800px] px-4 md:px-0">
              <Link
                href={post.Slug ? `/events/${encodeURIComponent(post.Slug)}` : "#"}
                className="group flex flex-col md:flex-row md:items-center py-8 text-black"
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
                <div className="flex min-w-0 flex-1 items-center md:pl-10 mt-6 md:mt-0">
                  <div className="min-w-0 w-full">
                    <h2 className="text-[15px] md:text-[clamp(1rem,1.2vw,1.3rem)] font-medium text-black group-hover:text-[#b83143] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                      {post.Title || "Untitled"}
                    </h2>
                    {post.Description ? (
                      <div className="flex items-center mt-1">
                        <p className="line-clamp-1 text-[15px] md:text-[clamp(0.9rem,1.1vw,1.15rem)] text-[#737373] italic">
                          {post.Description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Link>
              {index < posts.length - 1 ? (
                <div className="border-b border-[#d4d1cb]/40" aria-hidden />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

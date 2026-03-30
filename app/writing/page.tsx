import Link from "next/link";
import Image from "next/image";
import { getWritingPosts } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function WritingPage() {
  const posts = await getWritingPosts();

  return (
    <div className="min-h-screen content-wrapper pb-[var(--sp-3xl)]">
      <Breadcrumb section="writing" />
      <div className="w-full mt-[var(--sp-md)]">
        <BackButton href="/#writing" />
      </div>
      <h1 className="mt-[var(--sp-xl)] text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        writing
      </h1>
      <p className="mt-[var(--sp-xs)] text-center text-[13px] md:text-[clamp(0.85rem,1vw,1rem)] text-[#737373] sm:text-base">
        psychology + wellbeing through a personal lens
      </p>

      <ul className="mt-[var(--sp-2xl)] w-full space-y-[var(--sp-md)]">
        {posts.map((post, index) => (
          <li key={post.Slug || index} id={post.Slug || undefined}>
            <div className="w-full">
              <Link
                href={post.Slug ? `/writing/${encodeURIComponent(post.Slug)}` : "#"}
                className="group flex flex-row items-center py-0 text-black gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 overflow-hidden"
              >
                <div className="w-32 sm:w-40 md:w-64 aspect-[4/3] flex-shrink-0 overflow-hidden bg-[#e8e6e2]">
                  {post.CoverImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={post.CoverImage}
                        alt={post.Title || "Writing cover"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 128px, 256px"
                      />
                    </div>
                  ) : null}
                </div>


                <div className="flex min-w-0 flex-1 items-center md:pl-[var(--sp-xl)] py-[var(--sp-md)] px-[var(--sp-sm)]">
                  <div className="min-w-0 w-full">
                    <h2 className="text-[15px] md:text-[clamp(1rem,1.2vw,1.3rem)] font-medium text-black group-hover:text-[#b83143] transition-colors">
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
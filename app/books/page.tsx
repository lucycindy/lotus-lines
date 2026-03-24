import Link from "next/link";
import Image from "next/image";
import { getBookPosts } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function BooksPage() {
  const posts = await getBookPosts();

  return (
    <div className="min-h-screen bg-[#f0efec] px-6 pb-16 flex flex-col items-center">
      <Breadcrumb section="books" />
      <div className="w-full max-w-[800px] mt-6">
        <BackButton href="/#books" />
      </div>
      <h1 className="mt-8 text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        books
      </h1>
      <p className="mt-2 text-center text-[13px] md:text-[clamp(0.85rem,1vw,1rem)] text-[#737373] sm:text-base">
        curated 2026 reading list
      </p>

      <ul className="mt-12 w-full">
        {posts.map((post, index) => (
          <li key={post.Slug || index} id={post.Slug || undefined}>
            <div className="mx-auto max-w-[800px] px-4 md:px-0">
              <Link
                href={post.Slug ? `/books/${encodeURIComponent(post.Slug)}` : "#"}
                className="group flex items-center gap-6 py-8 text-black"
              >
                <div className="relative h-[144px] w-[96px] shrink-0 overflow-hidden bg-[#e8e6e2]">
                  {post.CoverImage ? (
                    <Image
                      src={post.CoverImage}
                      alt={post.Title || "Book cover"}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-black/60">
                      no cover
                    </div>
                  )}
                </div>
                <div className="flex items-center min-w-0 flex-1">
                  <div className="min-w-0 w-full">
                    <h2 className="text-[15px] md:text-[clamp(1rem,1.2vw,1.3rem)] font-medium text-black group-hover:text-[#b83143] transition-colors">
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

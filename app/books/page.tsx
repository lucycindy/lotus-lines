import Link from "next/link";
import Image from "next/image";
import { getBookPosts } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function BooksPage() {
  const posts = await getBookPosts();

  return (
    <div className="min-h-screen bg-[#f0efec] px-[var(--sp-md)] pb-[var(--sp-3xl)] flex flex-col items-center">
        <Breadcrumb section="books" />
        <div className="w-full max-w-[800px] mt-[var(--sp-md)]">
            <BackButton href="/#books" />
        </div>
        <h1 className="mt-[var(--sp-xl)] text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
            books
        </h1>
        <p className="mt-[var(--sp-xs)] text-center text-[13px] md:text-[clamp(0.85rem,1vw,1rem)] text-[#737373] sm:text-base">
            curated 2026 reading list
        </p>

        <ul className="mt-[var(--sp-2xl)] w-full space-y-[var(--sp-md)]">
            {posts.map((post, index) => (
                <li key={post.Slug || index} id={post.Slug || undefined}>
                    <div className="mx-auto max-w-[800px]">
                        <Link
                            href={post.Slug ? `/books/${encodeURIComponent(post.Slug)}` : "#"}
                            className="group flex items-center gap-[var(--sp-md)] py-0 text-black bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 overflow-hidden"
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
                            <div className="flex items-center min-w-0 flex-1 py-[var(--sp-md)] px-[var(--sp-sm)]">
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

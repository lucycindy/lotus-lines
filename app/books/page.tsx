import Link from "next/link";
import Image from "next/image";
import { getBookPosts } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function BooksPage() {
  const posts = await getBookPosts();

  return (
    <div className="min-h-screen content-wrapper pb-[var(--sp-3xl)]">
        <Breadcrumb section="books" />
        <div className="w-full mt-[var(--sp-md)]">
            <BackButton href="/#books" />
        </div>
        <h1 className="mt-[var(--sp-xl)] text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
            books
        </h1>
        <p className="mt-[var(--sp-xs)] text-center text-[var(--fs-caption)] text-[#737373]">
            curated 2026 reading list
        </p>

        <ul className="mt-[var(--sp-2xl)] w-full space-y-[var(--sp-md)]">
            {posts.map((post, index) => (
                <li key={post.Slug || index} id={post.Slug || undefined}>
                    <div className="w-full">
                        <Link
                            href={post.Slug ? `/books/${encodeURIComponent(post.Slug)}` : "#"}
                            className="group flex items-center gap-[var(--sp-md)] py-0 text-black bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 w-full"
                        >
                            <div className="relative aspect-[2/3] w-[25%] shrink-0">
                                {post.CoverImage ? (
                                    <Image
                                        src={post.CoverImage}
                                        alt={post.Title || "Book cover"}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                ) : (
                                    <div className="flex bg-[#e8e6e2] h-full w-full items-center justify-center text-[10px] text-black/60">
                                        no cover
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center min-w-0 flex-1 py-[var(--sp-md)] px-[var(--sp-sm)]">
                                <div className="min-w-0 w-full pr-[var(--sp-md)]">
                                    <h2 className="text-[var(--fs-body)] md:text-[var(--fs-body-lg)] font-medium text-black group-hover:text-[#b83143] transition-colors line-clamp-1">
                                        {post.Title || "Untitled"}
                                    </h2>
                                    {post.Description ? (
                                        <div className="flex items-center mt-[var(--sp-xs)]">
                                            <p className="text-[var(--fs-caption)] md:text-[var(--fs-body)] text-[#737373] italic">
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

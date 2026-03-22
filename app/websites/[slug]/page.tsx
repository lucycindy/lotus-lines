export const revalidate = 30;
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWebsitePosts } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BackButton from "@/components/BackButton";
import PostNavigation from "@/components/PostNavigation";


export async function generateStaticParams() {
    const posts = await getWebsitePosts();
    return posts
        .filter((p) => p.Slug)
        .map((post) => ({ slug: post.Slug }));
}

export default async function WebsitePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const posts = await getWebsitePosts();
    const post = posts.find(
        (p) => p.Slug && decodeURIComponent(slug) === p.Slug,
    );

    if (!post) notFound();

    return (
        <div className="min-h-screen bg-[#f0efec] pt-20 pb-16 flex flex-col items-center">
            <div className="w-full max-w-[640px] px-10">
                <BackButton />
            </div>

            <article className="mx-auto mt-10 max-w-[640px] w-full flex flex-col items-start px-10">
                {post.CoverImage ? (
                    <div className="relative aspect-[4/3] w-full max-h-[480px] overflow-hidden bg-[#e8e6e2]">
                        <Image
                            src={post.CoverImage}
                            alt={post.Title || "Website cover"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 680px"
                            priority
                        />
                    </div>
                ) : null}

                <h1 className="mt-8 text-left text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
                    {post.Title || "Untitled"}
                </h1>

                {post.Description ? (
                    <p className="mt-4 text-left text-[15px] md:text-[clamp(1rem,1.2vw,1.3rem)] text-[#737373] italic">
                        {post.Description}
                    </p>
                ) : null}

                {post.Body ? (
                    <div className="mx-auto mt-10 max-w-prose w-full text-black leading-relaxed">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-bold underline decoration-[#b83143]/30" {...props} />,
                                em: ({ node, ...props }) => <em className="italic" {...props} />,
                                a: ({ node, ...props }) => <a className="underline hover:text-[#b83143] transition-colors" {...props} />,
                            }}
                        >
                            {post.Body}
                        </ReactMarkdown>
                    </div>
                ) : null}
            </article>

            <div className="w-full px-4 md:px-0">
                <PostNavigation currentSlug={post.Slug} category="websites" />
            </div>

        </div>
    );
}



import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBookPosts } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import BackButton from "@/components/BackButton";
import PostNavigation from "@/components/PostNavigation";

export const revalidate = 30;


export async function generateStaticParams() {
  const posts = await getBookPosts();
  return posts
    .filter((p) => p.Slug)
    .map((post) => ({ slug: post.Slug }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBookPosts();
  const post = posts.find(
    (p) => p.Slug && decodeURIComponent(slug) === p.Slug
  );

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#f0efec] flex flex-col items-center">
      <div className="w-full max-w-[650px] pt-4 md:pt-0 px-6 md:px-8">
        <BackButton />
      </div>

      <article className="mx-auto mt-6 md:mt-10 max-w-[650px] w-full flex flex-col items-start px-6 md:px-8 pb-16">
        {post.CoverImage ? (
          <div className="relative aspect-[2/3] w-full max-w-[240px] max-h-[480px] overflow-hidden bg-[#e8e6e2]">
            <Image
              src={post.CoverImage}
              alt={post.Title || "Book cover"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 240px"
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
          <div className="mt-10 w-full text-black leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4" style={{ listStyleType: 'decimal', counterReset: 'list-item' }} {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" style={{ display: 'list-item', listStyleType: 'decimal', counterIncrement: 'list-item' }} {...props} />,
                strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold', color: 'inherit', textDecoration: 'none' }} {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                a: ({ node, ...props }) => <a className="post-link" {...props} />,
                u: ({ node, ...props }) => <u style={{ textDecoration: 'underline', color: '#000000' }} {...props} />,
              }}
            >
              {post.Body}
            </ReactMarkdown>
          </div>
        ) : null}
      </article>

      <div className="w-full px-4 md:px-0">
        <PostNavigation currentSlug={post.Slug} />
      </div>
    </div>
  );
}



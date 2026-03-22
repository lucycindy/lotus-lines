import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWritingPosts } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import BackButton from "@/components/BackButton";
import PostNavigation from "@/components/PostNavigation";


export const revalidate = 30;


export async function generateStaticParams() {
  const posts = await getWritingPosts();
  return posts
    .filter((p) => p.Slug)
    .map((p) => ({ slug: encodeURIComponent(p.Slug) }));
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getWritingPosts();
  const post = posts.find(
    (p) => p.Slug && decodeURIComponent(slug) === p.Slug
  );

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#f0efec] flex flex-col items-center pt-20 pb-16">
      <div className="w-full max-w-[650px] px-6 md:px-8">
        <BackButton />
      </div>

      <article className="mx-auto mt-6 md:mt-10 max-w-[650px] w-full flex flex-col items-start px-6 md:px-8 pb-16">
        
        {post.CoverImage ? (
          <div className="w-full mt-8">
            <div className="relative aspect-[4/3] w-full max-h-[480px] overflow-hidden bg-[#e8e6e2]">
              <Image
                src={post.CoverImage}
                alt={post.Title || "Writing cover"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 680px"
                priority
              />
            </div>
            {post.ImageCaption ? (
              <p className="mt-2 text-center text-[12px] text-[#737373] not-italic">
                {post.ImageCaption}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mb-12 mt-8">
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium text-black leading-tight mb-4">
            {post.Title}
          </h1>
          {post.Description && (
            <p className="text-[clamp(1.1rem,1.25vw,1.3rem)] text-[#737373] italic leading-relaxed">
              {post.Description}
            </p>
          )}
        </div>


        {post.Body ? (
          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-medium prose-headings:text-black prose-p:text-black prose-p:leading-relaxed prose-li:text-black prose-img:rounded-sm">
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
        <PostNavigation currentSlug={post.Slug} category="writing" />
      </div>
    </div>
  );
}
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventPosts } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const posts = await getEventPosts();
  return posts
    .filter((p) => p.Slug)
    .map((post) => ({ slug: post.Slug }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getEventPosts();
  const post = posts.find(
    (p) => p.Slug && decodeURIComponent(slug) === p.Slug,
  );

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#f0efec] px-6 py-16 flex flex-col items-center">
      <Link
        href="/events"
        className="fixed top-8 left-[calc(var(--sidebar-width)+2rem)] z-50 text-[#737373] hover:text-[#b83143] transition-colors text-[13px] whitespace-nowrap"
      >
        ← back
      </Link>

      <article className="mx-auto mt-10 max-w-[680px] w-full flex flex-col items-start px-8">
        {post.Gallery && post.Gallery.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-2 gap-3">
              {post.Gallery.slice(0, 4).map((url: string, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] overflow-hidden bg-[#e8e6e2]"
                >
                  <Image
                    src={url}
                    alt={`${post.Title || "Event"} photo ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 340px"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : post.CoverImage ? (
          <div className="relative aspect-[4/3] w-full max-h-[480px] overflow-hidden bg-[#e8e6e2]">
            <Image
              src={post.CoverImage}
              alt={post.Title || "Event cover"}
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
          <p className="mt-4 text-left text-[clamp(1rem,1.2vw,1.3rem)] text-[#737373] italic">
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
    </div>
  );
}




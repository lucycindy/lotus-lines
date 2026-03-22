import Link from "next/link";
import { getAllPostsSorted } from "@/lib/notion";

interface PostNavigationProps {
  currentSlug: string;
}

export default async function PostNavigation({ currentSlug }: PostNavigationProps) {
  const allPosts = await getAllPostsSorted();
  
  // Find current post index
  const currentIndex = allPosts.findIndex(p => p.Slug === currentSlug);

  if (currentIndex === -1) return null;

  // Since sorted newest first:
  // Next (newer) is at index - 1
  // Previous (older) is at index + 1
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (!nextPost && !prevPost) return null;

  return (
    <div className="w-full max-w-[650px] mx-auto mt-16 pb-24 border-t border-[#d4d1cb]/40 pt-8 px-6 md:px-8 flex justify-between items-center text-[clamp(1rem,1.1vw,1.15rem)]">
      <div className="flex-1">
        {prevPost && (
          <Link
            href={prevPost.category === "florals" ? "/florals" : `/${prevPost.category}/${prevPost.Slug}`}
            className="group flex items-center gap-3 text-[#737373] hover:text-[#b83143] transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <div className="flex flex-col items-start">
              <span className="text-[12px] uppercase tracking-wider text-[#a3a3a3] mb-0.5">previous</span>
              <span className="line-clamp-1 italic">{prevPost.Title || "untitled"}</span>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextPost && (
          <Link
            href={nextPost.category === "florals" ? "/florals" : `/${nextPost.category}/${nextPost.Slug}`}
            className="group flex items-center gap-3 text-[#737373] hover:text-[#b83143] transition-colors text-right"
          >
            <div className="flex flex-col items-end">
              <span className="text-[12px] uppercase tracking-wider text-[#a3a3a3] mb-0.5">next</span>
              <span className="line-clamp-1 italic">{nextPost.Title || "untitled"}</span>
            </div>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

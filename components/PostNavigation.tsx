import Link from "next/link";
import { getAllPostsSorted } from "@/lib/notion";

interface PostNavigationProps {
  currentSlug: string;
  category: string;
}

export default async function PostNavigation({ currentSlug, category }: PostNavigationProps) {
  const allPosts = await getAllPostsSorted();
  const categoryPosts = allPosts.filter(p => p.category === category);
  
  // Find current post index
  const currentIndex = categoryPosts.findIndex(p => p.Slug === currentSlug);

  if (currentIndex === -1) return null;

  // Since sorted newest first in getAllPostsSorted:
  // Newer posts (next) have smaller indices
  // Older posts (previous) have larger indices
  const nextPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null;


  if (!nextPost && !prevPost) return null;

  return (
    <div className="w-full max-w-[650px] mx-auto mt-0 md:mt-16 pb-24 pt-4 md:pt-8 px-6 md:px-8 flex justify-between items-center text-[clamp(1rem,1.1vw,1.15rem)]">

      <div className="flex-1">
        {prevPost && (
          <Link
            href={prevPost.category === "florals" ? "/florals" : `/${prevPost.category}/${prevPost.Slug}`}
            className="group flex items-center gap-3 text-[#737373] hover:text-[#b83143] transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <div className="flex flex-col items-start">
              <span className="text-[12px] tracking-wider text-[#a3a3a3] mb-0.5 lowercase">previous</span>
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
              <span className="text-[12px] tracking-wider text-[#a3a3a3] mb-0.5 lowercase">next</span>
              <span className="line-clamp-1 italic">{nextPost.Title || "untitled"}</span>
            </div>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}


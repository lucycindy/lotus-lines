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
    <div className="w-full max-w-[650px] mx-auto mt-4 md:mt-8 pb-16 pt-0 px-6 md:px-8 flex justify-between items-center">

      <div className="flex-1">
        {prevPost && (
          <Link
            href={prevPost.category === "florals" ? "/florals" : `/${prevPost.category}/${prevPost.Slug}`}
            className="flex items-center gap-1 group text-[#6b6b6b] hover:text-[#b83143] italic transition-colors text-[14px] md:text-[17px] font-medium w-fit"
          >
            <span className="text-[#b83143] not-italic transition-transform group-hover:-translate-x-1">←</span> previous
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextPost && (
          <Link
            href={nextPost.category === "florals" ? "/florals" : `/${nextPost.category}/${nextPost.Slug}`}
            className="flex items-center gap-1 group text-[#6b6b6b] hover:text-[#b83143] italic transition-colors text-[14px] md:text-[17px] font-medium w-fit"
          >
            next <span className="text-[#b83143] not-italic transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}


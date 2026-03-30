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
    <div className="w-full mt-4 md:mt-8 pb-16 pt-0 flex justify-between items-center text-left">

      <div className="flex-1">
        {prevPost && (
          <Link
            href={prevPost.category === "florals" ? "/florals" : `/${prevPost.category}/${prevPost.Slug}`}
            className="btn-outline-navigation"
          >
            ← previous
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextPost && (
          <Link
            href={nextPost.category === "florals" ? "/florals" : `/${nextPost.category}/${nextPost.Slug}`}
            className="btn-outline-navigation"
          >
            next →
          </Link>
        )}
      </div>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

interface CarouselRowProps {
  children: ReactNode;
}

export default function CarouselRow({ children }: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    // Only show arrows on desktop
    const checkDesktop = () => setShowArrows(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll by 80% of width
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/carousel w-full">
      {showArrows && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 text-[#6b6b6b] hover:text-[#b83143] opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:block"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 text-[#6b6b6b] hover:text-[#b83143] opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:block"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}
      
      <div 
        ref={scrollRef}
        className="scroll-container hide-scrollbar overflow-x-auto flex flex-nowrap gap-8 md:gap-12 py-6"
      >
        {children}
      </div>
    </div>
  );
}

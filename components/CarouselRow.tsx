"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

interface CarouselRowProps {
  children: ReactNode;
}

export default function CarouselRow({ children }: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    // Initial check incase content doesn't overflow
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scrollLeftFn = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: scrollLeft - clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  const scrollRightFn = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: scrollLeft + clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/carousel w-full">
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={scrollLeftFn}
            className="absolute -left-4 md:-left-10 top-1/2 -translate-y-[60%] z-10 p-2 cursor-pointer pointer-events-auto text-[#b83143] bg-transparent border-none appearance-none"
            aria-label="Scroll left"
          >
            <motion.div
              animate={{ x: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            viewport={{ once: true, amount: 0.5 }}
            onClick={scrollRightFn}
            className="absolute -right-4 md:-right-10 top-1/2 -translate-y-[60%] z-10 p-2 cursor-pointer pointer-events-auto text-[#b83143] bg-transparent border-none appearance-none"
            aria-label="Scroll right"
          >
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="scroll-container hide-scrollbar overflow-x-auto flex flex-nowrap gap-8 md:gap-12 py-6"
      >
        {children}
      </div>
    </div>
  );
}

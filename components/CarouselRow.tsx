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
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 btn-icon-circular"
            aria-label="Scroll left"
          >
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex items-center justify-center w-full h-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
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
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 btn-icon-circular"
            aria-label="Scroll right"
          >
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex items-center justify-center w-full h-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="scroll-container hide-scrollbar overflow-x-auto flex flex-nowrap gap-[var(--sp-md)] py-6"
      >
        {children}
      </div>
    </div>
  );
}

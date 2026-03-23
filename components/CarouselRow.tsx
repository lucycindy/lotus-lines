"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

interface CarouselRowProps {
  children: ReactNode;
}

export default function CarouselRow({ children }: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.scrollLeft > 10) {
      if (!hasScrolled) {
        setHasScrolled(true);
      }
    }
  };

  return (
    <div className="relative group/carousel w-full">
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            viewport={{ once: true, amount: 0.5 }}
            className="absolute -right-4 md:-right-10 top-1/2 -translate-y-[60%] z-10 p-2 pointer-events-none text-[#b83143]"
          >
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </motion.div>
          </motion.div>
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

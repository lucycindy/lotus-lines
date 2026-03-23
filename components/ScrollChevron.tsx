"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollChevron() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in after 1.5 seconds if still near the top
    const timer = setTimeout(() => {
      if (window.scrollY < 50) {
        setIsVisible(true);
      }
    }, 1500);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#6b6b6b] pointer-events-none z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

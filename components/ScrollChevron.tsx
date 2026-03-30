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
          className="fixed bottom-10 left-1/2 -translate-x-1/2 btn-icon-circular pointer-events-none z-[100]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

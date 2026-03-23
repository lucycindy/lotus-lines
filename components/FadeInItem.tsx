"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeInItem({ children, className = "", delay = 0 }: FadeInItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4, ease: "easeOut", delay } 
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

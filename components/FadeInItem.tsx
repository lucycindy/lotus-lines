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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", delay } 
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

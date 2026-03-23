"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionContainerProps {
  id: string;
  label: string;
  children: ReactNode;
}

export default function SectionContainer({ id, label, children }: SectionContainerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-based fade for the label
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Fade in at the top (0 to 0.05), fade out as content reaches top (roughly 0.1 to 0.15)
  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.15],
    [0, 1, 1, 0]
  );

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="min-h-screen relative flex flex-col justify-center py-10 md:py-16 px-6 md:px-12 w-full overflow-hidden"
    >
      {/* Animated Centered Label */}
      {label && (
        <motion.div 
          style={{ opacity: labelOpacity }}
          className="fixed top-12 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
          <span className="text-[14px] md:text-[clamp(1rem,1.15vw,1.15rem)] font-light text-[#6b6b6b] lowercase">
            lucy cindy / <span className="italic">{label}</span>
          </span>
        </motion.div>
      )}

      {/* Content with Staggered Entrance */}
      <motion.div
        ref={contentRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="w-full relative"
      >
        {children}
      </motion.div>
    </section>
  );
}

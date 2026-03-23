"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import Link from "next/link";

interface SectionContainerProps {
  id: string;
  label: string;
  children: ReactNode;
}

export default function SectionContainer({ id, label, children }: SectionContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-based fade for the label
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center start"],
  });

  // Fade in at the top (0 to 0.2), stay (0.2 to 0.8), fade out as content reaches top (0.8 to 1)
  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const isPlainLabel = label === "about" || label === "";

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-12 w-full"
    >
      {/* Animated Local Label - Sticky within bounds to not affect layout centering */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <motion.div 
          style={{ opacity: labelOpacity }}
          className="sticky top-6 md:top-8 flex justify-center w-full pointer-events-auto"
        >
          <span className="text-[14px] md:text-[clamp(1rem,1.15vw,1.15rem)] font-light text-black lowercase">
            {isPlainLabel ? (
              "lucy cindy /"
            ) : (
              <>
                lucy cindy /{" "}
                <Link href={`/${id}`} className="italic hover:text-[#b83143] transition-colors text-black">
                  {label}
                </Link>
              </>
            )}
          </span>
        </motion.div>
      </div>

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
        className="w-full relative pointer-events-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}


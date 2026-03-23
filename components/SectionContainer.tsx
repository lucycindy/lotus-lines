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
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-based fade for the label
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "start 10%"],
  });

  // Fade in at the top (0 to 0.3), fade out as content reaches top (0.7 to 1)
  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const isPlainLabel = label === "about" || label === "";

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="relative flex flex-col py-16 md:py-24 px-6 md:px-12 w-full overflow-hidden"
    >
      {/* Animated Local Label */}
      <motion.div 
        style={{ opacity: labelOpacity }}
        className="absolute top-6 md:top-8 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <span className="text-[14px] md:text-[clamp(1rem,1.15vw,1.15rem)] font-light text-[#6b6b6b] lowercase pointer-events-auto">
          {isPlainLabel ? (
            "lucy cindy /"
          ) : (
            <>
              lucy cindy /{" "}
              <Link href={`/${id}`} className="italic hover:text-[#b83143] transition-colors">
                {label}
              </Link>
            </>
          )}
        </span>
      </motion.div>

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


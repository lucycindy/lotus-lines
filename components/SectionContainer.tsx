"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import Link from "next/link";
import FadeInItem from "./FadeInItem";

interface SectionContainerProps {
  id: string;
  label: string;
  children: ReactNode;
  heightClass?: string;
}

export default function SectionContainer({ id, label, children, heightClass = "min-h-screen py-16 md:py-24" }: SectionContainerProps) {
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
  const labelMargin = isPlainLabel ? "mb-12 md:mb-16" : "mb-10 md:mb-12";

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`${heightClass} relative flex flex-col items-center justify-center px-6 md:px-12 w-full`}
    >
      {/* Animated Local Label - Integrated into flow to sit right above content */}
      <FadeInItem delay={0} className={`flex justify-center w-full pointer-events-auto text-center ${labelMargin}`}>
        <motion.div style={{ opacity: labelOpacity }}>
          <span className="text-[14px] md:text-[clamp(1rem,1.15vw,1.15rem)] font-light lowercase">
            {isPlainLabel ? (
              <span className="text-[#6b6b6b]">lucy cindy /</span>
            ) : (
              <>
                <span className="text-[#6b6b6b]">lucy cindy /</span>{" "}
                <Link href={`/${id}`} className="italic hover:text-[#b83143] transition-colors text-black">
                  {label}
                </Link>
              </>
            )}
          </span>
        </motion.div>
      </FadeInItem>

      {/* Content wrapper */}
      <div
        ref={contentRef}
        className="w-full relative pointer-events-auto flex flex-col items-center"
      >
        {children}
      </div>
    </section>
  );
}


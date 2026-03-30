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
  fullBleed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionContainer({ id, label, children, heightClass = "py-[var(--sp-3xl)]", fullBleed = false, className = "", style = {} }: SectionContainerProps) {
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
  const labelMargin = "mb-[var(--sp-lg)]";

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`${heightClass} relative flex flex-col items-center justify-center w-full ${fullBleed ? "px-0" : "px-6 md:px-12"} ${className}`}
      style={style}
    >
      {/* Animated Local Label - Hidden on Plain Labels (About/Footer) */}
      {!isPlainLabel && (
        <FadeInItem delay={0} className={`flex justify-center w-full pointer-events-auto text-center ${labelMargin}`}>
          <motion.div style={{ opacity: labelOpacity }} className="w-full pb-[var(--sp-sm)]">
            <span className="type-caption lowercase">
              <span>lucy cindy /</span>{" "}
              <Link href={`/${id}`} className="italic hover:text-[#b83143] transition-colors text-[var(--grey-600)]">
                {label}
              </Link>
            </span>
          </motion.div>
        </FadeInItem>
      )}

      {/* Content wrapper */}
      <div
        ref={contentRef}
        className={`w-full relative pointer-events-auto flex flex-col items-center ${fullBleed ? "full-bleed-inner px-[var(--page-margin)]" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}


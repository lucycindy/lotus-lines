"use client";

import { useEffect, useState } from "react";

interface SectionLabelProps {
  sections: { id: string; label: string }[];
}

export default function SectionLabel({ sections }: SectionLabelProps) {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px -70% 0px", // Trigger when section hits the top header area
      }


    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const currentLabel = sections.find((s) => s.id === activeSection)?.label || "";

  if (currentLabel === "") return null;

  return (
    <div className="fixed top-[140px] md:top-[40px] inset-x-0 md:left-[220px] md:right-auto z-[70] pointer-events-none flex justify-center md:justify-start">
      <span className="text-[14px] md:text-[clamp(1rem,1.1vw,1.1rem)] font-light text-black whitespace-nowrap lowercase pointer-events-auto">
        lucy cindy / <span className="italic">{currentLabel}</span>
      </span>
    </div>



  );

}






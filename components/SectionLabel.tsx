"use client";

import { useEffect, useState } from "react";

interface SectionLabelProps {
  sections: { id: string; label: string }[];
}

export default function SectionLabel({ sections }: SectionLabelProps) {
  const [activeSection, setActiveSection] = useState("");

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
        rootMargin: "-10% 0px -90% 0px", // Trigger when section is in the top 10%
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const currentLabel = sections.find((s) => s.id === activeSection)?.label || "";

  return (
    <div className="w-full h-full flex flex-col items-end justify-center pr-6 md:pr-10 pointer-events-none">
      <span className="text-[clamp(1rem,1.1vw,1.1rem)] font-light text-black whitespace-nowrap lowercase pointer-events-auto">

        lucy cindy / <span className="italic">{currentLabel}</span>
      </span>
    </div>
  );
}


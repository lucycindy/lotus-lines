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
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "-10% 0px -70% 0px", // Focus on the top/middle area
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
    <div className="text-right pr-6 md:pr-8">
      <span className="text-[clamp(1rem,1.1vw,1.15rem)] font-light text-black whitespace-nowrap">
        lucy cindy / <span className="italic">{currentLabel}</span>
      </span>
    </div>
  );
}

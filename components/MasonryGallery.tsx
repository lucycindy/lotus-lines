"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function MasonryGallery({ images }: { images: string[] }) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add("masonry-visible");
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="w-full mt-[var(--sp-2xl)] columns-1 md:columns-3 gap-[var(--sp-md)]">
      {images.map((src, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="masonry-item mb-[var(--sp-md)] break-inside-avoid overflow-hidden bg-[#e8e6e2] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]"
          style={{ "--i": i } as React.CSSProperties}
        >
          <Image
            src={src}
            alt={`floral arrangement ${i + 1}`}
            width={600}
            height={800}
            className="w-full h-auto object-cover"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getFloralGallery } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function FloralsPage() {
  const images = await getFloralGallery();

  return (
    <div className="min-h-screen content-wrapper pb-[var(--sp-3xl)]">
      <Breadcrumb section="florals" />
      <div className="w-full mt-[var(--sp-md)]">
        <BackButton href="/#florals" />
      </div>
      <h1 className="mt-[var(--sp-xl)] text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        florals
      </h1>
      <p className="mt-[var(--sp-xs)] text-center text-[7px] md:text-[11px] text-[#737373] font-normal normal-case tracking-normal">
        new design hobby
      </p>

      {images.length > 0 ? (
        <div className="w-full mt-[var(--sp-2xl)] columns-1 sm:columns-2 md:columns-3 gap-[var(--sp-md)]" data-gallery="florals">
          {images.map((src, i) => (
            <div
              key={i}
              id={i.toString()}
              className="mb-[var(--sp-md)] break-inside-avoid overflow-hidden bg-[#e8e6e2] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]"
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
      ) : (
        <p className="mt-[var(--sp-2xl)] text-center text-[clamp(0.9rem,1.1vw,1.15rem)] text-black/60">
          no arrangements yet
        </p>
      )}
    </div>
  );
}

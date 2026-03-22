import Link from "next/link";
import Image from "next/image";
import { getFloralGallery } from "@/lib/notion";
import BackButton from "@/components/BackButton";

export const revalidate = 30;


export default async function FloralsPage() {
  const images = await getFloralGallery();

  return (
    <div className="min-h-screen bg-[#f0efec] px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <BackButton />
      </div>
      <h1 className="mt-8 text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        florals
      </h1>
      <p className="mt-2 text-center text-[clamp(0.9rem,1.1vw,1.15rem)] text-[#737373] font-normal normal-case tracking-normal">
        work in progress
      </p>

      {images.length > 0 ? (
        <div className="mx-auto mt-12 max-w-5xl columns-1 sm:columns-2 md:columns-3 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid overflow-hidden bg-[#e8e6e2]"
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
        <p className="mt-12 text-center text-[clamp(0.9rem,1.1vw,1.15rem)] text-black/60">
          no arrangements yet
        </p>
      )}
    </div>
  );
}

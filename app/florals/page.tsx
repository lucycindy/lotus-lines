import { getFloralGallery } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";
import MasonryGallery from "@/components/MasonryGallery";

export const revalidate = 30;


export default async function FloralsPage() {
  const images = await getFloralGallery();

  return (
    <div className="min-h-screen content-wrapper pb-[var(--sp-3xl)] md:pb-[10rem]">
      <Breadcrumb section="florals" />
      <div className="w-full mt-[var(--sp-md)]">
        <BackButton href="/#florals" />
      </div>
      <h1 className="mt-[var(--sp-xl)] text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
        florals
      </h1>
      <p className="florals-subheading mt-[var(--sp-xs)] text-center text-[#737373] font-normal normal-case tracking-normal">
        new design hobby
      </p>

      {images.length > 0 ? (
        <MasonryGallery images={images} />
      ) : (
        <p className="mt-[var(--sp-2xl)] text-center text-[clamp(0.9rem,1.1vw,1.15rem)] text-black/60">
          no arrangements yet
        </p>
      )}
    </div>
  );
}

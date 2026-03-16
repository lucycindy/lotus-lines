import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAboutPost } from "@/lib/notion";
import KineticIcon from "@/components/KineticIcon";

export default async function AboutPage() {
    const post = await getAboutPost();

    if (!post) notFound();

    const items = [
        {
            type: "vine" as const,
            text: "planning weddings across ottawa & toronto",
        },
        {
            type: "bloom" as const,
            text: "writing about psychology through a personal lens",
        },
        {
            type: "book" as const,
            text: "reading what broadens my mindset",
        },
        {
            type: "flower" as const,
            text: "experimenting with floral arrangements",
        },
        {
            type: "brackets" as const,
            text: "building custom wedding websites",
        },
    ];

    return (
        <div className="min-h-screen bg-[#f0efec] px-4 py-20 flex flex-col items-center relative overflow-hidden">
            {/* Main Content Container */}
            <div className="w-full max-w-2xl space-y-12 relative z-10 flex flex-col items-center">
                {/* Section 1: Headline */}
                <div className="text-center w-full">
                    <p className="text-[#b83143] text-[clamp(1rem,1.1vw,1.15rem)] leading-relaxed">
                        passionate about experiential, visual, and web design.
                    </p>
                </div>

                {/* Section 2: Kinetic List */}
                <div className="flex flex-col items-center space-y-6 w-full">
                    <ul className="space-y-6 w-fit">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-center space-x-4">
                                <KineticIcon type={item.type} />
                                <span className="text-black text-[clamp(1rem,1.1vw,1.15rem)]">
                                    {item.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* New Section: Painting + Caption + Quote + Paragraph */}
                <div className="w-full mt-8 flex flex-col items-center">
                    {/* Element 1: Painting + Caption */}
                    <div className="w-[65%] flex flex-col items-center">
                        <div className="relative w-full aspect-[4/3]">
                            <Image
                                src="/red-lotus.png"
                                alt="red lotus painting"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <p className="mt-[0.6rem] text-center text-[13px] text-[#737373] tracking-[0.04em] font-serif">
                            red lotus (1943) by 張大千
                        </p>
                    </div>

                    {/* Element 2: Quote */}
                    <div className="mt-10 text-left md:text-center w-full max-w-full md:max-w-[600px] mx-auto px-0 md:px-0">
                        <p className="italic text-[13px] md:text-[clamp(1rem,1.1vw,1.15rem)] text-[#b83143] tracking-[0.04em] leading-[1.8] lowercase">
                            "i love the lotus, for it rises from the mud unstained, cleansed in<br />rippling water, appealing, yet not seductive."
                        </p>
                        <p className="text-[13px] text-black tracking-[0.04em] leading-[1.8] lowercase mt-0.5">
                            — 周敦颐, on the love of the lotus, 1073
                        </p>
                    </div>

                    {/* Element 3: Paragraph */}
                    <div className="mt-10 text-left md:text-center max-w-[600px] w-full mx-auto">
                        <p className="text-[clamp(1rem,1.1vw,1.15rem)] text-black leading-[1.8]">
                            I love the cultural meaning of the lotus as a symbol of the process. I've grown to appreciate the constraints and complexities of the mud for the beautiful bloom. This philosophy shapes how I approach design and everything else.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

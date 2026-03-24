"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
    href?: string;
}

export default function BackButton({}: BackButtonProps) {
    const router = useRouter();


    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-1 group relative z-50 text-[#6b6b6b] hover:text-[#b83143] italic transition-colors text-[14px] md:text-[17px] font-medium bg-transparent border-none cursor-pointer p-0 mb-8"
        >
            <span className="text-[#b83143] not-italic transition-transform group-hover:-translate-x-1">←</span> back
        </button>
    );
}


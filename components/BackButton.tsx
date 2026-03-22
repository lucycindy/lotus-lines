"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="relative top-0 left-0 z-50 text-[#737373] hover:text-[#b83143] transition-colors text-[13px] whitespace-nowrap block bg-transparent border-none cursor-pointer p-0 mb-8 mt-4"
        >
            ← back
        </button>
    );

}

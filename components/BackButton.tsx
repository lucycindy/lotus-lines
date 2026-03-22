"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface BackButtonProps {
    href?: string;
}

export default function BackButton({ href }: BackButtonProps) {
    const router = useRouter();

    if (href) {
        return (
            <Link
                href={href}
                className="relative top-0 left-0 z-50 text-[#737373] hover:text-[#b83143] transition-colors text-[13px] whitespace-nowrap block bg-transparent border-none cursor-pointer p-0 mb-8"
            >
                ← back
            </Link>
        );
    }

    return (
        <button
            onClick={() => router.back()}
            className="relative top-0 left-0 z-50 text-[#737373] hover:text-[#b83143] transition-colors text-[13px] whitespace-nowrap block bg-transparent border-none cursor-pointer p-0 mb-8"
        >
            ← back
        </button>
    );
}


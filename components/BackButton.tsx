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
            className="btn-outline-navigation mb-8"
        >
            ← back
        </button>
    );
}


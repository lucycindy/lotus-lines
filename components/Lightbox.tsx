"use client";

import { useState, useEffect } from "react";

export default function Lightbox() {
    const [src, setSrc] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Preload image on mouseenter (desktop) and touchstart (mobile)
        const handlePreload = (e: MouseEvent | TouchEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "IMG") {
                const img = target as HTMLImageElement;
                if (img.alt === "logo") return;
                // Preload the full-size src
                const preload = new window.Image();
                preload.src = img.src;
            }
        };

        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if the clicked element is an image
            if (target.tagName === "IMG") {
                const img = target as HTMLImageElement;

                // Exclude logo
                if (img.alt === "logo") return;

                setSrc(img.src);
                setIsVisible(true);
            }
        };

        document.addEventListener("mouseover", handlePreload as EventListener);
        document.addEventListener("touchstart", handlePreload as EventListener, { passive: true });
        document.addEventListener("click", handleGlobalClick);

        return () => {
            document.removeEventListener("mouseover", handlePreload as EventListener);
            document.removeEventListener("touchstart", handlePreload as EventListener);
            document.removeEventListener("click", handleGlobalClick);
        };
    }, []);

    const close = () => {
        setIsVisible(false);
        setTimeout(() => setSrc(null), 200);
    };

    if (!src && !isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/85 transition-opacity duration-200 cursor-pointer ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            onClick={close}
        >
            <div className="relative w-full h-full flex items-center justify-center p-4">
                {src && (
                    <img
                        src={src}
                        alt="Enlarged view"
                        className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-200"
                        style={{ transform: isVisible ? "scale(1)" : "scale(0.95)" }}
                    />
                )}
                <button
                    className="absolute top-6 right-6 text-white text-[1.5rem] p-2 hover:opacity-70 transition-opacity z-[110]"
                    onClick={(e) => {
                        e.stopPropagation();
                        close();
                    }}
                    aria-label="Close lightbox"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

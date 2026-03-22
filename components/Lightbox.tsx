"use client";

import { useState, useEffect, useCallback } from "react";

export default function Lightbox() {
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);

    const close = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            setImages([]);
            setCurrentIndex(-1);
        }, 200);
    }, []);

    const navigate = useCallback((direction: number) => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev + direction + images.length) % images.length);
    }, [images]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isVisible) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") navigate(-1);
            if (e.key === "ArrowRight") navigate(1);
        };

        const handlePreload = (e: MouseEvent | TouchEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "IMG") {
                const img = target as HTMLImageElement;
                if (img.alt === "logo") return;
                const preload = new window.Image();
                preload.src = img.src;
            }
        };

        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "IMG") {
                const img = target as HTMLImageElement;
                if (img.alt === "logo") return;

                // Find all gallery images if relevant
                const galleryContainer = img.closest('[data-gallery], .scroll-container, .grid');
                let galleryImages: string[] = [];
                if (galleryContainer) {
                    const imgs = Array.from(galleryContainer.querySelectorAll('img'))
                        .filter(i => i.alt !== "logo")
                        .map(i => i.src);
                    galleryImages = Array.from(new Set(imgs)); // Unique
                }

                if (galleryImages.length > 1) {
                    setImages(galleryImages);
                    setCurrentIndex(galleryImages.indexOf(img.src));
                } else {
                    setImages([img.src]);
                    setCurrentIndex(0);
                }
                setIsVisible(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mouseover", handlePreload as EventListener);
        document.addEventListener("touchstart", handlePreload as EventListener, { passive: true });
        document.addEventListener("click", handleGlobalClick);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mouseover", handlePreload as EventListener);
            document.removeEventListener("touchstart", handlePreload as EventListener);
            document.removeEventListener("click", handleGlobalClick);
        };
    }, [isVisible, navigate, close]);

    const src = images[currentIndex] || null;

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

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-[2rem] p-4 hover:opacity-70 transition-opacity z-[110]"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(-1);
                            }}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-[2rem] p-4 hover:opacity-70 transition-opacity z-[110]"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(1);
                            }}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </>
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


"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="md:hidden flex flex-col items-center py-[var(--sp-xl)] bg-[#f0efec] relative z-[60]">
                <Link href="/" className="block w-[clamp(6rem,20vw,8rem)] hover:opacity-80 transition-opacity">
                    <img src="/logo.png" alt="logo" className="w-full h-auto" />
                </Link>
            </div>

            {/* Mobile Fixed Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-[3.5rem] right-[var(--sp-md)] z-[70] text-[#b83143] text-[clamp(1.5rem,5vw,2rem)] focus:outline-none transition-colors hover:opacity-80"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Slide-in Mobile Overlay & Desktop Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-full md:w-[var(--sidebar-width)] bg-[#f0efec] z-50 flex flex-col p-[var(--sp-xl)] pt-[20vh] md:p-[var(--sp-xl)] transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="flex flex-col h-full md:h-auto overflow-y-auto md:overflow-visible">
                    {/* Desktop Logo */}
                    <div className="hidden md:block mb-10">
                        <Link href="/" className="block w-[clamp(9rem,14vw,13rem)] hover:opacity-80 transition-opacity">
                            <img src="/logo.png" alt="logo" className="w-full h-auto" />
                        </Link>
                    </div>

                    <nav className="flex flex-col gap-0 items-center md:items-start text-center md:text-left">
                        {/* Section: About */}
                        <div className="w-full md:w-fit py-2 md:py-0 md:mb-[var(--sp-lg)]">
                            <Link
                                href="/about"
                                className="type-caption hover:text-[#b83143] transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                about
                            </Link>
                        </div>

                        {/* Rule */}
                        <div className="w-[var(--sp-2xl)] md:w-full border-t border-[#d4d1cb] my-[var(--sp-md)]" />

                        <div className="w-full md:w-fit py-2 md:pt-[var(--sp-md)] md:pb-[var(--sp-lg)]">
                            <span className="type-caption block mb-[var(--sp-md)]">work</span>
                            <div className="flex flex-col gap-[var(--sp-sm)]">
                                <Link
                                    href="/events"
                                    className="type-caption italic hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    events
                                </Link>
                                <Link
                                    href="/websites"
                                    className="type-caption italic hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    websites
                                </Link>
                            </div>
                        </div>

                        {/* Rule */}
                        <div className="w-[var(--sp-2xl)] md:w-full border-t border-[#d4d1cb] my-[var(--sp-md)]" />

                        <div className="w-full md:w-fit py-2 md:pt-[var(--sp-md)]">
                            <span className="type-caption block mb-[var(--sp-md)]">hobbies</span>
                            <div className="flex flex-col gap-[var(--sp-sm)]">
                                <Link
                                    href="/writing"
                                    className="type-caption italic hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    writing
                                </Link>
                                <Link
                                    href="/books"
                                    className="type-caption italic hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    books
                                </Link>
                                <Link
                                    href="/florals"
                                    className="type-caption italic hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    florals
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
}

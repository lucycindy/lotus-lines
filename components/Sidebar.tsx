"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Top Bar / Logo */}
            <div className="md:hidden flex flex-col items-center pt-4 pb-6 bg-[#f0efec] relative z-[60]">
                <Link href="/" className="block w-32 mx-auto text-center">
                    <img src="/logo.png" alt="logo" className="w-full h-auto mx-auto" />
                </Link>
            </div>

            {/* Mobile Fixed Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-[2.8rem] right-4 z-[70] text-[#b83143] text-2xl focus:outline-none transition-colors hover:opacity-80"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Slide-in Mobile Overlay & Desktop Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-full md:w-[var(--sidebar-width)] bg-[#f0efec] z-50 flex flex-col p-8 pt-[40vh] md:p-[clamp(2rem,3vw,4rem)] transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
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
                        <div className="w-full md:w-fit py-4 md:py-0 md:mb-6">
                            <Link
                                href="/about"
                                className="block text-[#000000] text-[clamp(1.1rem,1.2vw,1.3rem)] hover:text-[#b83143] transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                about
                            </Link>
                        </div>

                        {/* Rule */}
                        <div className="w-16 md:w-full border-t border-[#d4d1cb] my-2" />

                        {/* Section: Work */}
                        <div className="w-full md:w-fit py-4 md:pt-6 md:pb-6">
                            <span className="block text-[#737373] md:text-black text-[clamp(1.1rem,1.2vw,1.3rem)] mb-4">work</span>
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/events"
                                    className="italic text-[#000000] md:text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    events
                                </Link>
                                <Link
                                    href="/websites"
                                    className="italic text-[#000000] md:text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    websites
                                </Link>
                                <Link
                                    href="/writing"
                                    className="italic text-[#000000] md:text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    writing
                                </Link>
                            </div>
                        </div>

                        {/* Rule */}
                        <div className="w-16 md:w-full border-t border-[#d4d1cb] my-2" />

                        {/* Section: Hobbies */}
                        <div className="w-full md:w-fit py-4 md:pt-6">
                            <span className="block text-[#737373] md:text-black text-[clamp(1.1rem,1.2vw,1.3rem)] mb-4">hobbies</span>
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/books"
                                    className="italic text-[#000000] md:text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    books
                                </Link>
                                <Link
                                    href="/florals"
                                    className="italic text-[#000000] md:text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
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

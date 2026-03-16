"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between p-6 bg-[#f0efec] relative z-[60]">
                <Link href="/" className="block w-32">
                    <img src="/logo.png" alt="logo" className="w-full h-auto" />
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="italic text-black text-lg transition-colors hover:text-[#b83143] focus:outline-none"
                >
                    {isOpen ? "close" : "menu"}
                </button>
            </div>

            {/* Slide-in Mobile Overlay & Desktop Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-full md:w-[var(--sidebar-width)] bg-[#f0efec] z-50 flex flex-col p-8 md:p-[clamp(2rem,3vw,4rem)] transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
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
                        <div className="w-full md:w-fit py-6 md:py-0 md:mb-6">
                            <Link
                                href="/about"
                                className="block text-black text-[clamp(1.1rem,1.2vw,1.3rem)] hover:text-[#b83143] transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                about
                            </Link>
                        </div>

                        {/* Rule */}
                        <div className="w-16 md:w-full border-t border-[#d4d1cb] my-2" />

                        {/* Section: Work */}
                        <div className="w-full md:w-fit py-6 md:pt-6 md:pb-6">
                            <span className="block text-black text-[clamp(1.1rem,1.2vw,1.3rem)] mb-4">work</span>
                            <div className="flex flex-col gap-3 md:ml-4">
                                <Link
                                    href="/events"
                                    className="italic text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    events
                                </Link>
                                <Link
                                    href="/websites"
                                    className="italic text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    websites
                                </Link>
                            </div>
                        </div>

                        {/* Rule */}
                        <div className="w-16 md:w-full border-t border-[#d4d1cb] my-2" />

                        {/* Section: Hobbies */}
                        <div className="w-full md:w-fit py-6 md:pt-6">
                            <span className="block text-black text-[clamp(1.1rem,1.2vw,1.3rem)] mb-4">hobbies</span>
                            <div className="flex flex-col gap-3 md:ml-4">
                                <Link
                                    href="/writing"
                                    className="italic text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    writing
                                </Link>
                                <Link
                                    href="/books"
                                    className="italic text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    books
                                </Link>
                                <Link
                                    href="/florals"
                                    className="italic text-black text-[clamp(1rem,1.1vw,1.15rem)] hover:text-[#b83143] transition-colors"
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

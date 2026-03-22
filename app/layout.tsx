import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  title: "lucy cindy",
  description: "Events, writing, books, florals",
};

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased lowercase text-[clamp(1rem,1.2vw,1.25rem)] min-h-screen bg-[#f0efec]"
        suppressHydrationWarning
      >
        <div className="flex flex-col md:flex-row min-h-screen w-full">
          {/* Fixed Left Panel */}
          <aside className="hidden md:flex fixed top-0 left-0 w-[210px] h-screen border-r border-[#d4d1cb]/30 flex-col justify-between py-12 z-50">
            <div className="pl-8">
               <Link href="/" className="block w-[95px] hover:opacity-80 transition-opacity">
                  <img src="/logo.png" alt="logo" className="w-full h-auto" />
               </Link>
            </div>

            {/* Section label placeholder - will be populated by SectionLabel component on the home page */}
            <div id="sidebar-label-container" className="flex flex-col items-end justify-center h-full">
               {/* This space is intentionally empty, populated via portals or conditional rendering in children */}
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 md:ml-[210px] flex flex-col min-h-screen relative">
            {/* Top Bar / Email Icon */}
            <div className="h-[var(--topbar-height)] shrink-0 w-full bg-transparent relative flex items-center justify-end px-6 md:px-12 z-[60]">
              <a
                href="mailto:lucycindygeng@gmail.com"
                className="text-gray-700 hover:text-[#b83143] transition-colors translate-y-2"
                aria-label="Email lucycindygeng@gmail.com"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>

            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
        </div>
        <Lightbox />
      </body>
    </html>
  );
}


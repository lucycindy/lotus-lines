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
        <div className="min-h-screen w-full relative flex flex-col overflow-x-hidden min-w-0">
          {/* Header Layer (Scrolling) - Logo and Email Icon are independent */}
          <header className="absolute top-0 left-0 w-full flex justify-between items-start pt-12 px-6 md:px-12 z-[60] pointer-events-none">
             <div className="pointer-events-auto">
                <Link href="/" className="block w-[115px] hover:opacity-80 transition-opacity">
                  <img src="/logo.png" alt="logo" className="w-full h-auto" />
                </Link>
             </div>

             <div className="pointer-events-auto">
               <a
                 href="mailto:lucycindygeng@gmail.com"
                 className="text-[#737373] hover:text-[#b83143] transition-colors translate-y-2 inline-block"
                 aria-label="Email lucycindygeng@gmail.com"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <rect width="20" height="16" x="2" y="4" rx="2" />
                   <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                 </svg>
               </a>
             </div>
          </header>

          <div className="flex flex-col md:flex-row flex-1 w-full relative min-w-0">
            {/* Left Panel Placeholder for SectionLabel */}
            <aside className="hidden md:flex fixed top-0 left-0 w-[210px] max-w-[210px] h-screen flex-col justify-start py-12 z-50 pointer-events-none overflow-hidden">
              {/* The SectionLabel will render its content here, aligned to the right edge */}
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-[210px] flex flex-col min-h-screen relative min-w-0">
              <main className="flex-1 w-full min-w-0">
                {children}
              </main>
            </div>
          </div>
        </div>


        <Lightbox />
      </body>
    </html>
  );
}


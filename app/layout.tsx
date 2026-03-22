import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  title: "lucy cindy",
  description: "Events, writing, books, florals",
};

import NavHeader from "@/components/NavHeader";

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
          <NavHeader />



          <div className="flex flex-col md:flex-row flex-1 w-full relative min-w-0">
            {/* Left Panel Placeholder for SectionLabel */}
            <aside className="hidden md:flex fixed top-0 left-0 w-[210px] max-w-[210px] h-screen flex-col justify-start py-12 z-50 pointer-events-none overflow-hidden">
              {/* The SectionLabel will render its content here, aligned to the right edge */}
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-0 md:ml-[210px] flex flex-col min-h-screen relative min-w-0">
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


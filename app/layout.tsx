import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  title: "lucy cindy",
  description: "Events, writing, books, florals",
};

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
        <div className="flex flex-col md:grid md:grid-cols-[var(--sidebar-width)_1fr] min-h-screen w-full">
          {/* Left Sidebar Frame */}
          <Sidebar />

          {/* Main Content Area w/ Topbar Frame */}
          <div className="flex flex-col w-full min-h-screen">
            {/* Top Border / Frame */}
            <div className="h-[var(--topbar-height)] shrink-0 w-full bg-transparent relative flex items-center justify-end px-[clamp(1.5rem,2vw,3rem)] md:px-[clamp(2rem,4vw,4rem)]">
              <a
                href="mailto:lucycindygeng@gmail.com"
                className="text-gray-700 hover:text-[#b83143] transition-colors translate-y-1 md:translate-y-1.5 fixed top-4 right-4 md:static z-[70]"
                aria-label="Email lucycindygeng@gmail.com"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>

            <main className="flex-1 w-full px-4 md:px-0">
              {children}
            </main>
          </div>
        </div>
        <Lightbox />
      </body>
    </html>
  );
}

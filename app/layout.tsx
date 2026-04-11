import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  title: "lucy cindy",
  description: "Events, writing, books, florals",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import NavHeader from "@/components/NavHeader";
import AnimatedPage from "@/components/AnimatedPage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lora:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased lowercase text-[clamp(1rem,1.2vw,1.25rem)] min-h-screen bg-[#f0efec]"
        suppressHydrationWarning
      >
        <div className="min-h-screen w-full relative flex flex-col min-w-0">
          <NavHeader />



          <div className="flex flex-col flex-1 w-full relative min-w-0">

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen relative min-w-0">
              <main className="flex-1 w-full min-w-0">
                <AnimatedPage>{children}</AnimatedPage>
              </main>
            </div>
          </div>
        </div>



        <Lightbox />
      </body>
    </html>
  );
}


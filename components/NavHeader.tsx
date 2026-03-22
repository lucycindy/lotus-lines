"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isHome) return null;

  return (
    <header className="absolute top-0 left-0 w-full z-[60] pointer-events-none">
      <div className="absolute top-[24px] md:top-[8px] left-0 md:left-[12px] w-full md:w-[115px] flex justify-center md:block pointer-events-auto">
        <Link href="/" className="block w-[115px] hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="logo" className="w-full h-auto" />
        </Link>
      </div>

      <div className="absolute top-[16px] right-[20px] pointer-events-auto">
        <a
          href="mailto:lucycindygeng@gmail.com"
          className="text-[#737373] hover:text-[#b83143] transition-colors inline-block"
          aria-label="Email lucycindygeng@gmail.com"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>
    </header>
  );
}

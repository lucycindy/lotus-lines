"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isHome) return null;

  return (
    <header className="absolute top-0 left-0 w-full z-[60] pointer-events-none pr-[16px]">
      <div className="absolute top-[16px] md:top-[8px] left-0 md:left-[12px] w-full md:w-auto flex justify-center md:block pointer-events-auto text-center z-[100]">
        <Link href="/" className="block w-[clamp(6rem,20vw,8rem)] md:w-[clamp(9rem,14vw,13rem)] hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="logo" className="w-full h-auto" />
        </Link>
      </div>


      <div className="absolute top-[var(--sp-xl)] right-[var(--sp-md)] pointer-events-auto">
        <a
          href="mailto:lucycindygeng@gmail.com"
          className="btn-icon-circular"
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

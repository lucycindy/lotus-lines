import Link from "next/link";

interface BreadcrumbProps {
  section: string;        // e.g. "events"
  sectionHref?: string;   // e.g. "/events" — if provided, section is a link
  title?: string;         // post title — if provided, a 3rd crumb is added
}

export default function Breadcrumb({ section, sectionHref, title }: BreadcrumbProps) {
  return (
    <div className="w-full text-center pt-8 pb-2 px-4 flex justify-center">
      <p className="type-caption lowercase text-[var(--grey-600)] flex items-center justify-center max-w-full">
        <Link href="/" className="hover:text-[#b83143] transition-colors shrink-0">
          lucy cindy
        </Link>
        <span className="mx-1.5 shrink-0">/</span>
        {sectionHref ? (
          <Link href={sectionHref} className="hover:text-[#b83143] transition-colors shrink-0">
            {section}
          </Link>
        ) : (
          <span className="shrink-0">{section}</span>
        )}
        {title && (
          <>
            <span className="mx-1.5 shrink-0">/</span>
            <span className="line-clamp-1 text-left break-all md:break-normal max-w-[150px] sm:max-w-none">{title}</span>
          </>
        )}
      </p>
    </div>
  );
}

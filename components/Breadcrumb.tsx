import Link from "next/link";

interface BreadcrumbProps {
  section: string;        // e.g. "events"
  sectionHref?: string;   // e.g. "/events" — if provided, section is a link
  title?: string;         // post title — if provided, a 3rd crumb is added
}

export default function Breadcrumb({ section, sectionHref, title }: BreadcrumbProps) {
  return (
    <div className="w-full text-center pt-8 pb-2 px-4">
      <p className="text-[12px] md:text-[13px] font-light lowercase tracking-[0.04em] leading-relaxed">
        <Link href="/" className="text-[#000000] hover:text-[#b83143] transition-colors">
          lucy cindy
        </Link>
        <span className="text-[#9b9b9b] mx-1.5">/</span>
        {sectionHref ? (
          <Link href={sectionHref} className="text-[#000000] hover:text-[#b83143] transition-colors">
            {section}
          </Link>
        ) : (
          <span className="text-[#9b9b9b]">{section}</span>
        )}
        {title && (
          <>
            <span className="text-[#9b9b9b] mx-1.5">/</span>
            <span className="text-[#9b9b9b]">{title}</span>
          </>
        )}
      </p>
    </div>
  );
}

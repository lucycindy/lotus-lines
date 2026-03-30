import Link from "next/link";

interface BreadcrumbProps {
  section: string;        // e.g. "events"
  sectionHref?: string;   // e.g. "/events" — if provided, section is a link
  title?: string;         // post title — if provided, a 3rd crumb is added
}

export default function Breadcrumb({ section, sectionHref, title }: BreadcrumbProps) {
  return (
    <div className="w-full text-center pt-8 pb-2 px-4">
      <p className="type-caption lowercase text-[var(--grey-600)]">
        <Link href="/" className="hover:text-[#b83143] transition-colors">
          lucy cindy
        </Link>
        <span className="mx-1.5">/</span>
        {sectionHref ? (
          <Link href={sectionHref} className="hover:text-[#b83143] transition-colors">
            {section}
          </Link>
        ) : (
          <span>{section}</span>
        )}
        {title && (
          <>
            <span className="mx-1.5">/</span>
            <span>{title}</span>
          </>
        )}
      </p>
    </div>
  );
}

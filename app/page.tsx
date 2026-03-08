import Image from "next/image";
import Link from "next/link";
import { getPublishedProjects } from "@/lib/notion";

export default async function Home() {
  let projects: Awaited<ReturnType<typeof getPublishedProjects>> = [];
  try {
    projects = await getPublishedProjects();
  } catch (e) {
    console.error("Failed to load Notion projects:", e);
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900">
      {/* Hero */}
      <header className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <h1 className="font-serif text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Your Name
          </h1>
          <p className="mt-3 text-lg text-zinc-600 sm:text-xl">
            Designer & Developer
          </p>
        </div>
      </header>

      {/* Projects grid */}
      <main className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-zinc-500">
          Projects
        </h2>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 py-16 text-center">
            <p className="text-zinc-500">
              No projects yet. Add items with Status &quot;Published&quot; in your Notion database.
            </p>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.link}>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="aspect-[4/3] relative bg-zinc-100">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt=""
                        fill
                        className="object-cover transition group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-400">
                        <span className="text-4xl font-serif">—</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-zinc-900 group-hover:text-zinc-700">
                      {project.title || "Untitled"}
                    </h3>
                    {project.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

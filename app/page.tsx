import Image from "next/image";
import Link from "next/link";
import { getEventPosts, getWritingPosts, getBookPosts, getFloralPosts, getAboutPost } from "@/lib/notion";
import SectionLabel from "@/components/SectionLabel";
import KineticIcon from "@/components/KineticIcon";


export const revalidate = 30;

export default async function Home() {
  const [events, writing, books, floralPosts, aboutPost] = await Promise.all([
    getEventPosts(),
    getWritingPosts(),
    getBookPosts(),
    // For florals, we'll use recent posts or images. The request says "5 most recent gallery images".
    // I'll fetch floral posts and take the cover images.
    getEventPosts().then(evs => evs.filter(e => e.type === "floral")), // wait, let's use getFloralPosts
    getAboutPost(),
  ]);

  // Using getFloralPosts instead
  const florals = await getFloralPosts();

  const recentEvents = events.slice(0, 3);
  const recentWriting = writing.slice(0, 3);
  const recentBooks = books.slice(0, 5);
  const recentFlorals = florals.slice(0, 5);

  const sections = [
    { id: "events", label: "events" },
    { id: "writing", label: "writing" },
    { id: "books", label: "books" },
    { id: "florals", label: "florals" },
    { id: "about", label: "about" },
  ];

  const aboutItems = [
    { type: "vine" as const, text: "planning weddings across ottawa & toronto" },
    { type: "bloom" as const, text: "writing about psychology through a personal lens" },
    { type: "book" as const, label: "reading what broadens my mindset", text: "reading what broadens my mindset" },
    { type: "flower" as const, text: "experimenting with floral arrangements" },
    { type: "brackets" as const, text: "building custom wedding websites" },
  ];


  return (
    <div className="w-full flex flex-col pb-32">
      {/* Scroll Tracker (Rendered in Sidebar via Portal if in Client component, 
          but since this is an RSC, we'll render it at the top level and position it fixed) */}
      <div className="hidden md:block fixed top-0 left-0 w-[210px] h-screen pointer-events-none z-[60]">
        <div className="flex flex-col items-end justify-center h-full pointer-events-auto">
          <SectionLabel sections={sections} />
        </div>
      </div>

      <div className="w-full flex flex-col">
        {/* Events Section */}
        <section id="events" className="py-16 md:py-24 border-b border-[#d4d1cb]/30 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-12">
            <div className="space-y-12">
              {recentEvents.map((post) => (
                <div key={post.Slug} className="flex gap-6 md:gap-10 group">
                  <Link href={`/events/${post.Slug}`} className="w-32 md:w-48 aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link href={`/events/${post.Slug}`} className="hover:text-[#b83143] transition-colors">
                      <h3 className="text-xl md:text-2xl font-serif text-black">{post.Title}</h3>
                    </Link>
                    <p className="mt-1 text-sm md:text-base text-[#737373] italic">
                      {(post as any).Venue} {(post as any).Venue && post.DateString ? "—" : ""} {post.DateString}
                    </p>

                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Link href="/events" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-sm">more →</Link>
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="py-16 md:py-24 border-b border-[#d4d1cb]/30 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-12">
            <div className="space-y-12">
              {recentWriting.map((post) => (
                <div key={post.Slug} className="flex gap-6 md:gap-10 group">
                  <Link href={`/writing/${post.Slug}`} className="w-32 md:w-48 aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link href={`/writing/${post.Slug}`} className="hover:text-[#b83143] transition-colors">
                      <h3 className="text-xl md:text-2xl font-serif text-black">{post.Title}</h3>
                    </Link>
                    <p className="mt-1 text-sm md:text-base text-[#737373] italic line-clamp-2">
                      {post.Description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Link href="/writing" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-sm">more →</Link>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section id="books" className="py-16 md:py-24 border-b border-[#d4d1cb]/30 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto">
            <div className="scroll-container hide-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing">
              {recentBooks.map((post) => (
                <Link key={post.Slug} href={`/books/${post.Slug}`} className="scroll-item w-[180px] group">
                  <div className="aspect-[2/3] overflow-hidden bg-gray-100 mb-4">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <h4 className="text-base text-black font-medium">{post.Title}</h4>
                  <p className="text-sm text-[#737373] italic">{(post as any).Author}</p>

                </Link>
              ))}
            </div>
            <div className="flex justify-end pt-8">
              <Link href="/books" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-sm">more →</Link>
            </div>
          </div>
        </section>

        {/* Florals Section */}
        <section id="florals" className="py-16 md:py-24 border-b border-[#d4d1cb]/30 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto">
            <div className="scroll-container hide-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing">
              {recentFlorals.map((post, idx) => (
                <div key={idx} className="scroll-item w-[280px]">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt="floral" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-8">
              <Link href="/florals" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-sm">more →</Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[640px] w-full mx-auto flex flex-col items-center">
            {/* About Headline */}
            <p className="text-[#b83143] text-[15px] md:text-[clamp(1rem,1.1vw,1.15rem)] leading-relaxed text-center mb-12">
              passionate about experiential, visual, and web design.
            </p>

            {/* Kinetic List */}
            <div className="flex flex-col items-center space-y-6 w-full mb-16">
              <ul className="space-y-6 w-fit">
                {aboutItems.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-4">
                    <KineticIcon type={item.type} />
                    <span className="text-black text-[clamp(1rem,1.1vw,1.15rem)]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Lotus Painting */}
            <div className="w-[85%] md:w-[65%] flex flex-col items-center mb-12">
              <div className="relative w-full aspect-[4/3]">
                <img src="/red-lotus.png" alt="red lotus painting" className="w-full h-full object-cover" />
              </div>
              <p className="mt-[0.6rem] text-center text-[11px] md:text-[13px] text-[#737373] tracking-[0.04em] font-serif">
                red lotus (1943) by 張大千
              </p>
            </div>

            {/* Quote + Paragraph */}
            <div className="space-y-12 w-full text-center">
              <div className="text-left max-w-full md:max-w-[600px] mx-auto">
                <p className="italic text-[12px] md:text-[clamp(1rem,1.1vw,1.15rem)] text-[#b83143] tracking-[0.04em] leading-[1.8] lowercase text-center">
                  "i love the lotus, for it rises from the mud unstained, cleansed in rippling water, appealing, yet not seductive."
                </p>
                <p className="text-[12px] md:text-[13px] text-black tracking-[0.04em] leading-[1.8] lowercase mt-1 text-center">
                  — 周敦颐, on the love of the lotus, 1073
                </p>
              </div>

              <div className="text-[14px] md:text-[clamp(1rem,1.1vw,1.15rem)] text-black leading-[1.8] max-w-[600px] mx-auto text-center">
                <p>
                  I love the cultural meaning of the lotus as a symbol of the process. I've grown to appreciate the constraints and complexities of the mud for the beautiful bloom. This philosophy shapes how I approach design and everything else.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}


import Link from "next/link";
import { getEventPosts, getWritingPosts, getBookPosts, getFloralPosts, getAboutPost, getFloralGallery } from "@/lib/notion";

import SectionLabel from "@/components/SectionLabel";
import KineticIcon from "@/components/KineticIcon";

export const revalidate = 30;

export default async function Home() {
  const [events, writing, books, floralPosts, aboutPost, floralGallery] = await Promise.all([
    getEventPosts(),
    getWritingPosts(),
    getBookPosts(),
    getFloralPosts(),
    getAboutPost(),
    getFloralGallery(),
  ]);

  const recentEvents = events.slice(0, 3);
  const recentWriting = writing.slice(0, 3);
  const recentBooks = books.slice(0, 8); // Fetch more for better scroll experience
  const recentFlorals = floralGallery.slice(0, 8);

  const sections = [
    { id: "about", label: "about" },
    { id: "events", label: "events" },
    { id: "writing", label: "writing" },
    { id: "books", label: "books" },
    { id: "florals", label: "florals" },
    { id: "footer", label: "" },
  ];

  const aboutItems = [
    { type: "vine" as const, text: "planning weddings across ottawa & toronto" },
    { type: "bloom" as const, text: "writing about psychology through a personal lens" },
    { type: "book" as const, text: "reading what broadens my mindset" },
    { type: "flower" as const, text: "experimenting with floral arrangements" },
    { type: "brackets" as const, text: "building custom wedding websites" },
  ];

  return (
    <div className="w-full flex flex-col pb-32">
      {/* Scroll Tracker - fixed left */}
      <div className="hidden md:block fixed top-0 left-0 w-[210px] h-screen pointer-events-none z-[60]">
        <SectionLabel sections={sections} />
      </div>

      <div className="w-full flex flex-col">
        {/* About Tagline & Icons (Now at the Top) */}
        <section id="about" className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[640px] w-full mx-auto flex flex-col items-center">
            <p className="text-[#b83143] text-[17px] md:text-[clamp(1.1rem,1.25vw,1.3rem)] leading-relaxed text-center mb-8">
              passionate about experiential, visual, and web design.
            </p>

            <div className="flex flex-col items-center space-y-4 w-full">
              <ul className="space-y-4 w-fit">
                {aboutItems.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-4">
                    <KineticIcon type={item.type} />
                    <span className="text-black text-[clamp(1rem,1.15vw,1.15rem)]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Events Section */}

        <section id="events" className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-8">
            <div className="space-y-12">
              {recentEvents.map((post) => (
                <div key={post.Slug} className="flex gap-8 md:gap-12 group">
                  <Link href={`/events/${post.Slug}`} className="w-40 md:w-64 aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link href={`/events/${post.Slug}`} className="group/text">
                      <h3 className="text-xl md:text-2xl font-serif text-black transition-colors group-hover/text:text-[#b83143]">{post.Title}</h3>
                      <p className="mt-2 text-sm md:text-base text-[#737373] italic transition-colors group-hover/text:text-[#b83143]">
                        {post.Description}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-start pt-4">
              <Link href="/events" className="text-[#737373] hover:text-[#b83143] italic transition-colors text-sm flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-8">
            <div className="space-y-12">
              {recentWriting.map((post) => (
                <div key={post.Slug} className="flex gap-8 md:gap-12 group">
                  <Link href={`/writing/${post.Slug}`} className="w-40 md:w-64 aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link href={`/writing/${post.Slug}`} className="group/text">
                      <h3 className="text-xl md:text-2xl font-serif text-black transition-colors group-hover/text:text-[#b83143]">{post.Title}</h3>
                      <p className="mt-2 text-sm md:text-base text-[#737373] italic transition-colors group-hover/text:text-[#b83143] line-clamp-2">
                        {post.Description}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-start pt-4">
              <Link href="/writing" className="text-[#737373] hover:text-[#b83143] italic transition-colors text-sm flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section id="books" className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-6">
            <div className="scroll-container hide-scrollbar overflow-x-auto gap-10 md:gap-16">
              {recentBooks.map((post) => (
                <Link key={post.Slug} href={`/books/${post.Slug}`} className="scroll-item w-[180px] group block">
                  <div className="aspect-[2/3] w-[180px] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <h4 className="text-[15px] text-black font-serif leading-tight transition-colors group-hover:text-[#b83143] mb-1">{post.Title}</h4>
                  <p className="text-[13px] text-[#737373] italic">{post.Description}</p>
                </Link>
              ))}
            </div>
            <div className="flex justify-start pt-4">
              <Link href="/books" className="text-[#737373] hover:text-[#b83143] italic transition-colors text-sm flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Florals Section */}
        <section id="florals" className="py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-6">
            <div className="scroll-container hide-scrollbar overflow-x-auto">
              {recentFlorals.map((imgUrl, idx) => (
                <div key={idx} className="scroll-item w-[220px] md:w-[280px]">
                  <div className="aspect-square overflow-hidden bg-gray-100 rounded-sm">
                    <img src={imgUrl} alt="floral" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-start pt-4">
              <Link href="/florals" className="text-[#737373] hover:text-[#b83143] italic transition-colors text-sm flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Decorative Footer */}
        <footer id="footer" className="py-12 md:py-24 px-6 md:px-12 border-t border-[#d4d1cb]/20">
          <div className="max-w-[640px] w-full mx-auto flex flex-col items-center">
            {/* Red Lotus Painting */}
            <div className="w-[85%] md:w-[65%] flex flex-col items-center mb-10">
              <div className="relative w-full aspect-[4/3]">
                <img src="/red-lotus.png" alt="red lotus painting" className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-center text-[12px] md:text-[13px] text-[#737373] tracking-[0.04em] font-serif">
                red lotus (1943) by 張大千
              </p>
            </div>

            {/* Quote + Paragraph */}
            <div className="space-y-10 w-full text-center">
              <div className="text-center max-w-full md:max-w-xl mx-auto">
                <p className="italic text-[14px] md:text-[15px] text-[#b83143] tracking-[0.04em] leading-[1.8] lowercase">
                  "i love the lotus, for it rises from the mud unstained, cleansed in rippling water, appealing, yet not seductive."
                </p>
                <p className="text-[12px] md:text-[13px] text-black tracking-[0.04em] leading-[2] lowercase mt-2 opacity-60">
                  — 周敦颐, on the love of the lotus, 1073
                </p>
              </div>

              <div className="text-[16px] md:text-[clamp(1rem,1.15vw,1.15rem)] text-black leading-[1.8] max-w-xl mx-auto">
                <p>
                  I love the cultural meaning of the lotus as a symbol of the process. I've grown to appreciate the constraints and complexities of the mud for the beautiful bloom. This philosophy shapes how I approach design and everything else.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

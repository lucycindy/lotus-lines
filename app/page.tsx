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
    { id: "events", label: "events" },
    { id: "writing", label: "writing" },
    { id: "books", label: "books" },
    { id: "florals", label: "florals" },
    { id: "about", label: "about" },
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

      <div className="w-full flex flex-col pt-12">
        {/* Events Section */}
        <section id="events" className="py-12 md:py-20 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-10">
            <div className="space-y-10">
              {recentEvents.map((post) => (
                <div key={post.Slug} className="flex gap-6 md:gap-10 group">
                  <Link href={`/events/${post.Slug}`} className="w-32 md:w-48 aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link href={`/events/${post.Slug}`} className="group/text">
                      <h3 className="text-xl md:text-2xl font-serif text-black transition-colors group-hover/text:text-[#b83143]">{post.Title}</h3>
                      <p className="mt-1 text-sm md:text-base text-[#737373] italic transition-colors group-hover/text:text-[#b83143]">
                        {post.Description}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Link href="/events" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-xs flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="py-12 md:py-20 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-10">
            <div className="space-y-10">
              {recentWriting.map((post) => (
                <div key={post.Slug} className="flex gap-6 md:gap-10 group">
                  <Link href={`/writing/${post.Slug}`} className="w-32 md:w-48 aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link href={`/writing/${post.Slug}`} className="group/text">
                      <h3 className="text-xl md:text-2xl font-serif text-black transition-colors group-hover/text:text-[#b83143]">{post.Title}</h3>
                      <p className="mt-1 text-sm md:text-base text-[#737373] italic transition-colors group-hover/text:text-[#b83143] line-clamp-2">
                        {post.Description}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Link href="/writing" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-xs flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section id="books" className="py-12 md:py-20 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-8">
            <div className="scroll-container hide-scrollbar overflow-x-auto">
              {recentBooks.map((post) => (
                <Link key={post.Slug} href={`/books/${post.Slug}`} className="scroll-item w-[124px] group block">
                  <div className="aspect-[2/3] w-[124px] overflow-hidden bg-gray-100 mb-3 rounded-sm">
                    {post.CoverImage && (
                      <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <h4 className="text-[13px] text-black font-serif leading-tight transition-colors group-hover:text-[#b83143]">{post.Title}</h4>
                  <p className="text-[11px] text-[#737373] italic mt-0.5">{(post as any).Author}</p>
                </Link>
              ))}
            </div>
            <div className="flex justify-start">
              <Link href="/books" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-xs flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Florals Section */}
        <section id="florals" className="py-12 md:py-20 px-6 md:px-12">
          <div className="max-w-[800px] w-full mx-auto space-y-8">
            <div className="scroll-container hide-scrollbar overflow-x-auto">
              {recentFlorals.map((imgUrl, idx) => (
                <div key={idx} className="scroll-item w-[180px] md:w-[220px]">
                  <div className="aspect-[2/3] overflow-hidden bg-gray-100 rounded-sm">
                    <img src={imgUrl} alt="floral" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Link href="/florals" className="text-[#a3a3a3] hover:text-[#b83143] italic transition-colors text-xs flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-28 px-6 md:px-12">
          <div className="max-w-[640px] w-full mx-auto flex flex-col items-center">
            {/* About Headline */}
            <p className="text-[#b83143] text-[15px] md:text-[clamp(1.1rem,1.2vw,1.3rem)] leading-relaxed text-center mb-12 flex flex-col items-center">
              <span>passionate about</span>
              <span>experiential, visual, and web design.</span>
            </p>

            {/* Kinetic List */}
            <div className="flex flex-col items-center space-y-6 w-full mb-20 md:mb-24">
              <ul className="space-y-6 w-fit">
                {aboutItems.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-4">
                    <KineticIcon type={item.type} />
                    <span className="text-black text-[clamp(0.9rem,1.1vw,1.1rem)]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Lotus Painting */}
            <div className="w-[85%] md:w-[70%] flex flex-col items-center mb-16">
              <div className="relative w-full aspect-[4/3]">
                <img src="/red-lotus.png" alt="red lotus painting" className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-center text-[11px] md:text-[12px] text-[#737373] tracking-[0.04em] font-serif uppercase">
                red lotus (1943) by 張大千
              </p>
            </div>

            {/* Quote + Paragraph */}
            <div className="space-y-16 w-full text-center">
              <div className="text-center max-w-full md:max-w-xl mx-auto">
                <p className="italic text-[13px] md:text-[14px] text-[#b83143] tracking-[0.04em] leading-[1.8] lowercase">
                  "i love the lotus, for it rises from the mud unstained, cleansed in rippling water, appealing, yet not seductive."
                </p>
                <p className="text-[11px] md:text-[12px] text-black tracking-[0.04em] leading-[2] lowercase mt-3 opacity-60">
                  — 周敦颐, on the love of the lotus, 1073
                </p>
              </div>

              <div className="text-[15px] md:text-[clamp(1rem,1.1vw,1.15rem)] text-black leading-[1.8] max-w-xl mx-auto">
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

import Link from "next/link";
import { getEventPosts, getWritingPosts, getBookPosts, getFloralPosts, getAboutPost, getFloralGallery } from "@/lib/notion";

import KineticIcon from "@/components/KineticIcon";
import SectionContainer from "@/components/SectionContainer";
import CarouselRow from "@/components/CarouselRow";
import FadeInItem from "@/components/FadeInItem";
import ScrollChevron from "@/components/ScrollChevron";

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
  const recentBooks = books.slice(0, 8); 
  const recentFlorals = floralGallery.slice(0, 8);

  const aboutItems = [
    { type: "vine" as const, text: "planning weddings across ottawa & toronto" },
    { type: "bloom" as const, text: "writing about psychology through a personal lens" },
    { type: "book" as const, text: "reading what broadens my mindset" },
    { type: "flower" as const, text: "experimenting with floral arrangements" },
    { type: "brackets" as const, text: "building custom wedding websites" },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* About Section - Full Bleed */}
      <SectionContainer id="about" label="about" heightClass="min-h-screen py-[var(--sp-3xl)]" fullBleed className="bg-[#2E2D2B] text-[#F0EDE8]">
          <div className="w-full flex flex-col items-center">
            <FadeInItem delay={0.1}>
              <p className="text-center mb-12 whitespace-nowrap tracking-[0.1em]" style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: '11px',
                color: '#9A9694'
              }}>
                passionate about experiential, visual, and web design.
              </p>
            </FadeInItem>

            <div className="flex flex-col items-center space-y-[var(--sp-md)] w-full text-[#F0EDE8]">
              <ul className="space-y-[var(--sp-md)] w-full max-w-[360px] md:w-fit">
                {aboutItems.map((item, idx) => (
                  <li key={idx}>
                    <FadeInItem delay={0.2 + idx * 0.15} className="flex items-center space-x-[var(--sp-md)]">
                      <KineticIcon type={item.type} />
                      <span className="text-[15px] md:text-[clamp(1.1rem,1.4vw,1.4rem)] whitespace-nowrap">
                        {item.text}
                      </span>
                    </FadeInItem>
                  </li>
                ))}
              </ul>
            </div>

            <ScrollChevron />
          </div>
        </SectionContainer>

      <div className="w-full flex flex-col content-wrapper">
        {/* Events Section */}
        <SectionContainer id="events" label="events" heightClass="min-h-screen py-[var(--sp-3xl)]">
          <div className="w-full space-y-[var(--sp-md)]">
            <div className="space-y-[var(--sp-md)]">
              {recentEvents.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15}>
                  <Link
                    href={`/events/${post.Slug}`}
                    className="group flex flex-row items-center gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 overflow-hidden"
                  >
                    <div className="w-44 sm:w-48 md:w-64 aspect-[4/3] shrink-0 overflow-hidden bg-[#e8e6e2]">
                      {post.CoverImage && (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-[var(--sp-md)] px-[var(--sp-sm)]">
                      <h3 className="group-hover:text-[#b83143] transition-colors leading-snug line-clamp-2">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="mt-[var(--sp-xs)] text-[#6b6b6b] italic line-clamp-2 font-light">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </div>
            <FadeInItem delay={0.4} className="flex justify-start">
              <Link href="/events" className="btn-solid-red">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Writing Section */}
        <SectionContainer id="writing" label="writing">
          <div className="w-full space-y-[var(--sp-md)]">
            <div className="space-y-[var(--sp-md)]">
              {recentWriting.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15}>
                  <Link
                    href={`/writing/${post.Slug}`}
                    className="group flex flex-row items-center gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 overflow-hidden"
                  >
                    <div className="w-44 sm:w-48 md:w-64 aspect-[4/3] shrink-0 overflow-hidden bg-[#e8e6e2]">
                      {post.CoverImage && (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-[var(--sp-md)] px-[var(--sp-sm)]">
                      <h3 className="group-hover:text-[#b83143] transition-colors leading-snug line-clamp-2">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="mt-[var(--sp-xs)] text-[#6b6b6b] italic line-clamp-2 font-light">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </div>
            <FadeInItem delay={0.4} className="flex justify-start">
              <Link href="/writing" className="btn-solid-red">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Books Section */}
        <SectionContainer id="books" label="books" heightClass="min-h-[85vh] py-[var(--sp-3xl)]">
          <div className="w-full">
            <CarouselRow>
              {recentBooks.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15} className="w-[160px] md:w-[200px] shrink-0 group py-6">
                  <Link href={`/books/${post.Slug}`} className="block bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 overflow-hidden">
                    <div className="aspect-[2/3] w-full overflow-hidden bg-[#e8e6e2]">
                      {post.CoverImage && (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="py-[var(--sp-md)] px-[var(--sp-sm)]">
                      <h3 className="group-hover:text-[#b83143] transition-colors line-clamp-1">
                        {post.Title}
                      </h3>
                      {post.Description && (
                        <p className="mt-[var(--sp-xs)] text-[#6b6b6b] italic line-clamp-1">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </CarouselRow>
            <FadeInItem delay={0.4} className="flex justify-start pt-4">
              <Link href="/books" className="btn-solid-red">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Florals Section */}
        <SectionContainer id="florals" label="florals" heightClass="min-h-[85vh] py-[var(--sp-3xl)]">
          <div className="w-full">
            <CarouselRow>
              {recentFlorals.map((imgUrl, idx) => (
                <FadeInItem key={idx} delay={idx * 0.15} className="w-[240px] md:w-[320px] shrink-0 aspect-square bg-[#e8e6e2] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)]">
                  <img 
                    src={imgUrl} 
                    alt={`Floral art ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </FadeInItem>
              ))}
            </CarouselRow>
            <FadeInItem delay={0.4} className="flex justify-start pt-6">
              <Link href="/florals" className="btn-solid-red">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>
      </div>

        {/* Decorative Footer - Full Bleed */}
        <SectionContainer id="footer" label="" heightClass="min-h-[80vh]" fullBleed className="bg-[#2E2D2B] text-[#F0EDE8] py-[var(--sp-3xl)]">
          <div className="w-full flex flex-col items-center">
            {/* Red Lotus Painting */}
            <FadeInItem className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[500px] flex flex-col items-center mb-10">
              <div className="relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)]">
                <img src="/red-lotus.png" alt="red lotus painting" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-center type-caption font-serif" style={{ color: '#9A9694' }}>
                red lotus (1943) by 張大千
              </p>
            </FadeInItem>

            {/* Quote + Paragraph */}
            <div className="space-y-12 w-full text-center">
              <FadeInItem delay={0.2} className="text-center w-full mx-auto px-2 md:max-w-[700px]">
                <p className="italic text-[#F0EDE8] about-quote-text lowercase leading-[1.75]">
                  "i love the lotus, for it rises from the mud unstained, cleansed in rippling water, appealing, yet not seductive."
                </p>
                <p className="type-caption lowercase mt-3" style={{ color: '#9A9694' }}>
                  — 周敦颐, on the love of the lotus, 1073
                </p>
              </FadeInItem>

              <FadeInItem delay={0.4} className="text-[#F0EDE8] about-quote-text w-full mx-auto px-2 md:max-w-[950px] md:px-0">
                <p className="lowercase text-center text-balance italic">
                  I love the cultural meaning of the lotus as a symbol of the process. I've grown to appreciate the constraints and complexities of the mud for the beautiful bloom. This philosophy shapes how I approach design and everything else.
                </p>
              </FadeInItem>
            </div>
          </div>
        </SectionContainer>
    </div>
  );
}

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
      <SectionContainer 
        id="about" 
        label="about" 
        fullBleed 
        className="bg-[#F7F6F4] text-[#3D3B37] animate-cascade !pt-[9.2rem] sm:!pt-[clamp(5.5rem,12vw,8rem)] !pb-[3.5rem] sm:!pb-[var(--sp-3xl)]"
        style={{ animationDelay: '0ms' }}
      >
          <div className="w-full flex flex-col items-center">
            <FadeInItem delay={0.1} className="md:mt-[2.5rem] md:ml-[12%]">
              <p className="text-center mb-12 tracking-[0.1em]" style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: 'var(--fs-body)'
              }}>
                passionate about experiential, visual, and web design.
              </p>
            </FadeInItem>

            <div className="flex flex-col items-center space-y-[var(--sp-md)] w-full text-[#3D3B37]">
              <ul className="space-y-[var(--sp-md)] w-full max-w-[540px] sm:max-w-none md:w-fit">
                {aboutItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-[var(--sp-sm)] list-none pl-0">
                    <FadeInItem delay={0.2 + idx * 0.15} className="flex flex-row items-start gap-[var(--sp-sm)] w-full">
                      <KineticIcon type={item.type} />
                      <span className="flex-1 about-icon-text text-[16px] text-[#3D3B37] whitespace-normal pt-[4px] pr-2">
                        {item.text}
                      </span>
                    </FadeInItem>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionContainer>

      <div className="w-full flex flex-col content-wrapper">
        {/* Events Section */}
        <SectionContainer id="events" label="events" className="animate-cascade" style={{ animationDelay: '150ms' }}>
          <div className="w-full space-y-[var(--sp-md)]">
            <div className="space-y-[var(--sp-md)]">
              {recentEvents.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15}>
                  <Link
                    href={`/events/${post.Slug}`}
                    className="group flex flex-row items-center gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 w-full h-[68px] sm:h-auto"
                  >
                    <div className="w-[30%] self-stretch shrink-0 md:w-[38%] md:aspect-[4/3] md:self-auto">
                      {post.CoverImage ? (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-[#e8e6e2]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-[var(--sp-md)] px-[var(--sp-sm)] pr-[var(--sp-md)]">
                      <h3 className="hp-card-title md:text-[16px] group-hover:text-[#b83143] transition-colors leading-snug line-clamp-1">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="hp-card-desc mt-[var(--sp-xs)] md:text-[14px] text-[#6b6b6b] italic font-light line-clamp-1">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </div>
            <FadeInItem delay={0.4} className="flex justify-start">
              <Link href="/events" className="btn-outline-navigation">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Writing Section */}
        <SectionContainer id="writing" label="writing" className="animate-cascade" style={{ animationDelay: '300ms' }}>
          <div className="w-full space-y-[var(--sp-md)]">
            <div className="space-y-[var(--sp-md)]">
              {recentWriting.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15}>
                  <Link
                    href={`/writing/${post.Slug}`}
                    className="group flex flex-row items-center gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 w-full"
                  >
                    <div className="w-[30%] self-stretch shrink-0 md:w-[38%] md:aspect-[4/3] md:self-auto">
                      {post.CoverImage ? (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-[#e8e6e2]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-[var(--sp-md)] px-[var(--sp-sm)] pr-[var(--sp-md)]">
                      <h3 className="hp-card-title md:text-[16px] group-hover:text-[#b83143] transition-colors leading-snug line-clamp-1">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="hp-card-desc mt-[var(--sp-xs)] md:text-[14px] text-[#6b6b6b] italic font-light line-clamp-1">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </div>
            <FadeInItem delay={0.4} className="flex justify-start">
              <Link href="/writing" className="btn-outline-navigation">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Books Section */}
        <SectionContainer id="books" label="books" className="animate-cascade" style={{ animationDelay: '450ms' }}>
          <div className="w-full -mt-6 md:-mt-6">
            <CarouselRow>
              {recentBooks.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15} className="w-[51%] sm:w-[50%] md:w-[45%] shrink-0 group py-0 flex flex-col self-stretch">
                  <Link href={`/books/${post.Slug}`} className="flex flex-col flex-1 w-full bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200">
                    <div className="aspect-[2/3] w-full shrink-0">
                      {post.CoverImage ? (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 md:scale-[1.1] md:group-hover:scale-[1.15] pointer-events-none" />
                      ) : (
                        <div className="w-full h-full bg-[#e8e6e2]" />
                      )}
                    </div>
                    <div className="hidden flex-col flex-1 py-[var(--sp-md)] px-[var(--sp-md)]">
                      <h3 className="hp-card-title md:text-[16px] group-hover:text-[#b83143] transition-colors line-clamp-1">
                        {post.Title}
                      </h3>
                      {post.Description && (
                        <p className="hp-card-desc mt-[var(--sp-xs)] md:text-[14px] text-[#6b6b6b] italic line-clamp-1">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </CarouselRow>
            <FadeInItem delay={0.4} className="flex justify-start">
              <Link href="/books" className="btn-outline-navigation">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

      </div>

        {/* Florals Section - Bleed Width */}
        <div className="w-full">
          <SectionContainer id="florals" label="florals" fullBleed className="animate-cascade" style={{ animationDelay: '600ms' }}>
            <div className="w-full">
              <CarouselRow>
              {recentFlorals.map((imgUrl, idx) => (
                <FadeInItem key={idx} delay={idx * 0.15} className="w-[60%] sm:w-[50%] md:w-[45%] shrink-0 rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] aspect-square bg-transparent transform-gpu isolate">
                  <img 
                    src={imgUrl} 
                    alt={`Floral art ${idx + 1}`} 
                    className="w-full h-full object-cover block transition-transform duration-500 hover:scale-[1.02] border-none outline-none"
                  />
                </FadeInItem>
              ))}
            </CarouselRow>
            <FadeInItem delay={0.4} className="flex justify-start pt-6 w-full max-w-[600px] mx-auto px-[var(--page-margin)]">
              <Link href="/florals" className="btn-outline-navigation">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>
        </div>

        {/* Footer spacing spacer */}
        <div className="w-full" style={{ height: 'clamp(1.15rem, 2.3vw, 2.3rem)' }} />

        {/* Decorative Footer - Full Bleed */}
      <SectionContainer 
        id="footer" 
        label="" 
        fullBleed 
        className="bg-[#F7F6F4] text-[#3D3B37] animate-cascade"
        style={{ animationDelay: '750ms' }}
      >
          <div className="w-full flex flex-col items-center">
            {/* Red Lotus Painting */}
            <FadeInItem className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[500px] flex flex-col items-center mb-10">
              <div className="relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)]">
                <img src="/red-lotus.png" alt="red lotus painting" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-center type-caption font-serif" style={{ color: '#7A7670' }}>
                red lotus (1943) by 張大千
              </p>
            </FadeInItem>

            {/* Quote + Paragraph */}
            <div className="space-y-12 w-full text-center">
              <FadeInItem delay={0.2} className="text-center w-full mx-auto px-2 md:max-w-[700px]">
                <p className="italic text-[#3D3B37] about-quote-text lowercase leading-[1.75]" style={{ textWrap: 'balance' } as React.CSSProperties}>
                  "i love the lotus, for it rises from the mud unstained, cleansed in rippling water, appealing, yet not seductive."
                </p>
                <p className="type-caption lowercase mt-3" style={{ color: '#7A7670' }}>
                  — 周敦颐, on the love of the lotus, 1073
                </p>
              </FadeInItem>

              <FadeInItem delay={0.4} className="w-full mx-auto px-2 md:max-w-[560px] md:px-0 flex flex-col items-center">
                <p className="footer-body-text text-[#3D3B37] lowercase text-center about-quote-text footer-paragraph md:text-[12px]">
                  I love the cultural meaning of the lotus as a symbol of the process. I've grown to appreciate the constraints and complexities of the mud for the beautiful bloom. This philosophy shapes how I approach design and everything else.
                </p>
              </FadeInItem>
            </div>
          </div>
        </SectionContainer>
    </div>
  );
}

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
        heightClass="min-h-[100svh]" 
        fullBleed 
        className="bg-[#2E2D2B] text-[#F0EDE8]"
        style={{ paddingTop: 'calc(10vh + var(--sp-3xl))', marginTop: '-10vh', paddingBottom: '20vh' }}
      >
          <div className="w-full flex flex-col items-center">
            <FadeInItem delay={0.1}>
              <p className="text-center mb-12 tracking-[0.1em]" style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: 'var(--fs-body)',
                color: '#F0EDE8'
              }}>
                passionate about experiential, visual, and web design.
              </p>
            </FadeInItem>

            <div className="flex flex-col items-center space-y-[var(--sp-md)] w-full text-[#F0EDE8]">
              <ul className="space-y-[var(--sp-md)] w-full max-w-[360px] md:w-fit">
                {aboutItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-[var(--sp-sm)] list-none pl-0">
                    <FadeInItem delay={0.2 + idx * 0.15} className="flex flex-row items-start gap-[var(--sp-sm)] w-full">
                      <KineticIcon type={item.type} />
                      <span className="flex-1 text-[16px] text-[#F0EDE8] whitespace-normal pt-[4px] pr-2">
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
        <SectionContainer id="events" label="events">
          <div className="w-full space-y-[var(--sp-md)]">
            <div className="space-y-[var(--sp-md)]">
              {recentEvents.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15}>
                  <Link
                    href={`/events/${post.Slug}`}
                    className="group flex flex-row items-center gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 w-full"
                  >
                    <div className="w-[35%] md:w-[25%] aspect-[4/3] shrink-0 overflow-hidden rounded-l-[var(--radius-md)]">
                      {post.CoverImage ? (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-[#e8e6e2]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-[var(--sp-md)] px-[var(--sp-sm)] pr-[var(--sp-md)]">
                      <h3 className="text-[var(--fs-body-lg)] group-hover:text-[#b83143] transition-colors leading-snug line-clamp-1">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="mt-[var(--sp-xs)] text-[#6b6b6b] italic font-light">
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
                    className="group flex flex-row items-center gap-[var(--sp-md)] bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 w-full"
                  >
                    <div className="w-[30%] md:w-[25%] aspect-[4/3] shrink-0 overflow-hidden rounded-l-[var(--radius-md)]">
                      {post.CoverImage ? (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-[#e8e6e2]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-[var(--sp-md)] px-[var(--sp-sm)] pr-[var(--sp-md)]">
                      <h3 className="text-[var(--fs-body-lg)] group-hover:text-[#b83143] transition-colors leading-snug line-clamp-1">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="mt-[var(--sp-xs)] text-[#6b6b6b] italic font-light">
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
        <SectionContainer id="books" label="books" heightClass="min-h-[85vh] pt-[var(--sp-3xl)] pb-[20vh]">
          <div className="w-full">
            <CarouselRow>
              {recentBooks.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15} className="w-[85%] sm:w-[45%] md:w-[45%] shrink-0 group py-6 flex flex-col h-full">
                  <Link href={`/books/${post.Slug}`} className="flex flex-col h-full w-full bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200">
                    <div className="aspect-[2/3] w-full shrink-0 overflow-hidden rounded-t-[var(--radius-md)]">
                      {post.CoverImage ? (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-[#e8e6e2]" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 py-[var(--sp-md)] px-[var(--sp-md)]">
                      <h3 className="text-[var(--fs-body-lg)] group-hover:text-[#b83143] transition-colors line-clamp-1">
                        {post.Title}
                      </h3>
                      {post.Description && (
                        <p className="mt-[var(--sp-xs)] text-[#6b6b6b] italic">
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

      </div>

        {/* Florals Section - Bleed Width */}
        <div className="w-full max-w-[510px] mx-auto">
          <SectionContainer id="florals" label="florals" heightClass="pt-[var(--sp-2xl)] pb-[20vh]" fullBleed>
            <div className="w-full">
              <CarouselRow>
              {recentFlorals.map((imgUrl, idx) => (
                <FadeInItem key={idx} delay={idx * 0.15} className="w-[85%] sm:w-[90%] shrink-0 rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] aspect-square bg-transparent">
                  <img 
                    src={imgUrl} 
                    alt={`Floral art ${idx + 1}`} 
                    className="w-full h-full object-cover block transition-transform duration-500 hover:scale-[1.02]"
                  />
                </FadeInItem>
              ))}
            </CarouselRow>
            <FadeInItem delay={0.4} className="flex justify-start pt-6 w-full max-w-[600px] mx-auto px-[var(--page-margin)]">
              <Link href="/florals" className="btn-solid-red">
                more →
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>
        </div>

        {/* Decorative Footer - Full Bleed */}
      <SectionContainer 
        id="footer" 
        label="" 
        heightClass="min-h-[80vh]" 
        fullBleed 
        className="bg-[#2E2D2B] text-[#F0EDE8]"
        style={{ paddingTop: 'var(--sp-3xl)', paddingBottom: 'calc(20vh + var(--sp-3xl))', marginBottom: '-20vh' }}
      >
          <div className="w-full flex flex-col items-center">
            {/* Red Lotus Painting */}
            <FadeInItem className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[500px] flex flex-col items-center mb-10">
              <div className="relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)]">
                <img src="/red-lotus.png" alt="red lotus painting" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-center type-caption font-serif" style={{ color: '#C4C0BC' }}>
                red lotus (1943) by 張大千
              </p>
            </FadeInItem>

            {/* Quote + Paragraph */}
            <div className="space-y-12 w-full text-center">
              <FadeInItem delay={0.2} className="text-center w-full mx-auto px-2 md:max-w-[700px]">
                <p className="italic text-[#F0EDE8] about-quote-text lowercase leading-[1.75]">
                  "i love the lotus, for it rises from the mud unstained, cleansed in rippling water, appealing, yet not seductive."
                </p>
                <p className="type-caption lowercase mt-3" style={{ color: '#C4C0BC' }}>
                  — 周敦颐, on the love of the lotus, 1073
                </p>
              </FadeInItem>

              <FadeInItem delay={0.4} className="w-full mx-auto px-2 md:max-w-[950px] md:px-0 flex flex-col items-center">
                <p className="text-[#F0EDE8] lowercase text-center text-balance about-quote-text">
                  I love the cultural meaning of the lotus as a symbol of the process. I've grown to appreciate the constraints and complexities of the mud for the beautiful bloom. This philosophy shapes how I approach design and everything else.
                </p>
              </FadeInItem>
            </div>
          </div>
        </SectionContainer>
    </div>
  );
}

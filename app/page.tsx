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
      <div className="w-full flex flex-col">
        
        {/* About Section */}
        <SectionContainer id="about" label="about" heightClass="min-h-screen pt-12 pb-24 md:pt-16 md:pb-36">
          <div className="max-w-[700px] w-full mx-auto flex flex-col items-center">
            <FadeInItem delay={0.1}>
              <p className="text-[#b83143] text-[17px] md:text-[clamp(1.2rem,1.6vw,1.6rem)] leading-relaxed text-center mb-12">
                passionate about experiential, visual, and web design.
              </p>
            </FadeInItem>

            <div className="flex flex-col items-center space-y-4 w-full">
              <ul className="space-y-6 w-fit">
                {aboutItems.map((item, idx) => (
                  <li key={idx}>
                    <FadeInItem delay={0.2 + idx * 0.15} className="flex items-center space-x-5">
                      <KineticIcon type={item.type} />
                      <span className="text-black text-[16px] md:text-[clamp(1.1rem,1.4vw,1.4rem)]">
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

        {/* Events Section */}
        <SectionContainer id="events" label="events" heightClass="min-h-screen pt-12 pb-24 md:pt-16 md:pb-36">
          <div className="max-w-[850px] w-full mx-auto space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-6">
              {recentEvents.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15}>
                  <Link
                    href={`/events/${post.Slug}`}
                    className="group flex flex-row items-center gap-6 md:gap-8 py-3 md:py-4"
                  >
                    <div className="w-44 sm:w-48 md:w-64 aspect-[4/3] shrink-0 overflow-hidden bg-[#e8e6e2] rounded-sm">
                      {post.CoverImage && (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] md:text-[clamp(1.1rem,1.25vw,1.3rem)] font-medium text-black group-hover:text-[#b83143] transition-colors leading-snug line-clamp-2">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="mt-2 text-[14px] md:text-[17px] text-[#6b6b6b] italic line-clamp-2 font-light">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </div>
            <FadeInItem delay={0.4} className="flex justify-start">
              <Link href="/events" className="text-[#6b6b6b] hover:text-[#b83143] italic transition-colors text-sm font-medium flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Writing Section */}
        <SectionContainer id="writing" label="writing">
          <div className="max-w-[850px] w-full mx-auto space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-6">
              {recentWriting.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15}>
                  <Link
                    href={`/writing/${post.Slug}`}
                    className="group flex flex-row items-center gap-6 md:gap-8 py-3 md:py-4"
                  >
                    <div className="w-44 sm:w-48 md:w-64 aspect-[4/3] shrink-0 overflow-hidden bg-[#e8e6e2] rounded-sm">
                      {post.CoverImage && (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] md:text-[clamp(1.1rem,1.25vw,1.3rem)] font-medium text-black group-hover:text-[#b83143] transition-colors leading-snug line-clamp-2">
                        {post.Title}
                      </h3>

                      {post.Description && (
                        <p className="mt-2 text-[14px] md:text-[17px] text-[#6b6b6b] italic line-clamp-2 font-light">
                          {post.Description}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInItem>
              ))}
            </div>
            <FadeInItem delay={0.4} className="flex justify-start">
              <Link href="/writing" className="text-[#6b6b6b] hover:text-[#b83143] italic transition-colors text-sm font-medium flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Books Section */}
        <SectionContainer id="books" label="books" heightClass="min-h-[85vh] pt-12 pb-24 md:pt-16 md:pb-32">
          <div className="max-w-[900px] w-full mx-auto">
            <CarouselRow>
              {recentBooks.map((post, idx) => (
                <FadeInItem key={post.Slug} delay={idx * 0.15} className="w-[160px] md:w-[200px] shrink-0 group py-6">
                  <Link href={`/books/${post.Slug}`}>
                    <div className="aspect-[2/3] w-full overflow-hidden bg-[#e8e6e2] mb-4 rounded-sm shadow-sm transition-shadow group-hover:shadow-md">
                      {post.CoverImage && (
                        <img src={post.CoverImage} alt={post.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <h3 className="text-[16px] md:text-[18px] font-medium text-black group-hover:text-[#b83143] transition-colors line-clamp-1">
                      {post.Title}
                    </h3>
                    {post.Description && (
                      <p className="mt-1 text-[13px] text-[#6b6b6b] italic line-clamp-1">
                        {post.Description}
                      </p>
                    )}
                  </Link>
                </FadeInItem>
              ))}
            </CarouselRow>
            <FadeInItem delay={0.4} className="flex justify-start pt-4">
              <Link href="/books" className="text-[#6b6b6b] hover:text-[#b83143] italic transition-colors text-sm font-medium flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Florals Section */}
        <SectionContainer id="florals" label="florals" heightClass="min-h-[85vh] pt-8 pb-16 md:pt-12 md:pb-32">
          <div className="max-w-[950px] w-full mx-auto">
            <CarouselRow>
              {recentFlorals.map((imgUrl, idx) => (
                <FadeInItem key={idx} delay={idx * 0.15} className="w-[240px] md:w-[320px] shrink-0 aspect-square bg-[#e8e6e2] rounded-sm overflow-hidden shadow-sm">
                  <img 
                    src={imgUrl} 
                    alt={`Floral art ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </FadeInItem>
              ))}
            </CarouselRow>
            <FadeInItem delay={0.4} className="flex justify-start pt-6">
              <Link href="/florals" className="text-[#6b6b6b] hover:text-[#b83143] italic transition-colors text-sm flex items-center gap-1 group">
                more <span className="text-[#b83143] not-italic">→</span>
              </Link>
            </FadeInItem>
          </div>
        </SectionContainer>

        {/* Decorative Footer */}
        <SectionContainer id="footer" label="" heightClass="min-h-[80vh] py-16 md:py-24">
          <div className="max-w-[640px] w-full mx-auto flex flex-col items-center">
            {/* Red Lotus Painting */}
            <FadeInItem className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[500px] flex flex-col items-center mb-10">
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-sm">
                <img src="/red-lotus.png" alt="red lotus painting" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-center text-[13px] md:text-[14px] text-[#6b6b6b] tracking-[0.04em] font-serif">
                red lotus (1943) by 張大千
              </p>
            </FadeInItem>

            {/* Quote + Paragraph */}
            <div className="space-y-12 w-full text-center">
              <FadeInItem delay={0.2} className="text-center max-w-[95%] md:max-w-[700px] mx-auto">
                <p className="italic text-[18px] md:text-[clamp(20px,2vw,24px)] text-[#b83143] tracking-[0.04em] leading-[1.8] lowercase text-balance">
                  "i love the lotus, for it rises from the mud unstained, <br className="hidden xl:block md:hidden" /> cleansed in rippling water, <br className="md:hidden" /> appealing, yet not seductive."
                </p>
                <p className="text-[13px] md:text-[14px] text-black tracking-[0.04em] leading-[2] lowercase mt-3 opacity-60">
                  — 周敦颐, on the love of the lotus, 1073
                </p>
              </FadeInItem>

              <FadeInItem delay={0.4} className="text-[16px] md:text-[clamp(16px,1.4vw,20px)] text-black leading-relaxed max-w-[95%] md:max-w-[950px] mx-auto px-4 md:px-0">
                <p className="lowercase text-center">
                  I love the cultural meaning of the lotus as a symbol of the process. I've grown <br className="hidden md:inline" />
                  to appreciate the constraints and complexities of the mud for the beautiful <br className="hidden md:inline" />
                  bloom. This philosophy shapes how I approach design and everything else.
                </p>
              </FadeInItem>
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}

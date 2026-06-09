import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "All In Lid Team",
    role: "Shopify Store Owners",
    text: "Praise has been an absolute game changer for All In Lid. He completely revamped our Shopify store, launched our beanie product line, built smart cart upsells to push AOV, and set up our entire Klaviyo infrastructure from scratch — abandoned cart flows, welcome sequences, back-in-stock automations, a new drop campaign, and email capture popups. He also handled our SEO, Google Search Console, JudgeMe review integration, and tiered discount architecture. Professional, proactive, and always one step ahead of what we need.",
    initials: "AIL",
  },
  {
    name: "Oluwadamilola",
    role: "Fullstack Developer / Project Lead",
    text: "Praise joined the Eau Deals project as our frontend engineer and quickly got up to speed on a React Vite codebase that wasn't the cleanest. He refactored the code structure, built the user dashboard, and integrated our backend REST API endpoints across the entire frontend. He also delivered the frontend for Cost to Baby — connecting new API endpoints, fixing the UI, and sending detailed progress reports throughout. He's communicative, technical, and genuinely committed to getting things done right.",
    initials: "OD",
  },
  {
    name: "Faith Olusakin",
    role: "Shopify Expert & Freelancer",
    text: "Praise has been an incredible asset across multiple projects. He built and maintained the Rhema Christian Church website from the ground up — handling sermon uploads, event pages, a full branches directory, ministry sections, and ongoing content updates. He also worked on several of my client stores: Roros, Ruens, Ohm Med Spa (Prestige theme), and the Okahisi fashion store. On top of all that, he built my personal developer portfolio from scratch in under 24 hours. He's fast, reliable, and genuinely cares about the quality of his output. I'd recommend him without hesitation.",
    initials: "FO",
  },
  {
    name: "Oluwaseyi",
    role: "Shopify Agency Owner",
    text: "Praise has helped me deliver multiple Shopify stores for my clients over the months. From the Happy Brand lifestyle marketplace with 17 product categories and neon custom styling, to Ryuu Gear — a martial arts supply store complete with logo design and SaleHoo dropshipping setup — to Golden Green Boutique, a women's fashion store with sorority shop dropdowns, Instagram feed integration, custom typography and the Dawn theme. He handles everything fast and communicates well even under tight deadlines. Solid developer to have on your team.",
    initials: "OS",
  },
];

const HOLD_MS = 9000;

const TestimonialCard = ({ item }) => (
  <div className="w-full flex-shrink-0 px-1">
    <div className="border border-architectural p-5 md:p-8 bg-brand-bg min-h-[280px] md:min-h-[320px] flex flex-col justify-between">
      <p className="font-body text-sm md:text-base text-brand-navy italic leading-relaxed mb-6">
        &ldquo;{item.text}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-navy flex items-center justify-center rounded-full text-brand-bg font-display font-semibold text-xs md:text-sm shrink-0">
          {item.initials}
        </div>
        <div>
          <p className="font-body font-semibold text-sm text-brand-navy">
            {item.name}
          </p>
          <p className="font-body text-xs text-accent uppercase tracking-wider">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const total = testimonials.length;

  const goTo = useCallback(
    (index) => {
      setIsTransitioning(true);
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, HOLD_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  return (
    <section
      id="testimonials"
      className="mb-20 md:mb-32 py-8 md:py-12 border-y border-architectural"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), HOLD_MS)}
    >
      <h2 className="font-display text-xl md:text-[32px] font-bold text-brand-navy mb-8 md:mb-12 text-center px-4">
        Client Endorsements
      </h2>

      <div className="relative max-w-3xl mx-auto px-4 md:px-8">
        <div className="overflow-hidden">
          <div
            className="flex testimonial-track"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: isTransitioning
                ? "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            onTransitionEnd={() => setIsTransitioning(true)}
          >
            {testimonials.map((item) => (
              <TestimonialCard key={item.initials} item={item} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 md:w-11 md:h-11 border border-architectural flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-7 bg-brand-navy"
                    : "w-2 bg-brand-accent/50 hover:bg-brand-accent"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 md:w-11 md:h-11 border border-architectural flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center font-body text-[10px] md:text-xs text-accent mt-4 tracking-wider transition-opacity duration-300">
          {activeIndex + 1} of {total}
        </p>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiDoubleQuotesR } from "react-icons/ri";

const testimonials = [
  {
    name: "All in Lid Team",
    role: "All In Lid Founder",
    project: "Shopify Store Ecom Optimization",
    rating: 5.0,
    text: "Working with Praise on the All in Lid store was a solid experience. He came in, did a full audit of the site before even starting, and put together a clear strategy doc so we were always on the same page. He understood what I needed, conversion focused with higher AOV, better Klaviyo flows, upsells, trust builders, the works. He worked on a duplicate theme so the live store never went down while ads were still running, which was huge for me. Anytime I had an idea he integrated it without hesitation and communicated every step of the way. If you need a Shopify dev who actually understands ecom and not just how to push buttons on a theme, Praise is your guy. 5 stars.",
    initials: "AL",
    tag: "Shopify / E-commerce",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Faith Olusakin",
    role: "Shopify Expert",
    project: "Church & Portfolio Websites",
    rating: 5.0,
    text: "Praise is genuinely one of the most hardworking and talented people I know. I've watched him grow right in front of me and the growth has been exceptional. He built our church website from scratch, handled every update I threw at him — no matter how last minute — and even surprised me with a personal portfolio website as a birthday gift without me asking. He works late nights, he communicates, and he never gives up even when things get complicated. I'm not just saying this because I know him personally. I'm saying it because I've seen the quality of his work firsthand across multiple projects. If you need someone who will genuinely care about your project and deliver, Praise is your person. I would recommend him to anyone without hesitation. 10/10 🤍",
    initials: "FO",
    tag: "Custom Web / React",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    name: "Oluwadamilola Salako",
    role: "Backend Developer",
    project: "Eau Deals & Cost to Baby",
    rating: 5.0,
    text: "I've worked with Praise across multiple projects now — Eau Deals, and Cost to Baby and he's been solid every single time. He jumps into codebases that aren't always clean, figures things out fast, and delivers. For Cost to Baby he was connecting to live API endpoints, sending detailed reports, and making sure the UI matched exactly what was needed. He communicates well, gives updates without you having to chase him, and when he can't make a call he'll send a loom video instead so you're never left in the dark. Balancing school and projects at the same time and still showing up the way he does says a lot. Easy to work with, genuinely skilled. 5 stars from me bruv 🔥",
    initials: "OS",
    tag: "Fullstack / API Integration",
    gradient: "from-amber-500 to-rose-600",
  },
];

const TOTAL = testimonials.length;

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(TOTAL);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const touchStartX = useRef(null);
  const trackRef = useRef(null);

  // Measure the actual rendered container width — no window.innerWidth guesses
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = containerWidth < 640;

  // Active card = 82% of container on mobile, fixed 540px on desktop
  const cardWidth = containerWidth
    ? isMobile
      ? containerWidth * 0.82
      : Math.min(containerWidth * 0.6, 540)
    : 300;
  const gap = isMobile ? 14 : 24;

  const items = [...testimonials, ...testimonials, ...testimonials];

  const next = useCallback(() => {
    setTransitionEnabled(true);
    setActiveIndex((p) => p + 1);
  }, []);

  const prev = useCallback(() => {
    setTransitionEnabled(true);
    setActiveIndex((p) => p - 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, isPaused]);

  // Seamless infinite snap
  useEffect(() => {
    if (activeIndex === items.length - TOTAL) {
      const t = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(TOTAL);
      }, 700);
      return () => clearTimeout(t);
    }
    if (activeIndex === TOTAL - 1) {
      const t = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(items.length - TOTAL - 1);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [activeIndex, items.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchStartX.current = null;
    setTimeout(() => setIsPaused(false), 1000);
  };

  const dotIndex = (((activeIndex - TOTAL) % TOTAL) + TOTAL) % TOTAL;

  // ── The key fix ──────────────────────────────────────────────────────────────
  // Instead of "calc(50% - index*cardWidth - ...)" which breaks on mobile,
  // we compute a px offset directly from the measured container width.
  // The active card's left edge should be at: (containerWidth - cardWidth) / 2
  // Each card occupies (cardWidth + gap). So we shift left by activeIndex steps.
  const offset =
    containerWidth > 0
      ? (containerWidth - cardWidth) / 2 - activeIndex * (cardWidth + gap)
      : 0;

  return (
    <section
      id="reviews"
      className="relative py-16 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative rings */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-amber-400/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-indigo-500/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="text-center px-6 relative z-10 mb-10 md:mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-bold text-amber-400 tracking-widest uppercase mb-4">
          ★ Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          What Partners &amp; Clients{" "}
          <span className="text-amber-400">Say!</span>
        </h2>
        <p className="text-slate-400 mx-auto text-sm md:text-base font-normal max-w-lg leading-relaxed">
          Real feedback from founders, teammates, and clients on communication,
          Shopify excellence, and reliable full-stack delivery.
        </p>
      </div>

      {/* Carousel — ref here so ResizeObserver measures the real width */}
      <div
        ref={trackRef}
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex items-start"
          style={{
            transform: `translateX(${offset}px)`,
            transition: transitionEnabled
              ? "transform 700ms cubic-bezier(0.25,1,0.5,1)"
              : "none",
          }}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`flex-shrink-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? "scale-100 opacity-100 z-10"
                    : "scale-[0.88] opacity-30 blur-[1.5px] z-0"
                }`}
                style={{
                  width: `${cardWidth}px`,
                  marginRight: `${gap}px`,
                }}
              >
                <div
                  className={`rounded-2xl md:rounded-3xl p-5 md:p-8 relative overflow-hidden transition-colors duration-500 ${
                    isActive
                      ? "bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl"
                      : "bg-white/[0.04] border border-white/10"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400/90 via-amber-400/30 to-transparent" />
                  )}

                  <RiDoubleQuotesR className="absolute right-4 top-4 text-6xl md:text-8xl text-white/[0.05] pointer-events-none" />

                  {/* Profile */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-11 h-11 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-sm md:text-base text-white leading-tight truncate">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Tag + stars */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-indigo-500/10 text-indigo-300 text-[10px] font-bold rounded-lg border border-indigo-500/20 tracking-wide">
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={10} className="text-amber-400" />
                      ))}
                      <span className="text-slate-300 font-bold text-xs ml-0.5">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.07] mb-4" />

                  {/* Full text — no fixed height, no inner scroll */}
                  <p className="text-slate-300 leading-relaxed text-xs md:text-sm font-normal">
                    {item.text}
                  </p>

                  <p className="text-right text-[10px] text-slate-600 font-medium mt-3 tracking-wide">
                    {item.project}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots + nav */}
      <div className="flex flex-col items-center gap-4 mt-8 relative z-10">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setTransitionEnabled(true);
                setActiveIndex(TOTAL + i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === dotIndex
                  ? "w-7 bg-amber-400"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-11 h-11 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-all border border-slate-700 active:scale-95 shadow-lg"
          >
            <FaChevronLeft size={14} />
          </button>
          <span className="text-xs text-slate-500 font-medium tabular-nums w-10 text-center">
            {dotIndex + 1} / {TOTAL}
          </span>
          <button
            onClick={next}
            aria-label="Next"
            className="w-11 h-11 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center justify-center shadow-xl transition-all active:scale-95 hover:scale-105"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      <p className="text-center text-[11px] text-slate-700 mt-5 relative z-10 tracking-wide">
        ●&nbsp;&nbsp;Verified client reviews&nbsp;&nbsp;●
      </p>
    </section>
  );
};

export default Testimonials;

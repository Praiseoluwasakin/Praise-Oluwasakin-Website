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

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // 'left' | 'right'
  const touchStartX = useRef(null);
  const total = testimonials.length;

  const goTo = useCallback(
    (index, dir) => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setActive((index + total) % total);
        setIsAnimating(false);
      }, 380);
    },
    [isAnimating, total],
  );

  const next = useCallback(() => goTo(active + 1, "left"), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, "right"), [active, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const t = testimonials[active];

  const slideClass = isAnimating
    ? direction === "left"
      ? "opacity-0 -translate-x-6"
      : "opacity-0 translate-x-6"
    : "opacity-100 translate-x-0";

  return (
    <section
      id="reviews"
      className="relative py-20 md:py-28 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full border border-amber-400/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full border border-indigo-500/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/10 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center px-6 relative z-10 mb-12 md:mb-16">
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

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mb-8 relative z-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? "left" : "right")}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? "w-8 bg-amber-400"
                : "w-2 bg-slate-600 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className="relative z-10 px-5 md:px-8 max-w-2xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`transition-all duration-[380ms] ease-out ${slideClass}`}
        >
          <div className="rounded-2xl md:rounded-3xl bg-white/[0.06] border border-white/10 backdrop-blur-sm p-6 md:p-10 relative overflow-hidden">
            {/* Gold top strip */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400/80 via-amber-400/20 to-transparent" />

            {/* Big quote icon */}
            <RiDoubleQuotesR className="absolute right-5 top-5 md:right-8 md:top-8 text-6xl md:text-8xl text-white/[0.04] pointer-events-none" />

            {/* Profile row */}
            <div className="flex items-center gap-3 md:gap-4 mb-5">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-extrabold text-base md:text-lg shadow-lg`}
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm md:text-base text-white leading-tight truncate">
                  {t.name}
                </h3>
                <p className="text-[11px] md:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>

            {/* Tag + stars */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center px-3 py-1 bg-indigo-500/10 text-indigo-300 text-[10px] md:text-xs font-bold rounded-lg border border-indigo-500/20 tracking-wide">
                {t.tag}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={11} />
                  ))}
                </div>
                <span className="text-slate-300 font-bold text-xs">
                  {t.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.06] mb-5" />

            {/* Full review — no fixed height, no inner scroll */}
            <p className="text-slate-300 leading-relaxed text-sm md:text-[15px] font-normal">
              {t.text}
            </p>

            {/* Project tag bottom right */}
            <p className="text-right text-[10px] text-slate-600 font-medium mt-4 tracking-wide">
              {t.project}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center items-center gap-4 mt-8 relative z-10">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-all border border-slate-700 active:scale-95 shadow-lg"
        >
          <FaChevronLeft size={15} />
        </button>

        <span className="text-xs text-slate-500 font-medium tabular-nums w-10 text-center">
          {active + 1} / {total}
        </span>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center justify-center shadow-xl transition-all active:scale-95 hover:scale-105"
        >
          <FaChevronRight size={15} />
        </button>
      </div>

      {/* Trust line */}
      <p className="text-center text-[11px] text-slate-600 mt-6 relative z-10 tracking-wide">
        ● &nbsp;Verified client reviews&nbsp; ●
      </p>
    </section>
  );
};

export default Testimonials;

import React, { useState, useEffect, useCallback } from "react";
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
  const items = [...testimonials, ...testimonials, ...testimonials];
  const [activeIndex, setActiveIndex] = useState(testimonials.length);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(700);

  // Track window width for perfect responsiveness
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic dimensions based on viewport
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const cardWidth = isMobile ? windowWidth * 0.85 : isTablet ? 500 : 550;
  const gap = isMobile ? 15 : 30;

  const next = useCallback(() => {
    setTransitionDuration(700);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const prev = () => {
    setTransitionDuration(700);
    setActiveIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => next(), 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  // Seamless snap transitions back to clone anchors
  useEffect(() => {
    if (activeIndex === items.length - testimonials.length) {
      const snapTimer = setTimeout(() => {
        setTransitionDuration(0);
        setActiveIndex(testimonials.length);
      }, 700); // Wait for current slide transition to finish
      return () => clearTimeout(snapTimer);
    }
    if (activeIndex === testimonials.length - 1) {
      const snapTimer = setTimeout(() => {
        setTransitionDuration(0);
        setActiveIndex(items.length - testimonials.length - 1);
      }, 700); // Wait for current slide transition to finish
      return () => clearTimeout(snapTimer);
    }
  }, [activeIndex, items.length]);

  return (
    <section
      id="reviews"
      className="relative py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* --- DECORATIVE TOP CORNER SHAPES --- */}
      <div className="absolute top-[-20px] left-[-20px] w-32 h-32 md:w-48 md:h-48 opacity-40 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path
            d="M20 40C60 10 120 30 50 80C20 110 150 140 180 60"
            stroke="#6366f1"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M40 20C80 50 30 100 100 90"
            stroke="#a5b4fc"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="absolute top-4 right-4 w-24 h-24 md:w-40 md:h-40 opacity-30 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path
            d="M100 100C140 20 190 80 160 120C120 180 40 150 60 80C80 20 160 40 140 100"
            stroke="#fbbf24"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* HEADER */}
      <div className="text-center px-4 relative z-10 mb-8 md:mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-sm font-semibold text-indigo-300 tracking-wider mb-3">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 tracking-tight">
          What Partners & Clients <span className="text-amber-400">Say!</span>
        </h2>
        <p className="text-slate-300 px-4 mx-auto text-sm md:text-base font-normal max-w-xl">
          Real feedback from founders, teammates, and clients on communication,
          Shopify excellence, and reliable full-stack delivery.
        </p>
      </div>

      {/* CAROUSEL TRACK */}
      <div className="relative w-full h-[380px] md:h-[430px] flex items-center justify-center">
        <div
          className="flex"
          style={{
            transform: `translateX(calc(50% - (${activeIndex} * ${cardWidth}px) - (${cardWidth / 2}px) - (${activeIndex} * ${gap}px)))`,
            transition:
              transitionDuration > 0
                ? `transform ${transitionDuration}ms ease-[cubic-bezier(0.25,1,0.5,1)]`
                : "none",
          }}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                style={{ width: `${cardWidth}px`, marginRight: `${gap}px` }}
                className={`flex-shrink-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? "scale-100 opacity-100 z-10 blur-0"
                    : "scale-[0.85] md:scale-90 opacity-40 blur-[1px] z-0"
                }`}
              >
                <div
                  className={`rounded-[20px] md:rounded-[24px] p-6 md:p-8 h-[290px] md:h-[330px] relative shadow-2xl flex flex-col justify-between transition-colors duration-500 ${
                    isActive
                      ? "bg-white/10 border border-white/20 backdrop-blur-md"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <RiDoubleQuotesR className="absolute right-4 md:right-8 top-6 md:top-10 text-7xl md:text-[100px] text-white/5 pointer-events-none" />

                  {/* Header info: Avatar initials, Name and Role */}
                  <div>
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-5">
                      <div
                        className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-extrabold text-lg md:text-xl shadow-md`}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm md:text-lg tracking-tight text-white flex items-center gap-1.5">
                          {item.name}
                        </h3>
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wide uppercase">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    {/* Tag details & Star Rating */}
                    <div className="flex flex-wrap items-center gap-2.5 md:gap-4 mb-3 md:mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-indigo-500/10 text-indigo-300 text-[10px] md:text-xs font-bold rounded-lg border border-indigo-500/20">
                        {item.tag}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-400 text-xs md:text-sm gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <span className="font-extrabold text-xs md:text-sm text-slate-300">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-200 leading-relaxed text-xs md:text-sm font-medium pr-2 overflow-y-auto h-[120px] md:h-[140px] scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex justify-center gap-4 md:gap-8 mt-2 md:mt-5 relative z-10">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-all shadow-lg border border-slate-700 active:scale-95"
        >
          <FaChevronLeft size={isMobile ? 18 : 24} />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        >
          <FaChevronRight size={isMobile ? 18 : 24} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;

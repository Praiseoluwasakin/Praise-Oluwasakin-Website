import React, { useRef, useState, useEffect } from "react";
import { Star, ShieldCheck, Heart, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

const reviewsData = [
  {
    name: "All in Lid Team",
    role: "E-commerce Founder",
    project: "Shopify Store Ecom Optimization",
    rating: 5.0,
    text: "Working with Praise on the All in Lid store was a solid experience. He came in, did a full audit of the site before even starting, and put together a clear strategy doc so we were always on the same page. He understood what I needed, conversion focused with higher AOV, better Klaviyo flows, upsells, trust builders, the works. He worked on a duplicate theme so the live store never went down while ads were still running, which was huge for me. Anytime I had an idea he integrated it without hesitation and communicated every step of the way. If you need a Shopify dev who actually understands ecom and not just how to push buttons on a theme, Praise is your guy. 5 stars.",
    initials: "AL",
    tag: "Shopify / E-commerce",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Faith Olusakin",
    role: "Lead Program Coordinator",
    project: "Church & Portfolio Websites",
    rating: 5.0,
    text: "Praise is genuinely one of the most hardworking and talented people I know. I've watched him grow right in front of me and the growth has been exceptional. He built our church website from scratch, handled every update I threw at him — no matter how last minute — and even surprised me with a personal portfolio website as a birthday gift without me asking. He works late nights, he communicates, and he never gives up even when things get complicated. I'm not just saying this because I know him personally. I'm saying it because I've seen the quality of his work firsthand across multiple projects. If you need someone who will genuinely care about your project and deliver, Praise is your person. I would recommend him to anyone without hesitation. 10/10 🤍",
    initials: "FO",
    tag: "Custom Web / React",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    name: "Oluwadamilola Salako",
    role: "Product Lead",
    project: "Eau Deals & Cost to Baby",
    rating: 5.0,
    text: "I've worked with Praise across multiple projects now — Eau Deals, and Cost to Baby and he's been solid every single time. He jumps into codebases that aren't always clean, figures things out fast, and delivers. For Cost to Baby he was connecting to live API endpoints, sending detailed reports, and making sure the UI matched exactly what was needed. He communicates well, gives updates without you having to chase him, and when he can't make a call he'll send a loom video instead so you're never left in the dark. Balancing school and projects at the same time and still showing up the way he does says a lot. Easy to work with, genuinely skilled. 5 stars from me bruv 🔥",
    initials: "OS",
    tag: "Fullstack / API Integration",
    gradient: "from-amber-500 to-rose-600",
  }
];

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll positions to show/hide horizontal slider navigation on mobile/tablet
  const checkScrollLimits = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollLimits, { passive: true });
      // Initial check
      checkScrollLimits();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollLimits);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 320;
      scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 320;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
    }
  };

  return (
    <section id="reviews" className="bg-slate-50 py-20 relative overflow-hidden">
      {/* Self-contained styling to hide scrollbars while preserving snap gestures */}
      <style>{`
        .reviews-scroll::-webkit-scrollbar {
          display: none;
        }
        .reviews-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-amber-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 tracking-wider">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 flex items-center justify-center gap-3">
            What Partners & Clients Say <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse-subtle" />
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Real feedback from founders, teammates, and clients on communication, Shopify excellence, and reliable full-stack delivery.
          </p>
        </div>

        {/* Scroll Control Arrows for mobile and tablet touch guidance */}
        <div className="flex md:hidden justify-end gap-3 mb-4 pr-1">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-md ${
              canScrollLeft 
                ? "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 active:scale-95" 
                : "bg-slate-100/50 border-slate-100 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-md ${
              canScrollRight 
                ? "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 active:scale-95" 
                : "bg-slate-100/50 border-slate-100 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Reviews Grid & Swipe Scroller */}
        <div
          ref={scrollRef}
          className="reviews-scroll flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-6 md:pb-0 scroll-smooth px-1 md:px-0"
        >
          {reviewsData.map((item, index) => (
            <article
              key={index}
              className="group relative bg-white/80 backdrop-blur-md border border-slate-200/70 rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden snap-center min-w-[290px] sm:min-w-[340px] md:min-w-0 flex-shrink-0"
            >
              {/* Subtle top indicator with card gradient color */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient}`} />
              
              {/* Card interactive backdrop glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/50 via-indigo-50/5 to-amber-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

              <div>
                {/* Header info (Avatar and Initials) */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-100 group-hover:scale-[1.05] transition-transform duration-300`}>
                    {item.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-900 transition-colors duration-300 flex items-center gap-1.5">
                      {item.name}
                      <ShieldCheck className="w-4 h-4 text-indigo-600 fill-indigo-100" title="Verified Client" />
                    </h3>
                    <p className="text-xs font-bold text-slate-500 tracking-wide uppercase">{item.role}</p>
                  </div>
                </div>

                {/* Subtag detailing the work completed */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50/80 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100/60 transition-colors group-hover:bg-indigo-100/70">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    {item.tag}
                  </span>
                </div>

                {/* Star rating display */}
                <div className="flex items-center gap-2 mt-4 mb-5">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-slate-700 leading-relaxed text-[15px] font-medium pr-2 whitespace-pre-line">
                  "{item.text}"
                </p>
              </div>

              {/* Elegant Backdrop Quote Symbol */}
              <div className="absolute right-6 bottom-4 text-slate-100/80 select-none pointer-events-none -z-20 font-serif text-9xl opacity-60 group-hover:text-indigo-50/60 group-hover:scale-110 transition-all duration-500">
                ”
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

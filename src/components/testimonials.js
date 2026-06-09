import React from "react";

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

const TestimonialCard = ({ item }) => (
  <div className="w-[min(400px,85vw)] flex-shrink-0 border border-architectural p-8 bg-brand-bg">
    <p className="font-body text-base text-brand-navy italic mb-6 leading-relaxed">
      &ldquo;{item.text}&rdquo;
    </p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-brand-navy flex items-center justify-center rounded-full text-brand-bg font-display font-semibold text-sm">
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
);

const Testimonials = () => {
  const items = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="mb-32 overflow-hidden py-12 border-y border-architectural"
    >
      <h2 className="font-display text-2xl md:text-[32px] font-bold text-brand-navy mb-12 text-center">
        Client Endorsements
      </h2>
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="carousel-track gap-8 px-4">
          {items.map((item, i) => (
            <TestimonialCard key={`${item.initials}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

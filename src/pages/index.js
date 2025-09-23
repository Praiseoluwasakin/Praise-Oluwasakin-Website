"use client";
import { Analytics } from "@vercel/analytics/next";
import { app, analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import Link from "next/link";
import Head from "next/head";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { FaXTwitter } from "react-icons/fa6";

import { NextSeo } from "next-seo";

import {
  Menu,
  X,
  Download,
  Code,
  Palette,
  Zap,
  RefreshCw,
  ArrowRight,
  Wind,
  Brush,
  ShoppingCart,
  Users,
  Lightbulb,
  Clock,
  Smartphone,
  Globe,
  MessageCircle,
  MessageSquare,
  Instagram,
  Linkedin,
  Github,
  ExternalLink,
  Sparkles,
  Check,
} from "lucide-react";

export const metadata = {
  title: "Praise Oluwasakin | Frontend & Shopify Developer",
  description:
    "Praise Oluwasakin is a frontend and Shopify developer specializing in modern, scalable web solutions. Open to freelance and contract projects in React, Next.js, and Shopify. Get in touch today.",
  keywords: [
    "Praise Oluwasakin",
    "Frontend Developer",
    "Shopify Developer",
    "React Developer",
    "Next.js Developer",
    "Freelance Developer",
    "Web Development",
    "Nigeria Developer",
    "Remote Web Developer",
    "E-commerce Developer",
    "Freelance Shopify Expert",
    "Hire React Developer",
    "Custom Shopify Themes",
    "Next.js Freelance Developer",
    "Frontend Engineer",
    "JavaScript Developer",
    "Modern Web Design",
    "Fullstack Web Developer",
    "Freelance Web Designer",
    "SEO Friendly Websites",
    "UI/UX Developer",
    "Hire Frontend Developer Nigeria",
    "Shopify Store Setup",
    "Shopify Customization",
    "Portfolio Website Developer",
  ],
  authors: [
    {
      name: "Praise Oluwasakin",
      url: "https://praise-oluwasakin-website.vercel.app/",
    },
  ],
  openGraph: {
    title: "Praise Oluwasakin | Frontend & Shopify Developer",
    description:
      "Frontend & Shopify developer building scalable, modern, and SEO-friendly web solutions. Available for freelance and contract work.",
    url: "https://praise-oluwasakin-website.vercel.app/",
    siteName: "Praise Oluwasakin Portfolio",
    images: [
      {
        url: "/profile.webp", // Replace with your real image in /public
        width: 1200,
        height: 630,
        alt: "Praise Oluwasakin Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Praise Oluwasakin | Frontend & Shopify Developer",
    description:
      "Frontend & Shopify developer building scalable, modern, and SEO-friendly web solutions. Available for freelance and contract work.",
    images: ["/profile.webp"],
    creator: "@mayorcodes",
  },
  icons: {
    icon: "/profile.webp",
  },
};

export default function PraisePortfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef({});

  // inside PraisePortfolio component

  const allProjects = [
    {
      title: "Wancemo Startup Website",
      desc: "A modern startup website built with Next.js, Tailwind CSS, and Azure integration. Designed for scalability and smooth performance, the site delivers a professional online presence with responsive layouts, optimized loading, and a clean UI tailored for growth-focused businesses.",
      tags: ["Next.js", "Tailwind CSS", "Azure"],
      url: "https://www.wancemo.co.za/",
      media: "/wancemo.png",
      Icon: Smartphone,
    },
    {
      title: "Modern-Mensch Shopify Store",
      desc: "A sleek and conversion-optimized Shopify storefront featuring engaging visuals, interactive navigation, and custom Liquid theme development. My work focused on streamlining the shopping experience, implementing reusable components, and ensuring fast-loading performance across devices.",
      tags: ["Shopify", "Liquid", "React"],
      url: "https://www.modern-mensch.com/",
      media: "/modern-mensch.png",
      Icon: ShoppingCart,
    },
    {
      title: "Tbells 4 Fresh Shopify Store",
      desc: "A scalable Shopify storefront built for a fresh foods brand, featuring custom theme development, optimized product pages, and streamlined checkout flows. The site is designed with a mobile-first approach and SEO-friendly content to support both brand storytelling and customer conversions.",
      tags: ["Shopify", "Liquid", "Custom Themes"],
      url: "https://www.tbells4freshkitchen.com/",
      media: "/tbells.png",
      Icon: ShoppingCart,
    },
    {
      title: "Xpense Project",
      desc: "A finance tracking app built with React and Next.js, focused on clean design and responsive layouts. The dashboard enables users to manage expenses with ease, featuring interactive UI components, real-time updates, and a scalable front-end architecture.",
      tags: ["React", "Next.js", "Tailwind"],
      url: null,
      media: "/xpense.png",
      Icon: Globe,
    },
    {
      title: "My Portfolio Website",
      desc: "A fully responsive personal portfolio built with Next.js and Tailwind CSS, showcasing my skills, experience, and projects. Optimized for performance and SEO, the site includes smooth animations, reusable components, and a clean structure designed to attract potential clients and employers.",
      tags: ["Next.js", "Tailwind CSS"],
      url: "https://praise-oluwasakin-website.vercel.app/",
      media: "/portfolio.png",
      Icon: Globe,
    },
    {
      title: "Chamak Society Shopify Store",
      desc: "A user-friendly Shopify storefront designed with accessibility and client customization in mind. Built with Liquid and custom CSS, the site delivers a smooth shopping experience with clear navigation, curated collections, and responsive layouts for mobile-first performance.",
      tags: ["Shopify", "Liquid", "CSS"],
      url: null,
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Examplifyam Shopify Store",
      desc: "A professional Shopify e-commerce store developed with pixel-perfect design and optimized for conversions. Leveraging Liquid and Git-based workflows, I delivered a theme that balances modern visuals, fast loading speeds, and an intuitive product browsing experience.",
      tags: ["Shopify", "Liquid", "Git"],
      url: null,
      media: null,
      Icon: ShoppingCart,
    },
    // --- new projects to append to allProjects (do NOT replace existing array) ---
    {
      title: "Change Automotive Group",
      desc: "B2B / B2C automotive parts storefront with a broad product catalogue and multi-region currency selector. The site focuses on industrial and safety supplies with a checkout-first UX (cart & checkout links prominent), product collections, and quick add interactions. I noted strong product listing and filtering affordances and payment badges (Shop Pay, Apple Pay). This is an e-commerce-first experience that prioritises discoverability of SKUs and a streamlined checkout flow.",
      tags: ["Shopify", "E-commerce", "Product Catalog"],
      url: "https://www.changeautomotive-group.com/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "ÈYÍ DÁRA NATURALS",
      desc: "Skincare / haircare brand storefront built around product storytelling and subscription upsells. The homepage leads with hero merchandising, curated product categories (hair, accessories), subscription/promo blocks and content-driven sections (blog/‘Wellness Notes’) to support conversion and retention. Checkout signals and localized currency UX show a polished merchant setup aimed at DTC growth.",
      tags: ["Shopify", "E-commerce", "Subscriptions"],
      url: "https://www.eyidaranaturals.com/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "King Amajigs",
      desc: "Small e-commerce/music / merch storefront that features product merchandising and artist-brand storytelling. The site combines product galleries with calls-to-action for purchases and likely focuses on quick conversion for a niche audience (fans / buyers). The structure is commerce-forward with product detail emphasis and brand-centric messaging.",
      tags: ["E-commerce", "Merch Store"],
      url: "https://www.kingamajigs.com/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Goshen Garden",
      desc: "Garden / lifestyle brand site using imagery-led product and service pages. The homepage and landing content centre around product categories and service highlights — strong visual hierarchy and clear shop entry points. Great candidate for focused category landing pages and SEO-driven collection content.",
      tags: ["E-commerce", "Content-driven"],
      url: "https://www.goshengarden.com",
      media: null,
      Icon: Globe,
    },
    {
      title: "Atelier Ndigo (Ndigo Studio)",
      desc: "Design and atelier portfolio site that highlights studio services, projects and bespoke product lines. The site reads as a studio-first presence with strong portfolio case study sections and contact/consultation flows for custom work.",
      tags: ["Portfolio", "Studio Website"],
      url: "https://www.ndigo-studio.com",
      media: null,
      Icon: Globe,
    },
    {
      title: "Airofit",
      desc: "Product-focused marketing site for a hardware + app product (breathing trainer). The homepage features product hero, benefits, and likely integrations with product pages and support resources. This is a marketing & product site built to convert interest into product purchases or app installs — good candidate for high-performance static/SSR tech.",
      tags: ["Marketing Site", "Hardware Product"],
      url: "https://airofit.com",
      media: null,
      Icon: Smartphone,
    },
    {
      title: "Yelibana Fashions",
      desc: "Women’s clothing brand site emphasising product categories, editorial imagery and fit guidance. Product pages and category browsing are front-and-centre with clear product CTAs — the UX looks tuned for fashion conversions and discovery.",
      tags: ["E-commerce", "Fashion"],
      url: "http://yelibanafashions.com",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Menopalz",
      desc: "Wellness & community site focused on menopause education and membership offerings. The site combines editorial content, a membership product and shop elements. It’s set up as a DTC experience with online payments and content-to-conversion flows.",
      tags: ["Shopify", "Membership", "Content"],
      url: "https://menopalz.com",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Buy Plotter Supplies",
      desc: "Niche e-commerce store for printing / plotter materials and supplies. The product catalog is the primary focus with clear product cards and quick purchase flows for B2B / trade customers. The UX emphasises SKU details and technical specs.",
      tags: ["E-commerce", "Product Catalog"],
      url: "https://buyplottersupplies.com/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "D. Lee Luxury Home",
      desc: "Home decor & textile storefront with strong product presentation (large imagery, variant options) and service/consultation calls to action. The site pairs merchandising with designer consult flows — a hybrid commerce + service experience.",
      tags: ["Propel Commerce", "E-commerce", "Interiors"],
      url: "https://dleeluxuryhome.com/",
      media: null,
      Icon: Globe,
    },
    {
      title: "Leanne Marchand Studio",
      desc: "Interior design portfolio and services site focused on lead generation and visual case studies. The site highlights project galleries, service descriptions and contact forms for consultations — built to showcase finished work and convert design inquiries.",
      tags: ["Portfolio", "Lead Generation"],
      url: "https://www.leannemarchandstudio.com/",
      media: null,
      Icon: Globe,
    },
    {
      title: "Pineapple Phones",
      desc: "Consumer electronics / accessories storefront with clear product merchandising and category browsing. The site is focused on product discovery and quick access to product pages and support resources.",
      tags: ["E-commerce", "Product Site"],
      url: "https://pineapplephones.com/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Benard Fitness",
      desc: "Fitness equipment and accessories shop with product grouping for calisthenics and training gear. The UX emphasises product specs, customer reviews and product imagery to drive purchase confidence for fitness shoppers.",
      tags: ["E-commerce", "Fitness"],
      url: "https://benardfitness.com/",
      media: null,
      Icon: Globe,
    },
    {
      title: "Urban Apparel",
      desc: "Apparel brand storefront likely serving niche fashion audiences — product-led pages, lookbook visuals and direct-to-consumer CTA. Good candidate for a modular theme that emphasises merchandising and editorial content.",
      tags: ["E-commerce", "Fashion"],
      url: "https://urbanapparel.info/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Booksie — MyBooksieBox",
      desc: "Curated children’s book subscription and e-commerce store focused on African children’s literature. The site is built to combine subscription merchandising with single-product purchases, strong visual product cards, and international shipping options.",
      tags: ["Shopify", "Subscriptions", "E-commerce"],
      url: "https://www.mybooksiebox.com/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Violett USK",
      desc: "Australian fashion / lifestyle storefront with product-led pages and editorial styling — the site focuses on product imagery and category organization for conversion.",
      tags: ["E-commerce", "Fashion"],
      url: "https://violettusk.com.au/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Exemplifyam",
      desc: "An e-commerce / brand storefront (site currently reachable) with product and category content. The merchant experience centres on product merchandising and conversion-focused CTAs.",
      tags: ["E-commerce"],
      url: "https://exemplifyam.com/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Dada Poppins",
      desc: "UK-based online shop for toys / gift products — imagery-led product pages, simple category flows and a checkout-centric UX targeted at gift buyers.",
      tags: ["E-commerce"],
      url: "https://dadapoppins.co.uk/",
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Amin's Cuisine",
      desc: "Local restaurant site with menu promotion, testimonials, and reservation/takeaway flows. The site is configured to take orders / payments and pair menu content with quick CTAs for bookings or pickups.",
      tags: ["Shopify", "Restaurant", "Menu"],
      url: "https://aminscuisine.com",
      media: null,
      Icon: Globe,
    },
    {
      title: "Limon Healing Collection",
      desc: "Wellness & bodycare product storefront showcasing curated product lines with editorial product storytelling and subscription/promotional messaging. The site combines visuals with product detail pages for DTC conversions.",
      tags: ["E-commerce", "Wellness"],
      url: "https://www.limonhealingcollection.com",
      media: null,
      Icon: ShoppingCart,
    },
  ];

  const skills = [
    { Icon: Code, label: "HTML" },
    { Icon: Palette, label: "CSS" },
    { Icon: Zap, label: "JavaScript" },
    { Icon: RefreshCw, label: "React" },
    { Icon: ArrowRight, label: "Next.js" },
    { Icon: Wind, label: "Tailwind" },
    { Icon: Code, label: "Git" },
    { Icon: Github, label: "GitHub" },
    { Icon: Brush, label: "Bootstrap" },
    { Icon: Code, label: "TypeScript" },
    { Icon: ShoppingCart, label: "Liquid" },
  ];
  const [showAll, setShowAll] = useState(false);

  const projectsToShow = showAll ? allProjects : allProjects.slice(0, 6);

  // Define which sections are "light" so header switches to dark-text/white background
  const lightSections = new Set([
    "skills",
    "about",
    "projects",
    "blog",
    "contact",
  ]);
  const headerLight = lightSections.has(active) || (scrolled && active === "");

  useEffect(() => {
    // IntersectionObserver to set active nav link
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => (sectionsRef.current[s.id] = s));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", { page_path: window.location.pathname });
    }
  }, []);
  useEffect(() => {
    // close mobile when resizing to desktop and toggle simple scrolled state
    const onResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const downloadResume = () => {
    // In a real app replace with an actual file URL
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // replace when available
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Helper to compute classes based on header variant and active state
  const navLinkClass = (id) => {
    const isActive = active === id;

    if (headerLight) {
      return `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-[#1e73be] shadow-sm"
          : "text-slate-700 hover:bg-slate-100"
      }`;
    }

    // dark header (hero / gradient) - keep white text with subtle background for active
    return `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? "bg-white/60 text-[#1e73be] shadow-md"
        : "text-white hover:bg-white/8"
    }`;
  };

  return (
    <>
      {/* Per-page SEO (NextSeo) */}
      <NextSeo
        title="Praise Oluwasakin | Frontend & Shopify Developer"
        description="Frontend Developer & Shopify Expert — building clean, responsive, and conversion-focused eCommerce and web experiences with React, Next.js, TailwindCSS, and Shopify Liquid."
        canonical="https://praise-oluwasakin-website.vercel.app/"
        openGraph={{
          url: "https://praise-oluwasakin-website.vercel.app/",
          title: "Praise Oluwasakin | Frontend & Shopify Developer",
          description:
            "Frontend Developer & Shopify Expert — building clean, responsive, and conversion-focused eCommerce and web experiences with React, Next.js, TailwindCSS, and Shopify Liquid.",
          images: [
            {
              url: "https://praise-oluwasakin-website.vercel.app/profile.webp",
              width: 1200,
              height: 630,
              alt: "Praise Oluwasakin Portfolio",
            },
          ],
          site_name: "Praise Oluwasakin Portfolio",
        }}
        twitter={{
          handle: "@mayorcodes",
          site: "@mayorcodes",
          cardType: "summary_large_image",
        }}
      />

      <Head>
        <title>Praise Oluwasakin | Frontend & Shopify Developer</title>
        <meta
          name="description"
          content="Praise Oluwasakin is a frontend and Shopify developer specializing in modern, scalable web solutions."
        />
        <meta
          name="keywords"
          content="Frontend Developer, Shopify Developer, React Developer, Next.js, Freelance Developer"
        />
        <meta
          property="og:title"
          content="Praise Oluwasakin | Frontend & Shopify Developer"
        />
        <meta
          property="og:description"
          content="Frontend & Shopify developer building scalable, modern, and SEO-friendly web solutions."
        />
        <meta
          property="og:url"
          content="https://praise-oluwasakin-website.vercel.app/"
        />
        <meta property="og:image" content="/profile.webp" />
        <meta name="twitter:creator" content="@mayorcodes" />
      </Head>

      <div className="min-h-screen bg-[#1e73be] bg-[url('/background.jpeg')] bg-cover bg-center font-sans text-gray-800">
        <Analytics />
        {/* Custom small utility styles that are easier to manage here */}
        <style>{`
        @keyframes floatY { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        .floatY { animation: floatY 4s ease-in-out infinite }
      `}</style>

        {/* NAV */}
        <header
          className={`fixed inset-x-0 top-4 z-50 px-4 transition-all duration-300 ease-in-out ${
            headerLight
              ? "mx-auto max-w-6xl bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl shadow"
              : "mx-auto max-w-6xl bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg"
          }`}
          aria-label="Primary navigation"
        >
          <div className="flex items-center justify-between gap-6 px-4 py-3 md:py-4">
            <a href="#home" className="flex items-center gap-3 no-underline">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  headerLight
                    ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-slate-800"
                    : "bg-gradient-to-br from-yellow-300 to-amber-400 text-[#111827]"
                }`}
              >
                PO
              </div>
              <div className="hidden md:block">
                <div
                  className={`${
                    headerLight ? "text-slate-800" : "text-[#1e73be]"
                  } font-semibold`}
                >
                  Praise Oluwasakin
                </div>
                <div
                  className={`${
                    headerLight
                      ? "text-slate-500"
                      : "text-gray-300 text-opacity-90"
                  } text-xs`}
                >
                  Frontend Developer • Shopify Expert
                </div>
              </div>
            </a>

            <nav
              className="hidden md:flex gap-6 items-center"
              role="navigation"
              aria-label="Main"
            >
              {navItems.map((n) => (
                <a key={n.id} href={`#${n.id}`} className={navLinkClass(n.id)}>
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={downloadResume}
                className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow hover:scale-[1.02] transition-transform ${
                  headerLight
                    ? "bg-amber-400 text-slate-900"
                    : "bg-yellow-400 text-gray-900"
                }`}
              >
                <Download className="w-4 h-4" /> Resume
              </button>

              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((s) => !s)}
                className={`md:hidden p-2 rounded-lg transition ${
                  headerLight
                    ? "bg-slate-100 text-slate-700"
                    : "bg-white/6 text-white"
                }`}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden px-4 pb-4 ${mobileOpen ? "block" : "hidden"}`}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active === n.id
                      ? headerLight
                        ? "bg-blue-50 text-[#1e73be]"
                        : "bg-white/10 text-white"
                      : headerLight
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-gray-200 hover:bg-white/4"
                  }`}
                >
                  {n.label}
                </a>
              ))}
              <button
                onClick={downloadResume}
                className={`mt-2 w-full px-4 py-2 rounded-full font-semibold ${
                  headerLight
                    ? "bg-amber-400 text-slate-900"
                    : "bg-yellow-400 text-gray-900"
                }`}
              >
                <Download className="inline w-4 h-4 mr-2" /> Download Resume
              </button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <main className="pt-28">
          <section id="home" className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-700 to-slate-800" />

            <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32 text-center text-white">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                  Hey, I’m{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-200">
                    Praise
                  </span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-white/90">
                  Frontend Developer & Shopify Expert — crafting sleek, fast
                  experiences and e‑commerce stores that convert.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={downloadResume}
                    className="flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    <Download className="w-4 h-4" /> Download Resume
                  </button>

                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-3 rounded-full hover:bg-white/6 transition"
                  >
                    View My Work <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/6 backdrop-blur-md border border-white/8 rounded-xl p-4 flex flex-col items-start text-left">
                    <div className="text-sm text-white/75">Location</div>
                    <div className="mt-1 font-medium text-white">
                      Lagos, Nigeria
                    </div>
                  </div>
                  <div className="bg-white/6 backdrop-blur-md border border-white/8 rounded-xl p-4">
                    <div className="text-sm text-white/75">Availability</div>
                    <div className="mt-1 font-medium text-white">
                      Open for freelance & part-time
                    </div>
                  </div>
                  <div className="bg-white/6 backdrop-blur-md border border-white/8 rounded-xl p-4">
                    <div className="text-sm text-white/75">Experience</div>
                    <div className="mt-1 font-medium text-white">
                      Shopify & Frontend (5+ years)
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating shapes */}
              <div className="pointer-events-none">
                <div className="absolute -left-8 top-8 w-36 h-36 rounded-full bg-white/8 blur-2xl floatY" />
                <div className="absolute right-8 bottom-8 w-44 h-44 rounded-full bg-amber-300/30 blur-2xl floatY" />
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section
            id="about"
            className="w-full bg-gray-50 py-16 px-6 md:px-12 lg:px-20"
          >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="flex justify-center order-1 md:order-1">
                <div className="w-84 h-84 md:w-96 md:h-96 rounded-2xl flex justify-center items-center overflow-hidden shadow-xl bg-gray-200">
                  <Image
                    src="/profile.webp"
                    alt="Praise Oluwasakin - Frontend Developer & Shopify Expert"
                    width={400}
                    height={500}
                    className="object-cover object-top w-[95%] h-[100%] rounded-2xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-2 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Hey, I’m Praise Oluwasakin a Frontend Developer & Shopify
                  Expert.
                </h2>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <span className="font-medium">Born on October 15</span>, I
                  specialize in creating clean, responsive, and user-friendly
                  web experiences. I combine modern frontend tools like{" "}
                  <strong>React, Next.js, TailwindCSS</strong>, and{" "}
                  <strong>JavaScript</strong> with Shopify’s
                  <strong> Liquid</strong> to build eCommerce stores that are
                  not just beautiful, but also functional and
                  conversion-focused.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Over time, I’ve worked on multiple Shopify and custom projects
                  for clients across industries, helping them launch, grow, and
                  optimize their online presence. A few of my recent works
                  include <strong>Modern Mensch</strong>,{" "}
                  <strong>MyBooksieBox</strong>, and
                  <strong> Pineapple Phone</strong> each tailored to the
                  client’s brand and customer journey.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Beyond development, I value clarity, communication, and
                  consistency in delivering results. My background as a student
                  of Building at <strong>Obafemi Awolowo University</strong>{" "}
                  also strengthens my approach to structure, detail, and
                  user-experience design.
                </p>

                {/* Feature / skills list */}
                <div className="mt-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">
                    📌 What I bring to the table
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-start gap-3">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Core expertise
                        </div>
                        <div className="text-sm text-gray-600">
                          HTML, CSS, JavaScript, React, Next.js, Liquid,
                          TailwindCSS
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Shopify & custom themes
                        </div>
                        <div className="text-sm text-gray-600">
                          Proven track record with custom Shopify themes and
                          stores
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Detail-oriented mindset
                        </div>
                        <div className="text-sm text-gray-600">
                          Passion for creating seamless, accessible web
                          experiences
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          SEO & performance
                        </div>
                        <div className="text-sm text-gray-600">
                          Strong focus on SEO, performance optimization, and
                          responsive design
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  When I’m not coding, I serve in leadership roles including
                  choir coordination and volunteering with organizations like{" "}
                  <strong>JCI</strong> and <strong>GIVC</strong> which sharpen
                  my teamwork, organization, and communication skills.
                </p>

                <p className="mt-4 text-lg text-gray-700 leading-relaxed font-medium">
                  💡 I’m currently available for freelance work, collaborations,
                  or full-time opportunities where I can help brands scale their
                  online presence.
                </p>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section
            id="skills"
            className="bg-gradient-to-br from-slate-50 to-white py-20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="mx-auto max-w-6xl px-6 relative z-10">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center justify-center gap-2">
                  Skills & Expertise{" "}
                  <Sparkles className="w-7 h-7 text-amber-500" />
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  My toolkit blends creativity with technical excellence to
                  deliver engaging, high-performance web experiences.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {skills.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-100 p-6 flex flex-col items-center justify-center transition transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-3 group-hover:from-indigo-500 group-hover:to-purple-600 transition">
                      <Icon className="w-7 h-7 text-indigo-600 group-hover:text-white" />
                    </div>
                    <div className="text-base font-semibold text-gray-900">
                      {label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Proficient</div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200 transition pointer-events-none" />
                  </div>
                ))}
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div className="font-semibold">Team Collaboration</div>
                  </div>
                  <p className="mt-3 text-gray-600">
                    Work closely with designers, PMs, and stakeholders to ship
                    polished features efficiently.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white shadow-md hover:shadow-lg transition">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                    <div className="font-semibold">Problem Solving</div>
                  </div>
                  <p className="mt-3 text-gray-600">
                    Break down complex problems into elegant, maintainable
                    solutions.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white shadow-md hover:shadow-lg transition">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-purple-600" />
                    <div className="font-semibold">Time Management</div>
                  </div>
                  <p className="mt-3 text-gray-600">
                    Organized, deadline-driven, and focused on delivering value
                    fast.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-20 bg-gray-50">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Featured Projects
                  </h2>
                  <p className="mt-2 text-gray-600">
                    A selection of recent work — links to live demos included.
                  </p>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsToShow.map((p) => (
                  <article
                    key={p.title}
                    className="group bg-white rounded-2xl p-0 flex flex-col justify-between shadow hover:shadow-2xl transform hover:-translate-y-1 transition overflow-hidden"
                  >
                    <div className="relative w-full h-44 bg-slate-100">
                      {p.media ? (
                        p.media.endsWith(".mp4") || p.media.endsWith(".mov") ? (
                          <video
                            src={p.media}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={p.media}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p.Icon className="w-10 h-10 text-gray-400" />
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />

                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white/80 hover:bg-white rounded-full p-2 shadow"
                          >
                            <ExternalLink className="w-4 h-4 text-slate-900" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {p.title}
                      </h3>

                      <div
                        className="mt-2 text-sm text-gray-600"
                        style={{
                          maxHeight: 72,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <p>{p.desc}</p>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 bg-slate-100 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-3">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 flex-1 justify-center bg-slate-900 text-white py-2 rounded-md text-sm hover:bg-slate-800 transition"
                          >
                            View live
                          </a>
                        ) : (
                          <button
                            disabled
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-500 py-2 rounded-md text-sm cursor-not-allowed"
                          >
                            Unavailable
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Show More Button */}
              {allProjects.length > 6 && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* CONTACT */}
          <section
            id="contact"
            className="py-20 bg-[#1e73be] bg-[url('/background.jpeg')] text-white"
          >
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">
                Let’s build something together
              </h2>
              <p className="mt-3 text-white/90">
                Available for freelance and contract work — open to exciting
                Shopify & frontend projects.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:praiseoluwasakin@gmail.com"
                  className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold"
                >
                  Get in touch
                </a>
                <button
                  onClick={downloadResume}
                  className="px-6 py-3 rounded-full border border-white/30"
                >
                  Download Resume
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <a
                  href="https://wa.me/2349158418618"
                  className="p-3 rounded-full bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a
                  href="sms:08139157598"
                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://twitter.com/mayorcodes"
                  aria-label="X (formerly Twitter)"
                  className="p-3 rounded-full bg-black hover:bg-neutral-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="w-5 h-5 text-white" />
                </a>

                <a
                  href="https://instagram.com/mayor.codes"
                  className="p-3 rounded-full bg-pink-600 hover:bg-pink-700"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/praise-oluwasakin-409306239/"
                  className="p-3 rounded-full bg-blue-800 hover:bg-blue-900"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://github.com/Praiseoluwasakin"
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </section>

          <footer className="py-3 bg-slate-900 text-slate-300">
            <div className="mx-auto max-w-6xl px-6 text-sm text-center">
              © {new Date().getFullYear()} Praise Oluwasakin — Built with care.
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

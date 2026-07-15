"use client";
import { Analytics } from "@vercel/analytics/next";
import { app, analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import Head from "next/head";
import Testimonials from "@/components/testimonials";
import ScrollReveal from "@/components/scroll-reveal";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { NextSeo } from "next-seo";
import {
  Menu,
  X,
  Download,
  ArrowRight,
  Send,
  Globe,
  ShoppingBag,
  Palette,
  Calculator,
  ShoppingCart,
  Smartphone,
  Zap,
  Search,
  Heart,
  Layers,
  Activity,
  Code,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  MessageSquare,
  BookOpen,
  Calendar,
  Clock,
} from "lucide-react";
import { SiUpwork } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { blogPosts } from "../data/blog";
import Link from "next/link";

export const metadata = {
  title: "Praise Oluwasakin | Frontend & Shopify Developer",
  description:
    "Praise Oluwasakin is a frontend and Shopify developer specializing in modern, scalable web solutions.",
};

const featuredProjects = [
  {
    title: "Faith Olusakin — Developer Portfolio",
    desc: "Built a fully custom developer portfolio website for Shopify Expert Faith Olusakin. Cloned and extended the structure of a personal portfolio, customized the color palette to light pink branding, curated and showcased 20+ client Shopify projects, and integrated LinkedIn, Upwork, and contact links. Delivered and deployed on Vercel within 24 hours of the request.",
    tags: ["Next.js", "Vercel", "Portfolio", "Frontend"],
    url: "https://faitholusakinwebsite.vercel.app",
    media: "/faith-portfolio.png",
    Icon: Globe,
  },
  {
    title: "Rhema Christian Church — Church Website",
    desc: "Built and maintained the full website for Rhema Christian Church and Towers on Shopify. Developed dedicated pages for Men, Women, Youth, and Children ministries, a Branches directory with location and pastor details for 8+ branches, a Sunday Teachings blog with weekly sermon uploads, event announcements including the Women Aglow International Convention 2025, and an Online Christian Counseling section. Managed ongoing content updates across the entire site.",
    tags: ["Shopify", "Shopify Liquid", "PageFly", "Content Management"],
    url: "https://rhemachurchonline.org",
    media: "/rhema-website.png",
    Icon: Globe,
  },
  {
    title: "All In Lid — Shopify Store & Klaviyo",
    desc: "Full Shopify store revamp for a premium headwear brand running Meta Ads. Handled theme customization in Prestige, product listings for hats and beanies, cart upsell logic to push AOV, and a complete Klaviyo email build — abandoned cart flows, welcome sequences, back-in-stock automations, new drop campaigns, and popup email capture. Also managed SEO, Google Search Console, JudgeMe review integration, tiered discount architecture, and site performance.",
    tags: ["Shopify", "Shopify Liquid", "Klaviyo", "SEO", "ReConvert"],
    url: "https://allinlid.com",
    media: "/allinlid.png",
    Icon: ShoppingBag,
  },
  {
    title: "Eau Deals — Frontend & API Integration",
    desc: "Frontend development on a deals and offers platform built with React Vite and Tailwind CSS. Refactored a scattered codebase for maintainability, built the full user dashboard UI from Figma designs, and integrated all backend REST API endpoints — authentication flows, product listings, testimonials, and offer sections. Deployed on Vercel with backend on Render.",
    tags: ["React", "Vite", "Tailwind CSS", "REST API"],
    url: "https://eau-deals.vercel.app",
    media: "/eau-deals.png",
    Icon: Globe,
  },
  {
    title: "Cost to Baby — Web App UI & API Integration",
    desc: "Frontend build for a web application that helps users calculate the costs of having a baby. Delivered all UI fixes and feature updates, connected a custom REST API backend deployed on Render, and ensured clean data flow between frontend and backend. Delivered detailed PDF progress reports throughout the project lifecycle.",
    tags: ["React", "Tailwind CSS", "REST API"],
    url: "https://cost-to-baby.vercel.app",
    media: null,
    Icon: Calculator,
  },
  {
    title: "Happy Brand Store — Shopify Marketplace",
    desc: "Full Shopify store build for a vibrant lifestyle marketplace featuring 17 product categories including The Happy Brand apparel, jewelry, home decor, activewear, aquatic goods, and more. Implemented luminescent neon navigation styling, a custom HAPPY Brand category page, Exclusives section, and an energetic vacation-meets-streetwear aesthetic with Horizon theme.",
    tags: ["Shopify", "Horizon Theme", "Shopify Liquid", "E-commerce"],
    url: "",
    media: null,
    Icon: ShoppingBag,
  },
  {
    title: "Golden Green Boutique — Women's Fashion Store",
    desc: "Shopify fashion store build for Golden Green Boutique featuring collections for clothing, shoes, accessories, and a full sorority shop with nine sorority dropdowns. Built with the Dawn theme, custom typography matching the brand guide, Instagram feed integration, and a Klaviyo email popup. Designed to match the aesthetic of shopruthiegrace.com with the brand's pink-and-green palette.",
    tags: ["Shopify", "Dawn Theme", "Klaviyo", "Instagram Feed"],
    url: "https://www.shopgoldengreen.com",
    media: "/golden-green.png",
    Icon: ShoppingBag,
  },
  {
    title: "Ryuu Gear — Martial Arts Shopify Store",
    desc: "Shopify store build for a martial arts supply brand targeting men, women, children, and diverse communities. Designed and refined the Ryuu Gear brand identity including logo creation, set up the store using SaleHoo for dropshipping, and customized the theme with a strong, traditional-meets-modern aesthetic.",
    tags: ["Shopify", "Dropshipping", "SaleHoo", "Logo Design"],
    url: "",
    media: null,
    Icon: ShoppingBag,
  },
  {
    title: "Anieca Turner Contemporary Art — Shopify Store",
    desc: "Shopify store for a contemporary painter and illustrator selling fine art prints and original artworks. Built product listings with size-based pricing, matched branding from the existing portfolio site using Above the Beyond Script and Poppins fonts, integrated a print-on-demand workflow with Stackhouse Printing, and added a mailing list popup for audience building.",
    tags: ["Shopify", "Print on Demand", "E-commerce", "Art Store"],
    url: "https://aniecaturner.com",
    media: null,
    Icon: Palette,
  },
  {
    title: "Roros — Shopify Product Store",
    desc: "Shopify store work for Roros, an e-commerce brand based in Kenya. Handled product catalog management including sourcing and adding high-quality product images from supplier references, and maintaining accurate product listings across the store.",
    tags: ["Shopify", "E-commerce", "Product Management"],
    url: "https://roros.co.ke",
    media: null,
    Icon: ShoppingBag,
  },
  {
    title: "Ohm Med Spa — Shopify Store",
    desc: "Shopify store build and maintenance for Ohm Med Spa using the Prestige theme. Set up all page templates, structured the storefront layout, and handled ongoing fixes and updates to keep the site running smoothly.",
    tags: ["Shopify", "Prestige Theme", "E-commerce"],
    url: "https://ohmmedspa.com",
    media: "/ohm-med-spa.png",
    Icon: ShoppingBag,
  },
  {
    title: "Okahisi — Fashion & T-Shirt Store",
    desc: "Shopify store build for Okahisi, a fashion and t-shirt brand. Designed the storefront with a custom color palette and font pairing suited to the brand's aesthetic, structured the product catalog, and delivered a clean, conversion-ready shopping experience.",
    tags: ["Shopify", "Fashion E-commerce", "Theme Development"],
    url: "https://okihasi.com",
    media: "/okihasi.png",
    Icon: ShoppingBag,
  },
  {
    title: "EcoStick Supply — Shopify Store",
    desc: "Shopify storefront build for EcoStick Supply, delivering a clean, conversion-focused e-commerce experience. Built product collections, theme customization, and a seamless purchase flow designed to drive sales.",
    tags: ["Shopify", "E-commerce", "CRO"],
    url: "https://ecosticksupply.com",
    media: "/ecostickssupply.png",
    Icon: ShoppingBag,
  },
  {
    title: "Dola Fashion Collection — Shopify Store",
    desc: "Fashion e-commerce Shopify store for Dola Fashion Collection. Delivered a styled, brand-consistent storefront with optimized product pages, collection layouts, and a seamless shopping experience.",
    tags: ["Shopify", "Fashion E-commerce", "Theme Development"],
    url: "https://dolafashioncollection.com",
    media: "/dolas-fashion-collection.png",
    Icon: ShoppingBag,
  },
  {
    title: "Ruens — Shopify Store",
    desc: "Shopify store build for Ruens, crafted for a clean and modern brand presence. Focused on product page UX, collection structure, and a polished frontend that converts visitors into buyers.",
    tags: ["Shopify", "E-commerce", "Theme Development"],
    url: "https://ruens.co",
    media: "/ruens.png",
    Icon: ShoppingBag,
  },
  {
    title: "Greenwich Play — Shopify Store",
    desc: "Shopify storefront for Greenwich Play, built with a focus on clean UI, collection organization, and an enjoyable browsing experience tailored to the brand's audience.",
    tags: ["Shopify", "E-commerce", "Theme Development"],
    url: "https://shop.greenwichplay.com",
    media: "/greenwich-play.png",
    Icon: ShoppingBag,
  },
];

const legacyProjects = [
  {
    title: "Wancemo Startup Website",
    desc: "A modern startup website built with Next.js, Tailwind CSS, and Azure integration.",
    tags: ["Next.js", "Tailwind CSS", "Azure"],
    url: "https://www.wancemo.co.za/",
    media: "/wancemo.png",
    Icon: Smartphone,
  },
  {
    title: "Modern-Mensch Shopify Store",
    desc: "A sleek and conversion-optimized Shopify storefront featuring custom Liquid theme development.",
    tags: ["Shopify", "Liquid", "React"],
    url: "https://www.modern-mensch.com/",
    media: "/modern-mensch.png",
    Icon: ShoppingCart,
  },
  {
    title: "Tbells 4 Fresh Shopify Store",
    desc: "A scalable Shopify storefront built for a fresh foods brand with custom theme development.",
    tags: ["Shopify", "Liquid", "Custom Themes"],
    url: "https://www.tbells4freshkitchen.com/",
    media: "/tbells.png",
    Icon: ShoppingCart,
  },
  {
    title: "Xpense Project",
    desc: "A finance tracking app built with React and Next.js, focused on clean design and responsive layouts.",
    tags: ["React", "Next.js", "Tailwind"],
    url: null,
    media: "/xpense.png",
    Icon: Globe,
  },
  {
    title: "My Portfolio Website",
    desc: "A fully responsive personal portfolio built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS"],
    url: "https://praise-oluwasakin-website.vercel.app/",
    media: "/portfolio.png",
    Icon: Globe,
  },
];

const allProjects = [...featuredProjects, ...legacyProjects];

const skills = [
  "Shopify Development",
  "Shopify Liquid",
  "Shopify Theme Customization",
  "Shopify CRO (Conversion Rate Optimization)",
  "Shopify PageFly",
  "Shopify App Integration",
  "Klaviyo Email Marketing",
  "Klaviyo Flow Automation",
  "Email Campaign Design",
  "React.js",
  "Next.js",
  "Vite",
  "HTML & CSS",
  "Tailwind CSS",
  "JavaScript",
  "REST API Integration",
  "Frontend Development",
  "UI/UX Implementation",
  "Figma to Code",
  "SEO Optimization",
  "Google Search Console",
  "Performance Auditing (Lighthouse)",
  "Product Listing & Catalog Management",
  "E-commerce Strategy",
  "AOV Optimization",
  "Upsell & Cross-sell Setup",
  "Git & Version Control",
  "Vercel Deployment",
  "Content Management",
  "Logo Design (Basic)",
  "Web Performance Optimization",
  "Dropshipping Store Setup (SaleHoo)",
];

const highlightedSkills = new Set([
  "Klaviyo Email Marketing",
  "Klaviyo Flow Automation",
  "Google Search Console",
  "Performance Auditing (Lighthouse)",
]);

const navItems = [
  { id: "about", label: "About" },
  { id: "standards", label: "The Standard" },
  { id: "beyond", label: "Beyond the Code" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
];

export default function PraisePortfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [showAll, setShowAll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef({});

  // Blog & Form States
  const [selectedPost, setSelectedPost] = useState(null);
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null });
  const blogDialogRef = useRef(null);
  const successDialogRef = useRef(null);

  const openBlog = (post) => {
    setSelectedPost(post);
    if (blogDialogRef.current) {
      blogDialogRef.current.showModal();
    }
  };

  const closeBlog = () => {
    if (blogDialogRef.current) {
      blogDialogRef.current.close();
    }
    setSelectedPost(null);
  };

  const handleBlogBackdropClick = (e) => {
    if (e.target === blogDialogRef.current) {
      const rect = blogDialogRef.current.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeBlog();
      }
    }
  };

  const handleSuccessBackdropClick = (e) => {
    if (e.target === successDialogRef.current) {
      const rect = successDialogRef.current.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        successDialogRef.current.close();
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: null });

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xykdkokv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: null });
        form.reset();
        if (successDialogRef.current) {
          successDialogRef.current.showModal();
        }
      } else {
        const data = await response.json();
        setFormStatus({
          submitting: false,
          success: false,
          error: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      setFormStatus({
        submitting: false,
        success: false,
        error: "Network error. Please check your connection and try again.",
      });
    }
  };

  const projectsToShow = showAll ? allProjects : allProjects.slice(0, 6);

  const scrollToSection = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const offset = window.innerWidth >= 768 ? 88 : 76;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
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
      { threshold: 0.35 },
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
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <NextSeo
        title="Praise Oluwasakin | Frontend & Shopify Developer"
        description="Frontend & Shopify developer specializing in pixel-perfect frontend development and high-performance Shopify architectures."
        canonical="https://praise-oluwasakin-website.vercel.app/"
        openGraph={{
          url: "https://praise-oluwasakin-website.vercel.app/",
          title: "Praise Oluwasakin | Frontend & Shopify Developer",
          description:
            "Transforming static designs into high-converting digital experiences with React, Next.js, Tailwind CSS, and Shopify.",
          images: [
            {
              url: "https://praise-oluwasakin-website.vercel.app/profile.webp",
              width: 1200,
              height: 630,
              alt: "Praise Oluwasakin (Praise Ibukunoluwa Oluwasakin) Portfolio Preview",
            },
          ],
          site_name: "Praise Oluwasakin Portfolio",
        }}
        twitter={{
          handle: "@mayorcodes",
          site: "@mayorcodes",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: "Praise Oluwasakin, Praise Ibukunoluwa Oluwasakin, Praise Ibukunoluwa, Ibukunoluwa, Ibukunoluwa Oluwasakin, Frontend Developer, Shopify Developer, Shopify Expert, React, Next.js, Tailwind CSS, Shopify Liquid",
          },
          {
            name: "author",
            content: "Praise Ibukunoluwa Oluwasakin",
          },
        ]}
      />

      <Head>
        <title>Praise Oluwasakin | Frontend & Shopify Developer</title>
        <meta
          name="description"
          content="Frontend & Shopify developer specializing in pixel-perfect development and high-performance e-commerce architectures."
        />
        <meta name="author" content="Praise Ibukunoluwa Oluwasakin" />
        <meta name="keywords" content="Praise Oluwasakin, Praise Ibukunoluwa Oluwasakin, Praise Ibukunoluwa, Ibukunoluwa, Ibukunoluwa Oluwasakin, Frontend Developer, Shopify Developer, Shopify Expert, React, Next.js, Tailwind CSS, Shopify Liquid" />
      </Head>

      <div className="min-h-screen bg-brand-bg font-body text-brand-navy selection:bg-brand-navy selection:text-brand-bg flex flex-col">
        <Analytics />

        {/* Header */}
        <header
          className={`site-header fixed top-0 w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-architectural ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <div className="flex justify-between items-center px-5 md:px-16 py-4 max-w-[1280px] mx-auto">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="flex items-center gap-2 font-display text-lg md:text-2xl font-bold text-brand-navy tracking-tight transition-opacity hover:opacity-80"
            >
              <div className="bg-[#22223b] rounded-full p-1 flex items-center justify-center">
                <img
                  src="/PO-Logo.png"
                  alt="Logo"
                  className="w-9 h-9 md:w-10 md:h-10 object-contain animate-pulse-subtle"
                />
              </div>
              <span>Praise Oluwasakin</span>
            </a>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => scrollToSection(e, n.id)}
                  className={`font-body text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    active === n.id
                      ? "text-brand-accent"
                      : "text-brand-navy hover:text-brand-accent"
                  }`}
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="px-6 py-2 bg-cta text-brand-bg font-body text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:translate-y-[-1px]"
              >
                Get in touch
              </a>
            </nav>

            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="lg:hidden text-brand-navy p-2 transition-transform duration-300 active:scale-95"
            >
              <span
                className={`inline-block transition-transform duration-300 ${
                  mobileOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </span>
            </button>
          </div>

          <div
            className={`mobile-nav-panel lg:hidden border-t border-architectural ${
              mobileOpen ? "open" : ""
            }`}
          >
            <div className="mobile-nav-inner px-5 pb-4">
              <div className="flex flex-col gap-1 pt-2">
                {navItems.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={(e) => scrollToSection(e, n.id)}
                    className={`mobile-nav-link px-3 py-3 font-body text-sm font-semibold rounded-sm ${
                      active === n.id
                        ? "text-brand-accent bg-brand-navy/5"
                        : "text-brand-navy hover:text-brand-accent"
                    }`}
                  >
                    {n.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="mobile-nav-link mt-2 px-6 py-3 bg-cta text-brand-bg font-body text-sm font-semibold text-center"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-16 max-w-[1280px] mx-auto w-full">
          {/* Hero */}
          <section id="home" className="mb-20 md:mb-32">
            <ScrollReveal>
              <div className="fixed-grid">
                <div className="col-span-4 md:col-span-10 md:col-start-2">
                  <h1 className="font-display text-[28px] sm:text-[36px] md:text-[72px] font-extrabold text-brand-navy mb-6 md:mb-8 border-b border-architectural pb-6 md:pb-8 leading-[1.1] tracking-tight">
                    Transforming Static Designs into High-Converting Digital
                    Alchemies.
                  </h1>
                  <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                    <p className="font-body text-lg text-brand-navy max-w-2xl leading-relaxed">
                      Specializing in pixel-perfect frontend development and
                      high-performance Shopify architectures for brands that
                      demand excellence.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="https://www.upwork.com/freelancers/~01f7c3f6c2fdd0c680"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-cta text-brand-bg px-6 py-3 font-body text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:translate-y-[-1px]"
                      >
                        <SiUpwork className="w-4 h-4" />
                        Hire on Upwork
                      </a>
                      <a
                        href="#work"
                        onClick={(e) => scrollToSection(e, "work")}
                        className="inline-flex items-center gap-2 border border-brand-navy px-6 py-3 font-body text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-300"
                      >
                        Explore Archives
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={downloadResume}
                        className="inline-flex items-center gap-2 border border-brand-accent px-6 py-3 font-body text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
                      >
                        Download Resume
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Stats */}
          <section className="mb-20 md:mb-32 border-y border-architectural py-8 md:py-12">
            <ScrollReveal delay={80}>
              <div className="fixed-grid">
                <div className="col-span-2 md:col-span-3 border-r border-architectural pr-4">
                  <p className="font-body text-xs text-accent uppercase mb-2 tracking-wider">
                    Performance
                  </p>
                  <p className="font-display text-[32px] font-bold text-brand-navy">
                    +35%
                  </p>
                  <p className="font-body text-sm text-brand-navy mt-1">
                    Speed Score
                  </p>
                </div>
                <div className="col-span-2 md:col-span-3 border-r border-architectural px-4">
                  <p className="font-body text-xs text-accent uppercase mb-2 tracking-wider">
                    Impact
                  </p>
                  <p className="font-display text-[32px] font-bold text-brand-navy">
                    $120K+
                  </p>
                  <p className="font-body text-sm text-brand-navy mt-1">
                    Revenue Generated
                  </p>
                  <p className="font-body text-xs text-brand-navy mt-2 opacity-80">
                    Boosting sales to $10K in &lt; 2 weeks via Klaviyo &amp; SEO
                    management
                  </p>
                </div>
                <div className="col-span-2 md:col-span-3 border-r border-architectural px-4 mt-8 md:mt-0">
                  <p className="font-body text-xs text-accent uppercase mb-2 tracking-wider">
                    Client
                  </p>
                  <p className="font-display text-[32px] font-bold text-brand-navy">
                    95%
                  </p>
                  <p className="font-body text-sm text-brand-navy mt-1">
                    Satisfaction
                  </p>
                </div>
                <div className="col-span-2 md:col-span-3 pl-4 mt-8 md:mt-0">
                  <p className="font-body text-xs text-accent uppercase mb-2 tracking-wider">
                    Experience
                  </p>
                  <p className="font-display text-[32px] font-bold text-brand-navy">
                    7+
                  </p>
                  <p className="font-body text-sm text-brand-navy mt-1">
                    Years
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* About */}
          <section id="about" className="mb-20 md:mb-32">
            <ScrollReveal delay={100}>
              <div className="fixed-grid">
                <div className="col-span-4 md:col-span-4">
                  <div className="mb-6 md:mb-8 overflow-hidden border border-architectural md:grayscale md:hover:grayscale-0 transition-all duration-500">
                    <img
                      src="/profile.webp"
                      alt="Praise Oluwasakin (Praise Ibukunoluwa Oluwasakin) - Frontend & Shopify Developer"
                      className="w-full h-auto object-cover object-top aspect-[4/5]"
                    />
                  </div>
                  <h2 className="font-display text-2xl md:text-[32px] font-bold text-brand-navy mb-4">
                    Background
                  </h2>
                </div>
                <div className="col-span-4 md:col-span-8">
                  <p className="font-body text-lg text-brand-navy leading-relaxed mb-6">
                    I am Praise Oluwasakin, a professional Frontend &amp;
                    Shopify Developer and a student of Building at OAU. My dual
                    background in structural architecture and digital
                    engineering informs my approach to code: I build solid
                    foundations that support scalable, aesthetically refined
                    interfaces.
                  </p>
                  <p className="font-body text-base text-brand-navy leading-relaxed">
                    I specialize in translating complex design systems into
                    robust, high-performance web experiences. My work bridges
                    the gap between meticulous editorial design and the rigorous
                    demands of modern e-commerce architectures.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* The Standard (Principles/What I Do) */}
          <section
            id="standards"
            className="mb-20 md:mb-32 border-t border-architectural pt-8 md:pt-12"
          >
            <ScrollReveal delay={100}>
              <div className="fixed-grid">
                <div className="col-span-4 md:col-span-4">
                  <h2 className="font-display text-2xl md:text-[32px] font-bold text-brand-navy mb-4">
                    The Build Standard
                  </h2>
                  <p className="font-body text-xs text-accent uppercase mb-6 tracking-wider">
                    How I Architect Digital Products
                  </p>
                  <p className="font-body text-sm text-brand-navy/80 leading-relaxed mb-6">
                    Every website is treated as an engineered structure. I
                    don&apos;t &quot;vibe-code&quot; or guess. I design, test,
                    optimize, and build with structural integrity to ensure
                    every build achieves maximum business value and user
                    satisfaction.
                  </p>
                </div>
                <div className="col-span-4 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border border-architectural p-6 bg-brand-bg/40 hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-brand-accent group-hover:border-brand-bg mb-4 transition-colors">
                      <Zap className="w-5 h-5 text-brand-navy group-hover:text-brand-bg" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Lighthouse Speed (≥ 90%)
                    </h3>
                    <p className="font-body text-xs md:text-sm leading-relaxed text-brand-navy/80 group-hover:text-brand-bg/80">
                      Latency is lost revenue. I optimize assets, bundle size,
                      font delivery, and caching to consistently achieve 90%+
                      performance scores in Lighthouse audits.
                    </p>
                  </div>

                  <div className="border border-architectural p-6 bg-brand-bg/40 hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-brand-accent group-hover:border-brand-bg mb-4 transition-colors">
                      <Search className="w-5 h-5 text-brand-navy group-hover:text-brand-bg" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Google SEO &amp; Conversions
                    </h3>
                    <p className="font-body text-xs md:text-sm leading-relaxed text-brand-navy/80 group-hover:text-brand-bg/80">
                      A site is only useful if discovered. I implement
                      structured markup, schema markup, semantic HTML, and
                      Google Search Console to rank high and convert views into
                      leads.
                    </p>
                  </div>

                  <div className="border border-architectural p-6 bg-brand-bg/40 hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-brand-accent group-hover:border-brand-bg mb-4 transition-colors">
                      <Smartphone className="w-5 h-5 text-brand-navy group-hover:text-brand-bg" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      True Multi-Device Responsiveness
                    </h3>
                    <p className="font-body text-xs md:text-sm leading-relaxed text-brand-navy/80 group-hover:text-brand-bg/80">
                      Responsive design is more than fluid columns. I verify tap
                      targets, typography scaling, navigation menus, and media
                      across all viewport ranges to eliminate poor mobile
                      experiences.
                    </p>
                  </div>

                  <div className="border border-architectural p-6 bg-brand-bg/40 hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-brand-accent group-hover:border-brand-bg mb-4 transition-colors">
                      <Heart className="w-5 h-5 text-brand-navy group-hover:text-brand-bg" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Customer-Centric Perspective
                    </h3>
                    <p className="font-body text-xs md:text-sm leading-relaxed text-brand-navy/80 group-hover:text-brand-bg/80">
                      I step directly into the customer&apos;s shoes to identify
                      and eliminate design icks. I answer questions before they
                      are asked, creating logical, friction-free customer
                      journeys.
                    </p>
                  </div>

                  <div className="border border-architectural p-6 bg-brand-bg/40 hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-brand-accent group-hover:border-brand-bg mb-4 transition-colors">
                      <Activity className="w-5 h-5 text-brand-navy group-hover:text-brand-bg" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Refined, Moderate Motion
                    </h3>
                    <p className="font-body text-xs md:text-sm leading-relaxed text-brand-navy/80 group-hover:text-brand-bg/80">
                      Too much animation ruins the experience. I design
                      deliberate animations (such as reveal-on-scroll and
                      micro-interactions) that direct attention and improve
                      visual flow.
                    </p>
                  </div>

                  <div className="border border-architectural p-6 bg-brand-bg/40 hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-brand-accent group-hover:border-brand-bg mb-4 transition-colors">
                      <Layers className="w-5 h-5 text-brand-navy group-hover:text-brand-bg" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Shopify E-Commerce CRO
                    </h3>
                    <p className="font-body text-xs md:text-sm leading-relaxed text-brand-navy/80 group-hover:text-brand-bg/80">
                      Maximizing storefront revenue requires deep architecture.
                      I integrate marketing integrations, set up dynamic upsell
                      patterns, and implement automated Klaviyo flows to grow
                      your AOV.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Beyond the Code */}
          <section
            id="beyond"
            className="mb-20 md:mb-32 border-t border-architectural pt-8 md:pt-12"
          >
            <ScrollReveal delay={120}>
              <div className="fixed-grid">
                <div className="col-span-4 md:col-span-4">
                  <h2 className="font-display text-[32px] font-bold text-brand-navy mb-4">
                    Beyond the Code
                  </h2>
                </div>
                <div className="col-span-4 md:col-span-8">
                  <p className="font-body text-lg text-brand-navy leading-relaxed mb-12">
                    Outside of client work, I serve as Co-Director of Skills
                    &amp; Development at JCINOAU — Junior Chamber International
                    Nigeria, Obafemi Awolowo University — alongside{" "}
                    <strong>Loveth Oladejo</strong>, where we lead programs that
                    equip students with practical, career-ready skills.
                  </p>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="border border-architectural p-6 md:p-8 bg-brand-bg">
                      <h3 className="font-display text-2xl font-semibold mb-2 text-brand-navy">
                        Ignite Academy 2026
                      </h3>
                      <p className="font-body text-xs text-accent uppercase mb-4 tracking-wider">
                        JCINOAU Skills &amp; Development Directorate · 6-Week
                        Program
                      </p>
                      <p className="font-body text-sm text-brand-navy leading-relaxed mb-4">
                        Ignite Academy is more than a training program — it is a
                        space where potential gets activated. Over 6 weeks,
                        participants choose one core skill track and go deep
                        with hands-on, practical learning they can actually use.
                      </p>
                      <p className="font-body text-xs text-accent uppercase mb-2 tracking-wider">
                        Core Skill Tracks
                      </p>
                      <p className="font-body text-sm text-brand-navy leading-relaxed mb-4">
                        Video Editing · Graphic Design · Content Writing · Data
                        Analysis · Social Media Management · Virtual Assistant
                      </p>
                      <p className="font-body text-sm text-brand-navy leading-relaxed mb-4">
                        Beyond the core track, participants also receive
                        sessions on building a personal brand, optimizing
                        LinkedIn, managing money, and using AI to work smarter —
                        everything needed to show up ready in today&apos;s
                        world.
                      </p>
                      <p className="font-body text-sm text-brand-navy leading-relaxed">
                        By the end of the program, participants won&apos;t just
                        have a skill — they&apos;ll know how to use it, talk
                        about it, and earn from it.
                      </p>
                    </div>
                    <div className="border border-architectural p-6 md:p-8 bg-brand-bg">
                      <h3 className="font-display text-2xl font-semibold mb-2 text-brand-navy">
                        Soft Skills Training (2025–2026)
                      </h3>
                      <p className="font-body text-xs text-accent uppercase mb-4 tracking-wider">
                        JCINOAU Skills &amp; Development Directorate · JCINOAU
                        Members &amp; OAU Students
                      </p>
                      <p className="font-body text-sm text-brand-navy leading-relaxed mb-4">
                        The Soft Skills Training was organized for members of
                        JCINOAU and OAU students to equip them with practical
                        insights on what soft skills training is and how
                        important it is in a professional setting. The session
                        aimed to help participants understand that soft skills
                        are just as important as hard skills.
                      </p>
                      <p className="font-body text-xs text-accent uppercase mb-3 tracking-wider">
                        Five Sessions · Five Speakers
                      </p>
                      <ul className="font-body text-sm text-brand-navy space-y-2">
                        <li>
                          <strong>Teamwork &amp; Conflict Resolution</strong>
                        </li>
                        <li>
                          <strong>Leadership &amp; Problem Solving</strong>
                        </li>
                        <li>
                          <strong>Communication &amp; Active Listening</strong>
                        </li>
                        <li>
                          <strong>
                            Time Management &amp; Critical Thinking
                          </strong>
                        </li>
                        <li>
                          <strong>
                            Stress Management &amp; Decision Making
                          </strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Skills */}
          <section
            id="skills"
            className="mb-20 md:mb-32 border border-architectural p-4 md:p-12"
          >
            <ScrollReveal delay={80}>
              <h2 className="font-display text-xl md:text-[32px] font-bold text-brand-navy mb-4 md:mb-8 border-b border-architectural pb-3 md:pb-4">
                Technical Repertoire
              </h2>
              <div className="flex flex-wrap gap-1.5 md:gap-3">
                {skills.map((skill) => {
                  const highlighted = highlightedSkills.has(skill);
                  return (
                    <span
                      key={skill}
                      className={`border px-2 py-1 md:px-4 md:py-2 font-body text-[9px] md:text-xs uppercase tracking-wide md:tracking-wider leading-tight ${
                        highlighted
                          ? "bg-brand-navy text-brand-bg border-brand-navy"
                          : "border-brand-accent text-accent"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </ScrollReveal>
          </section>

          {/* Projects */}
          <section id="work" className="mb-20 md:mb-32">
            <ScrollReveal delay={100}>
              <div className="flex justify-between items-end mb-6 md:mb-12 border-b border-architectural pb-3 md:pb-4 gap-3">
                <h2 className="font-display text-xl md:text-[32px] font-bold text-brand-navy">
                  Selected Works
                </h2>
                {allProjects.length > 6 && (
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="font-body text-[10px] md:text-xs text-brand-navy hover:text-accent uppercase tracking-wider border-b border-transparent hover:border-accent transition-colors shrink-0"
                  >
                    {showAll ? "Show Less" : `View All ${allProjects.length}`}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-5">
                {projectsToShow.map((p) => (
                  <article
                    key={p.title}
                    className="border border-architectural flex flex-col group cursor-pointer"
                    onClick={() => p.url && window.open(p.url, "_blank")}
                    onKeyDown={(e) =>
                      p.url && e.key === "Enter" && window.open(p.url, "_blank")
                    }
                    role={p.url ? "link" : "article"}
                    tabIndex={p.url ? 0 : undefined}
                  >
                    <div className="h-28 sm:h-36 md:h-64 bg-brand-navy/10 relative overflow-hidden border-b border-architectural">
                      {p.media ? (
                        <img
                          src={p.media}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentElement
                              .querySelector(".fallback-icon")
                              ?.classList.remove("hidden");
                          }}
                        />
                      ) : null}
                      <div
                        className={`fallback-icon absolute inset-0 flex items-center justify-center bg-brand-accent/20 ${p.media ? "hidden" : ""}`}
                      >
                        <p.Icon className="w-6 h-6 md:w-12 md:h-12 text-brand-accent" />
                      </div>
                    </div>
                    <div className="p-2.5 md:p-6 flex-grow flex flex-col justify-between bg-brand-bg group-hover:bg-brand-navy transition-colors duration-300">
                      <div>
                        <h3 className="font-display text-[11px] sm:text-sm md:text-2xl font-semibold text-brand-navy group-hover:text-brand-bg transition-colors duration-300 mb-1 md:mb-2 line-clamp-2 md:line-clamp-none leading-tight">
                          {p.title}
                        </h3>
                        <p className="hidden md:block font-body text-sm text-brand-navy/80 group-hover:text-brand-bg/80 transition-colors duration-300 line-clamp-3">
                          {p.desc}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-6 flex flex-wrap gap-1 md:gap-2">
                        {p.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[8px] md:text-[10px] uppercase tracking-wider text-accent group-hover:text-brand-bg/50 border border-accent group-hover:border-brand-bg/50 px-1 py-0.5 md:px-2 md:py-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* Blog Section */}
          <section id="blog" className="mb-20 md:mb-32 border-t border-architectural pt-8 md:pt-12">
            <ScrollReveal delay={80}>
              <div className="flex justify-between items-end mb-6 md:mb-12 border-b border-architectural pb-3 md:pb-4 gap-3">
                <div>
                  <h2 className="font-display text-xl md:text-[32px] font-bold text-brand-navy">
                    E-Commerce & Frontend Insights
                  </h2>
                  <p className="font-body text-xs text-accent uppercase tracking-wider mt-1.5">
                    Metaphor-driven storybooks explaining digital builds
                  </p>
                </div>
                <Link href="/blog" className="font-body text-[10px] md:text-xs text-brand-navy hover:text-accent uppercase tracking-wider border-b border-transparent hover:border-accent transition-colors shrink-0">
                  Explore All Articles
                </Link>
              </div>

              {/* Blog Grid of 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {blogPosts.slice(0, 3).map((post) => (
                  <article
                    key={post.slug}
                    onClick={() => openBlog(post)}
                    className="border border-architectural p-6 flex flex-col justify-between bg-brand-bg/40 hover:bg-brand-navy hover:text-brand-bg transition-all duration-300 group cursor-pointer"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[9px] uppercase tracking-wider text-accent group-hover:text-brand-bg/60 border border-accent group-hover:border-brand-bg/60 px-2 py-0.5">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-brand-navy/60 group-hover:text-brand-bg/50">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-bold mb-2 group-hover:text-brand-bg transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-brand-navy/80 group-hover:text-brand-bg/85 line-clamp-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-accent transition-colors pt-4 border-t border-architectural/40 group-hover:border-brand-bg/20">
                      <span>Read Storybook</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          </section>

          <ScrollReveal delay={120}>
            <Testimonials />
          </ScrollReveal>

          {/* Contact */}
          <section id="contact" className="mb-16">
            <ScrollReveal delay={80}>
              <div className="fixed-grid border border-architectural">
                <div className="col-span-4 md:col-span-5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-architectural bg-brand-navy text-brand-bg">
                  <h2 className="font-display text-[32px] font-bold mb-6">
                    Initiate Dialogue
                  </h2>
                  <p className="font-body text-base mb-12 text-brand-bg/80">
                    Available for freelance opportunities and collaborative
                    architectural digital builds.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <p className="font-body text-xs text-brand-accent uppercase mb-1 tracking-wider">
                        Upwork (Preferred)
                      </p>
                      <a
                        className="font-body text-base hover:underline underline-offset-4"
                        href="https://www.upwork.com/freelancers/~01f7c3f6c2fdd0c680"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    </div>
                    <div>
                      <p className="font-body text-xs text-brand-accent uppercase mb-1 tracking-wider">
                        WhatsApp
                      </p>
                      <a
                        className="font-body text-base hover:underline underline-offset-4"
                        href="https://wa.me/2349158418618"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Connect Directly
                      </a>
                    </div>
                    <div>
                      <p className="font-body text-xs text-brand-accent uppercase mb-1 tracking-wider">
                        iMessage / SMS
                      </p>
                      <a
                        className="font-body text-base hover:underline underline-offset-4"
                        href="sms:08139157598"
                      >
                        Send a Message
                      </a>
                    </div>
                    <div>
                      <p className="font-body text-xs text-brand-accent uppercase mb-1 tracking-wider">
                        Email
                      </p>
                      <a
                        className="font-body text-base hover:underline underline-offset-4"
                        href="mailto:praiseoluwasakin@gmail.com"
                      >
                        praiseoluwasakin@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-7 p-8 md:p-12">
                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-8"
                  >
                    <div>
                      <label
                        className="block font-body text-xs text-accent uppercase mb-2 tracking-wider"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="w-full bg-transparent border-b border-architectural py-2 font-body text-base text-brand-navy transition-colors placeholder-accent/50"
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block font-body text-xs text-accent uppercase mb-2 tracking-wider"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="w-full bg-transparent border-b border-architectural py-2 font-body text-base text-brand-navy transition-colors placeholder-accent/50"
                        id="email"
                        name="email"
                        placeholder="jane@example.com"
                        type="email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block font-body text-xs text-accent uppercase mb-2 tracking-wider"
                        htmlFor="message"
                      >
                        Project Details
                      </label>
                      <textarea
                        className="w-full bg-transparent border-b border-architectural py-2 font-body text-base text-brand-navy transition-colors resize-none placeholder-accent/50"
                        id="message"
                        name="message"
                        placeholder="Describe the architectural needs of your digital project..."
                        rows="4"
                        required
                      />
                    </div>
                    {formStatus.error && (
                      <p className="text-red-600 font-body text-xs">
                        {formStatus.error}
                      </p>
                    )}
                    <button
                      className="bg-cta text-brand-bg font-body text-sm font-semibold px-8 py-4 w-full md:w-auto hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      type="submit"
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-architectural bg-brand-bg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 md:px-16 py-20 max-w-[1280px] mx-auto">
            <div>
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className="flex items-center gap-2 font-display text-[28px] md:text-[32px] font-bold text-brand-navy mb-4 transition-opacity hover:opacity-80"
              >
                <div className="bg-[#22223b] rounded-full p-1 flex items-center justify-center">
                  <img
                    src="/PO-Logo.png"
                    alt="Logo"
                    className="w-9 h-9 md:w-10 md:h-10 object-contain animate-pulse-subtle"
                  />
                </div>
                <span>Praise Oluwasakin</span>
              </a>
              <p className="font-body text-sm text-brand-navy/70 mb-2">
                © {new Date().getFullYear()} Praise Oluwasakin. All rights
                reserved.
              </p>
              <span className="font-body text-xs text-brand-navy/60">
                Lagos, Nigeria
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-body text-xs text-accent uppercase tracking-wider mb-2 font-bold">
                Quick Navigation
              </span>
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => scrollToSection(e, n.id)}
                  className="font-body text-xs text-brand-navy hover:underline decoration-1 underline-offset-4 transition-all duration-200 w-fit"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="font-body text-xs text-brand-navy hover:underline decoration-1 underline-offset-4 transition-all duration-200 w-fit"
              >
                Get in Touch
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-body text-xs text-accent uppercase tracking-wider mb-2 font-bold">
                Connect
              </span>
              <div className="flex flex-wrap gap-2 max-w-[280px]">
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://www.linkedin.com/in/praise-oluwasakin-409306239/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://github.com/Praiseoluwasakin"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://www.upwork.com/freelancers/~01f7c3f6c2fdd0c680"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Upwork"
                  aria-label="Upwork"
                >
                  <SiUpwork className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://wa.me/2349158418618"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="sms:08139157598"
                  title="iMessage / SMS"
                  aria-label="iMessage / SMS"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="mailto:praiseoluwasakin@gmail.com"
                  title="Email"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://twitter.com/mayorcodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://instagram.com/mayor.codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Blog Reader Modal */}
        <dialog
          ref={blogDialogRef}
          onClick={handleBlogBackdropClick}
          className="w-full max-w-4xl bg-brand-bg border border-architectural text-brand-navy p-0 focus:outline-none backdrop:bg-brand-navy/85 backdrop:backdrop-blur-sm shadow-2xl rounded-none fixed inset-0 my-auto"
        >
          {selectedPost && (
            <div className="flex flex-col max-h-[85vh] md:max-h-[90vh]">
              {/* Sticky Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-architectural bg-brand-bg sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-accent" />
                  <span className="font-display text-xs uppercase tracking-widest font-semibold text-brand-navy/60">
                    Storybook Metaphor: {selectedPost.metaphor}
                  </span>
                </div>
                <button
                  onClick={closeBlog}
                  className="p-1.5 hover:bg-brand-navy hover:text-brand-bg border border-architectural text-brand-navy transition-colors flex items-center justify-center focus:outline-none"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Blog Content */}
              <div className="p-6 md:p-12 overflow-y-auto max-w-3xl mx-auto leading-relaxed">
                <div className="flex flex-wrap gap-4 items-center mb-6 text-xs text-brand-navy/60">
                  <span className="bg-brand-navy/5 border border-architectural px-3 py-1 uppercase tracking-wider text-brand-navy font-semibold">
                    {selectedPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedPost.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl md:text-[38px] leading-[1.15] font-extrabold text-brand-navy mb-8">
                  {selectedPost.title}
                </h2>

                {/* Render Story Elements */}
                <div className="space-y-6 text-base md:text-lg">
                  {selectedPost.content.map((block, idx) => {
                    if (block.type === "heading") {
                      return (
                        <h3 key={idx} className="font-display text-xl md:text-2xl font-bold text-brand-navy pt-6 mb-2 border-b border-architectural/25 pb-2">
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === "paragraph") {
                      return (
                        <p key={idx} className="text-brand-navy/90 leading-relaxed font-body">
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <blockquote key={idx} className="border-l-4 border-brand-navy bg-brand-navy/5 p-6 font-display italic text-brand-navy font-medium my-6">
                          “{block.text}”
                        </blockquote>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={idx} className="list-decimal pl-6 space-y-3 text-brand-navy/90 font-body">
                          {block.items.map((item, keyIdx) => (
                            <li key={keyIdx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "cta") {
                      return (
                        <div key={idx} className="mt-12 p-8 border border-brand-navy bg-brand-navy text-brand-bg flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                          <div className="max-w-xl">
                            <h3 className="font-display text-lg font-bold mb-2 text-brand-accent">
                              Architect Your Store for Growth
                            </h3>
                            <p className="font-body text-xs md:text-sm text-brand-bg/85 leading-relaxed">
                              {block.text}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              closeBlog();
                              const el = document.getElementById("contact");
                              if (el) {
                                const offset = window.innerWidth >= 768 ? 88 : 76;
                                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                                window.scrollTo({ top, behavior: "smooth" });
                              }
                            }}
                            className="px-6 py-3 bg-cta text-brand-bg font-body text-xs uppercase tracking-wider font-semibold border border-brand-bg hover:opacity-90 transition-all duration-300 w-full md:w-auto text-center shrink-0"
                          >
                            Initiate Dialogue
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}
        </dialog>

        {/* Success Popup Modal */}
        <dialog
          ref={successDialogRef}
          onClick={handleSuccessBackdropClick}
          className="w-full max-w-md bg-brand-bg border border-architectural text-brand-navy p-8 focus:outline-none backdrop:bg-brand-navy/85 backdrop:backdrop-blur-sm shadow-2xl rounded-none fixed inset-0 my-auto"
        >
          <div className="relative">
            <button
              onClick={() => successDialogRef.current.close()}
              className="absolute top-[-10px] right-[-10px] p-1 hover:bg-brand-navy hover:text-brand-bg border border-architectural text-brand-navy transition-colors flex items-center justify-center focus:outline-none"
              aria-label="Close success popup"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-12 h-12 rounded-full border border-brand-navy flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-brand-navy" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">
                Inquiry Initiated
              </h3>
              <p className="font-body text-sm text-brand-navy/80 leading-relaxed mb-4">
                I have received your message and will review it. I usually reply within 24 hours.
              </p>
              <p className="font-body text-xs text-brand-navy/60 leading-relaxed border-t border-architectural/50 pt-4 w-full">
                For urgent matters, feel free to reach out directly via WhatsApp or email at <a href="mailto:praiseoluwasakin@gmail.com" className="underline hover:text-brand-accent">praiseoluwasakin@gmail.com</a>.
              </p>
              <button
                onClick={() => successDialogRef.current.close()}
                className="mt-6 w-full py-3 bg-cta text-brand-bg font-body text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Close Window
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

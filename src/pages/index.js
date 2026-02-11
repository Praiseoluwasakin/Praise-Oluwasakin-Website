"use client";
import { Analytics } from "@vercel/analytics/next";
import { app, analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import Link from "next/link";
import Head from "next/head";
import BirthdayBalloons from "@/components/birthday-balloons";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { FaXTwitter } from "react-icons/fa6";

import { NextSeo } from "next-seo";
import { User, Mail } from "lucide-react";
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
  FileText,
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

  const [submissionMessage, setSubmissionMessage] = useState("");

  const Mail = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
  const Twitter = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C6 16.5 3 13.6 3 10V9c.7.4 1.5.6 2.3.7C4 8.5 2.8 5.7 3.5 3c2 2 3.7 2.6 5 2.6C7.6 5.6 7 3.9 7 2.5c0-.7.1-1.3.4-1.9 2.5 3 5 4.5 9 5 0-1.8.8-3.3 2.5-4C19 3.5 21 3 22 4z" />
    </svg>
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Defines the missing function to handle form submission.
   * @param {Event} e The form submission event.
   */
  const handleFormSubmit = (e) => {
    // 1. CRITICAL: Prevents the browser from performing a default form submission (page reload).
    e.preventDefault();

    // 2. Placeholder for actual submission logic (e.g., sending data to an API)
    console.log("Form submission intercepted! Sending data:", formData);

    // set in-component confirmation message (safer than touching DOM directly)
    setSubmissionMessage(
      "Thank you for your message! We will be in touch soon.",
    );
    // optionally clear form
    setFormData({ name: "", email: "", message: "", subject: "" });

    // In a real application, you would use fetch() or axios here:
    /*
-    fetch('YOUR_FORM_SUBMISSION_ENDPOINT', {
-      method: 'POST',
-      headers: {
-        'Content-Type': 'application/json',
-      },
-      body: JSON.stringify(formData),
-    })
-    .then(response => {
-      if (response.ok) {
-        alert('Message sent successfully!');
-        setFormData({ name: '', email: '', message: '' }); // Clear form
-      } else {
-        alert('Failed to send message.');
-      }
-    })
-    .catch(error => console.error('Error submitting form:', error));
-   */

    // Display a custom confirmation message instead of using alert()
    document.getElementById("confirmation-message").textContent =
      "Thank you for your message! We will be in touch soon.";
  };

  const socialLinks = [
    {
      href: "https://www.upwork.com/freelancers/~01f7c3f6c2fdd0c680",
      Icon: ExternalLink,
      color: "bg-emerald-600 hover:bg-emerald-700",
      label: "Upwork",
    },
    {
      href: "https://wa.me/2349158418618",
      Icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      label: "WhatsApp",
    },
    {
      href: "sms:08139157598",
      Icon: MessageSquare,
      color: "bg-blue-600 hover:bg-blue-700",
      label: "SMS",
    },
    {
      href: "https://twitter.com/mayorcodes",
      Icon: Twitter,
      color: "bg-black hover:bg-neutral-800",
      label: "Twitter/X",
    },
    {
      href: "https://instagram.com/mayor.codes",
      Icon: Instagram,
      color: "bg-pink-600 hover:bg-pink-700",
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/in/praise-oluwasakin-409306239/",
      Icon: Linkedin,
      color: "bg-blue-800 hover:bg-blue-900",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/Praiseoluwasakin",
      Icon: Github,
      color: "bg-slate-800 hover:bg-slate-700",
      label: "GitHub",
    },
  ];
  // inside PraisePortfolio component
  const softSkills = [
    {
      title: "Team Collaboration",
      description:
        "Work closely with designers, PMs, and stakeholders to ship polished features efficiently.",
      Icon: Users,
      color: "blue",
    },
    {
      title: "Problem Solving",
      description:
        "Break down complex problems into elegant, maintainable solutions.",
      Icon: Lightbulb,
      color: "green",
    },
    {
      title: "Time Management",
      description:
        "Organized, deadline-driven, and focused on delivering value fast.",
      Icon: Clock,
      color: "purple",
    },
  ];
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
      { threshold: 0.45 },
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
        <BirthdayBalloons />
        {/* Custom small utility styles that are easier to manage here */}
        <style>{`
        @keyframes floatY { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        .floatY { animation: floatY 4s ease-in-out infinite }
      `}</style>

        {/* NAV */}
        <header
          className={`fixed inset-x-0 top-4 z-50 px-4 transition-all duration-300 ease-in-out ${
            headerLight
              ? "mx-auto max-w-6xl bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-xl" // Increased shadow
              : "mx-auto max-w-6xl bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl" // Increased shadow for dark mode
          }`}
          aria-label="Primary navigation"
        >
          <div className="flex items-center justify-between gap-6 px-4 py-3 md:py-4">
            <a
              href="#home"
              className="flex items-center gap-3 no-underline group"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors group-hover:scale-[1.05] duration-200 ${
                  headerLight
                    ? "bg-gradient-to-br from-yellow-300 to-amber-400 text-slate-800"
                    : "bg-gradient-to-br from-yellow-300 to-amber-400 text-[#111827]"
                }`}
              >
                PO
              </div>
              <div className="hidden md:block">
                {/* Updated text color for better contrast in dark mode */}
                <span
                  className={`text-lg ${
                    headerLight ? "text-slate-800" : "text-white"
                  } font-semibold transition-colors duration-200`}
                >
                  Praise Oluwasakin
                </span>
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
              {/* CTA Improvement (A. Hierarchy & Clarity) */}
              <button
                onClick={downloadResume}
                className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold shadow-lg hover:scale-[1.04] transition-all duration-300 ease-in-out transform hover:shadow-xl ${
                  headerLight
                    ? "bg-amber-500 text-slate-900 ring-2 ring-amber-300/50" // Stronger color/shadow for CTA visibility
                    : "bg-yellow-400 text-gray-900 ring-2 ring-yellow-200/50"
                }`}
              >
                <Download className="w-4 h-4" /> Resume
              </button>

              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((s) => !s)}
                className={`md:hidden p-3 rounded-xl transition ${
                  // Increased padding and rounded corners for better touch target (D. Mobile/A11y)
                  headerLight
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-white/10 text-white hover:bg-white/20"
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
            <div className="flex flex-col gap-1.5 pt-1">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                    // Increased vertical padding (py-3) and text size (text-base) for better touch targets
                    active === n.id
                      ? headerLight
                        ? "bg-blue-100 text-[#1e73be]"
                        : "bg-white/15 text-white" // Stronger active background in dark mode
                      : headerLight
                        ? "text-slate-700 hover:bg-slate-100"
                        : "text-gray-200 hover:bg-white/6"
                  }`}
                >
                  {n.label}
                </a>
              ))}
              <button
                onClick={downloadResume}
                className={`mt-4 w-full px-4 py-3 rounded-full font-bold shadow-lg ${
                  // Increased vertical padding (py-3), made font bolder, added shadow
                  headerLight
                    ? "bg-amber-500 text-slate-900"
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
          <section
            id="home"
            className="relative overflow-hidden min-h-[80vh] pt-24 md:pt-32 pb-20 flex items-center"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-800 via-purple-900 to-slate-900" />{" "}
            {/* Darker, richer background */}
            <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24 text-center text-white">
              <div className="mx-auto max-w-4xl">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
                  Hey, I’m{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300 drop-shadow-lg">
                    {" "}
                    {/* Stronger gradient for name */}
                    Praise
                  </span>
                </h1>
                <p className="mt-6 text-xl sm:text-2xl font-light text-white/90">
                  <strong>Frontend Developer</strong> &{" "}
                  <strong>Shopify Expert</strong> — crafting sleek, fast
                  experiences and high-converting e-commerce stores.
                </p>

                {/* CTA Grouping (Matches Header CTA Style) */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={downloadResume}
                    className="flex items-center gap-2 bg-amber-500 text-slate-900 px-7 py-3.5 rounded-full font-bold text-lg shadow-2xl hover:scale-[1.05] transition-all duration-300 ease-in-out transform ring-4 ring-amber-300/40" // Primary CTA style
                  >
                    <Download className="w-5 h-5" /> Download Resume
                  </button>

                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-lg hover:bg-white/10 transition hover:scale-[1.03]"
                  >
                    View My Work <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Info Cards (Enhanced Shadow and Style) */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-start text-left shadow-xl hover:bg-white/10 transition">
                    <div className="text-base text-white/70">Location</div>
                    <div className="mt-1.5 font-semibold text-white text-lg">
                      Lagos, Nigeria
                    </div>
                  </div>
                  <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition">
                    <div className="text-base text-white/70">Availability</div>
                    <div className="mt-1.5 font-semibold text-white text-lg">
                      Open for freelance & part-time
                    </div>
                  </div>
                  <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition">
                    <div className="text-base text-white/70">Experience</div>
                    <div className="mt-1.5 font-semibold text-white text-lg">
                      Shopify & Frontend (5+ years)
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating shapes (Performance Optimized) */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
                <div className="absolute -left-12 top-24 w-40 h-40 rounded-full bg-white/6 blur-3xl floatY" />
                <div className="absolute right-10 bottom-10 w-52 h-52 rounded-full bg-amber-300/20 blur-3xl floatY floatY-delay" />
              </div>
            </div>
          </section>
          {/* ABOUT */}
          <section
            id="about"
            className="w-full bg-white py-16 px-6 md:px-12 lg:px-20"
          >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Image column */}
              <div className="flex justify-center order-2 md:order-1">
                <div className="relative w-80 sm:w-84 md:w-96 lg:w-[420px] h-[340px]">
                  {/* Decorative accent card (rotated) - Adjusted color/blur */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-4 -top-4 w-full h-full rounded-3xl bg-indigo-100/40 blur-sm transform rotate-3 shadow-md"
                  />

                  {/* Slight border card behind the image for depth */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-6 -bottom-6 w-full h-full rounded-3xl bg-slate-100 border border-slate-200 shadow-xl"
                  />

                  {/* Main image card (Using standard img tag for performance) */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden ring-4 ring-amber-500/30 bg-gradient-to-br from-white to-amber-50 transform transition-transform duration-350 hover:scale-[1.03] shadow-2xl">
                    <img
                      src="/profile.webp"
                      alt="Praise Oluwasakin — Frontend Developer & Shopify Expert"
                      className="object-cover object-top w-full h-full"
                    />

                    {/* soft vignette overlay for better portrait focus */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* small badge bottom-left */}
                    <div className="absolute left-4 bottom-4 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-full text-sm font-medium text-slate-800 shadow-lg">
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block ring-2 ring-white" />
                      Available for work
                    </div>
                  </div>
                </div>
              </div>

              {/* Content column */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Hey, I’m Praise Oluwasakin — a Frontend Developer & Shopify
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

                {/* --- Developer Metrics / Analytics Injection (Employer Conviction) --- */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 shadow-md">
                  <div className="text-sm font-bold text-amber-700 mb-3 uppercase tracking-wider">
                    Quantifiable Impact: Why Hire Me?
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl font-extrabold text-gray-900">
                        +35%
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Avg. Speed Score
                      </div>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl font-extrabold text-gray-900">
                        $120K+
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        E-commerce Revenue
                      </div>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl font-extrabold text-gray-900">
                        95%
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Client Satisfaction
                      </div>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl font-extrabold text-gray-900">
                        5+
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Years Experience
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Over time, I’ve worked on multiple Shopify and custom projects
                  for clients across industries, helping them launch, grow, and
                  optimize their online presence. A few of my recent works
                  include <strong>Modrn Mensch</strong>,{" "}
                  <strong>MyBooksieBox</strong>, and
                  <strong> Pineapple Phone</strong> — each tailored to the
                  client’s brand and customer journey.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Beyond development, I value clarity, communication, and
                  consistency in delivering results. My background as a student
                  of Building at <strong>Obafemi Awolowo University</strong>{" "}
                  also strengthens my approach to structure, detail, and
                  user-experience design.
                </p>

                <div className="mt-4 mb-6">
                  <div className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                    📌 Core Strengths
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Core Expertise
                        </div>
                        <div className="text-sm text-gray-600">
                          HTML, CSS, JS, React, Next.js, Liquid, TailwindCSS
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          E-commerce Conversion
                        </div>
                        <div className="text-sm text-gray-600">
                          Proven track record with custom Shopify themes and
                          stores
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Detail-Oriented
                        </div>
                        <div className="text-sm text-gray-600">
                          Passion for creating seamless, accessible web
                          experiences
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                      <span className="mt-1">
                        <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          SEO & Performance
                        </div>
                        <div className="text-sm text-gray-600">
                          Strong focus on optimization, accessibility, and
                          responsive design
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  When I’m not coding, I serve in leadership roles — including
                  choir coordination and volunteering with organizations like{" "}
                  <strong>JCI</strong> and <strong>GIVC</strong> — which sharpen
                  my teamwork, organization, and communication skills.
                </p>

                <p className="mt-4 text-lg text-gray-700 leading-relaxed font-bold text-amber-700 bg-amber-50 p-4 rounded-xl border border-amber-200">
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
            className="bg-slate-50 py-20 relative overflow-hidden"
          >
            <div className="mx-auto max-w-6xl px-6 relative z-10">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 tracking-wider">
                  My Toolkit
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 flex items-center justify-center gap-2">
                  Technical & Core Expertise{" "}
                  <Sparkles className="w-8 h-8 text-amber-500" />
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto font-light">
                  I leverage a modern, performance-focused stack to deliver
                  engaging, scalable, and accessible web applications.
                </p>
              </div>

              {/* Technical Skills Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
                {skills.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="relative p-5 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-lg group transition-all duration-300 transform hover:scale-[1.05] hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-400/70"
                  >
                    {/* Icon Container: Stronger Visual Focus */}
                    <div className="w-16 h-16 mb-3 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-600 group-hover:shadow-indigo-500/50 shadow-xl">
                      <Icon className="w-8 h-8 text-indigo-700 group-hover:text-white" />
                    </div>
                    <div className="text-sm font-bold text-gray-800 tracking-wide">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Soft Skills / Core Competencies */}
              <div className="mt-20">
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-sm font-semibold text-amber-700 tracking-wider">
                    Soft Skills
                  </span>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
                    Professional Focus Areas
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {softSkills.map(({ title, description, Icon, color }) => (
                    <div
                      key={title}
                      className={`group relative p-8 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
                    >
                      {/* Left border highlight based on color */}
                      <div
                        className={`absolute top-0 left-0 w-1.5 h-full bg-${color}-500 group-hover:bg-amber-500 transition-colors duration-300`}
                      />

                      <div className="flex items-center gap-4">
                        <Icon
                          className={`w-8 h-8 text-${color}-600 group-hover:text-amber-600 transition-colors`}
                        />
                        <div className="text-xl font-bold text-gray-900">
                          {title}
                        </div>
                      </div>
                      <p className="mt-4 text-gray-700 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-20 bg-white">
            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 tracking-wider">
                  Case Studies
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 flex items-center justify-center gap-2">
                  Featured Projects & Technical Impact{" "}
                  <Code className="w-8 h-8 text-amber-500" />
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto font-light">
                  Showcasing solutions built with React, Shopify, and modern web
                  technologies to deliver measurable business results.
                </p>
              </div>

              {/* Projects Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsToShow.map((p) => (
                  <article
                    key={p.title}
                    className="group bg-white rounded-2xl flex flex-col justify-between shadow-xl border border-slate-100 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden hover:shadow-2xl"
                  >
                    {/* Media / Image Placeholder */}
                    <div className="relative w-full h-44 bg-slate-50 overflow-hidden ring-4 ring-indigo-50/50">
                      {p.media ? (
                        <img
                          src={p.media}
                          alt={`Preview of ${p.title}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/600x400/334155/ffffff?text=Image+Unavailable";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4">
                          <p.Icon className="w-10 h-10 text-indigo-400 mb-2" />
                          <span className="text-sm text-gray-500 text-center">
                            Technical Project - No Visual Preview
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View Live Project"
                            className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition text-slate-900 hover:scale-110"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        {p.title}
                      </h3>

                      <div className="mt-2 text-base text-gray-700 h-[60px] overflow-hidden relative">
                        <p>{p.desc}</p>
                        {/* Fade out for longer descriptions */}
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 font-medium rounded-full border border-indigo-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 w-full justify-center bg-indigo-700 text-white py-3 rounded-full text-base font-semibold shadow-lg hover:bg-indigo-600 transition transform hover:scale-[1.01]"
                          >
                            View Live <ArrowRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <div className="w-full inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-600 py-3 rounded-full text-base font-semibold cursor-not-allowed">
                            Codebase Review Only
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Show More Button */}
              {allProjects.length > 4 && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="px-8 py-3 rounded-full bg-amber-500 text-slate-900 font-bold shadow-xl hover:bg-amber-600 transition transform hover:scale-[1.02] ring-4 ring-amber-200/50"
                  >
                    {showAll
                      ? "Show Less"
                      : `View All ${allProjects.length} Projects`}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* CONTACT */}
          <section
            id="contact"
            className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#334155_0,_transparent_55%),radial-gradient(circle_at_bottom,_#4f46e5_0,_transparent_55%)]" />
            <div className="relative mx-auto max-w-6xl px-6">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/40 text-sm font-semibold text-emerald-200 tracking-wider">
                  Get in Touch
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4">
                  Let&apos;s build something great
                </h2>
                <p className="mt-4 text-lg text-slate-200 max-w-3xl mx-auto font-light">
                  Tell me a bit about your project, timeline, and goals.
                  I&apos;ll reply personally to{" "}
                  <span className="font-semibold">
                    praiseoluwasakin@gmail.com
                  </span>
                  .
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-xl border border-slate-100/60 rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.65)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                {/* LEFT COLUMN: Contact Info & Socials */}
                <div className="p-8 md:p-12 bg-indigo-700 text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Direct Contact</h3>
                    <p className="text-indigo-200 mb-8">
                      I typically respond within 24 hours. Feel free to use the
                      form or reach out directly via email.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-amber-400 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Email</p>
                          <a
                            href="mailto:praiseoluwasakin@gmail.com"
                            className="text-indigo-100 hover:text-white transition"
                          >
                            praiseoluwasakin@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MessageCircle className="w-6 h-6 text-amber-400 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">
                            WhatsApp / Call
                          </p>
                          <a
                            href="https://wa.me/2349158418618"
                            className="text-indigo-100 hover:text-white transition"
                          >
                            +234 915 841 8618
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Download className="w-6 h-6 text-amber-400 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">
                            My Credentials
                          </p>
                          <button
                            onClick={downloadResume}
                            className="text-indigo-100 hover:text-white transition underline"
                          >
                            Download My Resume
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <ExternalLink className="w-6 h-6 text-amber-400 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">
                            Preferred Hiring Method
                          </p>
                          <a
                            href="https://www.upwork.com/freelancers/~01f7c3f6c2fdd0c680"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition underline"
                          >
                            Hire me on Upwork
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <p className="mt-1 text-sm text-indigo-100/80">
                            Secure contracts, clear milestones, and my preferred
                            way to start new projects.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-10">
                    <h4 className="text-lg font-semibold mb-3">
                      Connect Online
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map(({ href, Icon, label }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={label}
                          className="p-3 rounded-full bg-indigo-600 text-white hover:bg-amber-500 hover:text-slate-900 transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Contact Form */}
                <div className="p-8 md:p-12 bg-slate-50">
                  <form
                    action="https://formspree.io/f/xykdkokv"
                    method="POST"
                    onSubmit={handleFormSubmit}
                    className="space-y-7"
                  >
                    {/* Inline confirmation message rendered from state */}
                    {submissionMessage && (
                      <div
                        id="confirmation-message"
                        className="rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm font-medium flex items-center gap-2"
                      >
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">
                          ✓
                        </span>
                        <span>{submissionMessage}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name Input */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Your Name
                        </label>
                        <div className="mt-2 relative">
                          <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="e.g. Product Manager at Shopify brand"
                            required
                            className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Work Email
                        </label>
                        <div className="mt-2 relative">
                          <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="you@company.com"
                            required
                            className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Project Subject
                      </label>
                      <div className="mt-2 relative">
                        <FileText className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleFormChange}
                          placeholder="Shopify store redesign, new landing page, etc."
                          required
                          className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Project Details
                      </label>
                      <div className="mt-2 relative">
                        <MessageSquare className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          placeholder="Share scope, budget range, and ideal timeline so I can respond with helpful next steps."
                          rows="5"
                          required
                          className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button + helper text */}
                    <div className="space-y-3">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-indigo-700 text-white py-3.5 text-sm font-semibold shadow-lg hover:bg-indigo-600 hover:shadow-xl transition transform hover:scale-[1.01]"
                      >
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-slate-500 text-center">
                        This form currently doesn&apos;t send emails yet — see
                        below for how to connect it to your inbox via Formspree,
                        EmailJS, or a simple Next.js API route.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER - IMPROVED WITH QUICK LINKS */}
          <footer className="py-12 bg-slate-900 text-slate-300">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-800 pb-8 mb-8">
                {/* Column 1: Logo & Tagline */}
                <div className="col-span-2 md:col-span-1">
                  <a
                    href="#home"
                    className="flex items-center gap-3 no-underline group"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-yellow-300 to-amber-400 text-slate-800">
                      PO
                    </div>
                    <span className="text-xl font-bold text-white">
                      Praise Oluwasakin
                    </span>
                  </a>
                  <p className="mt-3 text-sm text-slate-500">
                    Frontend Developer, Shopify Expert, and builder of
                    accessible, high-performance web experiences.
                  </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                  <h4 className="text-base font-semibold text-white mb-4">
                    Quick Links
                  </h4>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-slate-400 hover:text-amber-500 transition"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div>
                  <h4 className="text-base font-semibold text-white mb-4">
                    Contact
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="mailto:praiseoluwasakin@gmail.com"
                        className="text-slate-400 hover:text-amber-500 transition"
                      >
                        Email: praiseoluwasakin@gmail.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/2349158418618"
                        className="text-slate-400 hover:text-amber-500 transition"
                      >
                        WhatsApp: +234 915 841 8618
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={downloadResume}
                        className="text-slate-400 hover:text-amber-500 transition underline"
                      >
                        Download Resume
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Socials (Desktop) */}
                <div className="hidden md:block">
                  <h4 className="text-base font-semibold text-white mb-4">
                    Follow Me
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={label}
                        className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-amber-500 hover:text-slate-900 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-sm text-center text-slate-500">
                © {new Date().getFullYear()} Praise Oluwasakin — Built with
                React & Tailwind CSS. All rights reserved.
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

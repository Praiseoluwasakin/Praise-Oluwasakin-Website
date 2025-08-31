"use client";
import { Analytics } from "@vercel/analytics/next";
import { app, analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import Link from "next/link";
import Head from "next/head";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { FaXTwitter } from "react-icons/fa6";

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
  ShoppingBag,
  Droplet,
  Users,
  Lightbulb,
  Clock,
  ShoppingCart,
  Smartphone,
  Globe,
  MessageCircle,
  MessageSquare,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ExternalLink,
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
    images: ["/profile.webp"], // Same image as Open Graph
    creator: "@mayorcodes", // your X/Twitter handle
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
      desc: "Developed a scalable, cloud-integrated website with smooth performance and modern design.",
      tags: ["Next.js", "Tailwind CSS", "Azure"],
      url: "https://www.wancemo.co.za/",
      media: "/wancemo.png", // fallback image
      Icon: Smartphone,
    },
    {
      title: "Modern-Mensch Shopify Store",
      desc: "Created a sleek, interactive Shopify storefront with engaging visuals and streamlined navigation.",
      tags: ["Shopify", "Liquid", "React"],
      url: "https://www.modern-mensch.com/",
      media: "/modern-mensch.png",
      Icon: ShoppingCart,
    },
    {
      title: "Tbells 4 Fresh Shopify Store",
      desc: "Developed a modern and scalable Shopify storefront for Tbells 4 Fresh.",
      tags: ["Shopify", "Liquid", "Custom Themes"],
      url: "https://www.tbells4freshkitchen.com/",
      media: "/tbells.png",
      Icon: ShoppingCart,
    },
    {
      title: "Xpense Project",
      desc: "Worked as a frontend developer to build a clean and responsive finance tracking app.",
      tags: ["React", "Next.js", "Tailwind"],
      url: null, // no live link yet
      media: "/xpense.png",
      Icon: Globe,
    },
    {
      title: "My Portfolio Website",
      desc: "Personal portfolio showcasing my skills, projects and experience.",
      tags: ["Next.js", "Tailwind CSS"],
      url: "https://praise-oluwasakin-website.vercel.app/",
      media: "/portfolio.png",
      Icon: Globe,
    },
    {
      title: "Chamak Society Shopify Store",
      desc: "Developed a user-friendly, accessible Shopify website tailored to client needs.",
      tags: ["Shopify", "Liquid", "CSS"],
      url: null,
      media: null,
      Icon: ShoppingCart,
    },
    {
      title: "Examplifyam Shopify Store",
      desc: "Designed and implemented a professional Shopify store with pixel-perfect design.",
      tags: ["Shopify", "Liquid", "Git"],
      url: null, // no link available
      media: null,
      Icon: ShoppingCart,
    },
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
                      Shopify & Frontend (4+ years)
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

          <section
            id="about"
            className="w-full bg-gray-50 py-16 px-6 md:px-12 lg:px-20"
          >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="flex justify-center">
                <div className="w-84 h-84 md:w-96 md:h-96 rounded-2xl flex justify-center items-center overflow-hidden shadow-xl bg-gray-200">
                  <Image
                    src="/profile.webp"
                    alt="Praise Oluwasakin - Frontend Developer, Shopify Expert, and Mentor"
                    width={400}
                    height={500}
                    className="object-cover object-top md:object-top w-[95%] h-[100%] rounded-2xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  About Me
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Hi, I’m <strong>Praise Oluwasakin</strong>, the founder of{" "}
                  <span className="font-semibold">mayorCodes</span>. I’m a
                  passionate <strong>Front-end Developer</strong>,{" "}
                  <strong>Shopify Expert</strong>, and <strong>Mentor</strong>,
                  dedicated to creating visually stunning, fast, and
                  SEO-friendly websites that help brands grow online.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  My journey began in church, where I first learned HTML and CSS
                  using nothing but inline styling. That humble start sparked my
                  hunger to learn modern web development deeply. When I finally
                  got the chance to study a structured course, I gave it my all
                  — and since then, I’ve been on a mission to master the craft
                  of building pixel-perfect, user-focused websites. For me, if a
                  website doesn’t align with a brand’s <em>UX vision</em>, then
                  the work isn’t complete.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Over the years, I’ve built a wide range of projects — from
                  custom Shopify stores to responsive React and Next.js web apps
                  — using
                  <em> Tailwind CSS, Liquid, and JavaScript</em>. My goal is
                  always the same: to transform ideas into high-performing,
                  engaging digital experiences that stand out.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Beyond code, I serve as the{" "}
                  <strong>
                    Director of Skills and Development at JCIN OAU
                  </strong>
                  , where I lead initiatives that empower young people with
                  digital skills. I’ve also mentored many upcoming developers,
                  helping them grow their technical and problem-solving
                  abilities. Leadership and mentorship are core to who I am.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  I’m also a lifelong learner — I don’t rest until a task is
                  done and done well. Whether I’m developing a Shopify store,
                  optimizing a site for SEO and performance, or guiding a mentee
                  through their first project, I approach everything with{" "}
                  <strong>excellence, service, and growth</strong> in mind.
                </p>

                <p className="mt-6 text-lg text-gray-700 leading-relaxed font-medium">
                  If you’re looking for a <strong>frontend developer</strong> or{" "}
                  <strong>Shopify expert in Nigeria</strong> who blends
                  creativity, technical expertise, and leadership, I’d love to
                  work with you to bring your vision to life.
                </p>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Skills & Expertise
                  </h2>
                  <p className="mt-2 text-gray-600 max-w-xl">
                    A focused toolkit for building modern, maintainable web apps
                    and high-converting e‑commerce stores.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 text-sm">
                    Shopify
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-yellow-50 text-sm">
                    E‑commerce
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-sm">
                    Frontend
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {[
                  { Icon: Code, label: "HTML" },
                  { Icon: Palette, label: "CSS" },
                  { Icon: Zap, label: "JavaScript" },
                  { Icon: RefreshCw, label: "React" },
                  { Icon: ArrowRight, label: "Next.js" },
                  { Icon: Wind, label: "Tailwind" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="group bg-gradient-to-br from-white to-slate-50 p-4 rounded-2xl shadow hover:shadow-xl transform transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center group-hover:from-indigo-500 group-hover:to-purple-600 transition">
                        <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{label}</div>
                        <div className="text-xs text-gray-500">Experienced</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div className="font-semibold">Team Collaboration</div>
                  </div>
                  <p className="mt-3 text-gray-600">
                    Work closely with designers, PMs and stakeholders to ship
                    polished features.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white shadow">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                    <div className="font-semibold">Problem Solving</div>
                  </div>
                  <p className="mt-3 text-gray-600">
                    Break down complex problems and deliver pragmatic solutions.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white shadow">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-purple-600" />
                    <div className="font-semibold">Time Management</div>
                  </div>
                  <p className="mt-3 text-gray-600">
                    Organised, deadline-driven and focused on high-impact work.
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
                    className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
                  >
                    {/* Media Preview */}
                    <div className="h-40 rounded-lg bg-slate-100 flex items-center justify-center mb-4 overflow-hidden">
                      {p.media &&
                      (p.media.endsWith(".mp4") || p.media.endsWith(".mov")) ? (
                        <video
                          src={p.media}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : p.media && p.media.includes("youtube.com") ? (
                        <iframe
                          src={
                            p.media.includes("watch?v=")
                              ? p.media
                                  .replace("watch?v=", "embed/")
                                  .split("&")[0] // clean embed link
                              : p.media
                                  .replace(
                                    "youtu.be/",
                                    "www.youtube.com/embed/"
                                  )
                                  .split("?")[0]
                          }
                          title={p.title}
                          className="w-full h-full object-cover"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : p.media ? (
                        <Image
                          src={p.media}
                          alt={p.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p.Icon className="w-10 h-10 text-gray-500" />
                      )}
                    </div>

                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-gray-600">{p.desc}</p>

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

                    <div className="mt-4 flex">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-md text-sm hover:bg-slate-800 transition"
                        >
                          Live
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-600 py-2 rounded-md text-sm cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      )}
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

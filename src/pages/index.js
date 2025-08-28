"use client";
import { Analytics } from "@vercel/analytics/next";
import { app, analytics } from "../lib/firebase";
import { logEvent } from "firebase/analytics";
import React, { useEffect, useState, useRef } from "react";
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

export default function PraisePortfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef({});

  // Define which sections are "light" so header switches to dark-text/white background
  const lightSections = new Set(["skills", "projects", "blog", "contact"]);
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
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
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
                  A selection of recent work — links to live demos and code
                  included.
                </p>
              </div>

              <a
                href="#projects"
                className="text-sm text-indigo-600 font-medium hidden sm:inline-flex items-center gap-2"
              >
                See all projects <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Mineuniverse Website",
                  desc: "Built key pages (Homepage, Contact, About, Modlist) with optimized performance and responsive UI.",
                  tags: ["React.js", "Next.js", "Tailwind CSS"],
                  url: "https://mineuniverse.com",
                  Icon: Globe,
                },
                {
                  title: "Wemco Startup Website",
                  desc: "Developed a scalable, cloud-integrated website with smooth performance and modern design.",
                  tags: ["Next.js", "Tailwind CSS", "Azure"],
                  url: "https://wemco.com",
                  Icon: Smartphone,
                },
                {
                  title: "Modern-Mensch Shopify Store",
                  desc: "Created a sleek, interactive Shopify storefront with engaging visuals and streamlined navigation.",
                  tags: ["Shopify", "Liquid", "React"],
                  url: "https://modern-mensch.com",
                  Icon: ShoppingCart,
                },
                {
                  title: "Chamak Society Shopify Store",
                  desc: "Developed a user-friendly, accessible Shopify website tailored to client needs.",
                  tags: ["Shopify", "Liquid", "CSS"],
                  url: "https://chamaksociety.com",
                  Icon: ShoppingCart,
                },
                {
                  title: "Examplifyam Shopify Store",
                  desc: "Designed and implemented a professional Shopify store with pixel-perfect design and Git version control.",
                  tags: ["Shopify", "Liquid", "Git"],
                  url: "https://examplifyam.com",
                  Icon: ShoppingCart,
                },
                {
                  title: "Tbells 4 Fresh Shopify Store",
                  desc: "Developed a modern and scalable Shopify storefront for Tbells 4 Fresh.",
                  tags: ["Shopify", "Liquid", "Custom Themes"],
                  url: "https://tbells4fresh.com",
                  Icon: ShoppingCart,
                },
              ].map((p) => (
                <article
                  key={p.title}
                  className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
                >
                  <div className="h-40 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4">
                    <p.Icon className="w-10 h-10" />
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
                  <div className="mt-4 flex gap-3">
                    <a className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 py-2 rounded-md text-sm hover:bg-slate-50">
                      Live
                    </a>
                    <a className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-md text-sm">
                      Code
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Latest Posts</h2>
                <p className="mt-2 text-gray-600">
                  Writing about Shopify, frontend performance and practical
                  tips.
                </p>
              </div>
              <a
                href="#blog"
                className="text-sm text-indigo-600 font-medium hidden sm:inline-flex items-center gap-2"
              >
                View all <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  date: "Dec 15, 2024",
                  title: "Advanced Shopify Customizations",
                  excerpt:
                    "Create custom sections and advanced Liquid patterns.",
                },
                {
                  date: "Dec 10, 2024",
                  title: "React Performance Tips",
                  excerpt: "Memoization, bundling and rendering strategies.",
                },
                {
                  date: "Dec 5, 2024",
                  title: "Modern CSS Techniques",
                  excerpt: "Useful modern layout patterns and utilities.",
                },
              ].map((b) => (
                <article
                  key={b.title}
                  className="rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition bg-gradient-to-br from-amber-50 to-white"
                >
                  <div className="text-xs text-gray-500">{b.date}</div>
                  <h3 className="mt-2 font-semibold text-lg">{b.title}</h3>
                  <p className="mt-2 text-gray-600">{b.excerpt}</p>
                  <a className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-medium">
                    Read post <ArrowRight className="w-4 h-4" />
                  </a>
                </article>
              ))}
            </div>
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
                href="mailto:praise@example.com"
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
                className="p-3 rounded-full bg-sky-500 hover:bg-sky-600"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com/mayor.codes"
                className="p-3 rounded-full bg-pink-600 hover:bg-pink-700"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/praise-oluwasakin"
                className="p-3 rounded-full bg-blue-800 hover:bg-blue-900"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://github.com/POluwasakin"
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-slate-900 text-slate-300">
          <div className="mx-auto max-w-6xl px-6 text-center">
            © {new Date().getFullYear()} Praise Oluwasakin — Built with care.
          </div>
        </footer>
      </main>
    </div>
  );
}

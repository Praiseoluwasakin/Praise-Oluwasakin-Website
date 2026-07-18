import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { NextSeo } from "next-seo";
import { blogPosts } from "../data/blog";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  MessageSquare
} from "lucide-react";
import { SiUpwork } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const navItems = [
  { id: "about", label: "About", path: "/#about" },
  { id: "standards", label: "The Standard", path: "/#standards" },
  { id: "beyond", label: "Beyond the Code", path: "/#beyond" },
  { id: "skills", label: "Skills", path: "/#skills" },
  { id: "work", label: "Work", path: "/#work" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "faq", label: "FAQ", path: "/faq" },
  { id: "testimonials", label: "Testimonials", path: "/#testimonials" },
];

export default function BlogListingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Open blog modal
  const openPost = (post) => {
    setSelectedPost(post);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  // Close blog modal
  const closePost = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setSelectedPost(null);
  };

  // Light-dismiss click outside dialog content fallback
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closePost();
      }
    }
  };

  return (
    <>
      <NextSeo
        title="Blog & E-commerce Insights | Praise Oluwasakin"
        description="Read narrative-driven articles on Shopify optimization, Klaviyo automation flows, Google SEO ranking, and Figma-to-React development."
        canonical="https://praise-oluwasakin-website.vercel.app/blog"
        additionalMetaTags={[
          {
            name: "keywords",
            content: "Praise Oluwasakin, Shopify Blog, Shopify Speed optimization, Klaviyo email flows, Shopify SEO, WooCommerce vs Shopify Nigeria, Figma to React, Freelance Developer Blog",
          },
          {
            name: "author",
            content: "Praise Ibukunoluwa Oluwasakin",
          },
        ]}
      />

      <Head>
        <title>Blog & Insights | Praise Oluwasakin</title>
        <meta
          name="description"
          content="Narrative-driven guides on e-commerce strategy, high-speed Shopify stores, Klaviyo workflows, and React frontend engineering by Praise Oluwasakin."
        />
      </Head>

      <div className="min-h-screen bg-brand-bg font-body text-brand-navy selection:bg-brand-navy selection:text-brand-bg flex flex-col">
        
        {/* Header */}
        <header
          className={`site-header fixed top-0 w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-architectural ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <div className="flex justify-between items-center px-5 md:px-16 py-4 max-w-[1280px] mx-auto">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg md:text-2xl font-bold text-brand-navy tracking-tight transition-opacity hover:opacity-80"
            >
              <div className="bg-[#22223b] rounded-full p-1 flex items-center justify-center">
                <img
                  src="/PO-Logo.png"
                  alt="Logo"
                  className="w-9 h-9 md:w-10 md:h-10 object-contain"
                />
              </div>
              <span>Praise Oluwasakin</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-3 xl:gap-6">
              {navItems.map((n) => (
                <Link
                  key={n.id}
                  href={n.path}
                  className={`font-body whitespace-nowrap text-[11px] xl:text-xs font-semibold tracking-wide transition-colors duration-300 ${
                    n.id === "blog"
                      ? "text-brand-accent border-b border-brand-accent"
                      : "text-brand-navy hover:text-brand-accent"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="whitespace-nowrap px-4 xl:px-6 py-2 bg-cta text-brand-bg font-body text-[11px] xl:text-xs font-semibold hover:opacity-90 transition-all duration-300 hover:translate-y-[-1px]"
              >
                Get in touch
              </Link>
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
                  <Link
                    key={n.id}
                    href={n.path}
                    className={`mobile-nav-link px-3 py-3 font-body text-sm font-semibold rounded-sm ${
                      n.id === "blog"
                        ? "text-brand-accent bg-brand-navy/5"
                        : "text-brand-navy hover:text-brand-accent"
                    }`}
                  >
                    {n.label}
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  className="mobile-nav-link mt-2 px-6 py-3 bg-cta text-brand-bg font-body text-sm font-semibold text-center"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-16 max-w-[1280px] mx-auto w-full">
          
          {/* Header Title */}
          <section className="mb-12 md:mb-20 text-center max-w-4xl mx-auto flex flex-col items-center">
            <span className="font-body text-xs text-brand-accent uppercase tracking-widest font-semibold block mb-4 border border-brand-accent/30 px-4 py-1.5 rounded-full bg-brand-accent/5 animate-fade-in-up">
              E-Commerce & Frontend Chronicles
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] font-extrabold text-brand-navy mb-6 leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              The Storybook of E-Commerce Architectures
            </h1>
            <p className="font-body text-base md:text-xl text-brand-navy/80 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Complex topics broken down through physical metaphors: car engines, rubber ducks, Lagos apartments, and Balogun storefronts.
            </p>
            <div className="w-24 h-[2px] bg-brand-accent/40 mt-8 mb-4"></div>
          </section>

          {/* Blog Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => openPost(post)}
                  className="border border-architectural flex flex-col justify-between p-6 bg-brand-bg hover:bg-brand-navy hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase tracking-wider text-brand-accent font-semibold border border-brand-accent px-2.5 py-1 transition-colors duration-500">
                        {post.category}
                      </span>
                      <span className="text-xs text-brand-navy/60 group-hover:text-brand-bg/60 flex items-center gap-1 font-medium bg-brand-navy/5 group-hover:bg-brand-bg/10 px-2 py-1 rounded-md transition-colors duration-500">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-brand-navy group-hover:text-brand-bg transition-colors duration-500 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="font-body text-sm text-brand-navy/70 group-hover:text-brand-bg/80 transition-colors duration-500 line-clamp-4 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold tracking-wide text-brand-navy group-hover:text-brand-bg transition-colors pt-4 border-t border-brand-navy/10 group-hover:border-brand-bg/20 mt-auto duration-500">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                  </div>
                </article>
              ))}
            </div>
          </section>

        </main>

        {/* Blog Reader Modal */}
        <dialog
          ref={dialogRef}
          onClick={handleBackdropClick}
          className="w-full h-full md:h-[95vh] md:max-w-5xl m-auto bg-brand-bg border-none md:border md:border-architectural text-brand-navy p-0 focus:outline-none backdrop:bg-brand-navy/85 backdrop:backdrop-blur-sm shadow-2xl md:rounded-xl fixed inset-0 overflow-hidden animate-fade-in-up"
        >
          {selectedPost && (
            <div className="flex flex-col h-full">
              {/* Sticky Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-architectural bg-brand-bg sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-accent" />
                  <span className="font-display text-xs uppercase tracking-widest font-semibold text-brand-navy/60">
                    Storybook Metaphor: {selectedPost.metaphor}
                  </span>
                </div>
                <button
                  onClick={closePost}
                  className="p-1.5 hover:bg-brand-navy hover:text-brand-bg border border-architectural text-brand-navy transition-colors flex items-center justify-center focus:outline-none"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-12 overflow-y-auto flex-grow max-w-3xl mx-auto leading-relaxed">
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

                <h1 className="font-display text-2xl md:text-[38px] leading-[1.15] font-extrabold text-brand-navy mb-8">
                  {selectedPost.title}
                </h1>

                {/* Render Story Elements */}
                <div className="space-y-6 text-base md:text-lg">
                  {selectedPost.content.map((block, idx) => {
                    if (block.type === "heading") {
                      return (
                        <h2 key={idx} className="font-display text-xl md:text-2xl font-bold text-brand-navy pt-6 mb-2 border-b border-architectural/25 pb-2">
                          {block.text}
                        </h2>
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
                          <a
                            href={block.target}
                            onClick={() => {
                              closePost();
                              window.location.hash = "contact";
                            }}
                            className="px-6 py-3 bg-cta text-brand-bg font-body text-xs uppercase tracking-wider font-semibold border border-brand-bg hover:opacity-90 transition-all duration-300 w-full md:w-auto text-center shrink-0"
                          >
                            Initiate Dialogue
                          </a>
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

        {/* Footer */}
        <footer className="w-full border-t border-architectural bg-brand-bg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 md:px-16 py-20 max-w-[1280px] mx-auto">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 font-display text-[28px] md:text-[32px] font-bold text-brand-navy mb-4 transition-opacity hover:opacity-80"
              >
                <div className="bg-[#22223b] rounded-full p-1 flex items-center justify-center">
                  <img
                    src="/PO-Logo.png"
                    alt="Logo"
                    className="w-9 h-9 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <span>Praise Oluwasakin</span>
              </Link>
              <p className="font-body text-sm text-brand-navy/70 mb-2">
                © {new Date().getFullYear()} Praise Oluwasakin. All rights reserved.
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
                <Link
                  key={n.id}
                  href={n.path}
                  className="font-body text-xs text-brand-navy hover:underline decoration-1 underline-offset-4 transition-all duration-200 w-fit"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="font-body text-xs text-brand-navy hover:underline decoration-1 underline-offset-4 transition-all duration-200 w-fit"
              >
                Get in Touch
              </Link>
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
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://github.com/Praiseoluwasakin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://www.upwork.com/freelancers/~01f7c3f6c2fdd0c680"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Upwork"
                >
                  <SiUpwork className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://wa.me/2349158418618"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="sms:08139157598"
                  aria-label="iMessage / SMS"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="mailto:praiseoluwasakin@gmail.com"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://twitter.com/mayorcodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center border border-architectural hover:border-brand-navy hover:bg-brand-navy hover:text-brand-bg transition-all duration-200"
                  href="https://instagram.com/mayor.codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

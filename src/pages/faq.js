import Head from "next/head";
import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { faqs } from "../data/faq";
import {
  Menu,
  X,
  ChevronDown,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  MessageSquare,
  HelpCircle
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

export default function FAQPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <>
      <NextSeo
        title="Frequently Asked Questions | Praise Oluwasakin"
        description="Answers to common questions about Shopify development, Klaviyo email marketing, pricing, and e-commerce growth strategies."
        canonical="https://praise-oluwasakin-website.vercel.app/faq"
        additionalMetaTags={[
          {
            name: "keywords",
            content: "Shopify Developer FAQ, E-commerce FAQ, Klaviyo vs Shopify Email, Cost to hire Shopify Expert, Shopify Platform Migration",
          },
        ]}
      />

      <Head>
        <title>Frequently Asked Questions | Praise Oluwasakin</title>
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
                    n.id === "faq"
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
                      n.id === "faq"
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
        <main className="flex-grow pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-16 max-w-4xl mx-auto w-full">
          
          {/* Header Title */}
          <section className="mb-16 md:mb-24 text-center flex flex-col items-center">
            <div className="bg-brand-navy/5 p-3 rounded-2xl mb-6 inline-flex animate-fade-in-up">
              <HelpCircle className="w-8 h-8 text-brand-accent" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] font-extrabold text-brand-navy mb-6 leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Frequently Asked Questions
            </h1>
            <p className="font-body text-lg md:text-xl text-brand-navy/70 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Clear answers on Shopify growth, hiring costs, email marketing, and technical architecture.
            </p>
          </section>

          {/* FAQ Accordion */}
          <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="space-y-4">
              {displayedFaqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className={`border transition-all duration-300 rounded-xl overflow-hidden bg-white/40 ${
                    openFaq === index 
                      ? "border-brand-navy shadow-[0_8px_30px_rgb(0,0,0,0.08)]" 
                      : "border-brand-navy/10 hover:border-brand-accent/50"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className={`font-display text-lg md:text-xl font-bold pr-8 transition-colors ${
                      openFaq === index ? "text-brand-navy" : "text-brand-navy/80"
                    }`}>
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 transition-transform duration-300 ease-in-out bg-brand-navy/5 p-2 rounded-full ${
                      openFaq === index ? "rotate-180 bg-brand-navy text-white" : "text-brand-navy/60"
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>
                  
                  <div 
                    id={`faq-answer-${index}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      openFaq === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 pt-0 border-t border-brand-navy/5 font-body text-base text-brand-navy/75 leading-relaxed bg-brand-bg/20">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See More / See Less Toggle */}
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-brand-navy bg-transparent border-2 border-brand-navy/20 hover:border-brand-navy transition-all duration-300 rounded-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {showAll ? "Show Less" : "See More FAQs"}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-1"}`} />
                </span>
                <div className="absolute inset-0 h-full w-0 bg-brand-navy/5 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              </button>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="w-full border-t border-architectural bg-brand-bg mt-auto">
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

// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

const DEFAULT_SEO = {
  title: "Praise Oluwasakin | Frontend & Shopify Developer",
  description:
    "Praise Oluwasakin is a frontend & Shopify developer building clean, responsive, and conversion-focused eCommerce and web experiences.",
  openGraph: {
    type: "website",
    url: "https://praise-oluwasakin-website.vercel.app/",
    title: "Praise Oluwasakin | Frontend & Shopify Developer",
    description:
      "Praise Oluwasakin is a frontend & Shopify developer building clean, responsive, and conversion-focused eCommerce and web experiences.",
    images: [
      {
        url: "https://praise-oluwasakin-website.vercel.app/profile.webp",
        width: 1200,
        height: 630,
        alt: "Praise Oluwasakin Portfolio Preview",
      },
    ],
  },
  twitter: {
    handle: "@mayorcodes",
    site: "@mayorcodes",
    cardType: "summary_large_image",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <Head>
        {/* Structured data (JSON-LD) — optional: remove birthDate if you want privacy */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Praise Oluwasakin",
              url: "https://praise-oluwasakin-website.vercel.app/",
              sameAs: [
                "https://twitter.com/mayorcodes",
                "https://www.linkedin.com/in/praise-oluwasakin-409306239/",
                "https://github.com/Praiseoluwasakin",
              ],
              jobTitle: "Frontend Developer & Shopify Expert",
              // "birthDate": "YYYY-10-15" // optional - add a full YYYY if you want it in structured data
            }),
          }}
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

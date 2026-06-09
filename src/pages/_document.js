import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global meta tags */}
        <meta charSet="UTF-8" />
        <meta name="author" content="Praise Oluwasakin" />
        <meta name="google-site-verification" content="_ps4i9Ooms-ueYZZZGNSBqmjEQFVFUpf32GDRvKOudI" />

        {/* Open Graph defaults */}
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/profile.webp" />

        {/* Twitter defaults */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" />

        {/* Brand fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

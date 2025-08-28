import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global meta tags */}
        <meta charSet="UTF-8" />
        <meta name="author" content="Praise Oluwasakin" />

        {/* Open Graph defaults */}
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/profile.webp" />

        {/* Twitter defaults */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

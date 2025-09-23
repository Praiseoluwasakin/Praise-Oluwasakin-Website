// scripts/generate-sitemap-from-projects.js
const fs = require("fs");
const path = require("path");

// Import your projects list
const projects = require("../data/projects.json"); // adjust path if needed

const baseUrl = "https://praise-oluwasakin-website.vercel.app";

function generateUrl(loc, lastmod = new Date().toISOString()) {
  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `;
}

// Always include homepage
let urls = [generateUrl(baseUrl)];

// Add each project page
projects.forEach((project) => {
  urls.push(generateUrl(`${baseUrl}/projects/${project.slug}`));
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

// Ensure output directory exists
const publicDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Write sitemap.xml into /public
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml generated with", urls.length, "urls");

// pages/projects/index.js
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";

export default function Projects({ projects }) {
  return (
    <>
      <NextSeo
        title="Projects — Praise Oluwasakin"
        description="Selected projects and case studies by Praise Oluwasakin. Custom Shopify themes, Next.js sites, and e-commerce builds."
        canonical="https://praise-oluwasakin-website.vercel.app/projects"
      />

      <main className="min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-gray-600 mb-8">
            A selection of work — click any project to view details.
          </p>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.slug}
                className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
              >
                <div className="h-40 w-full relative rounded-md overflow-hidden bg-slate-100">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {p.title}
                    </div>
                  )}
                </div>

                <h2 className="mt-4 text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {p.desc}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link href={`/projects/${p.slug}`}>
                    <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm">
                      View project
                    </a>
                  </Link>

                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:underline"
                    >
                      Visit site →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Read from the actual location of projects.json: src/data/projects.json
  const file = path.join(process.cwd(), "src", "data", "projects.json");
  const raw = fs.readFileSync(file, "utf8");
  const projects = JSON.parse(raw);

  return {
    props: { projects },
  };
}

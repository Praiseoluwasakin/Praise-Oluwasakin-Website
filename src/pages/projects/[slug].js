import { promises as fs } from "fs"; // FIX: Changed 'fs' to '{ promises as fs }'
import path from "path";
import Image from "next/image";
import { NextSeo } from "next-seo";

export default function ProjectPage({ project }) {
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Project not found
      </div>
    );
  }

  const url = `https://praise-oluwasakin-website.vercel.app/projects/${project.slug}`;

  return (
    <>
      <NextSeo
        title={`${project.title} — Praise Oluwasakin`}
        description={project.desc}
        canonical={url}
        openGraph={{
          url,
          title: `${project.title} — Praise Oluwasakin`,
          description: project.desc,
          images: project.image
            ? [
                {
                  url: `https://praise-oluwasakin-website.vercel.app${project.image}`,
                  alt: project.title,
                },
              ]
            : undefined,
        }}
      />

      <main className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
          <p className="text-gray-600 mt-2">{project.desc}</p>

          {project.image && (
            <div className="mt-6 w-full h-64 relative rounded-lg overflow-hidden bg-slate-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {project.url && (
            <div className="mt-6">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md"
              >
                Visit live site
              </a>
            </div>
          )}

          {/* you can expand with case study content here */}
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const file = path.join(process.cwd(), "data", "projects.json");
  // FIX: Changed fs.readFileSync to asynchronous fs.readFile
  const raw = await fs.readFile(file, "utf8");
  const projects = JSON.parse(raw);

  const paths = projects.map((p) => ({ params: { slug: p.slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const file = path.join(process.cwd(), "data", "projects.json");
  // FIX: Changed fs.readFileSync to asynchronous fs.readFile
  const raw = await fs.readFile(file, "utf8");
  const projects = JSON.parse(raw);
  const project = projects.find((p) => p.slug === params.slug) || null;

  return {
    props: { project },
  };
}

import ProjectHero from "@/components/ProjectHero";
import ProjectReveal from "@/components/ProjectReveal";
import { projects } from "@/app/constants/projects";
import Link from "next/link";
import ProjectDetails from "@/components/ui/ProjectDetails";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-3xl font-serif mb-4">Project not found</h1>
      </div>
    );
  }

  return (
    <ProjectReveal>
      <div className="w-full bg-white">
        <ProjectHero project={project} />
        <ProjectDetails project={project} />
      </div>
    </ProjectReveal>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

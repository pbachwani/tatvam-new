import ProjectHero from "@/components/ProjectHero";
import ProjectReveal from "@/components/ProjectReveal";
import { projects } from "@/app/constants/projects";
import Link from "next/link";
import ProjectDetails from "@/components/ui/ProjectDetails";
import HorizontalGallery from "@/components/ui/HorizontalGallery";
import { SwipeGallery } from "@/components/ui/SwipeGallery";
import ScrollToTopOnMount from "@/components/ui/ScrollToTopOnMount";
import NextProject from "@/components/ui/NextProject";
import Footer from "@/components/Footer";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  const currentIndex = projects.findIndex((p) => p.id === slug);
  const nextProject = projects[currentIndex + 1] ?? project[0];

  if (!project) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-3xl font-serif mb-4">Project not found</h1>
      </div>
    );
  }

  return (
    <ProjectReveal>
      <ScrollToTopOnMount />
      <ProjectHero project={project} />

      {/* <HorizontalGallery images={project.images} /> */}
      <div className="flex flex-col h-full justify-between items-start py-20 px-4 md:px-10 gap-4">
        <h3 className="text-3xl lg:text-5xl flex w-full justify-start font-andale font-semibold">
          Project Gallery
        </h3>
        <div className="flex flex-col w-full bg-blue-400/0 justify-end">
          {/* <span>[swipe to explore]</span> */}
          <SwipeGallery images={project.images} />
          <span className="text-center text-accent text-xs">
            [drag to explore]
          </span>
        </div>
      </div>
      <ProjectDetails project={project} />
      {/* <div className="flex justify-center items-center w-full h-screen">
        {nextProject.name}
      </div> */}
      <NextProject nextProject={nextProject} />
      {/* <Footer /> */}
    </ProjectReveal>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

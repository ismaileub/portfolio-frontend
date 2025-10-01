/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectCard from "@/components/modules/projectShowcase/ProjectCard";
import ShowToast from "@/components/shared/Showtoast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Next Portfolio",
  description:
    "Browse all my projects built with Next.js, React, Tailwind, and more. Explore live demos and source code.",
};

const AllProjectsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    cache: "no-store",
  });
  const projects = await res.json();

  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <ShowToast />
      <h2 className="text-center text-4xl font-bold">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl my-8">
        {projects.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default AllProjectsPage;

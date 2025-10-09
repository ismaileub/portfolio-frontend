/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";
import ProjectCard from "@/components/modules/projectShowcase/ProjectCard";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache: "no-store",
    next: {
      tags: ["BLOGS"],
    },
  });
  const blogs = await res.json();
  const pro = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    next: {
      tags: ["PROJECT"],
    },
  });
  const projects = await pro.json();

  return (
    <div>
      <Hero />
      <div>
        <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
          {blogs.slice(0, 3).map((blog: any) => (
            <BlogCard key={blog?._id} post={blog} />
          ))}
        </div>
      </div>
      {/* Middle Section (Separator) */}
      <section className="relative max-w-6xl mx-auto py-20 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-black text-center">
        <h2 className="text-3xl font-bold mb-4">Explore My Work</h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Dive into my collection of blogs and projects. Blogs share knowledge,
          while projects showcase skills in action.
        </p>
      </section>
      <div>
        <h2 className="text-center my-5 text-4xl">Featured Project</h2>
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
          {projects.slice(0, 3).map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

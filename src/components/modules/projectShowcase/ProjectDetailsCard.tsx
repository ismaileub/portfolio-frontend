/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { ExternalLink, Trash } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProjectDetailsCard({ project }: { project: any }) {
  const router = useRouter();
  const session = useSession();
  if (!project || !project._id) {
    return (
      <div className="py-30 text-center text-gray-500">Project not found.</div>
    );
  }

  const createdAt = project.createdAt ? new Date(project.createdAt) : null;
  const formattedDate =
    createdAt && !isNaN(createdAt.getTime())
      ? createdAt.toLocaleDateString()
      : "Unknown date";

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/project/${project._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        // if (!res.ok) throw new Error("Failed to delete");

        toast.success("project deleted successfully!");
        router.push("/project-showcase");

        // await Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      } catch (err) {
        console.error(err);
        toast.error("Error deleting project");
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-26 px-4">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-6">{project.title}</h1>

      {/* Meta */}
      <p className="text-gray-500 text-sm mb-6">Created: {formattedDate}</p>

      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden mb-8">
          <Image
            src={project.thumbnail || "/fallback.png"}
            alt={project.title}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )}

      {/* Description */}
      <article className="prose prose-lg max-w-none">
        <p>{project.description}</p>
      </article>

      {/* Features */}
      {project.features?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Features</h3>
          <ul className="list-disc pl-6 space-y-1">
            {project.features.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Technologies */}
      {project.technologies?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="mt-10 flex gap-5">
        {project.liveSite && (
          <a
            href={project.liveSite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Live Site
          </a>
        )}
        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        )}
      </div>

      <div className="p-4 border-t border-gray-500">
        {session.status === "authenticated" && (
          <div className="flex gap-7">
            <Button
              variant="destructive"
              className=" justify-start gap-2 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
              Delete Project
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

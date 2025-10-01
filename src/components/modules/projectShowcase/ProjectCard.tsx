/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link
      href={`/project-showcase/${project._id}`}
      className="block group transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {project.thumbnail ? (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={project.thumbnail || "/fallback.png"}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
            No Image
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {project.technologies?.slice(0, 2).join(", ")}...
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

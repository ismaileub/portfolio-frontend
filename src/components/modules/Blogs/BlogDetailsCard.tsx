/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

export default function BlogDetailsCard({ blog }: { blog: any }) {
  const router = useRouter();
  const session = useSession();

  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );
  }

  const createdAt = blog.createdAt ? new Date(blog.createdAt) : null;
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
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to delete");

        toast.success("Blog deleted successfully!");
        router.push("/blogs");

        // await Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      } catch (err) {
        console.error(err);
        toast.error("Error deleting blog");
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-6">{blog.title}</h1>

      {/* Meta info */}
      <p className="text-gray-500 text-sm mb-6">
        {formattedDate} • {blog.views ?? 0} views
      </p>

      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden mb-8">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none">
        <p>{blog.content}</p>
      </article>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="p-4 border-t border-gray-500">
        {session.status === "authenticated" && (
          <div className="flex gap-7">
            <Button
              variant="destructive"
              className=" justify-start gap-2 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
              Delete Blog
            </Button>
            <Link
              href={`/dashboard/update-blog/${blog._id}`}
              className="flex justify-start items-center gap-2 text-green-600 cursor-pointer"
            >
              <Edit className="h-4 w-4 " />
              Update Blog
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

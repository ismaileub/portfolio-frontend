/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

interface BlogDetailsPageProps {
  params: { blogId: string };
}

// Server Component (SSR)
const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const { blogId } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch blog");

    const blog = await res.json();

    if (!blog)
      return (
        <div className="py-20 text-center text-gray-500">Blog not found.</div>
      );

    return (
      <div className="py-30 px-4 max-w-7xl mx-auto">
        <BlogDetailsCard blog={blog} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="py-20 text-center text-gray-500">
        Failed to load blog.
      </div>
    );
  }
};

export default BlogDetailsPage;

// Dynamic Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.blogId}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch blog");

    const blog = await res.json();

    return {
      title: blog?.title || "Blog Details",
      description: blog?.content?.slice(0, 160) || "Read our blog post",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Details",
      description: "Read our blog post",
    };
  }
}

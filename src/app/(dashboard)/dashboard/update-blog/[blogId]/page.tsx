import UpdateBlogForm from "@/components/modules/Blogs/UpdateBlogform";
import { getBlogById } from "@/services/PostServices";
import React from "react";

interface Props {
  params: { blogId: string };
}

const UpdateBlog = async ({ params }: Props) => {
  const blogId = params.blogId;
  console.log(blogId);
  const blog = await getBlogById(blogId);
  console.log(blog);
  return (
    <div className="w-full flex justify-center items-center">
      <UpdateBlogForm blog={blog} />
    </div>
  );
};

export default UpdateBlog;

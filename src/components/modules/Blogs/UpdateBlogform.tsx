/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateBlog } from "@/actions/updateBlog";
import Form from "next/form";

const UpdateBlogForm = ({ blog }: { blog: any }) => {
  if (!blog) return <p>Loading...</p>;

  return (
    <Form
      action={async (formData: FormData) => {
        const token = localStorage.getItem("admin_token");
        await updateBlog(blog._id, formData, token as string);
      }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Update Blog</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={blog.title}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          defaultValue={blog.content}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnail"
          name="thumbnail"
          defaultValue={blog.thumbnail}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          defaultValue={blog.tags.join(", ")}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition"
      >
        Update
      </button>
    </Form>
  );
};

export default UpdateBlogForm;

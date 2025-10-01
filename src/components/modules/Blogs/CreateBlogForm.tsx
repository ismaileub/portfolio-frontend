"use client";
import { useState } from "react";
import { createBlog } from "@/actions/createBlog";

export default function CreateBlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission

    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required";
    if (!tags.trim()) newErrors.tags = "At least one tag is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("tags", tags);

    const token = localStorage.getItem("admin_token");
    await createBlog(formData, token as string);

    // Optionally clear the form after success
    setTitle("");
    setContent("");
    setThumbnail("");
    setTags("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
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
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.thumbnail && (
          <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
        )}
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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Next.js, React, Web Development"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.tags && (
          <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}

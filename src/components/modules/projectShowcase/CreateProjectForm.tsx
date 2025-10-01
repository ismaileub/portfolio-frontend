/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { createProject } from "@/actions/createProject";

export default function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [liveSite, setLiveSite] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [features, setFeatures] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required";
    if (!liveSite.trim()) newErrors.liveSite = "Live Site URL is required";
    if (!projectLink.trim())
      newErrors.projectLink = "Project / GitHub link is required";
    if (!features.trim())
      newErrors.features = "At least one feature is required";
    if (!technologies.trim())
      newErrors.technologies = "At least one technology is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("liveSite", liveSite);
    formData.append("projectLink", projectLink);
    formData.append("features", features);
    formData.append("technologies", technologies);

    const token = localStorage.getItem("admin_token");
    await createProject(formData, token as string);

    // Clear form after successful submission
    setTitle("");
    setDescription("");
    setThumbnail("");
    setLiveSite("");
    setProjectLink("");
    setFeatures("");
    setTechnologies("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Create Project</h2>

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

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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

      {/* Live Site */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="liveSite">
          Live Site URL
        </label>
        <input
          type="url"
          id="liveSite"
          name="liveSite"
          placeholder="https://example.com"
          value={liveSite}
          onChange={(e) => setLiveSite(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.liveSite && (
          <p className="text-red-500 text-sm mt-1">{errors.liveSite}</p>
        )}
      </div>

      {/* GitHub / Project Link */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="projectLink">
          GitHub / Repo Link
        </label>
        <input
          type="url"
          id="projectLink"
          name="projectLink"
          placeholder="https://github.com/username/project"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.projectLink && (
          <p className="text-red-500 text-sm mt-1">{errors.projectLink}</p>
        )}
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="features">
          Features (comma separated)
        </label>
        <input
          type="text"
          id="features"
          name="features"
          placeholder="Responsive design, Contact form, Dark mode"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.features && (
          <p className="text-red-500 text-sm mt-1">{errors.features}</p>
        )}
      </div>

      {/* Technologies */}
      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="technologies"
        >
          Technologies (comma separated)
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          placeholder="Next.js, Tailwind CSS, TypeScript"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
        {errors.technologies && (
          <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition"
      >
        Submit Project
      </button>
    </form>
  );
}

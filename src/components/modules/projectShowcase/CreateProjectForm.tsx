/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createProject } from "@/actions/createProject";
import Form from "next/form";

export default function CreateProjectForm() {
  return (
    <Form
      action={async (formData: FormData) => {
        const token = localStorage.getItem("admin_token");
        await createProject(formData, token as string);
      }}
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
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
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
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
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
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* GitHub Link */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="projectLink">
          GitHub / Repo Link
        </label>
        <input
          type="url"
          id="projectLink"
          name="projectLink"
          placeholder="https://github.com/username/project"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
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
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
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
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition"
      >
        Submit Project
      </button>
    </Form>
  );
}

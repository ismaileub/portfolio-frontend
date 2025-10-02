/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminAbout() {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    name: "",
    bio: "",
    email: "",
    phone: "",
    skills: "",
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", institute: "", year: "" }],
    workHistory: [{ role: "", company: "", duration: "", description: "" }],
    socialLinks: [{ platform: "", url: "" }],
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/aboutMe`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          ...data,
          skills: data.skills.join(", "),
        });
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s: string) => s.trim()),
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/aboutMe`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log(result._id);

      if (result?._id) {
        toast.success("About Me updated successfully!");
        // setTimeout(() => router.push("/about-me"), 1000);
        router.push("/about-me");
      }
    } catch (err: any) {
      toast.error("Failed to update About Me");
      console.log(err);
    }
  };

  // Dynamic field handlers
  const addField = (key: string, template: any) => {
    setForm({ ...form, [key]: [...form[key], template] });
  };
  const removeField = (key: string, index: number) => {
    const copy = [...form[key]];
    copy.splice(index, 1);
    setForm({ ...form, [key]: copy });
  };

  const renderFields = (key: string, fields: any[], labels: string[]) => {
    return fields.map((item, idx) => (
      <div key={idx} className="flex gap-2 mb-2 flex-wrap">
        {labels.map((label) => (
          <input
            key={label}
            placeholder={label}
            value={item[label.toLowerCase()] || ""}
            onChange={(e) => {
              const copy = [...form[key]];
              copy[idx][label.toLowerCase()] = e.target.value;
              setForm({ ...form, [key]: copy });
            }}
            className="border rounded px-2 py-1 flex-1 min-w-[120px]"
          />
        ))}
        <button
          type="button"
          onClick={() => removeField(key, idx)}
          className="bg-red-500 text-white px-2 rounded"
        >
          Remove
        </button>
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 space-y-4">
      {/* Basic Info */}
      <label className="block font-semibold">Name</label>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <label className="block font-semibold">Bio</label>
      <textarea
        placeholder="Bio"
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        className="w-full border rounded px-3 py-2 h-32"
      />
      <label className="block font-semibold">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <label className="block font-semibold">Phone</label>
      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <label className="block font-semibold">Skills</label>
      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />

      {/* Experience */}
      <h2 className="font-semibold text-lg mt-4">Experience</h2>
      {renderFields("experience", form.experience, [
        "Title",
        "Company",
        "Duration",
        "Description",
      ])}
      <button
        type="button"
        onClick={() =>
          addField("experience", {
            title: "",
            company: "",
            duration: "",
            description: "",
          })
        }
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Experience
      </button>

      {/* Education */}
      <h2 className="font-semibold text-lg mt-4">Education</h2>
      {renderFields("education", form.education, [
        "Degree",
        "Institute",
        "Year",
      ])}
      <button
        type="button"
        onClick={() =>
          addField("education", { degree: "", institute: "", year: "" })
        }
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Education
      </button>

      {/* Work History */}
      <h2 className="font-semibold text-lg mt-4">Work History</h2>
      {renderFields("workHistory", form.workHistory, [
        "Role",
        "Company",
        "Duration",
        "Description",
      ])}
      <button
        type="button"
        onClick={() =>
          addField("workHistory", {
            role: "",
            company: "",
            duration: "",
            description: "",
          })
        }
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Work History
      </button>

      {/* Social Links */}
      <h2 className="font-semibold text-lg mt-4">Social Links</h2>
      {renderFields("socialLinks", form.socialLinks, ["Platform", "Url"])}
      <button
        type="button"
        onClick={() => addField("socialLinks", { platform: "", url: "" })}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Social Link
      </button>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 ml-4 py-2 rounded mt-4"
      >
        Update About Me
      </button>
    </form>
  );
}

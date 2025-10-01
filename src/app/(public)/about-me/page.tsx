/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const AboutMe = () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/aboutMe`, {
    cache: "no-store",
  });

  const about = await res.json();

  if (!about) return <p className="mx-auto w-6xl mt-30">Loading...</p>;

  const iconMap: any = {
    LinkedIn: <FaLinkedin />,
    GitHub: <FaGithub />,
    Twitter: <FaTwitter />,
  };

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <h1 className="text-4xl font-bold">{about.name}</h1>

      {/* Bio */}
      <div className="mb-4">
        <p>{about.bio}</p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4 text-2xl mt-2">
        {about.socialLinks?.map((s: any, idx: number) => (
          <a
            key={idx}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            {iconMap[s.platform] || s.platform}
          </a>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-semibold mt-4">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {about.skills.map((skill: string) => (
            <span key={skill} className="px-3 py-1 bg-blue-100 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Work History Timeline */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Work History</h2>
        <div className="relative border-l-2 border-gray-300 ml-4 mt-4">
          {about.workHistory.map((w: any, idx: number) => (
            <div key={idx} className="mb-6 ml-6 relative">
              <div className="absolute -left-4 top-0 w-3 h-3 bg-blue-600 rounded-full border border-white"></div>
              <h3 className="font-bold">
                {w.role} @ {w.company}
              </h3>
              <p className="text-gray-500">{w.duration}</p>
              {w.description && <p>{w.description}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Education</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          {about.education.map((edu: any, idx: number) => (
            <div
              key={idx}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold">{edu.degree}</h3>
              <p>
                {edu.institute} | {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

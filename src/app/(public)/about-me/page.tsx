/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const AboutMe = async () => {
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
    <section className="max-w-6xl mx-auto mt-30 px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {about.name}
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {about.bio}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6 text-3xl mt-6">
        {about.socialLinks?.map((s: any, idx: number) => (
          <a
            key={idx}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition transform hover:scale-110"
          >
            {iconMap[s.platform] || s.platform}
          </a>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {about.skills.map((skill: string) => (
            <span
              key={skill}
              className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 font-medium rounded-full shadow-sm hover:shadow-md transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Work History Timeline */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Work History</h2>
        <div className="relative border-l-2 border-blue-200 ml-6">
          {about.workHistory.map((w: any, idx: number) => (
            <div
              key={idx}
              className="mb-10 ml-6 relative group transition-transform duration-300 hover:translate-x-2"
            >
              <div className="absolute -left-4 top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></div>
              <h3 className="text-xl font-semibold text-gray-900">
                {w.role} @{" "}
                <span className="text-blue-600 font-bold">{w.company}</span>
              </h3>
              <p className="text-sm text-gray-500">{w.duration}</p>
              {w.description && (
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {w.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Education</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {about.education.map((edu: any, idx: number) => (
            <div
              key={idx}
              className="border p-6 rounded-2xl shadow hover:shadow-lg transition bg-white hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
              <p className="mt-1 text-gray-600">
                {edu.institute} •{" "}
                <span className="font-medium">{edu.year}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

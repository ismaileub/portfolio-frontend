import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourname" },
    { icon: <FaGithub />, url: "https://github.com/yourname" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourname" },
    { icon: <FaInstagram />, url: "https://instagram.com/yourname" },
  ];

  return (
    <footer className="relative w-full overflow-hidden pt-12 pb-8 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28 text-center">
        {/* Name / Brand */}
        <h2 className="text-2xl font-bold mb-2">Ismail Hossain</h2>
        <p className="text-gray-400 mb-6">Full-Stack Developer & Designer</p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6 text-2xl">
          {socialLinks.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Navigation / Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
          <a href="#about" className="hover:text-blue-500 transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-blue-500 transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-blue-500 transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-blue-500 transition-colors">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs">
          © {currentYear} Ismail. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

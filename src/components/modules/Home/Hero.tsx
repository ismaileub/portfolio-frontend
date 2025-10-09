import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center bg-black text-white">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left: About Me */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Hi, I am Ismail Hossain
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            I am a full-stack developer passionate about building modern web
            applications with React, Next.js, Node.js, and Tailwind CSS. I love
            creating interactive, responsive, and visually appealing projects.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <Link
              href="project-showcase"
              className="px-6 py-3 bg-blue-600 rounded-xl font-medium hover:bg-blue-500 transition"
            >
              My Projects
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 border border-gray-500 rounded-xl font-medium hover:bg-gray-800 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
            <Image src="/me.png" alt="John Doe" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

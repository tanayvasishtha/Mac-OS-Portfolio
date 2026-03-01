import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Github, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function AboutApp() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from(".about-item", {
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".about-container",
        start: "top 80%",
        end: "bottom 20%",
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="about-container p-6 space-y-6 overflow-auto">
      <div className="about-item flex flex-col items-center">
        <img
          src="/images/logo.svg"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-400/50 dark:ring-blue-500/50"
        />
        <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
          Your Name
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          Full Stack Developer
        </p>
      </div>

      <div className="about-item text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto text-center">
        <p>
          Short bio: I build web applications with React, Node.js, and modern
          tools. Passionate about clean code, UX, and open source.
        </p>
      </div>

      <div className="about-item flex justify-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
          <MapPin className="w-4 h-4" />
          Location
        </span>
      </div>

      <div className="about-item flex justify-center gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </a>
      </div>
    </div>
  );
}

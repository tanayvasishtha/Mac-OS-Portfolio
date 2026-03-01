import { Coffee, Download, BookOpen, Zap, Users } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/tanayvasishtha", icon: "github", svg: "/icons/github.svg" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/tanayvasishtha/", icon: "linkedin", svg: "/icons/linkedin.svg" },
  { label: "X", url: "https://x.com/TanayVasishtha", icon: "x", svg: "/icons/twitter.svg" },
  { label: "Medium", url: "https://medium.com/@tanayvasishtha", icon: "medium" },
  { label: "Product Hunt", url: "https://www.producthunt.com/@tanayvasishtha", icon: "producthunt" },
  { label: "Peerlist", url: "https://peerlist.io/tanayvasishtha", icon: "peerlist" },
  { label: "Buy me a coffee", url: "https://buymeacoffee.com/tanayvasishtha", icon: "coffee" },
  { label: "Resume", url: "/files/Resume.pdf", icon: "resume" },
];

export function ResumeApp() {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 overflow-auto">
      <div className="shrink-0 flex items-center justify-end gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <a
          href="/files/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition"
        >
          Download PDF
        </a>
      </div>
      <div className="flex-1 min-h-0 p-6 sm:p-8 overflow-auto">
        <article className="max-w-[680px] mx-auto text-gray-800 dark:text-gray-200">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Tanay Vasishtha
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Full-Stack Developer
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
              <a
                href="mailto:edgepersonal2004@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                edgepersonal2004@gmail.com
              </a>
            </div>
          </header>

          {/* Social Links - Ubuntu About Me style */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">
              Connect
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SOCIAL_LINKS.map((link) => {
                const LucideIcon =
                  link.icon === "medium"
                    ? BookOpen
                    : link.icon === "producthunt"
                      ? Zap
                      : link.icon === "peerlist"
                        ? Users
                        : link.icon === "coffee"
                          ? Coffee
                          : link.icon === "resume"
                            ? Download
                            : null;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-colors"
                  >
                    {link.svg ? (
                      <img src={link.svg} alt="" className="w-5 h-5 flex-shrink-0" />
                    ) : LucideIcon ? (
                      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-gray-300">
                        <LucideIcon className="w-5 h-5" />
                      </span>
                    ) : null}
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">
              Summary
            </h2>
            <p className="text-sm leading-relaxed">
              Full-Stack Developer and Linux enthusiast passionate about building scalable web applications.
              Specializing in React, Next.js, Node.js, and DevOps. Experienced in creating end-to-end solutions
              from frontend to deployment.
            </p>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">
              Technical Skills
            </h2>
            <div className="text-sm space-y-1">
              <p><strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS</p>
              <p><strong>Backend:</strong> Node.js, Express.js, Python, PostgreSQL</p>
              <p><strong>DevOps:</strong> Docker, Kubernetes, AWS, Ubuntu Server</p>
              <p><strong>Tools:</strong> Git, VS Code, Terminal, Postman</p>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">WeLoveQR</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Modern QR code generator with analytics and bulk generation. React, Node.js, MongoDB.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode Bang</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chrome & Firefox extension for instant dark mode across websites.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Volume Bang</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Browser extension for volume control and audio management across tabs.
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">
              Education
            </h2>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">KIIT University</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bachelor of Technology
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

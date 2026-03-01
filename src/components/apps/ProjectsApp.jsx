import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { projects } from "../../data/projects";
import { ExternalLink, Github } from "lucide-react";

const categories = ["All", "Frontend", "Fullstack", "AI/ML"];

export function ProjectsApp() {
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);

  const filtered = projects.filter(
    (p) => filter === "All" || p.category === filter
  );
  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onEnter = (e) => {
      const card = e.target.closest(".project-card");
      if (card) gsap.to(card, { y: -8, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)", duration: 0.3 });
    };
    const onLeave = (e) => {
      const card = e.target.closest(".project-card");
      if (card) gsap.to(card, { y: 0, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", duration: 0.3 });
    };
    container.addEventListener("mouseenter", onEnter, true);
    container.addEventListener("mouseleave", onLeave, true);
    return () => {
      container.removeEventListener("mouseenter", onEnter, true);
      container.removeEventListener("mouseleave", onLeave, true);
    };
  }, [filtered.length]);

  return (
    <div ref={containerRef} className="p-6 overflow-auto">
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === cat
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {featured && (
          <article
            className="project-card rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-4 transition-shadow"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-3 font-bold text-gray-800 dark:text-gray-100">
              {featured.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {featured.techStack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <a
                href={featured.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
              <a
                href={featured.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((project) => (
            <article
              key={project.id}
              className="project-card rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-4 transition-shadow"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-36 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-bold text-gray-800 dark:text-gray-100 text-sm">
                {project.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.techStack.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Live
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

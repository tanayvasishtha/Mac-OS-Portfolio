import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { skills } from "../../data/skills";

export function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState(skills[0]?.category ?? "");
  const containerRef = useRef(null);

  const activeSkills = skills.find((s) => s.category === activeCategory)?.skills ?? [];

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;
    const bars = container.querySelectorAll(".skill-bar-fill");
    gsap.from(bars, {
      width: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, [activeCategory]);

  return (
    <div className="p-6 overflow-auto" ref={containerRef}>
      <div className="flex gap-2 mb-6 flex-wrap">
        {skills.map((cat) => (
          <button
            key={cat.category}
            type="button"
            onClick={() => setActiveCategory(cat.category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.category
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeSkills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-4">
            <span className="text-2xl w-10 text-center">{skill.icon}</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {skill.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="skill-bar-fill h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

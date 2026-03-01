import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect } from "react";
import { Wifi, Search, Battery } from "lucide-react";
import { ThemeToggle } from "../shared/ThemeToggle";
import { siteConfig } from "../../data/siteConfig";
import { useWindowManagerContext } from "../../context/WindowManagerContext";
import { useDesktop } from "../../context/DesktopContext";

export function Menubar() {
  const formatDateTime = () => {
    const d = new Date();
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const day = d.getDate();
    const time = d.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit" });
    return `${weekday} ${month} ${day} ${time}`;
  };
  const [dateTime, setDateTime] = useState(formatDateTime);
  const { openWindow } = useWindowManagerContext();
  const { appComponents } = useDesktop();

  useGSAP(() => {
    gsap.from(".menubar", { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDateTime(formatDateTime()), 1000);
    return () => clearInterval(t);
  }, []);

  const appIdToComponent = {
    projects: { id: "projects", title: "Projects", componentId: "projects" },
    about: { id: "about", title: "About", componentId: "about" },
    contact: { id: "contact", title: "Contact", componentId: "contact" },
  };

  const handleNavClick = (link) => {
    const app = appIdToComponent[link.appId];
    if (app && appComponents?.[app.componentId]) {
      openWindow(app.id, app.title, appComponents[app.componentId]);
    }
  };

  return (
    <header
      className="menubar fixed top-0 left-0 right-0 z-[100] min-h-9 h-9 flex items-center justify-between px-3 sm:px-4 bg-white/75 dark:bg-white/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-300/40"
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
        paddingRight: "max(0.75rem, env(safe-area-inset-right))",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-5 min-w-0 flex-1">
        <img
          src="/images/appleicon.png"
          alt="Apple"
          className="w-5 h-5 flex-shrink-0 invert opacity-95"
          aria-hidden="true"
        />
        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-800 truncate">
          {siteConfig.ownerName}'s Portfolio
        </span>
        <nav className="hidden sm:flex items-center gap-4 lg:gap-6 ml-1 lg:ml-2 flex-shrink-0">
          {siteConfig.navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link)}
              className="text-sm text-gray-800 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-900 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <Wifi className="w-4 h-4 text-gray-700 dark:text-gray-600 hidden sm:block" aria-hidden="true" />
        <Search className="w-4 h-4 text-gray-700 dark:text-gray-600 hidden sm:block" aria-hidden="true" />
        <Battery className="w-4 h-4 text-gray-700 dark:text-gray-600 hidden sm:block" aria-hidden="true" />
        <div className="[&_svg]:text-gray-700 [&_svg]:dark:text-gray-600">
          <ThemeToggle />
        </div>
        <span className="text-[10px] sm:text-xs text-gray-800 dark:text-gray-700 tabular-nums font-medium">
          {dateTime}
        </span>
      </div>
    </header>
  );
}

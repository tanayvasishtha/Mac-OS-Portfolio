import { useState, useEffect, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowManagerContext } from "../../context/WindowManagerContext";
import { useDesktop } from "../../context/DesktopContext";
import { DesktopIcon } from "./DesktopIcon";
import { WindowManager } from "../Window/WindowManager";
import { wallpapers } from "../../data/wallpapers";

const desktopItems = [
  {
    id: "resume",
    title: "Resume.pdf",
    icon: null,
    iconImage: "/icons/file.svg",
    appId: "contact",
  },
  {
    id: "project-1",
    title: "Project 1 (SnapCast)",
    icon: null,
    iconImage: "/images/project-1.png",
    appId: "projects",
  },
  {
    id: "project-2",
    title: "Project 2 (Converso)",
    icon: null,
    iconImage: "/images/project-1.png",
    appId: "projects",
  },
  {
    id: "project-3",
    title: "Project 3 (PrepWise)",
    icon: null,
    iconImage: "/images/project-1.png",
    appId: "projects",
  },
];

const DEFAULT_GRADIENT = `
  radial-gradient(ellipse 120% 80% at 20% 20%, rgba(120, 140, 200, 0.5) 0%, transparent 50%),
  radial-gradient(ellipse 100% 100% at 80% 80%, rgba(40, 60, 120, 0.6) 0%, transparent 50%),
  radial-gradient(ellipse 80% 60% at 50% 90%, rgba(30, 50, 100, 0.7) 0%, transparent 45%),
  linear-gradient(160deg, #3d4d7a 0%, #2a3560 40%, #1e2847 100%)
`;

export function Desktop() {
  const welcomeRef = useRef(null);
  const { openWindow } = useWindowManagerContext();
  const { appComponents, wallpaperId } = useDesktop();
  const wallpaperConfig = useMemo(
    () => wallpapers.find((w) => w.id === wallpaperId) || wallpapers[0] || { type: "gradient" },
    [wallpaperId]
  );
  const isGradient = wallpaperConfig?.type === "gradient";
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const h = () => setIsMobile(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useGSAP(() => {
    gsap.from(".desktop-icon", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.5,
    });
    gsap.from(".desktop-welcome", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });
  }, []);

  useGSAP(() => {
    const el = welcomeRef.current;
    if (!el) return;

    const onOver = (e) => {
      const letter = e.target.closest(".welcome-letter");
      if (letter) {
        gsap.to(letter, {
          scale: 1.14,
          y: -4,
          duration: 0.18,
          ease: "sine.out",
          overwrite: "auto",
          force3D: true,
        });
      }
    };
    const onOut = (e) => {
      const letter = e.target.closest(".welcome-letter");
      if (letter) {
        gsap.to(letter, {
          scale: 1,
          y: 0,
          duration: 0.12,
          ease: "sine.inOut",
          overwrite: "auto",
          force3D: true,
        });
      }
    };

    el.addEventListener("mouseover", onOver);
    el.addEventListener("mouseout", onOut);
    return () => {
      el.removeEventListener("mouseover", onOver);
      el.removeEventListener("mouseout", onOut);
    };
  }, []);

  const openApp = (appId) => {
    const map = {
      projects: { id: "projects", title: "Projects", componentId: "projects" },
      contact: { id: "contact", title: "Contact", componentId: "contact" },
    };
    const app = map[appId];
    if (app && appComponents?.[app.componentId]) {
      openWindow(app.id, app.title, appComponents[app.componentId]);
    }
  };

  return (
    <div
      className="desktop relative w-full h-full overflow-hidden"
      style={{
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* Wallpaper: gradient or image from Settings */}
      <div
        className="absolute inset-0 bg-[#2d3a5e] transition-opacity duration-300"
        style={
          isGradient
            ? { background: DEFAULT_GRADIENT }
            : {
              backgroundImage: wallpaperConfig.src ? `url(${wallpaperConfig.src})` : undefined,
              backgroundColor: "#2d3a5e",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
        }
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />

      {/* Center welcome text - each letter animates on hover */}
      <div
        ref={welcomeRef}
        className="desktop-welcome absolute inset-0 flex flex-col items-center justify-center cursor-default"
      >
        <p className="welcome-greeting text-white/95 text-base sm:text-lg md:text-xl tracking-wide inline-flex flex-wrap justify-center gap-0.5 px-2">
          {"Hey, welcome to my".split("").map((char, i) => (
            <span
              key={`g-${i}`}
              className="welcome-letter inline-block origin-bottom will-change-transform"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </p>
        <h1
          className="welcome-portfolio font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white mt-2 font-semibold inline-flex flex-wrap justify-center items-end px-2"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {"portfolio".split("").map((letter, i) => (
            <span
              key={`p-${i}`}
              className="welcome-letter welcome-letter-portfolio inline-block origin-bottom will-change-transform h-[0.55em] overflow-visible align-bottom"
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Left: Resume.pdf */}
      <div className="absolute top-24 sm:top-28 md:top-32 left-4 sm:left-6 md:left-8 lg:left-12 flex flex-col gap-4 sm:gap-6">
        {desktopItems.slice(0, 1).map((item) => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            iconImage={item.iconImage}
            label={item.title}
            onDoubleClick={() => openApp(item.appId)}
            onOpen={isMobile ? () => openApp(item.appId) : undefined}
          />
        ))}
      </div>

      {/* Right: Project folders stacked */}
      <div className="absolute top-24 sm:top-28 md:top-32 right-4 sm:right-6 md:right-8 lg:right-12 flex flex-col gap-4 sm:gap-6">
        {desktopItems.slice(1, 4).map((item) => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            iconImage={item.iconImage}
            label={item.title}
            onDoubleClick={() => openApp(item.appId)}
            onOpen={isMobile ? () => openApp(item.appId) : undefined}
          />
        ))}
      </div>

      <WindowManager />
    </div>
  );
}

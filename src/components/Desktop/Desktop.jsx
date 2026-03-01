import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
    appId: "resume",
  },
];

export function Desktop() {
  const welcomeRef = useRef(null);
  const videoRef = useRef(null);
  const { openWindow } = useWindowManagerContext();
  const { appComponents, wallpaperId } = useDesktop();
  const wallpaperConfig = useMemo(
    () => wallpapers.find((w) => w.id === wallpaperId) || wallpapers[0],
    [wallpaperId]
  );
  const isVideo = wallpaperConfig?.type === "video";
  const videoSrc = isVideo ? wallpaperConfig?.src : null;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const h = () => setIsMobile(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Aggressive video play: try on every ready state, retries, and when tab becomes visible
  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.setAttribute("muted", "");
      video.volume = 0;
      const p = video.play();
      if (p && typeof p.then === "function") p.catch(() => { });
    };

    const events = ["loadstart", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing"];
    const onReady = () => tryPlay();
    events.forEach((ev) => video.addEventListener(ev, onReady));

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryPlay();
    const raf = requestAnimationFrame(() => tryPlay());
    const t1 = setTimeout(tryPlay, 100);
    const t2 = setTimeout(tryPlay, 400);
    const t3 = setTimeout(tryPlay, 1200);
    const t4 = setTimeout(tryPlay, 2500);
    const t5 = setTimeout(tryPlay, 5000);

    return () => {
      events.forEach((ev) => video.removeEventListener(ev, onReady));
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [videoSrc]);

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

  const openApp = useCallback(
    (appId) => {
      const map = {
        projects: { id: "projects", title: "Projects", componentId: "projects" },
        contact: { id: "contact", title: "Contact", componentId: "contact" },
        resume: { id: "resume", title: "Resume.pdf", componentId: "resume" },
      };
      const app = map[appId];
      if (app && appComponents?.[app.componentId]) {
        openWindow(app.id, app.title, appComponents[app.componentId]);
      }
    },
    [openWindow, appComponents]
  );

  return (
    <div
      className="desktop relative w-full h-full overflow-hidden"
      style={{
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        backgroundColor: isVideo ? "transparent" : undefined,
      }}
    >
      {isVideo && videoSrc ? (
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
        />
      ) : null}
      {!isVideo && wallpaperConfig?.src ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${wallpaperConfig.src})` }}
        />
      ) : null}
      {!wallpaperConfig?.src ? (
        <div className="absolute inset-0 bg-black" />
      ) : null}

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

      {/* Right: optional desktop icons (e.g. project shortcuts when you add them) */}
      {desktopItems.length > 1 && (
        <div className="absolute top-24 sm:top-28 md:top-32 right-4 sm:right-6 md:right-8 lg:right-12 flex flex-col gap-4 sm:gap-6">
          {desktopItems.slice(1).map((item) => (
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
      )}

      <WindowManager />
    </div>
  );
}

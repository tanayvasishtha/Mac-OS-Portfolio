import { useRef, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { dockItems } from "../../data/dockItems";
import { useWindowManagerContext } from "../../context/WindowManagerContext";
import { useDesktop } from "../../context/DesktopContext";
import { DockIcon } from "./DockIcon";

const appItems = dockItems.filter((i) => i.type === "app");
/** All items shown in the dock (macOS-style: full dock, magnification on hover) */
const mainDockItems = dockItems;

const MAGNIFY = 1.52;
const MAGNIFY_RADIUS = 2.2;

export function Dock({ onOpenLaunchpad }) {
  const dockContainerRef = useRef(null);
  const { openWindow, isOpen, restoreWindow, isMinimized } = useWindowManagerContext();
  const { appComponents } = useDesktop();

  useGSAP(() => {
    gsap.from(".dock", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    const container = dockContainerRef.current;
    if (!container) return;

    let cleanup = () => {};
    const frameId = requestAnimationFrame(() => {
      const icons = container.querySelectorAll(".dock-icon-wrap");
      if (!icons.length) return;

      const getScale = (distance) => {
        if (distance <= 0) return MAGNIFY;
        const falloff = Math.max(0, 1 - distance / MAGNIFY_RADIUS);
        return 1 + (MAGNIFY - 1) * falloff;
      };

      const onMouseMove = (e) => {
        const mouseX = e.clientX;
        let nearest = 0;
        let nearestDist = Infinity;
        icons.forEach((icon, j) => {
          const r = icon.getBoundingClientRect();
          const centerX = r.left + r.width / 2;
          const d = Math.abs(mouseX - centerX);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = j;
          }
        });
        const centerIndex = nearest;
        icons.forEach((icon, j) => {
          const distance = Math.abs(j - centerIndex);
          const scale = getScale(distance);
          gsap.to(icon, { scale, duration: 0.18, ease: "power2.out", overwrite: "auto" });
        });
      };

      const onMouseLeave = () => {
        gsap.to(icons, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      };

      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
      cleanup = () => {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    return () => {
      cancelAnimationFrame(frameId);
      cleanup();
    };
  }, []);

  const handleDockClick = useCallback(
    (item) => {
      if (item.type === "launchpad") {
        onOpenLaunchpad?.();
        return;
      }
      if (item.type === "trash" || item.type === "finder") return;
      if (item.type === "app" && item.componentId) {
        const component = appComponents?.[item.componentId];
        if (isMinimized(item.id)) restoreWindow(item.id);
        else if (isOpen(item.id)) restoreWindow(item.id);
        else if (component) openWindow(item.id, item.title, component);
      }
    },
    [onOpenLaunchpad, isMinimized, isOpen, restoreWindow, openWindow, appComponents]
  );

  return (
    <>
      {/* Desktop Dock - expandable macOS-style with magnification */}
      <div
        className="dock fixed left-1/2 -translate-x-1/2 z-50 hidden md:block"
        style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div
          ref={dockContainerRef}
          className="flex items-end gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-[18px] bg-white/20 backdrop-blur-2xl border border-white/25 max-w-[90vw]"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.1) inset" }}
        >
          {mainDockItems.map((item) => (
            <DockIcon
              key={item.id}
              item={item}
              isActive={item.type === "app" && isOpen(item.id)}
              onClick={handleDockClick}
            />
          ))}
        </div>
      </div>

      {/* Mobile bottom tab bar - iOS style, 44px touch targets, safe area */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
        style={{
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        {appItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              const component = appComponents?.[item.componentId];
              if (isMinimized(item.id)) restoreWindow(item.id);
              else if (isOpen(item.id)) restoreWindow(item.id);
              else if (component) openWindow(item.id, item.title, component);
            }}
            className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] p-2 rounded-xl flex-1 max-w-[80px] ${isOpen(item.id) ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
              }`}
          >
            {item.iconImage ? (
              <img src={item.iconImage} alt="" className="w-7 h-7 object-contain flex-shrink-0" />
            ) : (
              <span className="text-2xl">{item.icon}</span>
            )}
            <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">{item.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}

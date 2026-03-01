import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { dockItems } from "../../data/dockItems";

const launchpadApps = dockItems.filter(
  (i) => i.type === "app" || i.type === "launchpad"
);

export function Launchpad({ isOpen, onClose, onSelectApp }) {
  useGSAP(() => {
    if (!isOpen) return;
    gsap.from(".launchpad-icon", {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "back.out(2)",
    });
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-12"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-label="Launchpad"
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl">
        {launchpadApps.map((item) => (
          <button
            key={item.id}
            type="button"
            className="launchpad-icon flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px]"
            onClick={() => {
              if (item.type === "launchpad") return;
              if (item.type === "app") onSelectApp?.(item);
              onClose();
            }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-white/20 dark:bg-gray-700/40 border border-white/30 overflow-hidden">
              {item.iconImage ? (
                <img src={item.iconImage} alt="" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              ) : (
                <span className="text-3xl sm:text-4xl">{item.icon ?? "⊞"}</span>
              )}
            </div>
            <span className="text-xs sm:text-sm text-white font-medium text-center">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

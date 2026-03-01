import { useMemo } from "react";
import { useDesktop } from "../../context/DesktopContext";
import { wallpapers } from "../../data/wallpapers";

const GRADIENT_PREVIEW =
  "linear-gradient(160deg, #3d4d7a 0%, #2a3560 40%, #1e2847 100%)";

export function SettingsApp() {
  const { wallpaperId, setWallpaper } = useDesktop();

  const handleSelect = (id) => {
    setWallpaper(id);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="p-6 overflow-auto">
        <section>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Desktop & Screen Saver
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Choose a wallpaper for your desktop.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {wallpapers.map((w) => {
              const isSelected = wallpaperId === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => handleSelect(w.id)}
                  className={`relative rounded-xl overflow-hidden border-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${isSelected
                      ? "border-blue-500 ring-2 ring-blue-500/30"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                >
                  {w.type === "gradient" ? (
                    <div
                      className="aspect-video w-full"
                      style={{ background: GRADIENT_PREVIEW }}
                    />
                  ) : (
                    <img
                      src={w.src}
                      alt=""
                      className="aspect-video w-full object-cover bg-gray-200 dark:bg-gray-700"
                      loading="lazy"
                      onError={(e) => {
                        const el = e.target;
                        el.onerror = null;
                        el.style.background = GRADIENT_PREVIEW;
                        el.style.backgroundSize = "cover";
                        el.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                      }}
                    />
                  )}
                  <span className="absolute bottom-0 left-0 right-0 py-1.5 px-2 text-xs font-medium text-white bg-black/50 truncate">
                    {w.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

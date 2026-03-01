import { memo, useCallback, useState } from "react";

const FALLBACK_ICONS = { finder: "/images/folder.png" };
// Icons that use JPG (no transparency) – clip to rounded rect so opaque edges aren’t visible
const OPAQUE_ICON_IDS = ["spotify"];

export const DockIcon = memo(function DockIcon({ item, isActive, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  const fallbackSrc = FALLBACK_ICONS[item.id];
  const usePrimary = item.iconImage && !imgError;
  const useFallback = item.iconImage && imgError && fallbackSrc && !fallbackError;
  const displaySrc = useFallback ? fallbackSrc : usePrimary ? item.iconImage : null;
  const useRoundedClip = OPAQUE_ICON_IDS.includes(item.id);

  const handleClick = useCallback(() => {
    if (item.type === "external" && item.externalUrl) {
      window.open(item.externalUrl, "_blank");
      return;
    }
    onClick(item);
  }, [item, onClick]);

  const handleImgError = useCallback(() => {
    if (displaySrc === fallbackSrc) setFallbackError(true);
    else if (fallbackSrc) setImgError(true);
  }, [displaySrc, fallbackSrc]);

  return (
    <div
      className="dock-icon-wrap flex flex-col items-center justify-end cursor-pointer origin-bottom scale-100 will-change-transform"
      onClick={handleClick}
    >
      <div className="relative group flex flex-col items-center">
        {displaySrc ? (
          <div className={`w-10 h-10 flex-shrink-0 overflow-hidden ${useRoundedClip ? "rounded-xl" : ""}`}>
            <img
              src={displaySrc}
              alt=""
              className="w-full h-full object-contain"
              onError={handleImgError}
            />
          </div>
        ) : !item.iconImage ? (
          <span className="w-10 h-10 flex items-center justify-center text-2xl">⊞</span>
        ) : (
          <span className="w-10 h-10 flex items-center justify-center text-xl text-gray-500">?</span>
        )}
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-gray-600 dark:bg-gray-500" />
        )}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-gray-800/90 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {item.title}
        </div>
      </div>
    </div>
  );
});

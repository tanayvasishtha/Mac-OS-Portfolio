/**
 * macOS-style window traffic lights: Close (red), Minimize (yellow), Maximize (green).
 * Used in every app window opened from the dock or desktop.
 */
export function TrafficLights({ onClose, onMinimize, onMaximize }) {
  const btn =
    "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-150 hover:brightness-110 active:scale-95 shrink-0 border shadow-sm text-gray-800/70";
  return (
    <div
      id="window-controls"
      className="flex gap-2 items-center shrink-0"
      role="group"
      aria-label="Window controls"
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className={`${btn} bg-[#ff5f57] border-[#e0443e]/80 hover:bg-[#ff5f57]/95`}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Minimize */}
      <button
        type="button"
        aria-label="Minimize"
        onClick={(e) => {
          e.stopPropagation();
          onMinimize?.();
        }}
        className={`${btn} bg-[#febc2e] border-[#d6a123]/80 hover:bg-[#febc2e]/95`}
      >
        <svg width="8" height="2" viewBox="0 0 8 2" fill="none" aria-hidden="true">
          <path d="M0 1h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Maximize / Zoom (single square, macOS style) */}
      <button
        type="button"
        aria-label="Maximize"
        onClick={(e) => {
          e.stopPropagation();
          onMaximize?.();
        }}
        className={`${btn} bg-[#28c840] border-[#1aab29]/80 hover:bg-[#28c840]/95`}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}

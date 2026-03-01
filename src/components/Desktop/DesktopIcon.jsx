export function DesktopIcon({ icon, iconImage, label, onDoubleClick, onOpen }) {
  const handleClick = () => {
    if (onOpen) onOpen();
    else return;
  };
  return (
    <button
      type="button"
      onDoubleClick={onOpen ? undefined : onDoubleClick}
      onClick={onOpen ? handleClick : undefined}
      className="desktop-icon flex flex-col items-center justify-center w-16 sm:w-20 gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-white/20 transition-colors cursor-default select-none group min-h-[44px] min-w-[44px]"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white/25 backdrop-blur border border-white/30 group-hover:ring-2 group-hover:ring-white/50 overflow-hidden flex-shrink-0">
        {iconImage ? (
          <img src={iconImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl sm:text-4xl">{icon}</span>
        )}
      </div>
      <span className="text-[10px] sm:text-xs text-center text-white drop-shadow-md font-medium max-w-[72px] sm:max-w-[88px] truncate">
        {label}
      </span>
    </button>
  );
}

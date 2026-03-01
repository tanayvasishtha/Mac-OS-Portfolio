import { useEffect } from "react";
import { useWindowManagerContext } from "../../context/WindowManagerContext";
import { Window } from "./Window";

export function WindowManager() {
  const {
    openWindows,
    focusedId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
  } = useWindowManagerContext();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "w") {
        e.preventDefault();
        if (focusedId) closeWindow(focusedId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedId, closeWindow]);

  return (
    <>
      {openWindows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          zIndex={win.zIndex}
          position={win.position}
          size={win.size}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onPositionChange={updatePosition}
          onSizeChange={updateSize}
        >
          {win.component}
        </Window>
      ))}
    </>
  );
}

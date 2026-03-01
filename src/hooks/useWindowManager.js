import { useState, useCallback } from "react";

const DEFAULT_POSITION = { top: 60, left: 80 };
const OFFSET = 28;
const DEFAULT_SIZE = { width: 700, height: 520 };
const WINDOW_Z_BASE = 60;

export function useWindowManager() {
  const [openWindows, setOpenWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [focusedId, setFocusedId] = useState(null);

  const getNextPosition = useCallback((index) => ({
    top: DEFAULT_POSITION.top + index * OFFSET,
    left: DEFAULT_POSITION.left + index * OFFSET,
  }), []);

  const openWindow = useCallback((id, title, component) => {
    setOpenWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      const nextZ = prev.length === 0 ? WINDOW_Z_BASE : Math.max(...prev.map((w) => w.zIndex), WINDOW_Z_BASE) + 1;
      if (exists) {
        return prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w
        );
      }
      const position = getNextPosition(prev.length);
      return [
        ...prev,
        {
          id,
          title,
          component,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZ,
          position,
          size: DEFAULT_SIZE,
        },
      ];
    });
    setNextZIndex((z) => z + 1);
    setFocusedId(id);
  }, [getNextPosition]);

  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  const focusWindow = useCallback((id) => {
    let newZ = 0;
    setOpenWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), WINDOW_Z_BASE);
      newZ = maxZ + 1;
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: newZ } : w
      );
    });
    setNextZIndex(newZ + 1);
    setFocusedId(id);
  }, []);

  const restoreWindow = useCallback((id) => {
    let newZ = 0;
    setNextZIndex((z) => {
      newZ = z + 1;
      return newZ;
    });
    setOpenWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), WINDOW_Z_BASE);
      const z = maxZ + 1;
      return prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: z } : w
      );
    });
    setFocusedId(id);
  }, []);

  const updatePosition = useCallback((id, position) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  const updateSize = useCallback((id, size) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  }, []);

  const isOpen = useCallback(
    (id) => openWindows.some((w) => w.id === id),
    [openWindows]
  );
  const isMinimized = useCallback(
    (id) => openWindows.find((w) => w.id === id)?.isMinimized ?? false,
    [openWindows]
  );

  return {
    openWindows,
    focusedId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    restoreWindow,
    updatePosition,
    updateSize,
    isOpen,
    isMinimized,
  };
}

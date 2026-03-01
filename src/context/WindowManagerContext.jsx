import { createContext, useContext } from "react";
import { useWindowManager } from "../hooks/useWindowManager";

const WindowManagerContext = createContext(null);

export function WindowManagerProvider({ children }) {
  const value = useWindowManager();
  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManagerContext() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManagerContext must be used within WindowManagerProvider");
  return ctx;
}

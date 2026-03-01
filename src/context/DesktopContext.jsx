import { createContext, useContext } from "react";

export const DesktopContext = createContext(null);

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopContext.Provider");
  return ctx;
}

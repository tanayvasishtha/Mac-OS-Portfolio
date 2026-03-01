/**
 * App shell: desktop, dock, launchpad, window manager, wallpaper state.
 * Feature index (where to find each feature): see FEATURES.md in project root.
 */
import { useState, useMemo, useCallback, lazy, Suspense, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menubar } from "./components/Menubar/Menubar";
import { Desktop } from "./components/Desktop/Desktop";
import { Dock } from "./components/Dock/Dock";
import { Launchpad } from "./components/Launchpad/Launchpad";
import { DesktopContext } from "./context/DesktopContext";
import { WindowManagerProvider, useWindowManagerContext } from "./context/WindowManagerContext";
import { WALLPAPER_STORAGE_KEY } from "./data/wallpapers";

const AboutApp = lazy(() =>
  import("./components/apps/AboutApp.jsx").then((m) => ({ default: m.AboutApp }))
);
const ProjectsApp = lazy(() =>
  import("./components/apps/ProjectsApp.jsx").then((m) => ({ default: m.ProjectsApp }))
);
const SkillsApp = lazy(() =>
  import("./components/apps/SkillsApp.jsx").then((m) => ({ default: m.SkillsApp }))
);
const ContactApp = lazy(() =>
  import("./components/apps/ContactApp.jsx").then((m) => ({ default: m.ContactApp }))
);
const GalleryApp = lazy(() =>
  import("./components/apps/GalleryApp.jsx").then((m) => ({ default: m.GalleryApp }))
);
const TerminalApp = lazy(() =>
  import("./components/apps/TerminalApp.jsx").then((m) => ({ default: m.TerminalApp }))
);
const NotepadApp = lazy(() =>
  import("./components/apps/NotepadApp.jsx").then((m) => ({ default: m.NotepadApp }))
);
const CalculatorApp = lazy(() =>
  import("./components/apps/CalculatorApp.jsx").then((m) => ({ default: m.CalculatorApp }))
);
const SpotifyApp = lazy(() =>
  import("./components/apps/SpotifyApp.jsx").then((m) => ({ default: m.SpotifyApp }))
);
const SettingsApp = lazy(() =>
  import("./components/apps/SettingsApp.jsx").then((m) => ({ default: m.SettingsApp }))
);
const BrowserApp = lazy(() =>
  import("./components/apps/BrowserApp.jsx").then((m) => ({ default: m.BrowserApp }))
);
const TrashApp = lazy(() =>
  import("./components/apps/TrashApp.jsx").then((m) => ({ default: m.TrashApp }))
);
const ResumeApp = lazy(() =>
  import("./components/apps/ResumeApp.jsx").then((m) => ({ default: m.ResumeApp }))
);
const FinderApp = lazy(() =>
  import("./components/apps/FinderApp.jsx").then((m) => ({ default: m.FinderApp }))
);
const MinesweeperApp = lazy(() =>
  import("./components/apps/MinesweeperApp.jsx").then((m) => ({ default: m.MinesweeperApp }))
);

const Fallback = () => (
  <div className="flex items-center justify-center p-8 text-gray-500">Loading...</div>
);

function AppContent() {
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [wallpaperId, setWallpaperState] = useState(() => {
    if (typeof window === "undefined") return "wallpaper-1";
    return window.localStorage?.getItem(WALLPAPER_STORAGE_KEY) || "wallpaper-1";
  });
  const { openWindow } = useWindowManagerContext();

  const onOpenLaunchpad = useCallback(() => setLaunchpadOpen(true), []);
  const onCloseLaunchpad = useCallback(() => setLaunchpadOpen(false), []);

  const setWallpaper = useCallback((id) => {
    setWallpaperState(id);
    try {
      window.localStorage?.setItem(WALLPAPER_STORAGE_KEY, id);
    } catch (_) { }
  }, []);

  const appComponents = useMemo(
    () => ({
      about: (
        <Suspense fallback={<Fallback />}>
          <AboutApp />
        </Suspense>
      ),
      projects: (
        <Suspense fallback={<Fallback />}>
          <ProjectsApp />
        </Suspense>
      ),
      skills: (
        <Suspense fallback={<Fallback />}>
          <SkillsApp />
        </Suspense>
      ),
      contact: (
        <Suspense fallback={<Fallback />}>
          <ContactApp />
        </Suspense>
      ),
      gallery: (
        <Suspense fallback={<Fallback />}>
          <GalleryApp />
        </Suspense>
      ),
      terminal: (
        <Suspense fallback={<Fallback />}>
          <TerminalApp />
        </Suspense>
      ),
      notepad: (
        <Suspense fallback={<Fallback />}>
          <NotepadApp />
        </Suspense>
      ),
      calculator: (
        <Suspense fallback={<Fallback />}>
          <CalculatorApp />
        </Suspense>
      ),
      spotify: (
        <Suspense fallback={<Fallback />}>
          <SpotifyApp />
        </Suspense>
      ),
      settings: (
        <Suspense fallback={<Fallback />}>
          <SettingsApp />
        </Suspense>
      ),
      safari: (
        <Suspense fallback={<Fallback />}>
          <BrowserApp />
        </Suspense>
      ),
      trash: (
        <Suspense fallback={<Fallback />}>
          <TrashApp />
        </Suspense>
      ),
      resume: (
        <Suspense fallback={<Fallback />}>
          <ResumeApp />
        </Suspense>
      ),
      finder: (
        <Suspense fallback={<Fallback />}>
          <FinderApp />
        </Suspense>
      ),
      minesweeper: (
        <Suspense fallback={<Fallback />}>
          <MinesweeperApp />
        </Suspense>
      ),
    }),
    []
  );

  const desktopContextValue = useMemo(
    () => ({ appComponents, wallpaperId, setWallpaper }),
    [appComponents, wallpaperId, setWallpaper]
  );

  const handleLaunchpadSelect = useCallback(
    (item) => {
      if (item.type === "app" && item.componentId) {
        openWindow(item.id, item.title, appComponents[item.componentId]);
      }
    },
    [openWindow, appComponents]
  );

  return (
    <DesktopContext.Provider value={desktopContextValue}>
      <Menubar />
      <Desktop />
      <Dock onOpenLaunchpad={onOpenLaunchpad} />
      <Launchpad
        isOpen={launchpadOpen}
        onClose={onCloseLaunchpad}
        onSelectApp={handleLaunchpadSelect}
      />
    </DesktopContext.Provider>
  );
}

function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  useGSAP(() => {
    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 2.5,
      onComplete,
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="loader fixed inset-0 z-[500] flex items-center justify-center bg-gray-900 dark:bg-black"
    >
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/appleicon.png"
          alt=""
          className="w-16 h-16 opacity-95"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const onLoaderComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Loader onComplete={onLoaderComplete} />}
      {!loading && (
        <WindowManagerProvider>
          <AppContent />
        </WindowManagerProvider>
      )}
    </>
  );
}

export default App;

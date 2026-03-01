import { useState } from "react";
import {
  Folder,
  FileText,
  Image,
  Music,
  Globe,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Home,
  FolderOpen,
  Briefcase,
  Download,
  Layers,
} from "lucide-react";
import { useWindowManagerContext } from "../../context/WindowManagerContext";
import { useDesktop } from "../../context/DesktopContext";

const SIDEBAR_ITEMS = [
  { id: "desktop", label: "Desktop", icon: Home },
  { id: "documents", label: "Documents", icon: Folder },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "applications", label: "Applications", icon: Layers },
  { id: "downloads", label: "Downloads", icon: Download },
];

const FOLDER_CONTENTS = {
  desktop: [
    { name: "Resume.pdf", icon: FileText, type: "file", action: "resume" },
  ],
  documents: [
    { name: "Resume.pdf", icon: FileText, type: "file", action: "resume" },
  ],
  projects: [
    { name: "WeLoveQR", icon: Globe, type: "folder", url: "https://weloveqr.netlify.app" },
    { name: "Dark Mode Bang", icon: Globe, type: "folder", url: "https://chromewebstore.google.com/detail/dark-mode-bang-universal/hnnplkbhhlfopkkhfepdiljdbclfbpjh" },
    { name: "Volume Bang", icon: Globe, type: "folder", url: "https://chromewebstore.google.com/detail/volume-bang-premium-audio/ancjplaiedoominjbebhdgjipcgfbopl" },
    { name: "Speed Bang", icon: Globe, type: "folder", url: "https://chromewebstore.google.com/detail/speedbang-multiplatform-v/kaacodjcoaepldmhnpgodhafbcmlkfgo" },
    { name: "Ubuntu Portfolio", icon: Globe, type: "folder", url: "https://github.com/tanayvasishtha/Ubuntu-Theme-Portfolio" },
  ],
  applications: [
    { name: "Safari", icon: Globe, action: "safari" },
    { name: "Terminal", icon: FileText, action: "terminal" },
    { name: "Notes", icon: FileText, action: "notepad" },
    { name: "Calculator", icon: FileText, action: "calculator" },
    { name: "Spotify", icon: Music, action: "spotify" },
    { name: "Photos", icon: Image, action: "gallery" },
    { name: "Projects", icon: Briefcase, action: "projects" },
    { name: "Settings", icon: Folder, action: "settings" },
  ],
  downloads: [
    { name: "Resume.pdf", icon: FileText, type: "file", url: "/files/Resume.pdf" },
  ],
};

export function FinderApp() {
  const [currentFolder, setCurrentFolder] = useState("desktop");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [history, setHistory] = useState(["desktop"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { openWindow } = useWindowManagerContext();
  const { appComponents } = useDesktop();

  const contents = FOLDER_CONTENTS[currentFolder] || [];
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const navigateTo = (folderId) => {
    setCurrentFolder(folderId);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (canGoBack) {
      const idx = historyIndex - 1;
      setHistoryIndex(idx);
      setCurrentFolder(history[idx]);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const idx = historyIndex + 1;
      setHistoryIndex(idx);
      setCurrentFolder(history[idx]);
    }
  };

  const handleItemClick = (item) => {
    if (item.action && appComponents?.[item.action]) {
      const titles = {
        resume: "Resume.pdf",
        safari: "Safari",
        terminal: "Terminal",
        notepad: "Notes",
        calculator: "Calculator",
        spotify: "Spotify",
        gallery: "Photos",
        projects: "Projects",
        settings: "System Settings",
      };
      openWindow(item.action, titles[item.action] || item.action, appComponents[item.action]);
    } else if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  const currentLabel = SIDEBAR_ITEMS.find((s) => s.id === currentFolder)?.label || currentFolder;

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goBack}
            disabled={!canGoBack}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goForward}
            disabled={!canGoForward}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 truncate">
          Finder &gt; {currentLabel}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg ${viewMode === "grid" ? "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg ${viewMode === "list" ? "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-44 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2">
          <p className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Favorites
          </p>
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${currentFolder === item.id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 overflow-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {contents.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-gray-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center truncate w-full">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {contents.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          {contents.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
              <FolderOpen className="w-12 h-12 mb-2 opacity-50" />
              <p>This folder is empty</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

# Feature index

Use this to jump straight to where each feature is implemented.

| Feature | Where to look |
|--------|----------------|
| **App shell, lazy-loaded apps, wallpaper state** | `src/App.jsx` |
| **Menubar (Apple menu, app menu)** | `src/components/Menubar/Menubar.jsx` |
| **Desktop (wallpaper, welcome text, desktop icons)** | `src/components/Desktop/Desktop.jsx` |
| **Dock (icons, magnification, open/restore)** | `src/components/Dock/Dock.jsx` |
| **Dock icon (fallback images, click)** | `src/components/Dock/DockIcon.jsx` |
| **Launchpad (grid of apps)** | `src/components/Launchpad/Launchpad.jsx` |
| **Window (traffic lights, drag, resize, maximize)** | `src/components/Window/Window.jsx` |
| **Window manager (open/close/minimize/maximize)** | `src/components/Window/WindowManager.jsx`, `src/hooks/useWindowManager.js` |
| **Traffic lights (close, minimize, maximize)** | `src/components/shared/TrafficLights.jsx` |
| **Terminal (banner, commands, history, open app)** | `src/components/apps/TerminalApp.jsx` |
| **System Settings (wallpaper picker)** | `src/components/apps/SettingsApp.jsx` |
| **Wallpaper list and persistence** | `src/data/wallpapers.js`, `src/App.jsx` (setWallpaper), `src/components/Desktop/Desktop.jsx` (render) |
| **Dock items (Finder, apps, external links)** | `src/data/dockItems.js` |
| **Projects data** | `src/data/projects.js` |
| **Skills data** | `src/data/skills.js` |
| **Site config (name, nav)** | `src/data/siteConfig.js` |
| **About, Projects, Skills, Contact, Gallery** | `src/components/apps/AboutApp.jsx`, `ProjectsApp.jsx`, etc. |
| **Notes, Calculator, Spotify** | `src/components/apps/NotepadApp.jsx`, `CalculatorApp.jsx`, `SpotifyApp.jsx` |

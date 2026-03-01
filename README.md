# Mac-OS-Portfolio

A desktop portfolio that replicates the macOS experience in the browser. It demonstrates a full windowing system, interactive Terminal, dock with magnification, system settings, and app-style content—all built to showcase front-end and product thinking in a single project.

---

## Why this portfolio works

**Stand out in interviews.** Recruiters and hiring managers see many static portfolios. This one is a working desktop: visitors open apps from the dock, use a real-feel Terminal, change the wallpaper in Settings, and move and resize windows. It shows you can ship a complex, stateful UI and think in systems (windows, focus, persistence) rather than single pages.

**Concrete talking points.** You can point to specific features and explain trade-offs: lazy-loaded apps, centralized window state, localStorage for preferences, accessibility of window controls, or how you kept the Terminal responsive while supporting history and multiple commands. Each of these maps to real product and engineering decisions.

**Reusable as a template.** Clone the repo, swap in your content (projects, skills, about, links), and you have a differentiated portfolio without rebuilding the desktop layer. The structure (dock items, apps, wallpapers) is data-driven so customization stays in config and content, not deep in components.

---

## What’s included

- **Desktop:** Wallpaper (gradient or image), welcome copy, and desktop shortcuts that open apps.
- **Dock:** Full set of icons with hover magnification; opens apps, restores minimized windows, and supports external links (e.g. GitHub, LinkedIn).
- **Launchpad:** Grid launcher for all apps, consistent with the dock.
- **Windows:** Draggable, resizable, minimizable, maximizable; traffic-light controls (close, minimize, maximize) and smooth open/transition behavior.
- **Terminal:** Interactive shell with a fixed banner (Bitcoin + name), full command set (help, whois, projects, open app, social links, easter eggs), command history, and the ability to open other apps from the prompt.
- **System Settings:** Wallpaper picker; selection is persisted in localStorage and applied across the desktop.
- **Apps:** About, Projects, Skills, Contact, Gallery, Notes, Calculator, Spotify (link-out), and Terminal—each opened in its own window.

Tech stack: React, Vite, Tailwind CSS, GSAP. No backend; suitable for static or static-export hosting.

---

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`). Use the dock or Launchpad to open apps; open Terminal and run `help` to see commands.

**Production build:**

```bash
npm run build
```

Serve the `dist` folder with any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## Customizing for your own use

- **Identity and copy:** `src/data/siteConfig.js` (name, nav), and copy in About, Contact, and Terminal (e.g. `TerminalApp.jsx` banner and command output).
- **Dock and apps:** `src/data/dockItems.js` (order, labels, icons, external URLs). Add or remove entries; ensure each app has a component and is registered in `App.jsx`.
- **Projects and skills:** `src/data/projects.js`, `src/data/skills.js`. Point images and links to your work.
- **Wallpapers:** Add images under `public/wallpapers/` and register them in `src/data/wallpapers.js`.
- **Terminal commands and links:** Edit the command list and handlers in `src/components/apps/TerminalApp.jsx` (e.g. social URLs, project links, `open` app mapping).

For a concise map of where each feature lives, see **FEATURES.md**.

---

## License

MIT.

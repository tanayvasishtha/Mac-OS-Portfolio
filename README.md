# Mac-OS-Portfolio

A desktop portfolio that replicates the macOS experience in the browser. It demonstrates a full windowing system, interactive Terminal, dock with magnification, system settings, and app-style content—all built to showcase front-end and product thinking in a single project.

---

## Why this portfolio works

**Stand out in interviews.** Recruiters and hiring managers see many static portfolios. This one is a working desktop: visitors open apps from the dock, use a real-feel Terminal, change the wallpaper in Settings, and move and resize windows. It shows you can ship a complex, stateful UI and think in systems (windows, focus, persistence) rather than single pages.

**Concrete talking points.** You can point to specific features and explain trade-offs: lazy-loaded apps, centralized window state, localStorage for preferences, accessibility of window controls, or how you kept the Terminal responsive while supporting history and multiple commands. Each of these maps to real product and engineering decisions.

**Reusable as a template.** Clone the repo, swap in your content (projects, skills, about, links), and you have a differentiated portfolio without rebuilding the desktop layer. The structure (dock items, apps, wallpapers) is data-driven so customization stays in config and content, not deep in components.

---

## What’s included

- **Desktop:** Wallpaper (image or video), welcome copy, and desktop shortcuts that open apps. Supports both static images and looping video wallpapers.
- **Dock:** Full set of icons with hover magnification; opens apps, restores minimized windows, and supports external links (GitHub, LinkedIn, X/Twitter). Custom icons for Calculator, Notes, Settings, Spotify, Safari.
- **Launchpad:** Grid launcher for all apps, consistent with the dock.
- **Windows:** Draggable, resizable, minimizable, maximizable; traffic-light controls (close, minimize, maximize) and smooth open/transition behavior. Windows open above the dock with default size 700x520 and minimum 420x320.
- **Terminal:** Interactive shell with ASCII art banner, full command set (help, whois, projects, open app, social links, easter eggs), command history, and the ability to open other apps from the prompt. Year badge in banner and stable rendering even under heavy output.
- **System Settings:** Wallpaper picker with image and video options; selection is persisted in localStorage and applied across the desktop.
- **Apps:**
  - **About, Skills, Contact, Gallery** – Content sections with your info.
  - **Projects** – Project cards (WeLoveQR, Dark Mode Bang, Volume Bang, Speed Bang, Portfolio Website) with category filters, featured layout, and links to live demos and repos.
  - **Notes** – Simple notepad with Save button that opens a mailto link to email the note.
  - **Calculator** – Basic and advanced modes; scientific functions (sqrt, power, sin, cos, tan, pi, e, ln, log); keyboard support.
  - **Spotify** – Embedded Build Inc playlist player (in-app playback, Ubuntu portfolio style).
  - **Safari** – In-app browser with Chrome-like behavior: iframe for Google (homepage and search), custom placeholders for GitHub, Stack Overflow, MDN, Ubuntu, and iframe for other embeddable sites.
  - **Terminal** – Full command-line experience.
  - **Finder** – Minimal file-browser–style app entry point.
  - **Resume** – In-window PDF viewer for your CV (no download required).
  - **Trash** – Fun, non-destructive “trash” app with playful fake items.
  - **Minesweeper** – Classic Minesweeper mini-game with first-click-safe boards, coin rewards, difficulty levels, persistent best times, and win-rate stats.

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
- **Wallpapers:** Add images or videos under `public/wallpapers/` and register them in `src/data/wallpapers.js`. Use `type: "image"` or `type: "video"` for each entry. Note: Video files over 100MB cannot be committed to GitHub; add them locally or host elsewhere for deployment.
- **Terminal commands and links:** Edit the command list and handlers in `src/components/apps/TerminalApp.jsx` (e.g. social URLs, project links, `open` app mapping).

For a concise map of where each feature lives, see **FEATURES.md**.

**Assets:**
- **Icons:** `public/icons/` – Calculator.png, Notes.webp, Settings.svg, Spotify.jpg, and others. Referenced in `dockItems.js`.
- **Wallpapers:** `public/wallpapers/` – Image formats (png, jpg, webp) and video (mp4, webm). Large videos are in `.gitignore` due to GitHub file size limits.

---

## License

MIT.

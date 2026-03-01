import { useState, useRef, useEffect, useCallback } from "react";
import { useDesktop } from "../../context/DesktopContext";
import { useWindowManagerContext } from "../../context/WindowManagerContext";
import { siteConfig } from "../../data/siteConfig";

const PROMPT = `${siteConfig.ownerName.toLowerCase()}@Tanays-MacBook-Pro ~ % `;

// ASCII Art Banner
const BANNER = [
  '<span class="index">Tanay Vasishtha (TV) Not A Corporation. All rights reserved.</span>',
  "",
  " /*",
  "  *    ⣿⣿⣿⣿⠀⢸⣿⡇⠀⢸⣿⣿⣿⣿     _________  ________  ________   ________      ___    ___      ___      ___ ________  ________  ___  ________  ___  ___  _________  ___  ___  ________         ",
  "  *    ⣇⣀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠉⠻⣿    |\\___   ___\\\\   __  \\|\\   ___  \\|\\   __  \\    |\\  \\  /  /|    |\\  \\    /  /|\\   __  \\|\\   ____\\|\\  \\|\\   ____\\|\\  \\|\\  \\|\\___   ___\\\\  \\|\\  \\|\\   __  \\        ",
  "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⣿⣷⠀⠀⠀⣿    \\|___ \\  \\_\\ \\  \\|\\  \\ \\  \\\\ \\  \\ \\  \\|\\  \\   \\ \\  \\/  / /    \\ \\  \\  /  / | \\  \\|\\  \\ \\  \\___|\\ \\  \\ \\  \\___|\\ \\  \\\\\\  \\|___ \\  \\_\\ \\  \\\\\\  \\ \\  \\|\\  \\       ",
  "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⡿⠟⠀⠀⣠⣿         \\ \\  \\ \\ \\   __  \\ \\  \\\\ \\  \\ \\   __  \\   \\ \\    / /      \\ \\  \\/  / / \\ \\   __  \\ \\_____  \\ \\  \\ \\_____  \\ \\   __  \\   \\ \\  \\ \\ \\   __  \\ \\   __  \\      ",
  "  *    ⣿⣿⡇⠀⠀⢀⣀⣀⣀⠀⠀⠚⠻⣿          \\ \\  \\ \\ \\  \\ \\  \\ \\  \\\\ \\  \\ \\  \\ \\  \\   \\/  /  /        \\ \\    / /   \\ \\  \\ \\  \\|____|\\  \\ \\  \\|____|\\  \\ \\  \\ \\  \\   \\ \\  \\ \\ \\  \\ \\  \\ \\  \\ \\  \\     ",
  "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⣿⣿⡄⠀⠀⠘           \\ \\__\\ \\ \\__\\ \\__\\ \\__\\\\ \\__\\ \\__\\ \\__\\__/  / /           \\ \\__/ /     \\ \\__\\ \\__\\____\\_\\  \\ \\__\\____\\_\\  \\ \\__\\ \\__\\   \\ \\__\\ \\ \\__\\ \\__\\ \\__\\ \\__\\    ",
  "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⣿⣿⠃⠀⠀⠀            \\|__|  \\|__|\\|__|\\|__| \\|__|\\|__|\\|__|\\___/ /             \\|__|/       \\|__|\\|__|\\_________\\|__|\\_________\\|__|\\|__|    \\|__|  \\|__|\\|__|\\|__|\\|__|    ",
  "  *    ⡏⠉⠀⠀⠀⠈⠉⠉⠁⠀⠀⣀⣤⣾                                                 \\|___|/                                    \\|_________|   \\|_________|                                            ",
  "  *    ⣿⣿⣿⣿⠀⢸⣿⡇⠀⢸⣿⣿⣿⣿                                                                                                                                                                   ",
  "  *                                                                                                                                                             @2026      ",
  "  */",
  "",
  '<span class="color2">Welcome to my interactive web terminal.</span>',
  '<span class="color2">For a list of available commands, type</span> <span class="command">\'help\'</span><span class="color2">.</span>',
];

const HELP = [
  "",
  "  whois         Who is Tanay?",
  "  whoami        Who are you?",
  "  ai            Ask the AI assistant",
  "  social        Display social networks",
  "  secret        Find the password",
  "  projects      View coding projects",
  "  history       View command history",
  "  help          This help",
  "  email         Contact me",
  "  sponsor me    Support me on Buy Me a Coffee",
  "  clear         Clear terminal",
  "  banner        Display the header",
  "  matrix        Enter the Matrix",
  "  hack          Hacker mode",
  "  love          Show some love",
  "",
  "  open <app>    Open app (about, projects, contact, gallery, skills)",
  "",
  "  Project commands:",
  "  darkmodebang  Open Dark Mode Bang extension",
  "  volumebang    Open Volume Bang extension",
  "  speedbang     Open Speed Bang extension",
  "  weloveqr      Open WeLoveQR web app",
  "",
  "  github        Open GitHub",
  "  linkedin      Open LinkedIn",
  "  twitter       Open X (Twitter)",
  "",
];

const WHOIS = [
  "",
  "Hey, I'm Tanay! 👋",
  "I'm a full-stack developer and browser extension creator who builds",
  "engaging websites like this one and creates innovative browser extensions",
  "that solve real-world problems.",
  "With expertise in React, Node.js, Python, TypeScript, and browser APIs,",
  "I specialize in building scalable web applications, browser extensions,",
  "and mobile solutions.",
  "I'm the creator of popular browser extensions like Dark Mode Bang,",
  "Volume Bang, and Speed Bang, which have helped thousands of users.",
  "I'm passionate about user-friendly interfaces and browser tools that",
  "solve complex problems with elegant solutions.",
  "When I'm not coding, I'm exploring new technologies, contributing to",
  "open-source, or working on my organization SynthraLabs.",
  "",
];

const WHOAMI = [
  "",
  "The paradox of 'Who am I?' is: we never know, but we constantly find out.",
  "I am a developer, a problem-solver, and a lifelong learner.",
  "",
];

const SOCIAL = [
  "",
  "  github    github.com/tanayvasishtha",
  "  linkedin  linkedin.com/in/tanayvasishtha",
  "  twitter   x.com/TanayVasishtha",
  "  email     (use 'email' command)",
  "",
];

const SECRET = [
  "",
  "  sudo      Only use if you're admin",
  "  ai        Ask the AI assistant",
  "  matrix    Enter the Matrix",
  "  hack      Hacker mode activated",
  "",
];

const PROJECTS_LIST = [
  "",
  "  🌙 Dark Mode Bang  — Chrome & Firefox extension for instant dark mode",
  "  🔊 Volume Bang     — Browser extension for instant volume control",
  "  ⚡ Speed Bang      — Performance optimization extension",
  "  📱 WeLoveQR        — QR code generator and scanner web app",
  "  🏢 SynthraLabs     — Organization and project management platform",
  "  💻 Ubuntu Portfolio — Interactive terminal experience",
  "  🖥️  MacOS Portfolio  — This desktop you're using now",
  "  🎯 Debtrix         — Financial management and debt tracking app",
  "  🤖 AI/ML Projects  — Machine learning and automation tools",
  "",
];

const AI_RESPONSES = [
  "I'm an AI assistant created by Tanay. How can I help you today?",
  "That's an interesting question! Let me think about that...",
  "Based on my training data, I'd suggest exploring the available commands.",
  "I'm here to assist you with any questions about Tanay's portfolio.",
  "Have you tried the 'secret' command? There might be hidden features!",
  "I can help you navigate this terminal. Try 'help' for more options.",
  "I'm constantly learning and evolving, just like the code that created me.",
];

function addLinesToState(setLines, lines, className = "text-gray-300", delayMs = 60, idRef = null) {
  lines.forEach((line, i) => {
    setTimeout(() => {
      const id = idRef ? ++idRef.current : i;
      setLines((prev) => [...prev, { id, text: line, className }]);
    }, i * delayMs);
  });
}

function addLine(setLines, text, className = "text-gray-300", delayMs = 0, idRef = null) {
  const push = () => {
    const id = idRef ? ++idRef.current : Math.random();
    setLines((prev) => [...prev, { id, text, className }]);
  };
  if (delayMs > 0) {
    setTimeout(push, delayMs);
  } else {
    push();
  }
}

export function TerminalApp() {
  const { appComponents } = useDesktop();
  const { openWindow, focusedId } = useWindowManagerContext();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [passwordMode, setPasswordMode] = useState(false);
  const [password, setPassword] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const didInit = useRef(false);
  const lineIdRef = useRef(0);
  const [hScroll, setHScroll] = useState({ scrollLeft: 0, scrollWidth: 0, clientWidth: 0 });
  const hScrollTrackRef = useRef(null);
  const dragStartRef = useRef(null);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    setLines(
      BANNER.map((line) => ({
        id: lineIdRef.current++,
        text: line,
        className: "text-emerald-400",
      }))
    );
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  useEffect(() => {
    if (focusedId === "terminal") inputRef.current?.focus();
  }, [focusedId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
      const t = setTimeout(syncHScroll, 50);
      return () => clearTimeout(t);
    }
  }, [lines, syncHScroll]);

  const syncHScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setHScroll({
      scrollLeft: el.scrollLeft,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncHScroll();
    const onScroll = () => syncHScroll();
    const onResize = () => syncHScroll();
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(syncHScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [lines, syncHScroll]);

  const handleHScrollTrackClick = useCallback(
    (e) => {
      const el = scrollRef.current;
      const track = hScrollTrackRef.current;
      if (!el || !track || hScroll.scrollWidth <= hScroll.clientWidth) return;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      el.scrollLeft = ratio * (hScroll.scrollWidth - hScroll.clientWidth);
    },
    [hScroll]
  );

  const handleHScrollThumbMouseDown = useCallback((e) => {
    e.preventDefault();
    dragStartRef.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 };
    const onMove = (e2) => {
      if (!dragStartRef.current || !scrollRef.current) return;
      const el = scrollRef.current;
      const dx = e2.clientX - dragStartRef.current.x;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const newLeft = Math.max(0, Math.min(maxScroll, dragStartRef.current.scrollLeft + dx));
      el.scrollLeft = newLeft;
      dragStartRef.current = { x: e2.clientX, scrollLeft: newLeft };
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []);

  const runCommand = useCallback(
    (cmd) => {
      const rawCmd = cmd.trim();
      const c = rawCmd.toLowerCase();
      if (!c) {
        setLines((prev) => [
          ...prev,
          { id: lineIdRef.current++, text: PROMPT, className: "text-amber-200/90" },
        ]);
        return;
      }

      if (!passwordMode) {
        setCommandHistory((prev) => [...prev, rawCmd]);
        setHistoryIndex(-1);
        setLines((prev) => [
          ...prev,
          { id: lineIdRef.current++, text: PROMPT + rawCmd, className: "text-gray-400" },
        ]);
      }

      switch (c) {
        case "help":
          addLinesToState(setLines, HELP, "text-gray-300", 40, lineIdRef);
          break;
        case "whois":
          addLinesToState(setLines, WHOIS, "text-gray-300", 50, lineIdRef);
          break;
        case "whoami":
          addLinesToState(setLines, WHOAMI, "text-gray-300", 50, lineIdRef);
          break;
        case "ai": {
          const msg = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
          addLine(setLines, "  🤖 AI: " + msg, "text-emerald-400", 80, lineIdRef);
          addLine(setLines, "", "", 200, lineIdRef);
          break;
        }
        case "sudo":
          addLine(setLines, "  Oh no, you're not admin...", "text-amber-400", 80, lineIdRef);
          setTimeout(() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank"), 1000);
          addLine(setLines, "", "", 400, lineIdRef);
          break;
        case "social":
          addLinesToState(setLines, SOCIAL, "text-gray-300", 40, lineIdRef);
          break;
        case "secret":
          setPasswordMode(true);
          addLine(setLines, "  Enter password:", "text-amber-200/90", 80, lineIdRef);
          addLine(setLines, "", "", 120, lineIdRef);
          break;
        case "projects":
          addLinesToState(setLines, PROJECTS_LIST, "text-gray-300", 45, lineIdRef);
          break;
        case "password":
          addLine(setLines, "  Lol! You're joking, right? You're gonna have to try harder than that! 😂", "text-red-400", 100, lineIdRef);
          addLine(setLines, "", "", 200, lineIdRef);
          break;
        case "history":
          addLine(setLines, " ", "", 0, lineIdRef);
          commandHistory.forEach((h, i) => {
            addLine(setLines, "  " + h, "text-gray-400", 60 * (i + 1), lineIdRef);
          });
          addLine(setLines, " ", "text-gray-300", 60 * commandHistory.length + 80, lineIdRef);
          break;
        case "email":
          addLine(setLines, "  Opening mailto...", "text-emerald-400", 0, lineIdRef);
          window.open("mailto:edgepersonal2004@gmail.com", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        case "sponsor me":
        case "sponsor":
          addLine(setLines, "  Opening Buy Me a Coffee...", "text-emerald-400", 0, lineIdRef);
          addLine(setLines, "  Thank you for supporting my work! ☕", "text-gray-400", 200, lineIdRef);
          window.open("https://buymeacoffee.com/tanayvasishtha", "_blank");
          addLine(setLines, "", "", 400, lineIdRef);
          break;
        case "clear":
          setLines([]);
          return;
        case "banner":
          addLinesToState(setLines, BANNER, "text-emerald-400", 60, lineIdRef);
          break;
        case "matrix":
          addLine(setLines, "  🔴 ENTERING MATRIX MODE... 🔴", "text-emerald-400", 80, lineIdRef);
          addLine(setLines, "  Wake up, Neo...", "text-gray-400", 280, lineIdRef);
          addLine(setLines, "  The Matrix has you...", "text-gray-400", 480, lineIdRef);
          addLine(setLines, "  Follow the white rabbit.", "text-gray-400", 680, lineIdRef);
          addLine(setLines, "", "", 900, lineIdRef);
          break;
        case "hack":
          addLine(setLines, "  🚨 INITIATING HACKER MODE... 🚨", "text-red-400", 80, lineIdRef);
          addLine(setLines, "  Accessing mainframe...", "text-gray-400", 280, lineIdRef);
          addLine(setLines, "  Bypassing security protocols...", "text-gray-400", 480, lineIdRef);
          addLine(setLines, "  System compromised! 💀", "text-red-400", 680, lineIdRef);
          addLine(setLines, "", "", 900, lineIdRef);
          break;
        case "love":
          addLine(setLines, "  💕 LOVE DETECTED! 💕", "text-pink-400", 80, lineIdRef);
          addLine(setLines, "   ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥", "text-pink-400", 200, lineIdRef);
          addLine(setLines, "   ♥ ♥", "text-pink-400", 300, lineIdRef);
          addLine(setLines, "   ♥ ♥", "text-pink-400", 400, lineIdRef);
          addLine(setLines, "  ♥ I LOVE CODING! 💻 ♥", "text-pink-400", 500, lineIdRef);
          addLine(setLines, "   ♥ ♥", "text-pink-400", 600, lineIdRef);
          addLine(setLines, "   ♥ ♥", "text-pink-400", 700, lineIdRef);
          addLine(setLines, "   ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥", "text-pink-400", 800, lineIdRef);
          addLine(setLines, "", "", 1000, lineIdRef);
          break;
        case "github":
          addLine(setLines, "  Opening GitHub...", "text-emerald-400", 0, lineIdRef);
          window.open("https://github.com/tanayvasishtha", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        case "linkedin":
          addLine(setLines, "  Opening LinkedIn...", "text-emerald-400", 0, lineIdRef);
          window.open("https://linkedin.com/in/tanayvasishtha", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        case "twitter":
        case "x":
          addLine(setLines, "  Opening X (Twitter)...", "text-emerald-400", 0, lineIdRef);
          window.open("https://x.com/TanayVasishtha", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        case "darkmodebang":
        case "darkmode":
          addLine(setLines, "  Opening Dark Mode Bang...", "text-emerald-400", 0, lineIdRef);
          window.open("https://chromewebstore.google.com/detail/dark-mode-bang-universal/hnnplkbhhlfopkkhfepdiljdbclfbpjh", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        case "volumebang":
        case "volume":
          addLine(setLines, "  Opening Volume Bang...", "text-emerald-400", 0, lineIdRef);
          window.open("https://chromewebstore.google.com/detail/volume-bang-premium-audio/ancjplaiedoominjbebhdgjipcgfbopl", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        case "speedbang":
        case "speed":
          addLine(setLines, "  Opening Speed Bang...", "text-emerald-400", 0, lineIdRef);
          window.open("https://chromewebstore.google.com/detail/speedbang-multiplatform-v/kaacodjcoaepldmhnpgodhafbcmlkfgo", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        case "weloveqr":
        case "qr":
          addLine(setLines, "  Opening WeLoveQR...", "text-emerald-400", 0, lineIdRef);
          window.open("https://weloveqr.netlify.app", "_blank");
          addLine(setLines, "", "", 100, lineIdRef);
          break;
        default:
          if (c.startsWith("open ")) {
            const app = c.slice(5).trim();
            const map = {
              about: ["about", "About"],
              projects: ["projects", "Projects"],
              contact: ["contact", "Contact"],
              gallery: ["gallery", "Photos"],
              skills: ["skills", "Skills"],
            };
            const [id, title] = map[app] || [];
            if (id && appComponents?.[id]) {
              openWindow(id, title, appComponents[id]);
              addLine(setLines, `  Opening ${title}...`, "text-emerald-400", 0, lineIdRef);
              addLine(setLines, "", "", 100, lineIdRef);
            } else {
              setLines((prev) => [
                ...prev,
                { id: lineIdRef.current++, text: `  Unknown app: ${app}. Try: about, projects, contact, gallery, skills`, className: "text-amber-400" },
                { id: lineIdRef.current++, text: "", className: "" },
              ]);
            }
          } else {
            setLines((prev) => [
              ...prev,
              { id: lineIdRef.current++, text: `  zsh: command not found: ${rawCmd}`, className: "text-red-400" },
              { id: lineIdRef.current++, text: "  Type 'help' for available commands.", className: "text-gray-500" },
              { id: lineIdRef.current++, text: "", className: "" },
            ]);
          }
      }
    },
    [passwordMode, commandHistory, appComponents, openWindow]
  );

  const handleKeyDown = (e) => {
    if (passwordMode) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (password === "Banger") {
          addLinesToState(setLines, SECRET, "text-emerald-400", 80, lineIdRef);
          setPasswordMode(false);
          setPassword("");
        } else {
          addLine(setLines, "  Wrong password.", "text-red-400", 0, lineIdRef);
          addLine(setLines, "", "", 80, lineIdRef);
          setPasswordMode(false);
          setPassword("");
        }
      } else if (e.key === "Backspace") {
        setPassword((p) => p.slice(0, -1));
      } else if (e.key.length === 1) {
        setPassword((p) => p + e.key);
      }
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const next = historyIndex + 1;
      if (next < commandHistory.length) {
        setHistoryIndex(next);
        setInput(commandHistory[commandHistory.length - 1 - next]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(commandHistory[commandHistory.length - 1 - next]);
      return;
    }
  };

  const handleChange = (e) => {
    if (!passwordMode) setInput(e.target.value);
  };

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="terminal-app h-full flex flex-col bg-[#1c1c1e] text-gray-300 font-mono text-sm overflow-hidden rounded-b-lg cursor-text"
      style={{ fontFamily: 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Code", monospace' }}
      onClick={focusInput}
      role="application"
      aria-label="Terminal"
    >
      <style>{`
        .terminal-app .terminal-banner-html .index { color: #9ca3af; }
        .terminal-app .terminal-banner-html .color2 { color: #34d399; }
        .terminal-app .terminal-banner-html .command { color: #fbbf24; }
        .terminal-app .terminal-output::-webkit-scrollbar:horizontal { height: 0; display: none; }
      `}</style>
      <div
        ref={scrollRef}
        className="terminal-output flex-1 min-w-0 overflow-y-auto overflow-x-auto p-4 min-h-0"
        style={{ scrollBehavior: "smooth" }}
      >
        {lines.map((line) => (
          <div key={line.id ?? line.text} className={`terminal-line ${line.className || "text-gray-300"}`} style={{ whiteSpace: "pre", fontFamily: "inherit" }}>
            {typeof line.text === "string" && line.text.includes("<span") ? (
              <span dangerouslySetInnerHTML={{ __html: line.text }} className="terminal-banner-html" />
            ) : (
              line.text
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 bg-[#1c1c1e] p-2 flex items-center gap-1 shrink-0 min-h-[40px]">
        <span className="text-amber-200/90 shrink-0 select-none">{PROMPT}</span>
        {passwordMode ? (
          <span className="text-gray-400 flex-1 min-w-0">{password.replace(/./g, "•")}</span>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-300 caret-gray-300 min-w-[120px] w-full"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input"
          />
        )}
      </div>
      {hScroll.scrollWidth > hScroll.clientWidth && (
        <div
          ref={hScrollTrackRef}
          role="scrollbar"
          aria-orientation="horizontal"
          aria-valuenow={hScroll.scrollLeft}
          aria-valuemin={0}
          aria-valuemax={Math.max(0, hScroll.scrollWidth - hScroll.clientWidth)}
          className="shrink-0 h-2 flex items-center px-1 bg-[#1c1c1e] border-t border-white/5 cursor-pointer"
          onClick={handleHScrollTrackClick}
        >
          <div
            className="h-1.5 rounded-full bg-white/30 hover:bg-white/40 cursor-grab active:cursor-grabbing flex-shrink-0"
            style={{
              width: `${Math.max(10, (hScroll.clientWidth / hScroll.scrollWidth) * 100)}%`,
              marginLeft: `${(hScroll.scrollLeft / hScroll.scrollWidth) * 100}%`,
            }}
            onMouseDown={handleHScrollThumbMouseDown}
          />
        </div>
      )}
    </div>
  );
}

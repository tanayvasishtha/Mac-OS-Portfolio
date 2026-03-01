import { useState, useCallback, useMemo, useRef, useEffect } from "react";

const DIFFICULTIES = {
  easy: { rows: 9, cols: 9, mines: 10, label: "Easy", multiplier: 1 },
  medium: { rows: 16, cols: 16, mines: 40, label: "Medium", multiplier: 2 },
  hard: { rows: 20, cols: 24, mines: 99, label: "Hard", multiplier: 4 },
};

const COINS_PER_CELL = 1;
const WIN_BONUS_BASE = 50;
const STORAGE_KEYS = { coins: "minesweeper-coins", bestTime: "minesweeper-best-" };
const STATS_KEY = "minesweeper-stats";

function getStoredCoins() {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEYS.coins) || "0", 10);
  } catch {
    return 0;
  }
}

function getBestTime(diff) {
  try {
    const t = localStorage.getItem(STORAGE_KEYS.bestTime + diff);
    return t ? parseInt(t, 10) : null;
  } catch {
    return null;
  }
}

function setStoredCoins(v) {
  try {
    localStorage.setItem(STORAGE_KEYS.coins, String(v));
  } catch (_) { }
}

function setBestTime(diff, seconds) {
  try {
    localStorage.setItem(STORAGE_KEYS.bestTime + diff, String(seconds));
  } catch (_) { }
}

function getStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { gamesPlayed: 0, gamesWon: 0 };
    const parsed = JSON.parse(raw);
    return {
      gamesPlayed: Number(parsed.gamesPlayed) || 0,
      gamesWon: Number(parsed.gamesWon) || 0,
    };
  } catch {
    return { gamesPlayed: 0, gamesWon: 0 };
  }
}

function setStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (_) { }
}

function createGrid(rows, cols, mineCount, excludeRow, excludeCol) {
  const size = rows * cols;
  const mineSet = new Set();
  const exclude = excludeRow * cols + excludeCol;
  while (mineSet.size < Math.min(mineCount, size - 1)) {
    const idx = Math.floor(Math.random() * size);
    if (idx !== exclude) mineSet.add(idx);
  }
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      row.push({ isMine: mineSet.has(idx), neighborCount: 0 });
    }
    grid.push(row);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].isMine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].isMine) n++;
        }
      }
      grid[r][c].neighborCount = n;
    }
  }
  return grid;
}

function Cell({ cell, revealed, flagged, onClick, onRightClick, isWrong }) {
  const handleContextMenu = (e) => {
    e.preventDefault();
    onRightClick();
  };
  const numColors = ["", "text-blue-600", "text-green-600", "text-red-600", "text-purple-700", "text-amber-600", "text-cyan-600", "text-gray-800", "text-gray-600"];
  const n = cell.neighborCount;
  return (
    <button
      type="button"
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={`
        w-full aspect-square min-w-[18px] min-h-[18px] flex items-center justify-center
        text-sm font-bold select-none transition-all duration-150 ease-out
        border border-b-2 border-r-2 border-gray-400 dark:border-gray-500
        active:scale-[0.96]
        ${revealed
          ? "bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 shadow-inner"
          : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-500 dark:hover:to-gray-600 border-gray-400 dark:border-gray-500"
        }
        ${isWrong ? "bg-red-400 dark:bg-red-600" : ""}
      `}
    >
      {flagged && !revealed && (
        <span className="text-red-600 dark:text-red-400" aria-hidden>🚩</span>
      )}
      {revealed && cell.isMine && (
        <span className="text-lg" aria-hidden>💣</span>
      )}
      {revealed && !cell.isMine && n > 0 && (
        <span className={numColors[n]}>{n}</span>
      )}
    </button>
  );
}

export function MinesweeperApp() {
  const [difficulty, setDifficulty] = useState("easy");
  const [coins, setCoins] = useState(getStoredCoins);
  const [gameState, setGameState] = useState("idle"); // idle | playing | won | lost
  const [grid, setGrid] = useState(null);
  const [revealed, setRevealed] = useState(() => ({}));
  const [flags, setFlags] = useState(() => ({}));
  const [timer, setTimer] = useState(0);
  const [winBonus, setWinBonus] = useState(0);
  const [stats, setStatsState] = useState(getStats);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const config = DIFFICULTIES[difficulty];
  const totalSafe = config.rows * config.cols - config.mines;

  const revealedCount = useMemo(() => Object.keys(revealed).length, [revealed]);
  const flagCount = useMemo(() => Object.values(flags).filter(Boolean).length, [flags]);
  const winRate = useMemo(
    () =>
      stats.gamesPlayed
        ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
        : 0,
    [stats]
  );

  useEffect(() => {
    setCoins(getStoredCoins());
  }, []);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const floodFill = useCallback((g, r, c) => {
    if (!g?.length || !g[0]?.length) return {};
    const out = {};
    const go = (rr, cc) => {
      if (rr < 0 || rr >= g.length || cc < 0 || cc >= g[0].length) return;
      const k = `${rr},${cc}`;
      if (out[k] || g[rr][cc].isMine) return;
      out[k] = true;
      if (g[rr][cc].neighborCount === 0) {
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++)
            go(rr + dr, cc + dc);
      }
    };
    go(r, c);
    return out;
  }, []);

  const newGame = useCallback(() => {
    stopTimer();
    setGrid(null);
    setRevealed({});
    setFlags({});
    setGameState("idle");
    setWinBonus(0);
    setTimer(0);
  }, [stopTimer]);

  const handleCellClick = useCallback((r, c) => {
    if (gameState === "won" || gameState === "lost") return;
    const key = `${r},${c}`;
    if (flags[key]) return;
    if (gameState === "idle") {
      const g = createGrid(config.rows, config.cols, config.mines, r, c);
      setGrid(g);
      const initialRevealed = floodFill(g, r, c);
      setRevealed(initialRevealed);
      setFlags({});
      setGameState("playing");
      setWinBonus(0);
      startTimer();
      const added = Object.keys(initialRevealed).length * COINS_PER_CELL * config.multiplier;
      if (added > 0) {
        setCoins((prev) => {
          const v = prev + added;
          setStoredCoins(v);
          return v;
        });
      }
      const totalRevealed = Object.keys(initialRevealed).length;
      if (totalRevealed >= totalSafe) {
        stopTimer();
        const sec = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const bonus = WIN_BONUS_BASE * config.multiplier + Math.max(0, 60 - sec);
        setWinBonus(bonus);
        setCoins((prev) => {
          const v = prev + bonus;
          setStoredCoins(v);
          return v;
        });
        const best = getBestTime(difficulty);
        if (best == null || sec < best) setBestTime(difficulty, sec);
        setGameState("won");
        setStatsState((prev) => {
          const next = {
            gamesPlayed: prev.gamesPlayed + 1,
            gamesWon: prev.gamesWon + 1,
          };
          setStats(next);
          return next;
        });
      }
      return;
    }
    if (revealed[key]) return;
    const cell = grid[r][c];
    if (cell.isMine) {
      stopTimer();
      setGameState("lost");
      const nextRevealed = { ...revealed, [key]: true };
      grid.forEach((row, rr) =>
        row.forEach((cell, cc) => {
          if (cell.isMine) nextRevealed[`${rr},${cc}`] = true;
        })
      );
      setRevealed(nextRevealed);
      setStatsState((prev) => {
        const next = {
          gamesPlayed: prev.gamesPlayed + 1,
          gamesWon: prev.gamesWon,
        };
        setStats(next);
        return next;
      });
      return;
    }
    let next = { ...revealed, [key]: true };
    if (cell.neighborCount === 0) {
      next = { ...next, ...floodFill(grid, r, c) };
    }
    setRevealed(next);
    const prevCount = Object.keys(revealed).length;
    const newCount = Object.keys(next).length;
    const addCoins = (newCount - prevCount) * COINS_PER_CELL * config.multiplier;
    if (addCoins > 0) {
      setCoins((c) => {
        const v = c + addCoins;
        setStoredCoins(v);
        return v;
      });
    }
    if (newCount >= totalSafe) {
      stopTimer();
      const sec = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const bonus = WIN_BONUS_BASE * config.multiplier + Math.max(0, 60 - sec);
      setWinBonus(bonus);
      setCoins((c) => {
        const v = c + bonus;
        setStoredCoins(v);
        return v;
      });
      const best = getBestTime(difficulty);
      if (best == null || sec < best) setBestTime(difficulty, sec);
      setGameState("won");
      setStatsState((prev) => {
        const next = {
          gamesPlayed: prev.gamesPlayed + 1,
          gamesWon: prev.gamesWon + 1,
        };
        setStats(next);
        return next;
      });
    }
  }, [gameState, grid, revealed, flags, config, totalSafe, floodFill, stopTimer, difficulty, startTimer]);

  const handleRightClick = useCallback((r, c) => {
    if (gameState !== "playing" && gameState !== "idle") return;
    const key = `${r},${c}`;
    if (revealed[key]) return;
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  }, [gameState, revealed]);

  const handleNewGameClick = useCallback(() => {
    newGame();
  }, [newGame]);

  const bestTime = useMemo(
    () => getBestTime(difficulty),
    [difficulty, gameState]
  );

  useEffect(() => () => stopTimer(), [stopTimer]);

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] dark:bg-gray-800 overflow-hidden">
      {/* Title bar */}
      <div className="shrink-0 flex items-center justify-between px-3 py-2 bg-gradient-to-b from-[#0a2463] to-[#1e3a5f] dark:from-gray-900 dark:to-gray-800 border-b-2 border-[#2a4a7f] dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm tracking-wide">Minesweeper</span>
          <span className="text-white/80 text-xs">Classic</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/30">
            <span className="text-amber-400 text-sm">🪙</span>
            <span className="text-white font-mono text-sm">{coins}</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="shrink-0 flex flex-wrap items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            handleNewGameClick();
          }}
          className="px-2 py-1.5 rounded border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium"
        >
          {Object.entries(DIFFICULTIES).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleNewGameClick}
          className="px-4 py-1.5 rounded bg-[#0a2463] dark:bg-gray-600 hover:bg-[#0d2d7a] dark:hover:bg-gray-500 text-white text-sm font-medium transition-colors"
        >
          New Game
        </button>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ml-1
            ${difficulty === "easy"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
              : difficulty === "medium"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200"
            }`}
        >
          {DIFFICULTIES[difficulty].label}
        </span>
        <div className="flex items-center gap-4 ml-auto text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-mono">
            ⏱ {gameState === "idle" ? "0" : timer}s
          </span>
          <span className="text-gray-700 dark:text-gray-300 font-mono">
            🚩 {config.mines - flagCount}
          </span>
          {bestTime != null && (
            <span className="text-amber-600 dark:text-amber-400 font-mono">
              Best: {bestTime}s
            </span>
          )}
          <span className="hidden sm:inline-flex items-center text-gray-700 dark:text-gray-300 font-mono">
            GP: {stats.gamesPlayed} · W: {stats.gamesWon} · WR: {winRate}%
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0 p-3 overflow-auto flex flex-col items-center justify-center relative">
        {gameState === "idle" && (
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            Click a cell to start. Right-click to flag.
          </div>
        )}
        {(grid || gameState === "idle") && (
          <div
            className="inline-grid gap-[2px] p-2 rounded-lg bg-gray-400 dark:bg-gray-600 shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
              gridTemplateRows: `repeat(${config.rows}, 1fr)`,
            }}
          >
            {(grid || Array.from({ length: config.rows }, (_, r) =>
              Array.from({ length: config.cols }, () => ({ isMine: false, neighborCount: 0 }))
            )).map((row, r) =>
              row.map((cell, c) => (
                <Cell
                  key={`${r},${c}`}
                  cell={cell}
                  revealed={!!revealed[`${r},${c}`]}
                  flagged={!!flags[`${r},${c}`]}
                  isWrong={gameState === "lost" && cell.isMine && !!flags[`${r},${c}`]}
                  onClick={() => handleCellClick(r, c)}
                  onRightClick={() => handleRightClick(r, c)}
                />
              ))
            )}
          </div>
        )}

        {gameState === "won" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl z-10 transition-opacity duration-300">
            <p className="text-2xl font-bold text-green-400 mb-1">You win!</p>
            <p className="text-amber-400 font-mono text-lg">+{winBonus} coins</p>
            {bestTime != null && (
              <p className="text-white/80 text-sm mt-2">Best time: {bestTime}s</p>
            )}
            <button
              type="button"
              onClick={handleNewGameClick}
              className="mt-4 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium text-sm transition-colors"
            >
              Play again
            </button>
          </div>
        )}
        {gameState === "lost" && grid && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl z-10 transition-opacity duration-300">
            <p className="text-2xl font-bold text-red-400 mb-1">Boom!</p>
            <p className="text-white/80 text-sm text-center px-4">Right-click to flag mines. Try again.</p>
            <button
              type="button"
              onClick={handleNewGameClick}
              className="mt-4 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-medium text-sm transition-colors"
            >
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

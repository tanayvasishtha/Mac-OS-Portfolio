import { useState, useCallback, useEffect, useMemo } from "react";

const BTN = "rounded-xl font-medium transition active:scale-95 select-none ";
const NUM = BTN + "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100";
const OP = BTN + "bg-amber-500 hover:bg-amber-600 text-white";
const FN = BTN + "bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400 text-gray-800 dark:text-gray-100";
const ADV = BTN + "bg-indigo-500 hover:bg-indigo-600 text-white text-sm";

function formatResult(n) {
  if (!Number.isFinite(n)) return "Error";
  const str = String(n);
  if (str.length > 12) return n.toExponential(6);
  if (str.includes(".") && str.split(".")[1]?.length > 8) return n.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
  return str;
}

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [advanced, setAdvanced] = useState(false);

  const clear = useCallback(() => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
  }, []);

  const handleNum = useCallback((n) => {
    setDisplay((d) => (d === "0" ? String(n) : d + n));
  }, []);

  const handleOp = useCallback((nextOp) => {
    const val = parseFloat(display) || 0;
    if (prev === null) {
      if (nextOp === "=") return;
      setPrev(val);
      setOp(nextOp);
      setDisplay("0");
    } else {
      let result = prev;
      if (op === "+") result = prev + val;
      else if (op === "−") result = prev - val;
      else if (op === "×") result = prev * val;
      else if (op === "÷") result = val === 0 ? 0 : prev / val;
      const formatted = formatResult(result);
      setPrev(nextOp === "=" ? null : result);
      setOp(nextOp === "=" ? null : nextOp);
      setDisplay(formatted);
      if (nextOp !== "=") setDisplay("0");
    }
  }, [display, prev, op]);

  const negate = useCallback(() => {
    setDisplay((d) => (d === "0" ? d : d.startsWith("-") ? d.slice(1) : "-" + d));
  }, []);

  const percent = useCallback(() => {
    setDisplay((d) => formatResult((parseFloat(d) || 0) / 100));
  }, []);

  const backspace = useCallback(() => {
    setDisplay((d) => (d.length <= 1 ? "0" : d.slice(0, -1)));
  }, []);

  const decimal = useCallback(() => {
    setDisplay((d) => (d.includes(".") ? d : d + "."));
  }, []);

  const handleAdvanced = useCallback((fn) => {
    const val = parseFloat(display) || 0;
    let result = val;
    switch (fn) {
      case "√": result = val < 0 ? 0 : Math.sqrt(val); break;
      case "x²": result = val * val; break;
      case "1/x": result = val === 0 ? 0 : 1 / val; break;
      case "sin": result = Math.sin((val * Math.PI) / 180); break;
      case "cos": result = Math.cos((val * Math.PI) / 180); break;
      case "tan": result = Math.tan((val * Math.PI) / 180); break;
      case "π": result = Math.PI; break;
      case "e": result = Math.E; break;
      case "ln": result = val <= 0 ? 0 : Math.log(val); break;
      case "log": result = val <= 0 ? 0 : Math.log10(val); break;
      default: return;
    }
    setDisplay(formatResult(result));
  }, [display]);

  const toggleAdvanced = useCallback(() => setAdvanced((a) => !a), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      const target = e.target;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
      if (e.key >= "0" && e.key <= "9") handleNum(Number(e.key));
      else if (e.key === ".") decimal();
      else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); handleOp("="); }
      else if (e.key === "Escape") clear();
      else if (e.key === "Backspace") { e.preventDefault(); backspace(); }
      else if (e.key === "+") handleOp("+");
      else if (e.key === "-") handleOp("−");
      else if (e.key === "*") handleOp("×");
      else if (e.key === "/") { e.preventDefault(); handleOp("÷"); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNum, decimal, handleOp, clear, backspace]);

  const basicGrid = useMemo(() => (
    <div className="grid grid-cols-4 gap-2">
      <button type="button" className={FN} onClick={clear}>C</button>
      <button type="button" className={FN} onClick={negate}>±</button>
      <button type="button" className={FN} onClick={percent}>%</button>
      <button type="button" className={OP} onClick={() => handleOp("÷")}>÷</button>
      {[7, 8, 9].map((n) => (
        <button key={n} type="button" className={NUM} onClick={() => handleNum(n)}>{n}</button>
      ))}
      <button type="button" className={OP} onClick={() => handleOp("×")}>×</button>
      {[4, 5, 6].map((n) => (
        <button key={n} type="button" className={NUM} onClick={() => handleNum(n)}>{n}</button>
      ))}
      <button type="button" className={OP} onClick={() => handleOp("−")}>−</button>
      {[1, 2, 3].map((n) => (
        <button key={n} type="button" className={NUM} onClick={() => handleNum(n)}>{n}</button>
      ))}
      <button type="button" className={OP} onClick={() => handleOp("+")}>+</button>
      <button type="button" className={NUM} onClick={decimal}>.</button>
      <button type="button" className={NUM} onClick={() => handleNum(0)}>0</button>
      <button type="button" className={FN} onClick={backspace}>⌫</button>
      <button type="button" className={OP} onClick={() => handleOp("=")}>=</button>
    </div>
  ), [handleNum, handleOp, clear, negate, percent, decimal, backspace]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 overflow-auto"
      role="application"
      aria-label="Calculator"
    >
      <div className="w-full max-w-[320px] sm:max-w-[380px] rounded-2xl bg-gray-200 dark:bg-gray-700 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Calculator</span>
          <button
            type="button"
            onClick={toggleAdvanced}
            className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/30 transition"
          >
            {advanced ? "Basic" : "Advanced"}
          </button>
        </div>
        <div
          className="h-14 sm:h-16 mb-4 rounded-lg bg-gray-300 dark:bg-gray-600 flex items-center justify-end px-4 text-2xl sm:text-3xl font-mono text-gray-800 dark:text-gray-100 truncate tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {display}
        </div>

        {advanced ? (
          <div className="grid grid-cols-4 gap-2 mb-2">
            <button type="button" className={ADV} onClick={() => handleAdvanced("√")}>√</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("x²")}>x²</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("1/x")}>1/x</button>
            <button type="button" className={FN} onClick={clear}>C</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("sin")}>sin</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("cos")}>cos</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("tan")}>tan</button>
            <button type="button" className={OP} onClick={() => handleOp("÷")}>÷</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("π")}>π</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("e")}>e</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("ln")}>ln</button>
            <button type="button" className={OP} onClick={() => handleOp("×")}>×</button>
            <button type="button" className={ADV} onClick={() => handleAdvanced("log")}>log</button>
          </div>
        ) : null}

        {basicGrid}
      </div>
    </div>
  );
}

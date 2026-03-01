import { useState, useCallback } from "react";

const BTN = "min-w-[3.5rem] h-12 rounded-xl text-lg font-medium transition active:scale-95 ";
const NUM = BTN + "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100";
const OP = BTN + "bg-amber-500 hover:bg-amber-600 text-white";
const FN = BTN + "bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400 text-gray-800 dark:text-gray-100";

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);

  const handleNum = useCallback(
    (n) => {
      setDisplay((d) => (d === "0" ? String(n) : d + n));
    },
    []
  );

  const formatResult = useCallback((n) => {
    if (!Number.isFinite(n)) return "0";
    const str = String(n);
    if (str.length > 12) return n.toExponential(6);
    if (str.includes(".") && str.split(".")[1]?.length > 8) return n.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
    return str;
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
      setPrev(null);
      setOp(null);
      setDisplay(formatted);
      if (nextOp !== "=") {
        setPrev(result);
        setOp(nextOp);
      }
    }
  }, [display, prev, op, formatResult]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-[280px] rounded-2xl bg-gray-200 dark:bg-gray-700 p-4 shadow-lg">
        <div className="h-14 mb-4 rounded-lg bg-gray-300 dark:bg-gray-600 flex items-center justify-end px-3 text-2xl font-mono text-gray-800 dark:text-gray-100 truncate">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button type="button" className={FN} onClick={clear}>C</button>
          <button type="button" className={FN}>±</button>
          <button type="button" className={FN}>%</button>
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
          <button type="button" className={NUM} onClick={() => setDisplay((d) => (d.includes(".") ? d : d + "."))}>.</button>
          <button type="button" className={NUM} onClick={() => handleNum(0)}>0</button>
          <button type="button" className={NUM} onClick={() => setDisplay((d) => (d.length <= 1 ? "0" : d.slice(0, -1)))}>⌫</button>
          <button type="button" className={OP} onClick={() => handleOp("=")}>=</button>
        </div>
      </div>
    </div>
  );
}

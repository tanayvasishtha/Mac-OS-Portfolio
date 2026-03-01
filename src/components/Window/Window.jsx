import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { TrafficLights } from "../shared/TrafficLights";

gsap.registerPlugin(Draggable);

export function Window({
  id,
  title,
  children,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}) {
  const windowRef = useRef(null);
  const dragTriggerRef = useRef(null);
  const resizeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useGSAP(() => {
    if (!windowRef.current || isMinimized) return;
    gsap.fromTo(
      windowRef.current,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.42,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [id]);

  useGSAP(() => {
    if (isMobile || isMaximized || !windowRef.current) return;
    const bounds = document.querySelector(".desktop");
    if (!bounds) return;
    const el = windowRef.current;
    const pos = position || { top: 80, left: 100 };
    Draggable.create(el, {
      type: "x,y",
      x: pos.left,
      y: pos.top,
      bounds: bounds,
      edgeResistance: 0.65,
      onDragEnd: function () {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dRect = bounds.getBoundingClientRect();
        const top = rect.top - dRect.top;
        const left = rect.left - dRect.left;
        onPositionChange(id, { top, left });
        gsap.set(el, { left, top, x: 0, y: 0 });
      },
    });
    return () => Draggable.get(el)?.kill();
  }, [id, isMaximized, isMobile]);

  useEffect(() => {
    const resizeEl = resizeRef.current;
    if (!resizeEl) return;
    let startX, startY, startW, startH;

    const onPointerDown = (e) => {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      startW = windowRef.current?.offsetWidth ?? size?.width ?? 500;
      startH = windowRef.current?.offsetHeight ?? size?.height ?? 400;
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (e) => {
      const dw = e.clientX - startX;
      const dh = e.clientY - startY;
      const newW = Math.max(400, startW + dw);
      const newH = Math.max(300, startH + dh);
      onSizeChange(id, { width: newW, height: newH });
    };

    const onPointerUp = () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };

    resizeEl.addEventListener("pointerdown", onPointerDown);
    return () => resizeEl.removeEventListener("pointerdown", onPointerDown);
  }, [id, onSizeChange]);

  const handleClose = useCallback(() => {
    const el = windowRef.current;
    if (!el) {
      onClose(id);
      return;
    }
    gsap.to(el, {
      scale: 0.3,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => onClose(id),
    });
  }, [id, onClose]);

  const handleMinimize = useCallback(() => {
    const el = windowRef.current;
    if (!el) {
      onMinimize(id);
      return;
    }
    gsap.to(el, {
      scale: 0.3,
      opacity: 0,
      y: "+=50",
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => onMinimize(id),
    });
  }, [id, onMinimize]);

  const handleMaximize = useCallback(() => onMaximize(id), [id, onMaximize]);

  if (isMinimized) return null;

  const pos = position || { top: 80, left: 100 };
  const fullScreen = isMobile || isMaximized;
  const style = {
    zIndex,
    ...(fullScreen
      ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        boxSizing: "border-box",
      }
      : {
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: size?.width ?? 500,
        height: size?.height ?? 400,
      }),
  };

  return (
    <div
      ref={windowRef}
      style={style}
      className="rounded-xl shadow-2xl shadow-black/30 overflow-hidden border border-white/20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl min-w-[280px] sm:min-w-[400px] min-h-[300px] flex flex-col transition-[top,left,width,height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
      onClick={() => onFocus(id)}
      role="dialog"
      aria-label={title}
    >
      <div
        ref={dragTriggerRef}
        className="flex items-center justify-between px-3 py-2.5 min-h-[36px] bg-gray-100/90 dark:bg-gray-700/90 border-b border-gray-200/50 dark:border-gray-600/50 cursor-grab active:cursor-grabbing select-none"
      >
        <TrafficLights
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
        <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-200 pointer-events-none">
          {title}
        </h2>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
        {children}
      </div>

      {!isMaximized && !isMobile && (
        <div
          ref={resizeRef}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent"
          aria-label="Resize"
        />
      )}
    </div>
  );
}

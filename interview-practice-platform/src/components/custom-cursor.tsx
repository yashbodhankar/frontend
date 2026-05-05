"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scale: number;
  active: boolean;
  label: string;
  isClicking: boolean;
  isIdle: boolean;
  ripple: { active: boolean; x: number; y: number; key: number };
  velocity: number;
  hoverColor: string;
}

// Context-aware cursor labels based on element type and attributes
const getCursorLabel = (el: HTMLElement | null): string | null => {
  if (!el) return null;

  // Check data-cursor attribute first
  const customLabel = el.getAttribute("data-cursor");
  if (customLabel) return customLabel;

  const tagName = el.tagName.toLowerCase();
  const role = el.getAttribute("role");
  const type = el.getAttribute("type");
  const draggable = el.getAttribute("draggable");

  // Handle links
  if (tagName === "a" || el.closest("a")) {
    const href = el.getAttribute("href");
    if (href?.startsWith("#")) return "Anchor";
    if (href?.startsWith("http")) return "Open Link";
    return "Navigate";
  }

  // Handle buttons
  if (tagName === "button" || role === "button") {
    if (type === "submit" || el.getAttribute("type") === "submit") return "Submit";
    if (el.classList.contains("play") || el.getAttribute("aria-label")?.toLowerCase().includes("play")) return "Play";
    if (el.classList.contains("stop") || el.getAttribute("aria-label")?.toLowerCase().includes("stop")) return "Stop";
    if (el.classList.contains("pause") || el.getAttribute("aria-label")?.toLowerCase().includes("pause")) return "Pause";
    return "Click";
  }

  // Handle inputs
  if (tagName === "input") {
    const inputType = type?.toLowerCase();
    if (inputType === "search") return "Search";
    if (inputType === "email" || inputType === "text") return "Type";
    if (inputType === "range" || inputType === "checkbox" || inputType === "radio") return "Adjust";
    return "Enter";
  }

  if (tagName === "textarea") return "Type";

  // Handle selects
  if (tagName === "select") return "Select";

  // Handle draggable elements
  if (draggable === "true" || tagName === "img" && !el.closest("a")) return "Drag";

  // Handle elements with copy action
  if (el.classList.contains("copyable") || el.getAttribute("data-copy")) return "Copy";

  // Handle elements with edit action
  if (el.classList.contains("editable") || el.getAttribute("contentEditable") === "true") return "Edit";

  // Handle scrollable areas
  if (el.classList.contains("scrollable") || el.classList.contains("overflow")) return "Scroll";

  // Handle menu items
  if (role === "menuitem" || el.classList.contains("menu-item")) return "Select";

  // Handle tab elements
  if (role === "tab") return "Switch";

  // Handle checkbox-like elements
  if (el.classList.contains("checkbox") || role === "checkbox") return "Check";

  // Handle slider elements
  if (el.classList.contains("slider") || el.getAttribute("type") === "range") return "Slide";

  return null;
};

// Spring physics for smooth interpolation
const spring = (
  current: number,
  target: number,
  velocity: number,
  stiffness: number = 0.15,
  damping: number = 0.8
): { value: number; velocity: number } => {
  const force = (target - current) * stiffness;
  const newVelocity = (velocity + force) * damping;
  return { value: current + newVelocity, velocity: newVelocity };
};

export function CustomCursor() {
  const lastMoveTime = useRef<number>(Date.now());
  const rippleKey = useRef<number>(0);

  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    scale: 1,
    active: false,
    label: "",
    isClicking: false,
    isIdle: false,
    ripple: { active: false, x: 0, y: 0, key: 0 },
    velocity: 0,
    hoverColor: "var(--accent)",
  });

  // Velocity refs for spring physics
  const velocityX = useRef<number>(0);
const velocityY = useRef<number>(0);

  const lastRafTime = useRef<number>(0);

  const prefersReducedMotion = useRef(false);

  // Calculate responsive scale
  const getScale = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) return 0.7;
    if (width < 1024) return 0.85;
    return 1;
  }, []);

  // Calculate trail positions with delay
  const getTrailPosition = useCallback((index: number) => {
    const delay = (index + 1) * 0.12;
    const scale = 1 - (index + 1) * 0.15;
    const opacity = 0.6 - index * 0.12;
    return { delay, scale, opacity };
  }, []);

  // Handle mouse movement with spring physics
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;

    let animationId: number;

const updateCursor = (currentTime: number) => {
      if (prefersReducedMotion.current) return;

      if (currentTime - lastRafTime.current < 16) {
        animationId = requestAnimationFrame((time) => updateCursor(time));
        return;
      }

      lastRafTime.current = currentTime;

      setState((prev) => {
        const newX = spring(prev.x, prev.targetX, velocityX.current, 0.2, 0.85).value;
        const newY = spring(prev.y, prev.targetY, velocityY.current, 0.2, 0.85).value;

        velocityX.current = (newX - prev.x) * 0.18;
        velocityY.current = (newY - prev.y) * 0.18;
        
        const velocity = Math.sqrt(velocityX.current ** 2 + velocityY.current ** 2);

        const now = Date.now();
        const isIdle = now - lastMoveTime.current > 2000;

        return {
          ...prev,
          x: newX,
          y: newY,
          scale: getScale(),
          isIdle,
          velocity: Math.min(velocity * 10, 1),
        };
      });

      animationId = requestAnimationFrame((time) => updateCursor(time));
    };

    const move = (event: MouseEvent) => {
      lastMoveTime.current = Date.now();
      setState((prev) => ({
        ...prev,
        targetX: event.clientX,
        targetY: event.clientY,
      }));
    };

    const handleMouseDown = () => {
      setState((prev) => ({ ...prev, isClicking: true }));
      setTimeout(() => {
        setState((prev) => ({ ...prev, isClicking: false }));
      }, 150);
    };

    const handleClick = () => {
      rippleKey.current += 1;
      setState((prev) => ({
        ...prev,
        isClicking: true,
        ripple: {
          active: true,
          x: prev.x,
          y: prev.y,
          key: rippleKey.current,
        },
      }));
      setTimeout(() => {
        setState((prev) => ({ ...prev, isClicking: false }));
      }, 150);
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          ripple: { ...prev.ripple, active: false },
        }));
      }, 600);
    };

    const handleOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const hoverEl = target.closest("[data-cursor], a, button, input, select, textarea, [role='button'], [role='menuitem'], [role='tab'], [draggable='true']") as HTMLElement | null;
      if (!hoverEl) {
        setState((prev) => ({ ...prev, active: false, label: "", hoverColor: "var(--accent)" }));
        return;
      }

      const label = getCursorLabel(hoverEl);
      
      // Determine color based on element type
      let hoverColor = "var(--accent)";
      if (hoverEl.tagName.toLowerCase() === "button" || hoverEl.getAttribute("role") === "button") {
        hoverColor = "#0E66FF"; // Blue for buttons
      } else if (hoverEl.tagName.toLowerCase() === "a" || hoverEl.closest("a")) {
        hoverColor = "#10B981"; // Green for links
      } else if (hoverEl.tagName.toLowerCase() === "input" || hoverEl.tagName.toLowerCase() === "textarea") {
        hoverColor = "#F59E0B"; // Amber for inputs
      }
      
      setState((prev) => ({
        ...prev,
        active: true,
        label: label || "Click",
        hoverColor,
      }));
    };

    const handleOut = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const hoverEl = target.closest("[data-cursor], a, button, input, select, textarea, [role='button'], [role='menuitem'], [role='tab'], [draggable='true']") as HTMLElement | null;
      if (!hoverEl) return;

      setState((prev) => ({ ...prev, active: false, label: "" }));
    };

// Initial scale
    setState((prev) => ({ ...prev, scale: getScale() }));

    // Reduced motion listener
    useEffect(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.current = media.matches;
      const handleChange = () => prefersReducedMotion.current = media.matches;
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }, []); 

    // Event listeners
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    // Start animation loop
    animationId = requestAnimationFrame((time) => updateCursor(time));

    // Resize handler
    const handleResize = () => {
      setState((prev) => ({ ...prev, scale: getScale() }));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(animationId);
    };
  }, [getScale]);

  return (
    <>
      {/* Ghost trail cursors - trailing behind main cursor */}
{[0, 1].map((index) => {
        const { delay, scale, opacity } = getTrailPosition(index);
        return (
          <div
            key={`trail-${index}`}
            className="cursor-trail"
            style={{
              transform: `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale * scale})`,
              opacity: opacity,
              animationDelay: `${delay}s`,
              '--trail-color': state.hoverColor,
            } as React.CSSProperties}
            aria-hidden
          />
        );
      })}

      {/* Main glow effect */}
      <div
        className={`custom-cursor-glow ${state.isIdle ? "cursor-idle" : ""} ${state.isClicking ? "cursor-clicking" : ""}`}
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`,
          '--glow-color': state.hoverColor,
        } as React.CSSProperties}
        aria-hidden
      />

      {/* Main cursor */}
      <div
        className={`custom-cursor ${state.active ? "custom-cursor-active" : ""} ${state.isClicking ? "cursor-clicking" : ""} ${state.isIdle ? "cursor-idle" : ""}`}
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`,
          '--cursor-color': state.hoverColor,
          '--cursor-velocity': state.velocity.toString(),
        } as React.CSSProperties}
        aria-hidden
      >
        <div className="cursor-dot" />
        <div className="cursor-ring" />
        <span className="cursor-label">{state.label}</span>

        {/* Click ripple effect */}
        {state.ripple.active && (
          <div
            key={state.ripple.key}
            className="cursor-ripple"
            style={{
              transform: `translate3d(${state.ripple.x}px, ${state.ripple.y}px, 0)`,
              '--ripple-color': state.hoverColor,
            } as React.CSSProperties}
          />
        )}
      </div>
    </>
  );
}

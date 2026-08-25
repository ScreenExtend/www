import { useEffect, useRef, useState } from "react";

const EPS = 0.0015;

export function usePinProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const next = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress((prev) => (Math.abs(next - prev) > EPS ? next : prev));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

export function useTrackProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - rect.top) / (vh + rect.height);
      const next = Math.min(1, Math.max(0, p));
      setProgress((prev) => (Math.abs(next - prev) > EPS ? next : prev));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/** Tracks the user's reduced-motion preference so heavy motion can bow out. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Reactively tracks whether a CSS media query currently matches. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    // `change` covers boundary crossings; `resize` is a belt-and-suspenders
    // fallback so the match can never get stuck on an odd resize path.
    mq.addEventListener?.("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, [query]);

  return matches;
}

export function useCinematic() {
  const desktopClass = useMediaQuery(
    "(min-width: 1024px) and (min-height: 560px) and (hover: hover) and (pointer: fine)",
  );
  const reduced = useReducedMotion();
  return desktopClass && !reduced;
}

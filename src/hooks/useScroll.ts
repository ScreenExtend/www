import { useEffect, useRef, useState } from "react";

/**
 * Progress (0..1) of a tall wrapper as it scrolls past a pinned/sticky child.
 * 0 the moment the wrapper's top reaches the viewport top, 1 when its bottom
 * reaches the viewport bottom. Use for Apple-style pinned scroll sequences:
 * give the wrapper a height > 100vh and a `position: sticky` inner stage.
 */
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
      setProgress(total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0);
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

/**
 * Progress (0..1) of a normally-sized element travelling through the viewport:
 * 0 as its top enters from the bottom edge, 1 as its bottom leaves the top.
 * Drives lightweight parallax — map the returned value to a small translate.
 */
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
      setProgress(Math.min(1, Math.max(0, p)));
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
  const [matches, setMatches] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia(query).matches,
  );

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

/**
 * Whether the pinned, scroll-scrubbed "cinematic" sections should engage.
 * They need real vertical room and a wide canvas to work; on shorter or
 * narrower screens (phones, small landscape tablets) and when the user prefers
 * reduced motion, those sections fall back to a static, naturally-flowing
 * layout that can't overflow at any size.
 */
export function useCinematic() {
  const roomy = useMediaQuery("(min-width: 1024px) and (min-height: 660px)");
  const reduced = useReducedMotion();
  return roomy && !reduced;
}

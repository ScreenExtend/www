// Small, dependency-free helpers for scroll-scrubbed animation math.
// Everything is pure so the same value can drive transforms, opacity, and
// discrete step logic without introducing an animation library.

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

/** Normalize `v` to 0..1 as it moves across the window [a, b] (clamped). */
export const range = (v: number, a: number, b: number) =>
  a === b ? (v >= b ? 1 : 0) : clamp((v - a) / (b - a));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Interpolate a..b as `v` crosses the window [va, vb]. */
export const mix = (a: number, b: number, v: number, va = 0, vb = 1) =>
  lerp(a, b, range(v, va, vb));

/** Ease-in-out cubic for smoother scrubbing of individual sub-motions. */
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** A symmetric 0→1→0 pulse across [a, b], for one-shot flashes while scrubbing. */
export const pulse = (v: number, a: number, b: number) => {
  const t = range(v, a, b);
  return 1 - Math.abs(t - 0.5) * 2;
};

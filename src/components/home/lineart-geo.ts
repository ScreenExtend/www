// Geometry for the line-drawn devices (lineart.tsx). Every device is drawn in
// its own units with the desk at y = DESK and its left edge at x = 0, so the
// hero, the uses picker and the window moment can place them side by side.
export type Rect = { x: number; y: number; w: number; h: number };
export type Kind = "laptop" | "tablet" | "phone" | "old";

export const DESK = 260;

export const DEVICE: Record<Kind, { w: number; top: number; screen: Rect; pin: [number, number] }> = {
  laptop: { w: 400, top: 6, screen: { x: 46, y: 22, w: 308, h: 196 }, pin: [42, 12] },
  tablet: { w: 196, top: 30, screen: { x: 22, y: 42, w: 144, h: 200 }, pin: [24, 36] },
  phone: { w: 96, top: 96, screen: { x: 14, y: 106, w: 64, h: 128 }, pin: [14, 102] },
  old: { w: 316, top: 60, screen: { x: 44, y: 76, w: 228, h: 142 }, pin: [36, 66] },
};

export const SPOT = "#2557e0";

export type Ink = { ink: string; paper: string; sheet: string; spot: string; onSpot: string };
export const PAGE_INK: Ink = {
  ink: "var(--se-ink)",
  paper: "var(--se-paper)",
  sheet: "var(--se-sheet)",
  spot: SPOT,
  onSpot: "#fff",
};
// the blue band prints the same drawings in white
export const BAND_INK: Ink = { ink: "#fff", paper: SPOT, sheet: SPOT, spot: "#fff", onSpot: SPOT };

export function screenAt(kind: Kind, x: number, y: number): Rect {
  const s = DEVICE[kind].screen;
  return { x: s.x + x, y: s.y + y, w: s.w, h: s.h };
}

// a window's natural size; on a screen it is scaled to fit with a margin
export const WIN = { w: 168, h: 112 };

export function winSize(screen: Rect) {
  const s = Math.min(0.82, (screen.w - 8) / WIN.w, (screen.h - 12) / WIN.h);
  return { w: WIN.w * s, h: WIN.h * s };
}

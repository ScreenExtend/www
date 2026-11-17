// Placeholder data for the demo. Nothing here points at a real session.
export const SESSION_ID = "K7Q2DEMO9XWA";
export const OTP = "377620";

export type Variant = "primary" | "outline" | "secondary" | "ghost" | "danger";

// Class string for the app's shadcn button (see se-app src/components/ui/button.tsx).
export const bc = (v: Variant = "primary", size?: "sm" | "icon") =>
  `sed-btn sed-btn-${v}${size ? ` sed-btn-${size}` : ""}`;

export type Dev = {
  name: string;
  ip: string;
  os: string;
  screenSize: string;
  orientation: string;
  autoOrientation: boolean;
  remote: boolean;
  pointerScope: boolean;
  audio: boolean;
  audioOut: string;
  scale: number;
  dpr: number;
  maxDpr: number;
  nativeDpr: boolean;
  rate: number;
  autoRate: boolean;
  videoScale: number;
  quality: number;
  adaptive: boolean;
};

export const DEVICES: Dev[] = [
  {
    name: "iPad", ip: "192.168.1.24", os: "iPadOS", screenSize: "2360x1640",
    orientation: "Landscape", autoOrientation: false, remote: true, pointerScope: false,
    audio: true, audioOut: "System Default", scale: 100, dpr: 2, maxDpr: 2, nativeDpr: true,
    rate: 60, autoRate: false, videoScale: 100, quality: 15, adaptive: false,
  },
  {
    name: "Pixel 8", ip: "192.168.1.37", os: "Android", screenSize: "1080x2400",
    orientation: "Portrait", autoOrientation: false, remote: true, pointerScope: true,
    audio: false, audioOut: "System Default", scale: 125, dpr: 2.5, maxDpr: 2.75, nativeDpr: false,
    rate: 120, autoRate: false, videoScale: 80, quality: 20, adaptive: true,
  },
];

// Deterministic QR-looking module grid: finder, timing and alignment shapes plus seeded
// noise. There is no encoded payload, so it cannot be scanned to anything.
export function qrPath(seed: number) {
  let s = seed;
  const rnd = () => {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const N = 29;
  let d = "";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let v = -1;
      for (const [cx, cy] of [[3, 3], [N - 4, 3], [3, N - 4]]) {
        const r = Math.max(Math.abs(x - cx), Math.abs(y - cy));
        if (r <= 4) v = r === 3 || r <= 1 ? 1 : 0;
      }
      const a = Math.max(Math.abs(x - 22), Math.abs(y - 22));
      if (v < 0 && a <= 2) v = a === 1 ? 0 : 1;
      if (v < 0 && (x === 6 || y === 6)) v = (x === 6 ? y : x) % 2 === 0 ? 1 : 0;
      if (v < 0) v = rnd() < 0.5 ? 1 : 0;
      if (v) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
}

import { useId } from "react";

// Step 3's close-up, in the leaflet's two inks (see lineart.tsx for the rest).
const SPOT = "#2557e0";
const INK = "var(--se-ink)";
const SHEET = "var(--se-sheet)";
const PAPER = "var(--se-paper)";

const line = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Hatch({ id, color = INK, gap = 6 }: { id: string; color?: string; gap?: number }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d={`M0 0 V${gap}`} stroke={color} strokeWidth="1.2" />
    </pattern>
  );
}

// A window (168 x 112): a title bar and a page of something, hatched where a
// picture would be. `spot` prints the title bar in the spot ink.
function Win({ hatch, spot = false }: { hatch: string; spot?: boolean }) {
  return (
    <>
      <rect x="0" y="0" width="168" height="112" rx="3" fill={SHEET} {...line} />
      {spot && <path d="M1.25 1.25 H166.75 V20 H1.25 Z" fill={SPOT} />}
      <path d="M0 20 H168" {...line} />
      <path d="M12 10 H54" stroke={spot ? "#fff" : INK} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="14" y="32" width="58" height="44" fill={`url(#${hatch})`} {...line} strokeWidth={2} />
      <path d="M86 38 H152 M86 50 H140 M86 62 H148 M14 90 H152 M14 100 H116" {...line} strokeWidth={2} />
    </>
  );
}

// Step 3, close up: the edge between the two screens, with a window halfway over it.
export function EdgeDrawing({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 320 204" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`e${id}`}>
          <rect x="0" y="52" width="128" height="116" />
          <rect x="190" y="62" width="130" height="118" />
        </clipPath>
        <Hatch id={`eh${id}`} />
      </defs>
      {/* the right edge of the laptop and the left edge of the tablet */}
      <path d="M0 40 H128 Q140 40 140 52 V168 Q140 180 128 180 H0" fill={PAPER} {...line} />
      <path d="M0 52 H128 V168 H0" fill={SHEET} {...line} strokeWidth={2} />
      <path d="M320 50 H192 Q178 50 178 64 V182 Q178 196 192 196 H320" fill={PAPER} {...line} />
      <path d="M320 62 H190 V180 H320" fill={SHEET} {...line} strokeWidth={2} />
      {/* the window, dashed where there is no screen */}
      <rect x="66" y="78" width="168" height="112" rx="3" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="5 5" />
      <g clipPath={`url(#e${id})`}>
        <g transform="translate(66 78)">
          <Win hatch={`eh${id}`} spot />
        </g>
      </g>
      {/* which way it's going */}
      <path d="M96 20 H220" {...line} strokeWidth={2} />
      <path d="M210 12 L222 20 L210 28" fill="none" {...line} strokeWidth={2} />
      <g transform="translate(104 84)">
        <path d="M0 0 L0 24 L6.5 18.5 L11 28 L15.5 26 L11 16.5 L19 16 Z" fill={SHEET} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

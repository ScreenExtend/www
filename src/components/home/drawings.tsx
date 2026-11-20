import { useId } from "react";

// Step 3's close-up, in the leaflet's two inks (see lineart.tsx for the rest).
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

// Step 3, close up: the edge between the two screens. The hero and the window
// moment already show a window crossing, so this shows the part they don't:
// the pointer itself goes over the edge and on across the tablet, dragging a
// window by its title bar only once it gets there.
export function EdgeDrawing({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 320 204" className={className} aria-hidden="true" focusable="false">
      <defs>
        <Hatch id={`eh${id}`} />
      </defs>
      {/* the right edge of the laptop and the left edge of the tablet */}
      <path d="M0 40 H128 Q140 40 140 52 V168 Q140 180 128 180 H0" fill={PAPER} {...line} />
      <path d="M0 52 H128 V168 H0" fill={SHEET} {...line} strokeWidth={2} />
      <path d="M320 50 H192 Q178 50 178 64 V182 Q178 196 192 196 H320" fill={PAPER} {...line} />
      <path d="M320 62 H190 V180 H320" fill={SHEET} {...line} strokeWidth={2} />
      {/* where the pointer went: across the laptop, over the edge, onto the tablet */}
      <path d="M34 146 C70 140 96 116 132 112 S214 116 246 98" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
      <circle cx="34" cy="146" r="4" fill={INK} />
      {/* the edge it crossed, marked */}
      <path d="M159 30 V200" stroke="var(--se-link)" strokeWidth="2" strokeDasharray="6 5" />
      {/* a window corner on the tablet, picked up by its title bar */}
      <path d="M320 88 H232 Q228 88 228 92 V180" fill={SHEET} {...line} strokeWidth={2} />
      <path d="M229.25 89.25 H320 V106 H229.25 Z" fill="var(--se-accent)" />
      <path d="M228 106 H320" {...line} strokeWidth={2} />
      <rect x="240" y="118" width="58" height="40" fill={`url(#eh${id})`} {...line} strokeWidth={2} />
      <g transform="translate(246 96)">
        <path d="M0 0 L0 24 L6.5 18.5 L11 28 L15.5 26 L11 16.5 L19 16 Z" fill={SHEET} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

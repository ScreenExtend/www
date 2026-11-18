import { useId } from "react";

// Line drawings for the leaflet, drawn by hand in SVG and printed in two inks:
// the page ink (strokes, hatching) and the spot blue. Strokes use var(--se-ink)
// so they flip with the theme. Parts are lettered like a manual figure; the key
// sits next to each figure in HTML so it stays readable on a phone.
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

// A lettered callout: the letter in a ring, and a leader line to the part.
function Callout({ x, y, to, children }: { x: number; y: number; to: [number, number]; children: string }) {
  return (
    <g>
      <path d={`M${x} ${y} L${to[0]} ${to[1]}`} stroke={INK} strokeWidth="1.5" />
      <circle cx={to[0]} cy={to[1]} r="3" fill={INK} />
      <circle cx={x} cy={y} r="15" fill={PAPER} stroke={INK} strokeWidth="2" />
      <text
        x={x}
        y={y + 6}
        textAnchor="middle"
        fill={INK}
        fontFamily="Archivo, sans-serif"
        fontWeight="800"
        fontSize="17"
      >
        {children}
      </text>
    </g>
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

// The laptop and the tablet side by side, a window being dragged from one to the
// other. With `animate`, the drag plays once on load (CSS .desk-drag); its resting
// place is straddling both screens, which is the point of the whole product.
// Callouts: A the computer, B the tablet, C the window.
export function DeskDrawing({ animate = true, className = "" }: { animate?: boolean; className?: string }) {
  const id = useId().replace(/:/g, "");
  const drag = animate ? "desk-drag" : "";
  return (
    <svg viewBox="-6 46 630 338" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`scr${id}`}>
          <rect x="46" y="134" width="308" height="196" rx="3" />
          <rect x="426" y="154" width="144" height="200" rx="4" />
        </clipPath>
        <Hatch id={`h${id}`} />
        <Hatch id={`k${id}`} gap={8} />
      </defs>

      {/* the desk */}
      <path d="M-6 372 H618" {...line} />

      {/* laptop */}
      <rect x="30" y="118" width="340" height="226" rx="12" fill={PAPER} {...line} />
      <rect x="46" y="134" width="308" height="196" rx="3" fill={SHEET} {...line} strokeWidth={2} />
      <path d="M14 344 H386 L398 361 Q400 372 389 372 H11 Q0 372 2 361 Z" fill={PAPER} {...line} />
      <path d="M176 344 v3 q0 4 4 4 h40 q4 0 4 -4 v-3" {...line} strokeWidth={2} fill="none" />
      {/* a window that stays put on the laptop */}
      <g transform="translate(64 150) scale(0.82)">
        <Win hatch={`h${id}`} />
      </g>

      {/* tablet on its stand, the stand hatched as the far side */}
      <path d="M552 200 L600 370 L584 370 L546 226 Z" fill={`url(#k${id})`} {...line} strokeWidth={2} />
      <rect x="414" y="142" width="168" height="224" rx="16" fill={PAPER} {...line} />
      <rect x="426" y="154" width="144" height="200" rx="4" fill={SHEET} {...line} strokeWidth={2} />
      <rect x="404" y="364" width="190" height="8" rx="3" fill={PAPER} {...line} />

      {/* the dragged window: an outline where it is between screens... */}
      <g className={drag}>
        <rect x="300" y="176" width="168" height="112" rx="3" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="5 5" />
      </g>
      {/* ...and the window itself, shown only where there is a screen */}
      <g clipPath={`url(#scr${id})`}>
        <g className={drag}>
          <g transform="translate(300 176)">
            <Win hatch={`h${id}`} spot />
          </g>
        </g>
      </g>
      {/* the pointer holding the title bar */}
      <g className={drag}>
        <g transform="translate(332 183)">
          <path
            className={animate ? "desk-cursor-press" : ""}
            d="M0 0 L0 24 L6.5 18.5 L11 28 L15.5 26 L11 16.5 L19 16 Z"
            fill={SHEET}
            stroke={INK}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </g>

      <Callout x={14} y={78} to={[48, 120]}>A</Callout>
      <Callout x={606} y={100} to={[574, 146]}>B</Callout>
      <Callout x={392} y={70} to={[392, 176]}>C</Callout>
    </svg>
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

// An open carton with nothing in it, printed in white on the spot-blue panel.
// The inside is hatched because it is in shadow (and empty).
export function EmptyBox({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const s = { stroke: "#fff", strokeWidth: 2.5, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 30 430 280" className={className} aria-hidden="true" focusable="false">
      <defs>
        <Hatch id={`b${id}`} color="#fff" gap={7} />
      </defs>
      {/* back flap, standing up */}
      <path d="M160 110 L370 110 L384 50 L178 50 Z" fill={SPOT} {...s} />
      {/* the inside */}
      <path d="M80 150 L290 150 L370 110 L160 110 Z" fill={`url(#b${id})`} {...s} />
      <path d="M160 110 V150" {...s} strokeWidth={1.5} />
      {/* left flap, folded out */}
      <path d="M80 150 L160 110 L104 68 L18 110 Z" fill={SPOT} {...s} />
      {/* front and right faces; the right one is in shade */}
      <path d="M80 150 H290 V290 H80 Z" fill={SPOT} {...s} />
      <path d="M290 150 L370 110 V250 L290 290 Z" fill={`url(#b${id})`} {...s} />
      {/* right flap, folded out */}
      <path d="M290 150 L370 110 L420 142 L342 186 Z" fill={SPOT} {...s} />
      {/* front flap, swung down towards you: wider at the bottom because it is nearer */}
      <path d="M80 150 H290 L314 206 H56 Z" fill={SPOT} {...s} />
      {/* tape, cut */}
      <path d="M174 206 V290 M194 206 V290" stroke="#fff" strokeWidth="2" />
      {/* the sticker */}
      <g transform="translate(104 228) rotate(-4)">
        <rect width="62" height="34" rx="2" fill="#dcff4a" stroke="#14161a" strokeWidth="2" />
        <text x="31" y="23" textAnchor="middle" fill="#14161a" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="17" style={{ fontStretch: "110%" }}>
          Free
        </text>
      </g>
    </svg>
  );
}

// A phone propped against a mug, the stand that ships with every kitchen.
export function PhoneMug({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 64 320 172" className={className} aria-hidden="true" focusable="false">
      <defs>
        <Hatch id={`m${id}`} gap={7} />
      </defs>
      <path d="M0 226 H320" {...line} />
      {/* mug, its far side in shade */}
      <path d="M262 124 q38 0 38 32 q0 32 -38 32" fill="none" {...line} />
      <path d="M262 136 q24 0 24 20 q0 20 -24 20" fill="none" {...line} strokeWidth={2} />
      <path d="M152 96 H266 V210 Q266 226 250 226 H168 Q152 226 152 210 Z" fill={PAPER} {...line} />
      <path d="M238 104 H264 V210 Q264 224 250 224 H238 Z" fill={`url(#m${id})`} />
      <ellipse cx="209" cy="96" rx="57" ry="12" fill={PAPER} {...line} />
      <ellipse cx="209" cy="97" rx="47" ry="7" fill={INK} />
      {/* phone, leaning on it, pivoting on its bottom corner so it rests on the desk */}
      <g transform="translate(114 226) rotate(14) translate(-76 0)">
        <rect x="0" y="-150" width="76" height="150" rx="10" fill={PAPER} {...line} />
        <rect x="6" y="-142" width="64" height="132" rx="4" fill={SHEET} {...line} strokeWidth={2} />
        {/* a chat, waiting its turn */}
        <rect x="13" y="-130" width="38" height="14" rx="3" fill="none" {...line} strokeWidth={1.75} />
        <rect x="25" y="-108" width="38" height="14" rx="3" fill={SPOT} {...line} strokeWidth={1.75} />
        <rect x="13" y="-86" width="30" height="14" rx="3" fill="none" {...line} strokeWidth={1.75} />
        <rect x="13" y="-34" width="50" height="14" rx="3" fill="none" {...line} strokeWidth={1.75} />
      </g>
    </svg>
  );
}

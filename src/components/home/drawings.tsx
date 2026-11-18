import { useId } from "react";

// Line drawings for the leaflet, drawn by hand in SVG. Strokes use the page ink so
// they flip with the theme; fills are the logo's spot inks (blue, mint, lime).
const BLUE = "#316cff";
const MINT = "#d6f1ed";
const LIME = "#dcff4a";
const INK = "var(--se-ink)";
const SHEET = "var(--se-sheet)";
const PAPER = "var(--se-paper)";

const line = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

// A window (168 x 112). The lime block is whatever you were looking at.
function Win() {
  return (
    <>
      <rect x="0" y="0" width="168" height="112" rx="4" fill={SHEET} {...line} />
      <path d="M0 20 H168" {...line} />
      <circle cx="12" cy="10" r="2.6" fill={INK} />
      <circle cx="22" cy="10" r="2.6" fill={INK} />
      <rect x="14" y="32" width="58" height="44" rx="2" fill={LIME} {...line} strokeWidth={2} />
      <path d="M86 38 H152 M86 50 H140 M86 62 H148 M14 90 H152 M14 100 H116" {...line} strokeWidth={2} />
    </>
  );
}

// The laptop and the tablet side by side, a window being dragged from one to the
// other. With `animate`, the drag plays once on load (CSS .desk-drag); its resting
// place is straddling both screens, which is the point of the whole product.
export function DeskDrawing({ animate = true, className = "" }: { animate?: boolean; className?: string }) {
  const id = useId().replace(/:/g, "");
  const drag = animate ? "desk-drag" : "";
  return (
    <svg viewBox="-6 96 624 288" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`scr${id}`}>
          <rect x="46" y="134" width="308" height="196" rx="3" />
          <rect x="426" y="154" width="144" height="200" rx="4" />
        </clipPath>
      </defs>

      {/* the desk */}
      <path d="M-6 372 H618" {...line} />

      {/* laptop */}
      <rect x="30" y="118" width="340" height="226" rx="12" fill={PAPER} {...line} />
      <rect x="46" y="134" width="308" height="196" rx="3" fill={BLUE} {...line} strokeWidth={2} />
      <path d="M14 344 H386 L398 361 Q400 372 389 372 H11 Q0 372 2 361 Z" fill={PAPER} {...line} />
      <path d="M176 344 v3 q0 4 4 4 h40 q4 0 4 -4 v-3" {...line} strokeWidth={2} fill="none" />
      {/* a window that stays put on the laptop */}
      <g transform="translate(64 150) scale(0.82)">
        <Win />
      </g>

      {/* tablet on its stand */}
      <path d="M560 190 L600 368" {...line} />
      <rect x="414" y="142" width="168" height="224" rx="16" fill={PAPER} {...line} />
      <rect x="426" y="154" width="144" height="200" rx="4" fill={MINT} {...line} strokeWidth={2} />
      <rect x="404" y="364" width="190" height="8" rx="3" fill={PAPER} {...line} />

      {/* the dragged window: an outline where it is between screens... */}
      <g className={drag}>
        <rect x="300" y="176" width="168" height="112" rx="4" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="5 5" />
      </g>
      {/* ...and the window itself, shown only where there is a screen */}
      <g clipPath={`url(#scr${id})`}>
        <g className={drag}>
          <g transform="translate(300 176)">
            <Win />
          </g>
        </g>
      </g>
      {/* the pointer holding the title bar */}
      <g className={drag}>
        <g transform="translate(392 182)">
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
    </svg>
  );
}

// An open cardboard box with nothing in it, for the spot-blue panel.
export function EmptyBox({ className = "" }: { className?: string }) {
  const s = { stroke: "#fff", strokeWidth: 2.5, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 30 430 270" className={className} aria-hidden="true" focusable="false">
      {/* back flap */}
      <path d="M160 110 L370 110 L384 50 L178 50 Z" fill="#2557e0" {...s} />
      {/* the inside, dark because it is empty */}
      <path d="M80 150 L290 150 L370 110 L160 110 Z" fill="#163a9e" {...s} />
      <path d="M160 110 V150" {...s} />
      {/* left flap */}
      <path d="M80 150 L160 110 L104 68 L18 110 Z" fill="#2557e0" {...s} />
      {/* front and right faces */}
      <path d="M80 150 H290 V280 H80 Z" fill="#2557e0" {...s} />
      <path d="M290 150 L370 110 V240 L290 280 Z" fill="#1f4cc8" {...s} />
      {/* right flap */}
      <path d="M290 150 L370 110 L420 142 L342 186 Z" fill="#2557e0" {...s} />
      {/* front flap, hanging forward */}
      <path d="M80 150 H290 L300 192 H66 Z" fill="#2a5ee8" {...s} />
      {/* tape */}
      <path d="M176 192 V280 M196 192 V280" stroke="#fff" strokeWidth="2" />
      {/* the sticker */}
      <g transform="translate(104 214) rotate(-4)">
        <rect width="62" height="34" rx="2" fill={LIME} stroke="#15171b" strokeWidth="2" />
        <text x="31" y="23" textAnchor="middle" fill="#15171b" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="17" style={{ fontStretch: "110%" }}>
          Free
        </text>
      </g>
    </svg>
  );
}

// A phone propped against a mug, the stand that ships with every kitchen.
export function PhoneMug({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 20 320 216" className={className} aria-hidden="true" focusable="false">
      <path d="M0 226 H320" {...line} />
      {/* steam */}
      <path d="M198 64 q-8 -12 0 -24 q8 -12 0 -24 M222 70 q-8 -12 0 -24 q8 -12 0 -24" fill="none" {...line} strokeWidth={2} />
      {/* mug */}
      <path d="M262 124 q38 0 38 32 q0 32 -38 32" fill="none" {...line} strokeWidth={9} stroke={INK} />
      <path d="M262 124 q38 0 38 32 q0 32 -38 32" fill="none" stroke={LIME} strokeWidth={4} strokeLinecap="round" />
      <path d="M152 96 H266 V210 Q266 226 250 226 H168 Q152 226 152 210 Z" fill={LIME} {...line} />
      <ellipse cx="209" cy="96" rx="57" ry="12" fill={LIME} {...line} />
      <ellipse cx="209" cy="97" rx="47" ry="7" fill="#2a1d14" />
      {/* phone, leaning on it */}
      {/* pivots on its bottom-right corner, so it rests on the desk */}
      <g transform="translate(114 226) rotate(14) translate(-76 0)">
        <rect x="0" y="-150" width="76" height="150" rx="10" fill={PAPER} {...line} />
        <rect x="6" y="-142" width="64" height="132" rx="4" fill={BLUE} {...line} strokeWidth={2} />
        {/* a chat, waiting its turn */}
        <rect x="13" y="-130" width="38" height="14" rx="3" fill={SHEET} {...line} strokeWidth={1.75} />
        <rect x="25" y="-108" width="38" height="14" rx="3" fill={MINT} {...line} strokeWidth={1.75} />
        <rect x="13" y="-86" width="30" height="14" rx="3" fill={SHEET} {...line} strokeWidth={1.75} />
        <rect x="13" y="-34" width="50" height="14" rx="3" fill={SHEET} {...line} strokeWidth={1.75} />
      </g>
    </svg>
  );
}

// A printer's registration mark: two on the hero figure, one in the footer.
export function RegMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M12 0 V24 M0 12 H24" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Crop marks at the four corners of whatever it sits in (the parent must be relative).
export function CropMarks() {
  const c = "pointer-events-none absolute h-4 w-4 border-ink";
  return (
    <span aria-hidden="true" className="hidden sm:block">
      <span className={`${c} -left-6 -top-6 border-b border-r`} />
      <span className={`${c} -right-6 -top-6 border-b border-l`} />
      <span className={`${c} -bottom-6 -left-6 border-r border-t`} />
      <span className={`${c} -bottom-6 -right-6 border-l border-t`} />
    </span>
  );
}

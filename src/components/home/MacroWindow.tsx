import { useId } from "react";

// The hero subject, cropped close: a laptop lid and a tablet side by side, and
// one window halfway across the bezel gap. Each screen clips its own half, the
// way an extended display shows a window dragged between monitors. The pair
// runs off both edges and stands across the blue-to-paper line.
// On load the window slides in from the laptop (one entrance; none with
// reduced motion).

const W = 1600;
const H = 560;
const LID = { x: -80, y: 40, w: 870, h: 430 };
const TAB = { x: 850, y: 120, w: 830, h: 368 };
const BEZEL = { lid: 18, tab: 22 };
const WIN = { x: 470, y: 150, w: 700, h: 290, bar: 44 };

export default function MacroWindow() {
  const id = useId().replace(/:/g, "");
  const lidIn = { x: LID.x + BEZEL.lid, y: LID.y + BEZEL.lid, w: LID.w - BEZEL.lid * 2, h: LID.h - BEZEL.lid * 2 };
  const tabIn = { x: TAB.x + BEZEL.tab, y: TAB.y + BEZEL.tab, w: TAB.w - BEZEL.tab * 2, h: TAB.h - BEZEL.tab * 2 };

  const win = (
    <g>
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx="8" fill="var(--se-accent)" />
      <rect x={WIN.x} y={WIN.y + WIN.bar} width={WIN.w} height="2" fill="var(--se-device)" opacity="0.85" />
      <text x={WIN.x + 22} y={WIN.y + 29} fill="var(--se-device)" fontSize="20" fontWeight="600" style={{ fontFamily: "Archivo, sans-serif" }}>
        Team chat
      </text>
      {/* the conversation: their messages left, yours right */}
      <rect x={WIN.x + 28} y={WIN.y + 80} width="250" height="34" rx="17" fill="none" stroke="var(--se-device)" strokeWidth="2" />
      <rect x={WIN.x + 28} y={WIN.y + 126} width="330" height="34" rx="17" fill="none" stroke="var(--se-device)" strokeWidth="2" />
      <rect x={WIN.x + WIN.w - 28 - 260} y={WIN.y + 180} width="260" height="34" rx="17" fill="var(--se-device)" />
      <rect x={WIN.x + 28} y={WIN.y + WIN.h - 56} width={WIN.w - 56} height="34" rx="6" fill="none" stroke="var(--se-device)" strokeWidth="2" />
    </g>
  );

  return (
    <svg
      className="macro-window block h-[max(300px,35vw)] w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="A chat window dragged halfway from a laptop screen onto a tablet beside it, split by the gap between the two screens."
    >
      <defs>
        <clipPath id={`lid${id}`}>
          <rect x={lidIn.x} y={lidIn.y} width={lidIn.w} height={lidIn.h} rx="4" />
        </clipPath>
        <clipPath id={`tab${id}`}>
          <rect x={tabIn.x} y={tabIn.y} width={tabIn.w} height={tabIn.h} rx="4" />
        </clipPath>
      </defs>

      {/* the paper the desk stands on; above it the section's blue field shows through */}
      <rect x="-400" y="380" width={W + 800} height={H} fill="var(--se-paper)" />

      {/* laptop: lid and the front edge of its base */}
      <rect x={LID.x} y={LID.y} width={LID.w} height={LID.h} rx="22" fill="var(--se-device)" stroke="var(--se-device-rim)" strokeWidth="2" />
      <path d={`M${LID.x - 40} ${LID.y + LID.h} H${LID.x + LID.w + 40} l-14 22 H${LID.x - 26} Z`} fill="var(--se-device)" stroke="var(--se-device-rim)" strokeWidth="2" />
      <rect x={lidIn.x} y={lidIn.y} width={lidIn.w} height={lidIn.h} rx="4" fill="var(--se-screen)" />
      <circle cx={LID.x + LID.w / 2} cy={LID.y + 9} r="3" fill="var(--se-screen-line)" />

      {/* tablet on a stand */}
      <path d={`M${TAB.x + 120} ${TAB.y + TAB.h} l-20 24 h120 l-20 -24 Z`} fill="var(--se-device)" />
      <rect x={TAB.x} y={TAB.y} width={TAB.w} height={TAB.h} rx="26" fill="var(--se-device)" stroke="var(--se-device-rim)" strokeWidth="2" />
      <rect x={tabIn.x} y={tabIn.y} width={tabIn.w} height={tabIn.h} rx="4" fill="var(--se-screen)" />

      {/* what stays on the laptop: notes, outlined in the screen's own line colour */}
      <g fill="none" stroke="var(--se-screen-line)" strokeWidth="2">
        <rect x={lidIn.x + 60} y={lidIn.y + 40} width="380" height="250" rx="6" />
        <path d={`M${lidIn.x + 60} ${lidIn.y + 80} h380`} />
        <path d={`M${lidIn.x + 90} ${lidIn.y + 120} h220 M${lidIn.x + 90} ${lidIn.y + 156} h280 M${lidIn.x + 90} ${lidIn.y + 192} h180 M${lidIn.x + 90} ${lidIn.y + 228} h240`} strokeLinecap="round" />
      </g>

      {/* desk edge */}
      <path d={`M-400 ${LID.y + LID.h + 23} H${W + 400}`} stroke="var(--se-device)" strokeWidth="2" />

      {/* the window, drawn once per screen and clipped by each */}
      <g className="macro-window-slide">
        <g clipPath={`url(#lid${id})`}>{win}</g>
        <g clipPath={`url(#tab${id})`}>{win}</g>
        {/* the pointer holding the title bar; it rides above both screens */}
        <path
          transform={`translate(${WIN.x + 230} ${WIN.y + 12})`}
          d="M0 0 L0 30 L8 23 L13.5 34.5 L19 32 L13.5 20.5 L23.5 20 Z"
          fill="#fff"
          stroke="var(--se-device)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

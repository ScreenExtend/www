import { DEVICE, type Ink, type Kind } from "@/components/home/lineart-geo.ts";

// The leaflet's line drawings, printed in two inks: page ink for strokes and
// hatching, and the spot blue. On the blue band the same drawings print in
// white. Hatching stands in for shade and pictures; no flat colour fills.

const stroke = (c: string, w = 2.5) => ({
  stroke: c,
  strokeWidth: w,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
});

export function Hatch({ id, color, gap = 6 }: { id: string; color: string; gap?: number }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d={`M0 0 V${gap}`} stroke={color} strokeWidth="1.2" />
    </pattern>
  );
}

// A lettered callout: the letter in a ring, and a leader line to the part.
export function Callout({ at, to, ink, children }: { at: [number, number]; to: [number, number]; ink: Ink; children: string }) {
  return (
    <g aria-hidden="true">
      <path d={`M${at[0]} ${at[1]} L${to[0]} ${to[1]}`} stroke={ink.ink} strokeWidth="1.5" />
      <circle cx={to[0]} cy={to[1]} r="3" fill={ink.ink} />
      <circle cx={at[0]} cy={at[1]} r="15" fill={ink.paper} stroke={ink.ink} strokeWidth="2" />
      <text x={at[0]} y={at[1] + 6} textAnchor="middle" fill={ink.ink} fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="17">
        {children}
      </text>
    </g>
  );
}

// The frame of a device, its screen left blank (sheet) for whatever goes on it.
// `hatch` is the id of a Hatch pattern in the same svg, for the stands.
export function Device({ kind, x = 0, y = 0, ink, hatch }: { kind: Kind; x?: number; y?: number; ink: Ink; hatch: string }) {
  const l = stroke(ink.ink);
  const s = DEVICE[kind].screen;
  const screen = <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="3" fill={ink.sheet} {...l} strokeWidth={2} />;
  return (
    <g transform={`translate(${x} ${y})`}>
      {kind === "laptop" && (
        <>
          <rect x="30" y="6" width="340" height="226" rx="12" fill={ink.paper} {...l} />
          <circle cx="200" cy="14" r="2" fill={ink.ink} />
          {screen}
          <path d="M14 232 H386 L398 249 Q400 260 389 260 H11 Q0 260 2 249 Z" fill={ink.paper} {...l} />
          <path d="M176 232 v3 q0 4 4 4 h40 q4 0 4 -4 v-3" fill="none" {...l} strokeWidth={2} />
        </>
      )}
      {kind === "tablet" && (
        <>
          {/* the folio cover folded back into a stand, hatched as the far side */}
          <path d="M236 122 L292 258 L276 258 L228 146 Z" fill={`url(#${hatch})`} {...l} strokeWidth={2} />
          <rect x="10" y="78" width="264" height="176" rx="16" fill={ink.paper} {...l} />
          {screen}
          <rect x="0" y="252" width="284" height="8" rx="3" fill={ink.paper} {...l} />
        </>
      )}
      {kind === "phone" && (
        <>
          {/* a small stand: a back leg and a cradle */}
          <path d="M58 140 L92 258 L80 258 L50 158 Z" fill={`url(#${hatch})`} {...l} strokeWidth={2} />
          <rect x="8" y="96" width="76" height="150" rx="10" fill={ink.paper} {...l} />
          <path d="M38 101 H54" {...l} strokeWidth={2} />
          {screen}
          <rect x="0" y="244" width="92" height="16" rx="3" fill={ink.paper} {...l} />
        </>
      )}
      {kind === "old" && (
        <>
          {/* an older laptop: smaller, with a thick bezel and chin */}
          <rect x="26" y="60" width="264" height="176" rx="8" fill={ink.paper} {...l} />
          <circle cx="158" cy="68" r="2" fill={ink.ink} />
          {screen}
          <path d="M142 227 H174" {...l} strokeWidth={2} />
          <path d="M12 236 H304 L314 250 Q316 260 306 260 H10 Q0 260 2 250 Z" fill={ink.paper} {...l} />
          <path d="M134 236 v3 q0 4 4 4 h40 q4 0 4 -4 v-3" fill="none" {...l} strokeWidth={2} />
        </>
      )}
    </g>
  );
}

export type Art = "doc" | "page" | "chat" | "call" | "code" | "photo";

// What a window shows, drawn as lines in a w x h box (origin top-left).
export function ArtLines({ art, w, h, ink, hatch }: { art: Art; w: number; h: number; ink: Ink; hatch: string }) {
  const l = { ...stroke(ink.ink, 2), fill: "none" };
  const pad = Math.max(5, Math.min(12, w * 0.08));
  const inner = w - pad * 2;
  const rows = (top: number, gap: number, lens: number[]) => {
    const out: string[] = [];
    for (let i = 0, y = top; y < h - pad * 0.6; i++, y += gap) out.push(`M${pad} ${y} H${pad + inner * lens[i % lens.length]}`);
    return out.join(" ");
  };
  const gap = Math.max(7, Math.min(12, h / 7));

  if (art === "doc") {
    return (
      <>
        <path d={`M${pad} ${pad + 3} H${pad + inner * 0.55}`} {...l} strokeWidth={3} />
        <path d={rows(pad + 3 + gap * 1.3, gap, [0.92, 0.78, 0.86, 0.6, 0.9, 0.7])} {...l} />
      </>
    );
  }
  if (art === "page") {
    const ph = (h - pad * 2) * 0.45;
    return (
      <>
        <rect x={pad} y={pad} width={inner} height={ph} {...l} fill={`url(#${hatch})`} />
        <path d={rows(pad + ph + gap, gap, [0.9, 0.75, 0.85, 0.5])} {...l} />
      </>
    );
  }
  if (art === "code") {
    const ind = [0, 1, 2, 2, 1, 2, 3, 1, 0];
    const len = [0.5, 0.6, 0.45, 0.3, 0.55, 0.4, 0.3, 0.35, 0.2];
    const out: JSX.Element[] = [];
    for (let i = 0, y = pad + 2; y < h - pad * 0.6; i++, y += gap) {
      const x = pad + ind[i % ind.length] * inner * 0.1;
      out.push(<path key={i} d={`M${x} ${y} H${x + inner * len[i % len.length]}`} {...l} stroke={i === 2 ? ink.spot : ink.ink} />);
    }
    return <>{out}</>;
  }
  if (art === "chat") {
    const bh = Math.max(8, Math.min(14, h / 6));
    const g = bh * 0.55;
    const n = Math.max(2, Math.floor((h - pad * 2 + g) / (bh + g)));
    const out: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      const right = i % 2 === 1;
      const last = i === n - 1;
      const bw = inner * (right ? 0.5 : i % 3 === 0 ? 0.62 : 0.46);
      const y = h - pad - (n - i) * bh - (n - 1 - i) * g;
      out.push(
        <rect
          key={i}
          x={right || last ? pad + inner - bw : pad}
          y={y}
          width={bw}
          height={bh}
          rx="3"
          {...l}
          strokeWidth={1.75}
          fill={last ? ink.spot : "none"}
          stroke={ink.ink}
        />,
      );
    }
    return <>{out}</>;
  }
  if (art === "call") {
    // tiles of people on a call: a row when wide, a column when tall
    const n = 3;
    const across = w > h;
    const g = pad * 0.6;
    const tw = across ? (inner - g * (n - 1)) / n : inner;
    const th = across ? h - pad * 2 : (h - pad * 2 - g * (n - 1)) / n;
    return (
      <>
        {Array.from({ length: n }, (_, i) => {
          const x = across ? pad + i * (tw + g) : pad;
          const y = across ? pad : pad + i * (th + g);
          const r = Math.min(tw, th) * 0.17;
          const cx = x + tw / 2;
          const cy = y + th * 0.42;
          return (
            <g key={i}>
              <rect x={x} y={y} width={tw} height={th} rx="3" {...l} fill={i === 1 ? `url(#${hatch})` : "none"} />
              <circle cx={cx} cy={cy} r={r} {...l} fill={ink.sheet} />
              <path d={`M${cx - r * 1.8} ${y + th - 2} Q${cx} ${cy + r * 0.6} ${cx + r * 1.8} ${y + th - 2}`} {...l} fill={ink.sheet} />
            </g>
          );
        })}
      </>
    );
  }
  // photo: a grid of pictures, one with a mountain
  const cols = w > h ? 3 : 2;
  const g = pad * 0.6;
  const cw = (inner - g * (cols - 1)) / cols;
  const rowsN = Math.max(1, Math.floor((h - pad * 2 + g) / (cw + g)));
  const cells: JSX.Element[] = [];
  for (let r = 0; r < rowsN; r++)
    for (let c = 0; c < cols; c++) {
      const x = pad + c * (cw + g);
      const y = pad + r * (cw + g);
      const first = r === 0 && c === 0;
      cells.push(
        <g key={`${r}-${c}`}>
          <rect x={x} y={y} width={cw} height={cw} rx="2" {...l} fill={first ? "none" : `url(#${hatch})`} />
          {first && <path d={`M${x + 2} ${y + cw - 3} L${x + cw * 0.4} ${y + cw * 0.45} L${x + cw * 0.62} ${y + cw * 0.7} L${x + cw * 0.78} ${y + cw * 0.55} L${x + cw - 2} ${y + cw - 3}`} {...l} />}
        </g>,
      );
    }
  return <>{cells}</>;
}

// A window: title bar and content, w x h at the origin. `hot` prints the title
// bar in the spot ink (the window you're holding, or the one picked).
export function Window({ w, h, art, ink, hatch, hot = false, bar = true, title }: { w: number; h: number; art: Art; ink: Ink; hatch: string; hot?: boolean; bar?: boolean; title?: string }) {
  const l = stroke(ink.ink);
  const tb = bar ? Math.max(8, Math.min(18, h * 0.16)) : 0;
  return (
    <g>
      <rect x="0" y="0" width={w} height={h} rx="3" fill={ink.sheet} {...l} />
      {bar && (
        <>
          {hot && <path d={`M1.25 1.25 H${w - 1.25} V${tb} H1.25 Z`} fill={ink.spot} />}
          <path d={`M0 ${tb} H${w}`} {...l} />
          {w > 70 && title && tb >= 12 ? (
            <text x={tb * 0.5} y={tb * 0.72} fill={hot ? ink.onSpot : ink.ink} fontFamily="Archivo, sans-serif" fontWeight="700" fontSize={tb * 0.66}>
              {title}
            </text>
          ) : (
            w > 70 && <path d={`M${tb * 0.6} ${tb / 2} H${tb * 0.6 + w * 0.25}`} stroke={hot ? ink.onSpot : ink.ink} strokeWidth="2.5" strokeLinecap="round" />
          )}
        </>
      )}
      <g transform={`translate(0 ${tb})`}>
        <ArtLines art={art} w={w} h={h - tb} ink={ink} hatch={hatch} />
      </g>
    </g>
  );
}

export function Cursor({ x, y, ink }: { x: number; y: number; ink: Ink }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 0 L0 24 L6.5 18.5 L11 28 L15.5 26 L11 16.5 L19 16 Z"
      fill={ink.sheet}
      stroke={ink.ink}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  );
}

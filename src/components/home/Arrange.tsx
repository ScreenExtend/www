import { useEffect, useLayoutEffect, useRef, useState } from "react";

// The logo is three offset screens (blue, mint, lime). Spread out, that is exactly
// the monitor-arrangement panel in Windows and macOS display settings, so the hero
// draws that panel: 1 is the computer, 2 a tablet, 3 a phone. On load the plates
// start stacked like the logo and settle into place. 2 and 3 can be dragged (or
// moved with the arrow keys) and snap to an edge, the way the OS panel does.
//
// Geometry is in "u": 1u = 1% of the panel width, so it scales with the layout.

type Id = 1 | 2 | 3;
type Box = { x: number; y: number; w: number; h: number };

const SIZE: Record<Id, { w: number; h: number }> = {
  1: { w: 50, h: 31.25 }, // 16:10
  2: { w: 22, h: 29.3 }, // 3:4 tablet, portrait
  3: { w: 10.5, h: 21.5 }, // phone
};
const H = 54; // panel height in u (panel is 100 x 54)

const ARRANGED: Record<Id, { x: number; y: number }> = {
  1: { x: 19.25, y: 8 },
  2: { x: 69.25, y: 8 + 31.25 - 29.3 },
  3: { x: 19.25 - 10.5, y: 8 + 31.25 - 21.5 },
};
// the logo: front screen bottom-right, the other two stepping up and to the left
const STACKED: Record<Id, { x: number; y: number }> = {
  1: { x: 19.25, y: 8 },
  2: { x: 16.25, y: 5 },
  3: { x: 13.25, y: 2 },
};

const LABEL: Record<Id, string> = { 1: "This computer", 2: "Tablet", 3: "Phone" };
const STYLE: Record<Id, string> = {
  1: "bg-screen-blue text-white",
  2: "bg-logo-mint text-[#0f1419]",
  3: "bg-lime text-[#0f1419]",
};

const box = (id: Id, p: { x: number; y: number }): Box => ({ ...p, ...SIZE[id] });
const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.w - 0.01 && b.x < a.x + a.w - 0.01 && a.y < b.y + b.h - 0.01 && b.y < a.y + a.h - 0.01;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Every spot where `id` touches an edge of another screen without covering one,
// nearest to `want` first.
function snap(id: Id, want: { x: number; y: number }, pos: Record<Id, { x: number; y: number }>) {
  const { w, h } = SIZE[id];
  const others = ([1, 2, 3] as Id[]).filter((o) => o !== id).map((o) => box(o, pos[o]));
  const MIN = 3; // edges must share at least this much
  const spots: { x: number; y: number }[] = [];
  for (const q of others) {
    const sx = clamp(want.x, q.x - w + MIN, q.x + q.w - MIN);
    const sy = clamp(want.y, q.y - h + MIN, q.y + q.h - MIN);
    spots.push({ x: q.x - w, y: sy }, { x: q.x + q.w, y: sy }, { x: sx, y: q.y - h }, { x: sx, y: q.y + q.h });
  }
  const ok = spots
    .filter((s) => others.every((o) => !overlaps(box(id, s), o)));
  ok.sort((a, b) => Math.hypot(a.x - want.x, a.y - want.y) - Math.hypot(b.x - want.x, b.y - want.y));
  return ok[0] ?? pos[id];
}

// Like the OS panel, the view re-centres and zooms out to fit whatever the
// arrangement is, so a screen can go on any side.
function fit(pos: Record<Id, { x: number; y: number }>) {
  const bs = ([1, 2, 3] as Id[]).map((i) => box(i, pos[i]));
  const bx = Math.min(...bs.map((b) => b.x));
  const by = Math.min(...bs.map((b) => b.y));
  const bw = Math.max(...bs.map((b) => b.x + b.w)) - bx;
  const bh = Math.max(...bs.map((b) => b.y + b.h)) - by;
  const s = Math.min(1, 96 / bw, (H * 0.94) / bh);
  return { s, ox: (100 - bw * s) / 2 - bx * s, oy: (H - bh * s) / 2 - by * s };
}

export default function Arrange() {
  const panel = useRef<HTMLDivElement>(null);
  const [unit, setUnit] = useState(0); // px per u
  const [pos, setPos] = useState(STACKED);
  const [drag, setDrag] = useState<{ id: Id; dx: number; dy: number; x: number; y: number } | null>(null);
  const [settled, setSettled] = useState(false);
  const view = fit(pos);

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setUnit(el.clientWidth / 100));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // the one entrance: stacked like the logo, then spread into an arrangement
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPos(ARRANGED);
      setSettled(true);
      return;
    }
    const t = window.setTimeout(() => setPos(ARRANGED), 350);
    const t2 = window.setTimeout(() => setSettled(true), 1300);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  const down = (id: Id) => (e: React.PointerEvent<HTMLButtonElement>) => {
    if (id === 1 || !unit) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const r = panel.current!.getBoundingClientRect();
    const px = ((e.clientX - r.left) / unit - view.ox) / view.s;
    const py = ((e.clientY - r.top) / unit - view.oy) / view.s;
    setDrag({ id, dx: px - pos[id].x, dy: py - pos[id].y, x: pos[id].x, y: pos[id].y });
  };
  const move = (e: React.PointerEvent) => {
    if (!drag) return;
    const r = panel.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / unit - view.ox) / view.s - drag.dx;
    const y = ((e.clientY - r.top) / unit - view.oy) / view.s - drag.dy;
    setDrag({ ...drag, x, y });
  };
  const up = () => {
    if (!drag) return;
    const s = snap(drag.id, { x: drag.x, y: drag.y }, pos);
    setPos({ ...pos, [drag.id]: s });
    setDrag(null);
  };
  const key = (id: Id) => (e: React.KeyboardEvent) => {
    if (id === 1) return;
    const step = 40;
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const v = d[e.key];
    if (!v) return;
    e.preventDefault();
    const want = { x: pos[id].x + v[0], y: pos[id].y + v[1] };
    setPos({ ...pos, [id]: snap(id, want, pos) });
  };

  const where = (id: Id) => {
    const p = drag?.id === id ? drag : pos[id];
    const b = box(id, p);
    const o = box(1, pos[1]);
    if (id === 1) return "";
    if (b.x >= o.x + o.w - 0.1) return "right of the computer";
    if (b.x + b.w <= o.x + 0.1) return "left of the computer";
    if (b.y + b.h <= o.y + 0.1) return "above the computer";
    if (b.y >= o.y + o.h - 0.1) return "below the computer";
    return "next to the other screen";
  };

  return (
    <figure className="w-full">
      <div
        ref={panel}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="relative w-full select-none"
        style={{ aspectRatio: `100 / ${H}` }}
      >
        {([3, 2, 1] as Id[]).map((id) => {
          const p = drag?.id === id ? drag : pos[id];
          const b = box(id, p);
          const moving = drag?.id === id;
          return (
            <button
              key={id}
              type="button"
              onPointerDown={down(id)}
              onKeyDown={key(id)}
              aria-label={
                id === 1
                  ? "Screen 1, this computer"
                  : `Screen ${id}, ${LABEL[id].toLowerCase()}, ${where(id)}. Use the arrow keys to move it.`
              }
              className={`arrange-plate absolute flex flex-col justify-between overflow-hidden rounded-[0.5em] p-[0.6em] text-left ${STYLE[id]} ${
                id === 1 ? "cursor-default" : "cursor-grab touch-none active:cursor-grabbing"
              } ${moving ? "z-20 shadow-[0_0_0_2px_var(--se-ink)]" : id === 1 ? "z-10" : "z-0"} ${
                moving ? "" : "is-snapping"
              }`}
              style={{
                left: `${view.ox + b.x * view.s}%`,
                top: `${((view.oy + b.y * view.s) / H) * 100}%`,
                width: `${b.w * view.s}%`,
                height: `${((b.h * view.s) / H) * 100}%`,
                fontSize: unit ? `${Math.max(11, unit * 2.1 * view.s)}px` : undefined,
              }}
            >
              <span className="text-[2.2em] font-semibold leading-none">{id}</span>
              <span
                className={`text-[0.8em] font-medium leading-tight transition-opacity duration-300 ${
                  settled ? "opacity-100" : "opacity-0"
                } ${id === 3 ? "max-w-[4ch]" : ""}`}
              >
                {LABEL[id]}
              </span>
            </button>
          );
        })}
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Each device becomes its own screen. Drag 2 or 3 to arrange them.
      </figcaption>
    </figure>
  );
}

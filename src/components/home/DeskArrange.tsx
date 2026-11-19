import { useEffect, useId, useRef, useState } from "react";

import { Callout, Cursor, Device, Hatch, Window, type Art } from "@/components/home/lineart.tsx";
import { DESK, DEVICE, PAGE_INK as INK, screenAt, winSize, type Kind, type Rect } from "@/components/home/lineart-geo.ts";

// The hero figure: the leaflet's lettered drawing of a desk, except the windows
// on it move. The devices stay put; drag a window (or Tab to it and press the
// arrow keys) from the computer onto the tablet, and between any screens.
// While a window is over an edge it shows on both screens, dashed where there
// is no screen, the same as with a plugged-in monitor. On drop it snaps into the
// screen it covers most. Two switches put a phone and an old laptop on the desk.
// On load the team chat is carried from the computer to the tablet, once.

type WinId = "notes" | "chat" | "call";
type Extra = "phone" | "old";
// where a window is: the screen, and its top-left corner inside that screen
type Pos = { on: Kind; x: number; y: number };
type Drag = { id: WinId; x: number; y: number; w: number; h: number; ox: number; oy: number; sx: number; sy: number; moved: boolean };

const WINS: Record<WinId, { name: string; art: Art }> = {
  notes: { name: "Notes", art: "doc" },
  chat: { name: "Team chat", art: "chat" },
  call: { name: "The call", art: "call" },
};
const NAME: Record<Kind, string> = { laptop: "your computer", tablet: "the tablet", phone: "your phone", old: "the old laptop" };
const LETTER: Record<Kind, string> = { laptop: "A", tablet: "B", phone: "C", old: "D" };
// left to right on the desk, which is also the order the arrow keys step through.
// On a phone the desk is two rows, A B over C D, and the keys follow the rows.
const SEQ: Kind[] = ["old", "laptop", "tablet", "phone"];
const SEQ_NARROW: Kind[] = ["laptop", "tablet", "phone", "old"];

const START: Record<WinId, Pos> = {
  notes: { on: "laptop", x: 14, y: 14 },
  call: { on: "laptop", x: 156, y: 92 },
  chat: { on: "laptop", x: 160, y: 12 },
};
const CHAT_ON_TABLET: Pos = { on: "tablet", x: 4, y: 54 };

const SWITCH: Record<Extra, { label: string; helper: string }> = {
  phone: { label: "Add my phone", helper: "Any phone with a browser. It goes on the desk as C." },
  old: { label: "Add the old laptop", helper: "An older laptop works too. It only has to run a browser." },
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const gapBetween = (a: Kind, b: Kind) => (a === "laptop" && b === "tablet" ? 18 : 44);

// One row on wide layouts. On a phone the computer and tablet share the top
// row and the extras go on a second desk below, so nothing gets too small to grab.
function layout(on: Kind[], narrow: boolean) {
  const place = {} as Record<Kind, [number, number]>;
  const row = (ks: Kind[], y: number) => {
    let x = 0;
    ks.forEach((k, i) => {
      if (i) x += gapBetween(ks[i - 1], k);
      place[k] = [x, y];
      x += DEVICE[k].w;
    });
    return x;
  };
  const top = -56;
  if (!narrow) {
    const w = row(SEQ.filter((k) => on.includes(k)), 0);
    return { place, desks: [0], vb: { x: -28, y: top, w: w + 56, h: DESK + 8 - top } };
  }
  const w1 = row(["laptop", "tablet"], 0);
  const second = (["phone", "old"] as Kind[]).filter((k) => on.includes(k));
  if (!second.length) return { place, desks: [0], vb: { x: -28, y: top, w: w1 + 56, h: DESK + 8 - top } };
  const dy = DESK + 12;
  const w2 = row(second, dy);
  for (const k of second) place[k] = [place[k][0] + (w1 - w2) / 2, dy];
  return { place, desks: [0, dy], vb: { x: -28, y: top, w: w1 + 56, h: dy + DESK + 8 - top } };
}

function Switch({ id, on, set }: { id: Extra; on: boolean; set: (v: boolean) => void }) {
  const uid = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p id={`${uid}-l`} className="wide cursor-pointer font-bold leading-snug" onClick={() => set(!on)}>
          {SWITCH[id].label}
        </p>
        <p id={`${uid}-h`} className="mt-0.5 text-[0.9375rem] leading-snug text-muted">
          {SWITCH[id].helper}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={`${uid}-l`}
        aria-describedby={`${uid}-h`}
        onClick={() => set(!on)}
        className="switch mt-0.5"
      />
    </div>
  );
}

function Letter({ k, on = true }: { k: string; on?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[0.8125rem] font-extrabold leading-none ${
        on ? "border-ink text-ink" : "border-dashed border-muted text-muted"
      }`}
    >
      {k}
    </span>
  );
}

export default function DeskArrange() {
  const uid = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [narrow, setNarrow] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const [extra, setExtra] = useState<Record<Extra, boolean>>({ phone: false, old: false });
  const [wins, setWins] = useState(START);
  const [order, setOrder] = useState<WinId[]>(["notes", "call", "chat"]);
  const [sel, setSel] = useState<WinId>("chat");
  const [drag, setDrag] = useState<Drag | null>(null);
  const [intro, setIntro] = useState<"wait" | "moving" | "done">("wait");
  const [msg, setMsg] = useState("");

  const on: Kind[] = ["laptop", "tablet", ...(["phone", "old"] as Extra[]).filter((k) => extra[k])];
  const seq = (narrow ? SEQ_NARROW : SEQ).filter((k) => on.includes(k));
  const { place, desks, vb } = layout(on, narrow);
  const scr = (k: Kind): Rect => screenAt(k, place[k][0], place[k][1]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const fit = () => setNarrow(el.clientWidth < 600);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    // The svg lets the page scroll (pan-y) so a thumb on the drawing still
    // scrolls past it. Only a touch that starts on a window is kept for the
    // drag; touch-action on svg children isn't honoured everywhere, so this
    // is done here instead of in CSS.
    const s = svg.current;
    const hold = (e: TouchEvent) => {
      if ((e.target as Element | null)?.closest?.(".hw")) e.preventDefault();
    };
    s?.addEventListener("touchstart", hold, { passive: false });
    return () => {
      ro.disconnect();
      s?.removeEventListener("touchstart", hold);
    };
  }, []);

  // the entrance: the chat is carried from the computer to the tablet, once
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWins((w) => ({ ...w, chat: CHAT_ON_TABLET }));
      setIntro("done");
      return;
    }
    const t1 = window.setTimeout(() => {
      if (touched.current) return;
      setIntro("moving");
      setWins((w) => ({ ...w, chat: CHAT_ON_TABLET }));
    }, 700);
    const t2 = window.setTimeout(() => setIntro((i) => (i === "moving" ? "done" : i)), 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const begin = () => {
    touched.current = true;
    setIntro("done");
  };
  const front = (id: WinId) => setOrder((o) => [...o.filter((x) => x !== id), id]);
  const rectOf = (id: WinId): Rect => {
    if (drag?.id === id) return drag;
    const p = wins[id];
    const s = scr(p.on);
    return { x: s.x + p.x, y: s.y + p.y, ...winSize(s) };
  };
  // a spot on a screen for a window arriving by keyboard: centred, stepped
  // down and right a little for each window already there
  const park = (to: Kind, id: WinId, all: Record<WinId, Pos>): Pos => {
    const s = scr(to);
    const z = winSize(s);
    const n = (Object.keys(all) as WinId[]).filter((o) => o !== id && all[o].on === to).length;
    return {
      on: to,
      x: clamp((s.w - z.w) / 2 + n * 10 - 5, 4, s.w - z.w - 4),
      y: clamp((s.h - z.h) / 2 + n * 10 - 5, 6, s.h - z.h - 6),
    };
  };

  const shift = (id: WinId, dir: 1 | -1) => {
    begin();
    const i = seq.indexOf(wins[id].on);
    const to = seq[(i + dir + seq.length) % seq.length];
    setWins((w) => ({ ...w, [id]: park(to, id, w) }));
    setSel(id);
    front(id);
    setMsg(`${WINS[id].name} is on ${NAME[to]} now.`);
  };

  const toSvg = (e: React.PointerEvent) => {
    const m = svg.current?.getScreenCTM();
    return m ? new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()) : null;
  };
  const down = (id: WinId) => (e: React.PointerEvent<SVGGElement>) => {
    if (e.button !== 0) return;
    const p = toSvg(e);
    if (!p) return;
    begin();
    // capture on the svg, not the window: bringing the window to the front
    // moves its node, and a moved node loses the capture
    svg.current?.setPointerCapture(e.pointerId);
    const r = rectOf(id);
    setDrag({ id, ...r, ox: p.x - r.x, oy: p.y - r.y, sx: p.x, sy: p.y, moved: false });
    setSel(id);
    front(id);
  };
  const move = (e: React.PointerEvent) => {
    if (!drag) return;
    const p = toSvg(e);
    if (!p) return;
    const moved = drag.moved || Math.hypot(p.x - drag.sx, p.y - drag.sy) > 4;
    setDrag({ ...drag, x: p.x - drag.ox, y: p.y - drag.oy, moved });
  };
  const up = () => {
    const d = drag;
    if (!d) return;
    setDrag(null);
    if (!d.moved) return; // a tap just picks the window
    // the screen it covers most; if it covers none, it goes back where it was
    const from = wins[d.id].on;
    let to = from;
    let most = 0;
    for (const k of on) {
      const s = scr(k);
      const ow = Math.min(d.x + d.w, s.x + s.w) - Math.max(d.x, s.x);
      const oh = Math.min(d.y + d.h, s.y + s.h) - Math.max(d.y, s.y);
      if (ow > 0 && oh > 0 && ow * oh > most) {
        most = ow * oh;
        to = k;
      }
    }
    if (!most) {
      setMsg(`${WINS[d.id].name} went back to where it was on ${NAME[from]}.`);
      return;
    }
    const s = scr(to);
    const z = winSize(s);
    const cx = d.x + d.w / 2 - s.x;
    const cy = d.y + d.h / 2 - s.y;
    setWins((w) => ({
      ...w,
      [d.id]: { on: to, x: clamp(cx - z.w / 2, 4, s.w - z.w - 4), y: clamp(cy - z.h / 2, 6, s.h - z.h - 6) },
    }));
    setMsg(to === from ? `${WINS[d.id].name} stayed on ${NAME[to]}.` : `${WINS[d.id].name} is on ${NAME[to]} now.`);
  };
  const key = (id: WinId) => (e: React.KeyboardEvent) => {
    const fwd = ["ArrowRight", "ArrowDown", "Enter", " "].includes(e.key);
    const back = ["ArrowLeft", "ArrowUp"].includes(e.key);
    if (!fwd && !back) return;
    e.preventDefault();
    shift(id, fwd ? 1 : -1);
  };

  const toggle = (k: Extra) => (v: boolean) => {
    begin();
    setExtra((x) => ({ ...x, [k]: v }));
    if (v) {
      setMsg(`${k === "phone" ? "Your phone" : "The old laptop"} is on the desk. Move a window onto it.`);
      return;
    }
    const stranded = (Object.keys(wins) as WinId[]).filter((id) => wins[id].on === k);
    if (!stranded.length) {
      setMsg(`${k === "phone" ? "Your phone" : "The old laptop"} is off the desk.`);
      return;
    }
    setWins((w) => {
      const next = { ...w };
      for (const id of stranded) next[id] = park("laptop", id, next);
      return next;
    });
    setMsg(`${stranded.map((id) => WINS[id].name).join(" and ")} went back to your computer.`);
  };

  const pad = narrow ? 10 : 4;
  const ease = (id: WinId) => (drag?.id === id ? "" : intro === "moving" && id === "chat" ? "hw-slow" : "hw-snap");

  return (
    <figure className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
      <div ref={wrap} className="min-w-0 lg:col-span-12">
        <svg
          ref={svg}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          className="mx-auto block h-auto max-h-[27rem] w-full touch-pan-y select-none"
          role="group"
          aria-label={`A desk with ${on.map((k) => NAME[k]).join(", ")}. The windows on the screens can be moved.`}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          <defs>
            <clipPath id={`s${uid}`}>
              {on.map((k) => {
                const s = scr(k);
                return <rect key={k} x={s.x} y={s.y} width={s.w} height={s.h} rx="3" />;
              })}
            </clipPath>
            <Hatch id={`h${uid}`} color={INK.ink} />
            <Hatch id={`k${uid}`} color={INK.ink} gap={8} />
          </defs>

          {desks.map((y) => (
            <path key={y} d={`M${vb.x} ${y + DESK} H${vb.x + vb.w}`} stroke={INK.ink} strokeWidth="2.5" strokeLinecap="round" />
          ))}
          {seq.map((k) => (
            <Device key={k} kind={k} x={place[k][0]} y={place[k][1]} ink={INK} hatch={`k${uid}`} />
          ))}
          {seq.map((k) => {
            const [x, y] = place[k];
            const [px, py] = DEVICE[k].pin;
            return (
              <Callout key={k} at={[x + px - 30, y + py - 44]} to={[x + px, y + py]} ink={INK}>
                {LETTER[k]}
              </Callout>
            );
          })}

          {order.map((id) => {
            const r = rectOf(id);
            const t = { transform: `translate(${r.x}px, ${r.y}px)` };
            const cls = ease(id);
            const hot = sel === id || drag?.id === id;
            return (
              <g
                key={id}
                role="button"
                tabIndex={0}
                aria-label={`${WINS[id].name}, on ${NAME[wins[id].on]}. Drag it to another screen, or press the arrow keys to move it.`}
                className="hw"
                onPointerDown={down(id)}
                onKeyDown={key(id)}
                onFocus={() => setSel(id)}
              >
                <g className={cls} style={t}>
                  <rect width={r.w} height={r.h} rx="3" fill="none" stroke={INK.ink} strokeWidth="1.5" strokeDasharray="5 5" />
                </g>
                <g clipPath={`url(#s${uid})`}>
                  <g className={cls} style={t}>
                    <Window w={r.w} h={r.h} art={WINS[id].art} ink={INK} hatch={`h${uid}`} hot={hot} title={WINS[id].name} />
                  </g>
                </g>
                <g className={cls} style={t}>
                  <rect className="hw-ring" x="-6" y="-6" width={r.w + 12} height={r.h + 12} rx="6" fill="none" stroke="var(--se-link)" strokeWidth="2.5" />
                  {/* the hit area reaches a little past the window, so the small
                      ones on a phone screen are still easy to grab */}
                  <rect x={-pad} y={-pad} width={r.w + pad * 2} height={r.h + pad * 2} fill="transparent" />
                  {id === "chat" && intro !== "done" && <Cursor x={r.w * 0.45} y={6} ink={INK} />}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="text-[0.9375rem] leading-relaxed text-muted lg:col-span-5">
        <p>
          {coarse
            ? "The windows move. Drag one onto the tablet with your finger, or pick one and use the button below."
            : "The windows move. Drag one onto the tablet, the way you would onto a plugged-in monitor. Without a mouse, Tab to a window and press the arrow keys."}
        </p>
        <button type="button" className="btn-line mt-4" onClick={() => shift(sel, 1)}>
          Move {WINS[sel].name.replace(/^The /, "the ")} to the next screen
        </button>
        <p className="sr-only" aria-live="polite">
          {msg}
        </p>
      </figcaption>

      <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-7" aria-label="Key to the drawing">
        <li className="flex gap-3 text-[0.9375rem] leading-snug">
          <Letter k="A" />
          <span>
            <span className="sr-only">A: </span>Your computer. ScreenExtend runs here.
          </span>
        </li>
        <li className="flex gap-3 text-[0.9375rem] leading-snug">
          <Letter k="B" />
          <span>
            <span className="sr-only">B: </span>The tablet. It's only running its web browser.
          </span>
        </li>
        {(["phone", "old"] as Extra[]).map((k) => (
          <li key={k} className="flex gap-3">
            <Letter k={LETTER[k]} on={extra[k]} />
            <div className="min-w-0 flex-1">
              <span className="sr-only">{LETTER[k]}: </span>
              <Switch id={k} on={extra[k]} set={toggle(k)} />
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

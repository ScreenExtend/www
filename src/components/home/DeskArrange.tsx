import { useEffect, useId, useRef, useState } from "react";

import { Callout, Cursor, Device, Hatch, Window, type Art } from "@/components/home/lineart.tsx";
import { DESK, DEVICE, PAGE_INK as INK, screenAt, winSize, type Kind, type Rect } from "@/components/home/lineart-geo.ts";

// The hero figure: the leaflet's lettered drawing of a desk, except the windows
// on it move. The devices stay put; drag a window (or Tab to it and press the
// arrow keys) from the computer onto the tablet, and between any screens.
// While a window is over an edge it shows on both screens, dashed where there
// is no screen, the same as with a plugged-in monitor. On drop it snaps into the
// screen it covers most.
// On load the team chat is carried from the computer to the tablet, once.

type WinId = "notes" | "chat" | "call";
// where a window is: the screen, and its top-left corner inside that screen
type Pos = { on: Kind; x: number; y: number };
type Drag = { id: WinId; x: number; y: number; w: number; h: number; ox: number; oy: number; sx: number; sy: number; moved: boolean };

const WINS: Record<WinId, { name: string; art: Art }> = {
  notes: { name: "Notes", art: "doc" },
  chat: { name: "Team chat", art: "chat" },
  call: { name: "The call", art: "call" },
};
const NAME: Record<Kind, string> = { laptop: "the computer", tablet: "the tablet", phone: "the phone", old: "the old laptop" };
const LETTER: Record<Kind, string> = { laptop: "A", tablet: "B", phone: "C", old: "D" };
// left to right on the desk, which is also the order the arrow keys step through
const SEQ: Kind[] = ["laptop", "tablet"];

const START: Record<WinId, Pos> = {
  notes: { on: "laptop", x: 14, y: 14 },
  call: { on: "laptop", x: 156, y: 92 },
  chat: { on: "laptop", x: 160, y: 12 },
};
const CHAT_ON_TABLET: Pos = { on: "tablet", x: 51, y: 30 };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// the two devices side by side on one desk
function layout() {
  const gap = 6;
  const place = { laptop: [0, 0], tablet: [DEVICE.laptop.w + gap, 0] } as Record<Kind, [number, number]>;
  const w = DEVICE.laptop.w + gap + DEVICE.tablet.w;
  const top = -56;
  return { place, desks: [0], vb: { x: -28, y: top, w: w + 56, h: DESK + 8 - top } };
}

function Letter({ k }: { k: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[0.8125rem] font-extrabold leading-none border-ink text-ink"
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
  const [wins, setWins] = useState(START);
  const [order, setOrder] = useState<WinId[]>(["notes", "call", "chat"]);
  const [sel, setSel] = useState<WinId>("chat");
  const [drag, setDrag] = useState<Drag | null>(null);
  const [intro, setIntro] = useState<"wait" | "moving" | "done">("wait");
  const [msg, setMsg] = useState("");

  const on = SEQ;
  const seq = SEQ;
  const { place, desks, vb } = layout();
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
    // keep the window inside the screens, with the same margin it gets on drop
    // (4 across, 6 down), so it never sits on a frame and never jumps when let
    // go. It may straddle the gap only where it fits inside both screens'
    // heights; otherwise it stays on the screen under the pointer.
    const MX = 4;
    const MY = 6;
    const ss = on.map(scr);
    const fits = (s: Rect) => s.h - MY * 2 >= drag.h && s.w - MX * 2 >= drag.w;
    const within = (s: Rect, wx: number, wy: number) => ({
      x: clamp(wx, s.x + MX, s.x + s.w - MX - drag.w),
      y: clamp(wy, s.y + MY, s.y + s.h - MY - drag.h),
    });
    const wantX = p.x - drag.ox;
    const wantY = p.y - drag.oy;
    const left = Math.min(...ss.map((s) => s.x)) + MX;
    const right = Math.max(...ss.map((s) => s.x + s.w)) - MX;
    let x = clamp(wantX, left, right - drag.w);
    const over = ss.filter((s) => x < s.x + s.w && x + drag.w > s.x);
    let y: number;
    const top = Math.max(...over.map((s) => s.y)) + MY;
    const bottom = Math.min(...over.map((s) => s.y + s.h)) - MY;
    if (over.length > 1 && bottom - top >= drag.h) {
      y = clamp(wantY, top, bottom - drag.h);
    } else {
      // one screen: the one under the pointer, or the nearest that fits
      const cx = p.x;
      const home =
        ss.find((s) => cx >= s.x && cx <= s.x + s.w && fits(s)) ??
        ss.filter(fits).sort((a, b) => Math.abs(a.x + a.w / 2 - cx) - Math.abs(b.x + b.w / 2 - cx))[0] ??
        ss[0];
      const r = within(home, wantX, wantY);
      x = r.x;
      y = r.y;
    }
    setDrag({ ...drag, x, y, moved });
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
            ? "The windows move between the screens, by finger or with the button below."
            : "The windows move between the screens, the same as with a plugged-in monitor."}
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
            <span className="sr-only">A: </span>The computer. ScreenExtend runs here.
          </span>
        </li>
        <li className="flex gap-3 text-[0.9375rem] leading-snug">
          <Letter k="B" />
          <span>
            <span className="sr-only">B: </span>The tablet. It's only running its web browser.
          </span>
        </li>
      </ol>
    </figure>
  );
}

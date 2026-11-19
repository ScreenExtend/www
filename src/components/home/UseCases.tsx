import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";

import { Device, Hatch, Window, type Art } from "@/components/home/lineart.tsx";
import { DESK, DEVICE, PAGE_INK as INK, type Kind } from "@/components/home/lineart-geo.ts";

// Situations people are actually in, each with a drawing of what goes on which
// screen. Pick one from the list and the desk redraws (beside the list on wide
// screens, under the row you tapped on narrow ones). Product facts behind
// them: browser-only client, several devices at once, the hosted network
// (Windows only for now; see FaqSimple.tsx).
type Screen = { n: 1 | 2 | 3; label: string; art: Art };

const USES: { t: string; d: string; s: Screen[]; link?: string }[] = [
  {
    t: "Forty tabs on a 13‑inch laptop",
    d: "The reference tabs go on the tablet, and the writing gets the whole laptop screen.",
    s: [
      { n: 1, label: "The writing", art: "doc" },
      { n: 2, label: "The reference", art: "page" },
    ],
  },
  {
    t: "A call buried under other windows",
    d: "The call sits on the phone or tablet, and the notes stay on the computer with every face in view.",
    s: [
      { n: 1, label: "Notes", art: "doc" },
      { n: 3, label: "The call", art: "call" },
    ],
  },
  {
    t: "Slack, pinging off to the side",
    d: "Slack, Discord or email stays on the tablet, in view without taking over.",
    s: [
      { n: 1, label: "Work", art: "code" },
      { n: 2, label: "Slack", art: "chat" },
    ],
  },
  {
    t: "A train table and a laptop bag",
    d: "A laptop and the tablet already in the bag make two screens, with no cable to forget.",
    s: [
      { n: 1, label: "Laptop", art: "doc" },
      { n: 2, label: "Tablet", art: "page" },
    ],
  },
  {
    t: "Hotel Wi-Fi that wants a room number",
    d: "On a Windows PC, ScreenExtend can start its own Wi-Fi network, so the tablet connects straight to the computer with no router. This isn't on the Mac yet.",
    s: [
      { n: 1, label: "Laptop", art: "code" },
      { n: 2, label: "Tablet", art: "chat" },
    ],
    link: "its own Wi-Fi",
  },
  {
    t: "A spare phone and a spare tablet",
    d: "Connect both at the same time. Each one is its own display.",
    s: [
      { n: 1, label: "Main", art: "doc" },
      { n: 2, label: "Tablet", art: "chat" },
      { n: 3, label: "Phone", art: "call" },
    ],
  },
];

const KIND: Record<Screen["n"], Kind> = { 1: "laptop", 2: "tablet", 3: "phone" };
const PAD = 22; // desk either side of each device, so the desk line runs on
const LINK_W = 120;

// One device on its stretch of desk, its screen filled by one window.
function Unit({ s }: { s: Screen }) {
  const id = useId().replace(/:/g, "");
  const k = KIND[s.n];
  const d = DEVICE[k];
  const sc = d.screen;
  return (
    <svg viewBox={`${-PAD} 0 ${d.w + PAD * 2} ${DESK + 2}`} className="block h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <Hatch id={`h${id}`} color={INK.ink} />
        <Hatch id={`k${id}`} color={INK.ink} gap={8} />
      </defs>
      <path d={`M${-PAD} ${DESK} H${d.w + PAD}`} stroke={INK.ink} strokeWidth="2.5" />
      <Device kind={k} ink={INK} hatch={`k${id}`} />
      <g transform={`translate(${sc.x} ${sc.y})`}>
        <Window w={sc.w} h={sc.h} art={s.art} ink={INK} hatch={`h${id}`} bar={k !== "phone"} hot={s.n === 1} />
      </g>
    </svg>
  );
}

// the stretch of desk between laptop and tablet when they talk over their own Wi-Fi
function Link() {
  return (
    <svg viewBox={`0 0 ${LINK_W} ${DESK + 2}`} className="block h-auto w-full" aria-hidden="true" focusable="false">
      <path d={`M0 ${DESK} H${LINK_W}`} stroke={INK.ink} strokeWidth="2.5" />
      <path d={`M14 150 H${LINK_W - 14}`} stroke={INK.ink} strokeWidth="2" strokeDasharray="6 6" />
      <path
        d={`M${LINK_W - 20} 142 L${LINK_W - 10} 150 L${LINK_W - 20} 158 M20 142 L10 150 L20 158`}
        fill="none"
        stroke={INK.ink}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Desk({ screens, link }: { screens: Screen[]; link?: string }) {
  const cols: { key: string; w: number; body: React.ReactNode; label: string }[] = [];
  screens.forEach((s, i) => {
    if (link && i === 1) cols.push({ key: "link", w: LINK_W, body: <Link />, label: link });
    cols.push({ key: String(s.n), w: DEVICE[KIND[s.n]].w + PAD * 2, body: <Unit s={s} />, label: s.label });
  });
  return (
    // two rows sharing columns, so the desk line stays level whatever the labels wrap to
    <div aria-hidden="true" className="grid" style={{ gridTemplateColumns: cols.map((c) => `minmax(0, ${c.w}fr)`).join(" ") }}>
      {cols.map((c) => (
        <div key={c.key}>{c.body}</div>
      ))}
      {cols.map((c) => (
        <span
          key={`${c.key}-l`}
          className={`mt-2 px-1 text-center text-sm leading-tight sm:text-[0.9375rem] ${c.key === "link" ? "text-muted" : "font-semibold"}`}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

// the row marker: the screens this situation uses, as tiny outlines
function Glyph({ screens, on }: { screens: Screen[]; on: boolean }) {
  const size = { 1: "h-3 w-5", 2: "h-4 w-3", 3: "h-3.5 w-2" } as const;
  return (
    <span aria-hidden="true" className="flex w-12 shrink-0 items-end gap-[3px]">
      {screens.map((s) => (
        <span
          key={s.n}
          className={`rounded-[2px] border-[1.5px] border-ink ${size[s.n]} ${on && s.n === 1 ? "bg-spot" : "bg-sheet"}`}
        />
      ))}
    </span>
  );
}

// The fade only runs once the visitor has picked something. On first paint
// (prerendered, hydrating, or offscreen) the desk is simply there.
function Panel({ u, pick, swap }: { u: (typeof USES)[number]; pick: number; swap: boolean }) {
  return (
    <div>
      <div key={pick} className={swap ? "desk-swap" : ""}>
        <Desk screens={u.s} link={u.link} />
      </div>
      <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed">{u.d}</p>
    </div>
  );
}

// useLayoutEffect warns during the prerender, so it is only used in the browser
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function UseCases() {
  const [pick, setPick] = useState(0);
  const [picked, setPicked] = useState(false);
  const u = USES[pick];
  // On narrow screens the desk opens under the tapped row, and the one above
  // closes. Keep the tapped row where it was on screen instead of letting it
  // jump up by the height of the panel that closed.
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const anchor = useRef<{ i: number; top: number } | null>(null);
  useBrowserLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && rows.current[a.i];
    if (!el) return;
    const drift = el.getBoundingClientRect().top - a.top;
    if (Math.abs(drift) > 1) window.scrollBy({ top: drift, behavior: "instant" });
  }, [pick]);

  return (
    <section id="uses" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="display-lg">Use cases</h2>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <ul className="border-y-2 border-ink lg:col-span-5">
            {USES.map((x, i) => (
              <li key={x.t} className="border-t border-line first:border-t-0">
                <button
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={pick === i}
                  onClick={(e) => {
                    anchor.current = { i, top: e.currentTarget.getBoundingClientRect().top };
                    setPick(i);
                    setPicked(true);
                  }}
                  className={`group flex min-h-14 w-full items-center gap-4 px-3 py-3 text-left transition-colors duration-150 ${
                    pick === i ? "bg-sheet" : "hover:bg-sheet"
                  }`}
                >
                  <Glyph screens={x.s} on={pick === i} />
                  <span
                    className={`wide flex-1 text-[1.0625rem] leading-snug ${
                      pick === i ? "font-bold text-ink" : "font-medium text-muted group-hover:text-ink"
                    }`}
                  >
                    {x.t}
                  </span>
                  {/* only the narrow layout opens anything under the row, so only
                      it gets the FAQ's plus and minus; on wide screens the picked
                      row points at the drawing beside it */}
                  <span aria-hidden="true" className="text-link lg:hidden">
                    {pick === i ? <Minus size={20} strokeWidth={2} /> : <Plus size={20} strokeWidth={2} />}
                  </span>
                  <span aria-hidden="true" className={`hidden text-link lg:block ${pick === i ? "" : "invisible"}`}>
                    <ArrowRight size={20} strokeWidth={2} />
                  </span>
                </button>
                {/* phones and tablets: the desk opens right under the row you tapped */}
                {pick === i && (
                  <div className="px-1 pb-6 pt-4 lg:hidden">
                    <Panel u={x} pick={i} swap={picked} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:col-span-7 lg:block" aria-live="polite">
            <Panel u={u} pick={pick} swap={picked} />
          </div>
        </div>
      </div>
    </section>
  );
}

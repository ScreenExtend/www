import { useEffect, useId, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

import { Cursor, Device, Hatch, Window } from "@/components/home/lineart.tsx";
import { BAND_INK as INK, DESK, screenAt } from "@/components/home/lineart-geo.ts";

// The owner's recording goes here: a tablet beside a laptop, a window dragged
// across. Put the file in public/ (e.g. "/video/drag.mp4") and set VIDEO_SRC (and
// a poster frame in VIDEO_POSTER). Until then the band shows the leaflet's line
// drawing of the same moment, printed white on the blue; it is plainly a
// drawing, so it never passes for footage. Self-contained: delete the one line
// in App.tsx to drop the section.
const VIDEO_SRC = "";
const VIDEO_POSTER = "";

const TAB_X = 418; // the tablet sits just right of the laptop
const LAP = screenAt("laptop", 0, 0);
const TAB = screenAt("tablet", TAB_X, 0);
// the notes window starts on the laptop's right side and walks 238 units right,
// which puts it inside the tablet's screen (see wm-walk in index.css)
const W = { x: 212, y: 70, w: 122, h: 82 };

function Drawing() {
  const id = useId().replace(/:/g, "");
  const moving = (
    <g transform={`translate(${W.x} ${W.y})`}>
      <Window w={W.w} h={W.h} art="doc" ink={INK} hatch={`h${id}`} hot />
    </g>
  );
  return (
    <svg viewBox={`-20 -4 ${TAB_X + 196 + 40} ${DESK + 14}`} className="block h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`c${id}`}>
          <rect x={LAP.x} y={LAP.y} width={LAP.w} height={LAP.h} rx="3" />
          <rect x={TAB.x} y={TAB.y} width={TAB.w} height={TAB.h} rx="3" />
        </clipPath>
        <Hatch id={`h${id}`} color={INK.ink} />
        <Hatch id={`k${id}`} color={INK.ink} gap={8} />
      </defs>
      <path d={`M-20 ${DESK} H${TAB_X + 216}`} stroke={INK.ink} strokeWidth="2.5" strokeLinecap="round" />
      <Device kind="laptop" ink={INK} hatch={`k${id}`} />
      <Device kind="tablet" x={TAB_X} ink={INK} hatch={`k${id}`} />
      {/* a page of something that stays on the laptop */}
      <g transform={`translate(${LAP.x + 14} ${LAP.y + 16})`}>
        <Window w={140} h={160} art="page" ink={INK} hatch={`h${id}`} />
      </g>
      {/* the moving window: dashed where there is no screen, drawn where there is */}
      <g className="wm-move">
        <rect x={W.x} y={W.y} width={W.w} height={W.h} rx="3" fill="none" stroke={INK.ink} strokeWidth="1.5" strokeDasharray="5 5" />
      </g>
      <g clipPath={`url(#c${id})`}>
        <g className="wm-move">{moving}</g>
      </g>
      <g className="wm-move">
        <g transform={`translate(${W.x + 50} ${W.y + 4})`}>
          <g className="wm-press">
            <Cursor x={0} y={0} ink={{ ...INK, sheet: "#fff", ink: "#14161a" }} />
          </g>
        </g>
      </g>
    </svg>
  );
}

// The prerendered markup never autoplays. Playback starts after mount, and
// only when the visitor hasn't asked for reduced motion; controls stay on so
// it can always be paused.
function Video() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
    else void v.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      src={VIDEO_SRC}
      poster={VIDEO_POSTER || undefined}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full rounded-panel bg-[#14161a]"
      aria-label="A window dragged off a laptop's right edge onto the tablet beside it"
    />
  );
}

const CAPTION = "A notes window leaves the laptop's right edge and settles on the tablet beside it.";

export default function WindowMoment() {
  // the drawing plays once when it scrolls into view, then rests on the tablet
  const fig = useRef<HTMLElement>(null);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const el = fig.current;
    if (!el || run) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setRun(1);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run]);

  return (
    <section id="see-it" aria-labelledby="see-it-title" className="bg-spot py-16 text-white lg:py-24">
      <div className="container grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {VIDEO_SRC ? (
            <figure>
              <Video />
              <figcaption className="mt-4 text-[0.9375rem]">{CAPTION}</figcaption>
            </figure>
          ) : (
            <figure ref={fig}>
              <div key={run} className={run ? "wm-play" : ""}>
                <Drawing />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-[0.9375rem] leading-snug">
                <span className="max-w-[46ch]">{CAPTION}</span>
                <button
                  type="button"
                  onClick={() => setRun((r) => r + 1)}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-control px-3 font-semibold text-white transition-transform duration-150 focus-visible:bg-transparent focus-visible:shadow-[0_0_0_2px_#fff] active:translate-y-px motion-reduce:hidden"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  Play again
                </button>
              </figcaption>
            </figure>
          )}
        </div>
        <div className="lg:col-span-5">
          <h2 id="see-it-title" className="display-lg">
            Drag a window off the edge of your laptop
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            It keeps going, onto the tablet. Your computer thinks the tablet is one more monitor, so
            windows and the mouse cross over the way they would with a cable. Tell it which side the
            tablet is on, and they cross at that edge.
          </p>
        </div>
      </div>
    </section>
  );
}

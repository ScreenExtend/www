import { useEffect, useRef, useState } from "react";

import { DeskDrawing } from "@/components/home/drawings.tsx";

// The owner's recording goes here: a tablet beside a laptop, a window dragged
// across. Put the file in public/ (e.g. "/video/drag.mp4") and set VIDEO_SRC; an
// optional poster frame goes in VIDEO_POSTER. While VIDEO_SRC is empty the hero
// shows the lettered line drawing of the same moment, with its key.
export const VIDEO_SRC = "";
export const VIDEO_POSTER = "";

const KEY: [string, string][] = [
  ["A", "Your computer. ScreenExtend runs here."],
  ["B", "The tablet. It's only running its web browser."],
  ["C", "A window on its way across. While it's over the edge it shows on both screens, the same as with a plugged-in monitor."],
];

function Video() {
  const ref = useRef<HTMLVideoElement>(null);
  // The prerendered markup never autoplays. Playback starts after mount, and
  // only when the visitor hasn't asked for reduced motion.
  const [still, setStill] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce);
    if (reduce) ref.current?.pause();
    else void ref.current?.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      className="aspect-[16/10] w-full rounded-panel bg-surface object-cover"
      src={VIDEO_SRC}
      poster={VIDEO_POSTER || undefined}
      muted
      loop
      playsInline
      controls={still}
      preload="metadata"
      aria-label="A window dragged from a laptop onto a tablet standing next to it"
    />
  );
}

export default function HeroVideo() {
  if (VIDEO_SRC) {
    return (
      <figure>
        <Video />
        <figcaption className="small-print mt-3">A laptop, a tablet on a stand, and one window going across.</figcaption>
      </figure>
    );
  }
  return (
    <figure className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-center">
      <DeskDrawing className="w-full lg:col-span-8" />
      <figcaption className="lg:col-span-4">
        <ol className="space-y-3.5" aria-label="Key to the drawing">
          {KEY.map(([k, v]) => (
            <li key={k} className="flex gap-3 text-[0.9375rem] leading-snug">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink text-[0.8125rem] font-extrabold leading-none"
              >
                {k}
              </span>
              <span>
                <span className="sr-only">{k}: </span>
                {v}
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

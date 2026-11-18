import { useEffect, useState } from "react";

import { DeskDrawing, RegMark } from "@/components/home/drawings.tsx";

// The owner's recording goes here: a tablet beside a laptop, a window dragged
// across. Put the file in public/ (e.g. "/video/drag.mp4") and set VIDEO_SRC; an
// optional poster frame goes in VIDEO_POSTER. While VIDEO_SRC is empty the hero
// shows the line drawing of the same moment, captioned as a drawing.
export const VIDEO_SRC = "";
export const VIDEO_POSTER = "";

export default function HeroVideo() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <figure>
      <div className="relative">
      <RegMark className="absolute -left-3 -top-3 z-10 hidden text-muted lg:block" />
      <RegMark className="absolute -bottom-3 -right-3 z-10 hidden text-muted lg:block" />
      {VIDEO_SRC ? (
        <video
          className="aspect-[16/10] w-full rounded-panel bg-surface object-cover"
          src={VIDEO_SRC}
          poster={VIDEO_POSTER || undefined}
          muted
          loop
          playsInline
          autoPlay={!still}
          controls={still}
          preload="metadata"
          aria-label="A window dragged from a laptop onto a tablet standing next to it"
        />
      ) : (
        <div className="rounded-panel border-[1.5px] border-ink bg-sheet px-[4%] pb-[3%] pt-[6%]">
          <DeskDrawing className="w-full" />
        </div>
      )}
      </div>
      <figcaption className="small-print mt-3">
        {VIDEO_SRC
          ? "A real laptop, a real tablet, one window."
          : "Drawn, not filmed: a window on its way from the laptop to the tablet. It shows up on both screens while it's between them, as it would on a second monitor."}
      </figcaption>
    </figure>
  );
}

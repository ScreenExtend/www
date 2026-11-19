import { useEffect, useRef } from "react";

import AppDemo from "@/components/home/app-demo/AppDemo.tsx";

// On wide screens, stretch Settings next to the (longer) Edit Device panel, but
// stop it on the edge of a card, the last one that fits, with the top of the
// next one showing so it reads as scrollable. Stacked, it keeps its CSS height.
function useLevelSettings(root: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = root.current;
    const edit = el?.querySelector<HTMLElement>(".se-grow .sed-win");
    const set = el?.querySelector<HTMLElement>(".se-cut .sed-win");
    const sc = set?.querySelector<HTMLElement>(".sed-scroll");
    if (!edit || !set || !sc) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const fit = () => {
      if (!wide.matches) {
        set.style.height = "";
        return;
      }
      const top = sc.getBoundingClientRect().top - sc.scrollTop;
      const room = edit.offsetHeight - 22;
      let h = 382;
      for (const c of sc.querySelectorAll<HTMLElement>(".sed-card")) {
        const b = c.getBoundingClientRect().bottom - top;
        if (b <= room) h = b;
      }
      set.style.height = `${Math.round(h + 22)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(edit);
    wide.addEventListener("change", fit);
    return () => {
      ro.disconnect();
      wide.removeEventListener("change", fit);
    };
  }, [root]);
}

// Two frameless live pages from the app (app-demo/, bare mode): Edit Device and
// Settings. No hover gate here; they're usable straight away. The two columns
// share grid rows, so the titles, the lines under them and the panels start
// level. Edit Device opens on the iPad's sheet and grows to show all of it, so
// it runs longer than Settings, which stops on a card edge and scrolls.
export default function FeatureScroll() {
  const grid = useRef<HTMLDivElement>(null);
  useLevelSettings(grid);
  return (
    <section id="features" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <div>
          <h2 className="display-lg">Each device gets its own settings</h2>
          <p className="lede mt-3 max-w-2xl">
            Make the phone bigger without touching the tablet. Both panels below are live, so go ahead.
          </p>
        </div>

        <div ref={grid} className="mt-12 grid gap-12 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-10 lg:gap-y-0">
          <div className="min-w-0 lg:row-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
            <h3 className="wide text-xl font-bold">Edit Device</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Scale, orientation, refresh rate and video quality, set per device.
            </p>
            <div className="self-start">
              <AppDemo bare initialPage="edit" openFirst className="se-fit se-grow mt-5" />
              <p className="small-print mt-2">The iPad's settings are open, all of them. Close them to see the device list and pick the Pixel 8.</p>
            </div>
          </div>
          <div className="min-w-0 lg:row-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
            <h3 className="wide text-xl font-bold">Settings</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Make a new session code, start a Wi-Fi network of its own, and choose how long to wait
              before a quiet device is disconnected.
            </p>
            <div className="self-start">
              <AppDemo bare initialPage="settings" className="se-cut mt-5" />
              <p className="small-print mt-2">Scroll inside the panel for the rest, down to past devices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

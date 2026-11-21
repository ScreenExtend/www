import { useLayoutEffect, useRef } from "react";

import GhRibbon from "@/components/home/GhRibbon.tsx";
import DeskArrange from "@/components/home/DeskArrange.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";

// The cover of the leaflet: the line on the box, then the figure with its key.
// On wide screens the headline is set on one line, sized so it spans the full
// column whatever the typeface's width. Smaller screens wrap it at the CSS size.
function useFitLine() {
  const ref = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const h = ref.current;
    if (!h) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const fit = () => {
      h.style.fontSize = "";
      h.style.whiteSpace = "";
      if (!wide.matches) return;
      h.style.whiteSpace = "nowrap";
      h.style.fontSize = "100px";
      const room = h.parentElement!.clientWidth;
      h.style.fontSize = `${Math.floor((100 * room) / h.scrollWidth * 10) / 10}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(h.parentElement!);
    return () => ro.disconnect();
  }, []);
  return ref;
}

export default function HeroLanding() {
  const title = useFitLine();
  return (
    <section id="home" className="hero-fade relative pb-16 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
      <GhRibbon />
      <div className="container">
        <div className="text-center">
          <h1 ref={title} className="display text-[clamp(2.6rem,5.6vw,4.9rem)]">
            Use your tablet as a second monitor
          </h1>
          <div className="mx-auto mt-5 max-w-2xl lg:max-w-[54rem]">
            <p className="lede text-balance">
              Turns any iPad, Android tablet, phone or old laptop into an
              extended monitor through its browser. Wireless, nothing to install on the second device.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <a href="#download" className="btn-solid min-h-12 w-full whitespace-nowrap px-6 text-base sm:w-auto">
                Download for Windows or Mac
              </a>
              <a href="#how" className="u-link inline-flex min-h-11 items-center">
                How to set it up
              </a>
            </div>
          </div>
        </div>

        <SendToComputer className="mt-8" />

        <div className="mt-10 lg:mt-14">
          <DeskArrange />
        </div>
      </div>
    </section>
  );
}

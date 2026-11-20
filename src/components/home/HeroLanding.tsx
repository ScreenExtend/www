import { useLayoutEffect, useRef } from "react";
import { Star } from "lucide-react";

import MacroWindow from "@/components/home/MacroWindow.tsx";
import SendToComputer from "@/components/home/SendToComputer.tsx";

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

// three captions at most, each a fact the page backs up further down
const FACTS = [
  { big: "8 ms", small: "to capture and encode a frame" },
  { big: "Windows and Mac", small: "one install, on the computer" },
  { big: "Free", small: "and open source" },
];

export default function HeroLanding() {
  const title = useFitLine();
  return (
    <section id="home" className="hero-field relative">
      <div className="gh-ribbon-wrap">
        <a
          href="https://github.com/ScreenExtend/ScreenExtend"
          target="_blank"
          rel="noopener noreferrer"
          className="gh-ribbon"
        >
          <Star aria-hidden="true" size={14} strokeWidth={2.25} />
          Star on Github
        </a>
      </div>
      <div className="container pt-12 lg:pt-24">
        <div>
          <h1 ref={title} className="display text-[clamp(2.4rem,5.6vw,4.9rem)] text-white">
            Use your tablet as a second monitor
          </h1>
        </div>
        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-[36rem] text-lg leading-[1.6] text-[var(--se-on-field-muted)]">
              Turns any iPad, Android tablet, phone or old laptop into an
              extended monitor through its browser. Wireless, nothing to install on the second device.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a href="#download" className="btn-accent min-h-12 w-full whitespace-nowrap px-6 text-base sm:w-auto">
                Download for Windows or Mac
              </a>
              <a href="#how" className="u-link-field inline-flex min-h-11 items-center">
                How to set it up
              </a>
            </div>
          </div>
          <ul className="hidden content-start gap-4 lg:col-span-4 lg:col-start-9 lg:grid" aria-label="At a glance">
            {FACTS.map((f) => (
              <li key={f.big} className="text-[0.9375rem] leading-snug text-[var(--se-on-field-muted)]">
                <span className="font-semibold text-white">{f.big}</span> {f.small}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <MacroWindow />
      </div>
      <div className="container">
        <SendToComputer className="mt-8" />
      </div>
    </section>
  );
}

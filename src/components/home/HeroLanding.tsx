import { useRef, type MouseEvent } from "react";

import { Button } from "react-daisyui";
import { ArrowRight } from "lucide-react";

import { useTrackProgress, useReducedMotion } from "@/hooks/useScroll.ts";
import { mix } from "@/lib/anim.ts";
import heroShot from "@/assets/app/feature-1.png";

const CHIPS = ["No client install", "WebRTC streaming", "Works offline"];

export default function HeroLanding() {
  const { ref, progress } = useTrackProgress<HTMLDivElement>();
  const tiltRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Cursor-reactive 3D tilt on the composition (like the previous site's card).
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.transform = `rotateY(${px * 20}deg) rotateX(${-py * 18}deg)`;
  };
  const onLeave = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-14 lg:pb-28 lg:pt-24"
    >
      <div className="container">
        <div className="hero-shell">
          <div className="hero-grid">
            {/* copy */}
            <div>
              <h1 className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
                Turn any screen
                <br />
                into <span className="text-primary">your</span> screen.
              </h1>

              <p className="hero-lead mt-6 max-w-md text-lg leading-relaxed text-base-content/75">
                ScreenExtend makes a phone, tablet, or spare laptop act as an
                extended monitor, streamed straight from your PC over your Wifi
                network.
              </p>

              <div className="hero-actions mt-8 flex flex-wrap items-center gap-3">
                <Button
                  color="primary"
                  size="lg"
                  className="group shadow-sm transition-colors duration-200 hover:!bg-[#5b8bff]"
                  onClick={() => (window.location.href = "#download")}
                >
                  Download
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Button>
                <Button
                  color="ghost"
                  size="lg"
                  className="transition-colors duration-200 hover:text-primary"
                  onClick={() => (window.location.href = "#how")}
                >
                  See how it works
                </Button>
              </div>

              <ul className="hero-chips mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {CHIPS.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-1.5 text-sm text-base-content/60"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* visual: host window + phone acting as the extended display */}
            <div
              ref={ref}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="hero-visual relative [perspective:1200px]"
            >
            <div
              ref={tiltRef}
              className="relative transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
            >
              {/* brand bloom behind the composition (deliberate). unslop-ignore */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(49,108,255,0.22),transparent)]" // unslop-ignore
                style={{
                  transform: `translate(-50%, ${mix(-58, -42, progress)}%)`,
                }}
              />

              <div
                className="relative"
                style={{ transform: `translateY(${mix(30, -30, progress)}px)` }}
              >
                <div className="overflow-hidden rounded-xl border border-white/12 bg-[#0d1319] shadow-2xl shadow-black/50 ring-1 ring-primary/20">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="ml-2 font-mono text-[11px] text-white/40">
                      ScreenExtend — Add Device
                    </span>
                  </div>
                  <img
                    src={heroShot}
                    alt="The ScreenExtend host app showing QR codes to add a new device"
                    className="block w-full"
                  />
                </div>
              </div>

              {/* phone floating in front, on a different parallax track */}
              <div
                className="absolute -bottom-8 -right-2 w-[26%] max-w-[150px] sm:right-2 lg:-right-4"
                style={{
                  transform: `translateY(${mix(-24, 24, progress)}px)`,
                }}
              >
                <div className="relative aspect-[9/19] overflow-hidden rounded-[20px] border-2 border-white/15 bg-black shadow-2xl shadow-black/60">
                  <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-white/20" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0e2a4d] via-[#0b1622] to-[#0a1f24]" />{" "}
                  {/* unslop-ignore */}
                  <div className="absolute left-3 top-6 w-[68%] overflow-hidden rounded-md border border-white/20 bg-[#121a22]/95 shadow-lg">
                    <div className="flex gap-1 border-b border-white/10 px-1.5 py-1">
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                    </div>
                    <div className="space-y-1 p-2">
                      <div className="h-1 w-3/4 rounded bg-primary/60" />
                      <div className="h-1 w-full rounded bg-white/15" />
                      <div className="h-1 w-2/3 rounded bg-white/15" />
                      <div className="h-1 w-5/6 rounded bg-white/15" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-6 border-t border-white/10 bg-black/40 backdrop-blur-sm" />
                  <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-success/20 px-2 py-0.5">
                    <span className="h-1 w-1 rounded-full bg-success" />
                    <span className="font-mono text-[7px] text-success">
                      live
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

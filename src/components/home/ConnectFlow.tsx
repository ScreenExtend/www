import { memo, useMemo, type CSSProperties } from "react";
import { MonitorSmartphone, Pencil, Settings } from "lucide-react";

import { usePinProgress, useCinematic } from "@/hooks/useScroll.ts";
import { qrModules } from "@/lib/qr.ts";
import { range, mix, easeInOut, pulse, clamp } from "@/lib/anim.ts";

// The 6-digit code mirrors the real Settings screen so the demo reads as the
// actual product rather than filler.
const CODE = ["3", "7", "7", "6", "2", "0"];

// Stage geometry, expressed as percentages of the stage box. Because the
// dragged window is positioned from these same numbers, the copy on the host
// and the copy on the phone line up exactly across the bezel gap — so a single
// window appears to be dragged from one monitor onto the other.
const DESK = { left: 17, width: 50 }; // host monitor
const PHONE = { left: 71, width: 14 }; // client phone (≈4% bezel gap)
const WIN_W = 14; // dragged window, % of stage width

const STEPS = [
  {
    n: "01",
    t: "Launch on your PC",
    d: "Open ScreenExtend. It shows a QR code and a 6-digit session code for every network you're on.",
  },
  {
    n: "02",
    t: "Scan from any device",
    d: "Point a phone, tablet, or spare laptop at the code. It opens in the browser without anything to install.",
  },
  {
    n: "03",
    t: "Enter the session code",
    d: "Type the 6 digits to pair. The host spins up a virtual display sized to your device.",
  },
  {
    n: "04",
    t: "Drag across, like a cable",
    d: "The screen streams over WebRTC. Slide a window off the edge and it lands on your phone, just like a true second monitor.",
  },
];

// Decorative but stable QR; render once and keep it out of the per-scroll path.
const QrGrid = memo(function QrGrid() {
  const modules = useMemo(() => qrModules(0x5e7ab1), []);
  const size = modules.length;
  const cells: JSX.Element[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules[r][c]) {
        cells.push(
          <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} rx={0.1} />,
        );
      }
    }
  }
  return (
    <svg
      viewBox={`-1 -1 ${size + 2} ${size + 2}`}
      className="h-full w-full"
      fill="#0b1620"
      shapeRendering="crispEdges"
    >
      {cells}
    </svg>
  );
});

// A realistic little browser window — the thing the user drags onto the phone.
function AppWindow({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 overflow-hidden rounded-[5px] border border-black/40 bg-[#20262e] shadow-2xl shadow-black/60 ring-1 ring-white/10"
      style={style}
    >
      {/* title bar with real traffic-light colors */}
      <div className="flex items-center gap-[3px] bg-[#2b323b] px-[5px] py-[3px]">
        <span className="h-[5px] w-[5px] rounded-full bg-[#ff5f57]" />{" "}
        {/* unslop-ignore */}
        <span className="h-[5px] w-[5px] rounded-full bg-[#febc2e]" />{" "}
        {/* unslop-ignore */}
        <span className="h-[5px] w-[5px] rounded-full bg-[#28c840]" />{" "}
        {/* unslop-ignore */}
        <div className="ml-1 h-[7px] flex-1 rounded-full bg-black/30" />
      </div>
      <div className="flex">
        <div className="hidden w-1/4 flex-col gap-[3px] bg-black/25 p-[5px] sm:flex">
          <div className="h-[3px] w-full rounded-full bg-white/20" />
          <div className="h-[3px] w-2/3 rounded-full bg-white/12" />
          <div className="h-[3px] w-3/4 rounded-full bg-white/12" />
          <div className="h-[3px] w-1/2 rounded-full bg-white/12" />
        </div>
        <div className="flex-1 space-y-[3px] p-[5px]">
          <div className="h-[6px] w-3/5 rounded bg-primary/50" />
          <div className="h-[3px] w-full rounded-full bg-white/14" />
          <div className="h-[3px] w-5/6 rounded-full bg-white/14" />
          <div className="mt-[3px] aspect-[16/8] w-full rounded-sm bg-gradient-to-br from-white/12 to-white/[0.04]" />
          <div className="h-[3px] w-4/5 rounded-full bg-white/14" />
        </div>
      </div>
      {/* grabbing cursor — lives inside the window so it clips with it and
          "teleports" across the bezel gap, like a real multi-monitor cursor */}
      <svg
        aria-hidden
        className="absolute left-[46%] top-[1px] z-10 h-2.5 w-2.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]"
        viewBox="0 0 24 24"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
      >
        <path d="M4 2l6 16 2.2-6.2L18.4 9.6 4 2z" />
      </svg>
    </div>
  );
}

// The ScreenExtend host app — matched to the real UI: bold wordmark, a labelled
// sidebar with icons, and a centered QR panel.
const HostApp = memo(function HostApp() {
  const item = "flex items-center gap-1.5 rounded px-1.5 py-1";
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* app header */}
      <div className="flex items-center justify-between border-b border-white/8 px-2 py-1.5">
        <span className="font-sans text-[9px] font-extrabold tracking-tight text-white sm:text-[11px]">
          ScreenExtend
        </span>
        <span className="h-2.5 w-2.5 rounded-full bg-white/15 sm:h-3 sm:w-3" />
      </div>
      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        <div className="flex w-[30%] flex-col gap-1 border-r border-white/8 p-1.5">
          <div className={`${item} bg-primary/15 ring-1 ring-primary/30`}>
            <MonitorSmartphone className="h-2.5 w-2.5 shrink-0 text-primary sm:h-3 sm:w-3" />
            <span className="demo-sidebar-label truncate text-[9px] font-medium text-primary">
              Add Device
            </span>
          </div>
          <div className={item}>
            <Pencil className="h-2.5 w-2.5 shrink-0 text-white/35 sm:h-3 sm:w-3" />
            <span className="demo-sidebar-label truncate text-[9px] text-white/45">
              Edit Device
            </span>
          </div>
          <div className={item}>
            <Settings className="h-2.5 w-2.5 shrink-0 text-white/35 sm:h-3 sm:w-3" />
            <span className="demo-sidebar-label truncate text-[9px] text-white/45">
              Settings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

// All scroll-scrubbed sub-motions derived from a single progress value, shared
// by the pinned (live progress) and static (fixed frame) renderings.
function motion(p: number) {
  const stageIn = easeInOut(range(p, 0, 0.06));
  const qrReveal = range(p, 0.06, 0.14);

  const scanLine = range(p, 0.18, 0.34);
  const reticle = clamp(range(p, 0.15, 0.2) - range(p, 0.34, 0.4));
  const scanFlash = pulse(p, 0.32, 0.4);

  const camOn = clamp(range(p, 0.14, 0.2) - range(p, 0.36, 0.42));
  const otpOn = clamp(range(p, 0.4, 0.45) - range(p, 0.6, 0.66));
  const deskOn = range(p, 0.6, 0.68);

  const otpFill = range(p, 0.43, 0.58);
  const filled = Math.round(otpFill * CODE.length);

  // linear travel so the window spends even time crossing the bezel gap
  const travel = range(p, 0.64, 0.94);
  const winShown = clamp(range(p, 0.63, 0.67));
  const beamOpacity =
    0.7 * clamp(range(p, 0.16, 0.24) - range(p, 0.6, 0.68));
  const hostDim = 1 - deskOn * 0.45; // recede the host UI, keep it as context
  const qrOn = qrReveal * (1 - deskOn); // QR gives way to the workspace
  const settle = mix(1, 0.99, p, 0.9, 1);

  // Dragged window position, shared between the two clipped copies.
  const winX = mix(
    DESK.left + DESK.width / 2,
    PHONE.left + PHONE.width / 2,
    travel,
  ); // stage-% center
  const winLeft = winX - WIN_W / 2;
  const deskWin: CSSProperties = {
    left: `${((winLeft - DESK.left) / DESK.width) * 100}%`,
    width: `${(WIN_W / DESK.width) * 100}%`,
    opacity: winShown,
  };
  const phoneWin: CSSProperties = {
    left: `${((winLeft - PHONE.left) / PHONE.width) * 100}%`,
    width: `${(WIN_W / PHONE.width) * 100}%`,
    opacity: winShown,
  };

  return {
    stageIn,
    scanLine,
    reticle,
    scanFlash,
    camOn,
    otpOn,
    deskOn,
    filled,
    otpFill,
    beamOpacity,
    hostDim,
    qrOn,
    settle,
    deskWin,
    phoneWin,
  };
}

// The two-device demo composition. `widthCss` sizes the 16:9 stage: the pinned
// view caps it by viewport height, the static view by a plain max-width.
function Stage({ p, widthCss }: { p: number; widthCss: string }) {
  const m = motion(p);
  return (
    <div
      className="relative mx-auto aspect-[16/9]"
      style={{
        width: widthCss,
        opacity: m.stageIn,
        transform: `translateY(${mix(24, 0, m.stageIn)}px) scale(${m.settle})`,
      }}
    >
      {/* wireless link between the two devices */}
      <div
        aria-hidden
        className="absolute left-[64%] right-[26%] top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full"
        style={{ opacity: m.beamOpacity }}
      >
        <div className="h-full w-full bg-gradient-to-r from-primary/0 via-primary to-logo-cyan" />{" "}
        {/* unslop-ignore */}
      </div>

      {/* -------- host monitor -------- */}
      <div
        className="absolute top-1/2 aspect-[16/10] -translate-y-1/2"
        style={{ left: `${DESK.left}%`, width: `${DESK.width}%` }}
      >
        <div className="demo-host relative h-full w-full overflow-hidden rounded-lg border border-white/12 bg-[#0d1319] shadow-2xl shadow-black/50 sm:rounded-xl">
          <div style={{ opacity: m.hostDim }}>
            <HostApp />
          </div>

          {/* once connected the whole host becomes the extended
          desktop — matches the phone so the two read as one screen */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#123457] via-[#0c1a28] to-[#0a2026]" // unslop-ignore
            style={{ opacity: m.deskOn }}
          />

          {/* QR panel */}
          <div
            className="absolute bottom-0 left-[30%] right-0 top-[26px] flex flex-col items-center justify-center gap-1.5 px-3 sm:top-[30px] sm:gap-2"
            style={{ opacity: m.qrOn }}
          >
            <p className="hidden text-center text-[9px] font-medium text-white/70 sm:block">
              Scan to add a device
            </p>
            <div className="relative w-[44%] rounded-[2px] bg-white p-[1.5px] shadow-lg sm:w-[48%]">
              <div className="relative aspect-square w-full">
                <QrGrid />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[3px]"
                  style={{
                    opacity: m.reticle,
                    boxShadow:
                      "0 0 0 2px rgba(28,203,221,0.9), 0 0 22px rgba(28,203,221,0.55)", // unslop-ignore
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 h-[2px] bg-logo-cyan"
                  style={{
                    top: `${m.scanLine * 100}%`,
                    opacity: m.reticle,
                    boxShadow: "0 0 12px 3px rgba(28,203,221,0.8)", // unslop-ignore
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[3px] bg-logo-cyan/25"
                  style={{ opacity: m.scanFlash }}
                />
              </div>
            </div>
            <div className="flex gap-1">
              {CODE.map((d, i) => (
                <span
                  key={i}
                  className="flex h-4 w-3 items-center justify-center rounded-[3px] bg-white/[0.07] font-mono text-[8px] text-white/70 sm:h-5 sm:w-4 sm:text-[10px]"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* dragged window — host-side clipped copy */}
          <AppWindow style={m.deskWin} />
        </div>
        {/* stand */}
        <div className="mx-auto h-2 w-[12%] bg-white/10 sm:h-3" />
        <div className="mx-auto h-1 w-[24%] rounded-full bg-white/10" />
      </div>

      {/* -------- client phone -------- */}
      <div
        className="absolute top-1/2 aspect-[9/19] -translate-y-1/2"
        style={{ left: `${PHONE.left}%`, width: `${PHONE.width}%` }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[14px] border-2 border-white/15 bg-black shadow-2xl shadow-black/60 sm:rounded-[18px]">
          <div className="absolute left-1/2 top-1 z-30 h-1 w-6 -translate-x-1/2 rounded-full bg-white/20" />

          {/* camera / scanning */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#05090d]"
            style={{ opacity: m.camOn }}
          >
            <div className="relative h-[42%] w-[72%]">
              <span className="absolute left-0 top-0 h-2 w-2 rounded-tl border-l-2 border-t-2 border-logo-cyan" />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-tr border-r-2 border-t-2 border-logo-cyan" />
              <span className="absolute bottom-0 left-0 h-2 w-2 rounded-bl border-b-2 border-l-2 border-logo-cyan" />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-br border-b-2 border-r-2 border-logo-cyan" />
              <div
                className="absolute inset-x-1 h-[2px] bg-logo-cyan"
                style={{
                  top: `${m.scanLine * 100}%`,
                  boxShadow: "0 0 10px 2px rgba(28,203,221,0.8)", // unslop-ignore
                }}
              />
            </div>
            <p className="absolute bottom-3 inset-x-0 text-center text-[7px] text-white/50">
              Scanning…
            </p>
          </div>

          {/* OTP entry in a mobile browser */}
          <div
            className="absolute inset-0 flex flex-col bg-[#0b1016]"
            style={{ opacity: m.otpOn }}
          >
            <div className="flex items-center gap-1 border-b border-white/10 bg-[#141a21] px-1.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <div className="flex flex-1 items-center gap-0.5 rounded-full bg-black/40 px-1 py-[1px]">
                <span className="h-1 w-1 rounded-full bg-logo-lime/70" />
                <span className="truncate font-mono text-[5px] text-white/45 sm:text-[6px]">
                  screenextend.app
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-2">
              <p className="text-center text-[7px] font-semibold text-white/80 sm:text-[9px]">
                Enter session code
              </p>
              <div className="flex gap-0.5">
                {CODE.map((d, i) => (
                  <span
                    key={i}
                    className="flex h-3.5 w-2 items-center justify-center rounded-[2px] font-mono text-[7px] transition-colors sm:h-4 sm:w-2.5 sm:text-[8px]"
                    style={{
                      background:
                        i < m.filled
                          ? "rgba(49,108,255,0.25)"
                          : "rgba(255,255,255,0.06)",
                      color: i < m.filled ? "#9dbcff" : "transparent",
                      boxShadow:
                        i === m.filled
                          ? "0 0 0 1px rgba(49,108,255,0.85)"
                          : "none",
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
              <div
                className="mt-0.5 rounded-[3px] bg-primary px-2.5 py-0.5 text-[6px] font-semibold text-white sm:text-[7px]"
                style={{ opacity: 0.45 + m.otpFill * 0.55 }}
              >
                Connect
              </div>
            </div>
          </div>

          {/* extended desktop wallpaper (receives the window) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: m.deskOn }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#123457] via-[#0c1a28] to-[#0a2026]" />{" "}
            {/* unslop-ignore */}
            <AppWindow style={m.phoneWin} />
            <div className="absolute inset-x-0 bottom-0 h-3 border-t border-white/10 bg-black/40 backdrop-blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Cinematic: the stage is pinned while the copy and the demo scrub together as
// you scroll. Engages only when there's real vertical and horizontal room.
function ConnectFlowCinematic() {
  const { ref, progress: p } = usePinProgress<HTMLDivElement>();
  const active = p < 0.14 ? 0 : p < 0.4 ? 1 : p < 0.62 ? 2 : 3;

  return (
    <section id="how" ref={ref} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden py-6">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
            {/* left — heading, the active step, and the progress rail */}
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Set up
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight lg:text-[2.75rem] lg:leading-[1.1]">
                A second screen in
                <span className="text-primary"> under a minute</span>
              </h2>

              {/* the active step, cross-fading as you scroll. All steps share
              one grid cell so the block sizes to the tallest — no fixed height
              to overflow. */}
              <div className="mt-8 grid">
                {STEPS.map((s, i) => (
                  <div
                    key={s.n}
                    className="col-start-1 row-start-1 transition-all duration-500"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: `translateY(${active === i ? 0 : 10}px)`,
                      pointerEvents: active === i ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-primary">
                        {s.n}
                      </span>
                      <h3 className="text-xl font-semibold sm:text-2xl">
                        {s.t}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-base-content/70">
                      {s.d}
                    </p>
                  </div>
                ))}
              </div>

              {/* progress rail */}
              <div className="mt-8 flex gap-2">
                {STEPS.map((s, i) => (
                  <div
                    key={s.n}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-base-content/10"
                  >
                    <div
                      className="h-full origin-left rounded-full bg-primary transition-transform duration-300"
                      style={{
                        transform:
                          active > i
                            ? "scaleX(1)"
                            : active === i
                              ? `scaleX(${clamp((p - i * 0.22) / 0.22, 0.12, 1)})`
                              : "scaleX(0)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* right — the demo stage (sizes to the column, capped by height) */}
            <div className="min-w-0">
              <Stage
                p={p}
                widthCss="min(100%, 60rem, calc((100vh - 12rem) * 16 / 9))"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Static: everything flows in normal document order — heading, a single
// representative frame of the demo, then the four steps as a plain list. Can't
// overflow at any viewport size.
function ConnectFlowStatic() {
  return (
    <section id="how" className="py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Set Up
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A second screen in
            <span className="text-primary"> under a minute</span>
          </h2>
        </div>

        <div className="mt-10">
          <Stage p={0.5} widthCss="min(100%, 44rem)" />
        </div>

        <ol className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-6 sm:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-3">
              <span className="font-mono text-sm text-primary">{s.n}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-1 text-base leading-relaxed text-base-content/70">
                  {s.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ConnectFlow() {
  return useCinematic() ? <ConnectFlowCinematic /> : <ConnectFlowStatic />;
}

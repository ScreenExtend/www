import { useEffect, useRef, useState, type ReactNode } from "react";

const HOLD_MS = 2000;
const R = 20;
const C = 2 * Math.PI * R;

// Keeps the demo as a still preview until someone shows they want to use it:
// resting the pointer on it for 2 s (a ring fills around the cursor), a tap on
// touch screens, or the "Try the app" button for keyboard users.
export default function DemoGate({ children }: { children: ReactNode }) {
  const [live, setLive] = useState(false);
  const [holding, setHolding] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timer = useRef<number>();
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  // inert keeps the preview out of the tab order until it is live
  useEffect(() => {
    inner.current?.toggleAttribute("inert", !live);
  }, [live]);

  const start = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setHolding(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setHolding(false);
      setLive(true);
    }, HOLD_MS);
  };
  const stop = () => {
    window.clearTimeout(timer.current);
    setHolding(false);
  };
  const move = (e: React.PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const activate = () => {
    stop();
    setLive(true);
  };

  return (
    <div ref={box} className="relative">
      <div ref={inner}>{children}</div>

      {!live && (
        <div
          className="absolute inset-0 cursor-none"
          onPointerEnter={start}
          onPointerLeave={stop}
          onPointerMove={move}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") activate();
          }}
        >
          {holding && (
            <svg
              aria-hidden="true"
              width={52}
              height={52}
              viewBox="0 0 52 52"
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.x, top: pos.y }}
            >
              <circle cx="26" cy="26" r={R} fill="rgb(15 20 25 / 0.6)" stroke="rgb(255 255 255 / 0.12)" strokeWidth="4" />
              <circle
                cx="26"
                cy="26"
                r={R}
                fill="none"
                stroke="rgb(230 234 238 / 0.5)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C}
                transform="rotate(-90 26 26)"
                className="demo-ring"
              />
              <circle cx="26" cy="26" r="2.5" fill="#fff" />
            </svg>
          )}

          <button
            type="button"
            onClick={activate}
            className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-[#0f1419]/85 px-4 py-2 text-sm font-medium text-white"
          >
            <span className="hidden sm:inline">Hover to try the app</span>
            <span className="sm:hidden">Tap to try the app</span>
          </button>
        </div>
      )}
    </div>
  );
}

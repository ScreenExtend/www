import { useEffect, useRef, useState } from "react";
import { ExternalLink, Info, RefreshCw, X } from "lucide-react";

import { Checkbox, DemoBtn, Range, Select, Switch, Tip } from "@/components/home/app-demo/ui.tsx";
import { DEVICES, bc, type Dev } from "@/components/home/app-demo/shared.ts";

const LABEL = "text-sm font-medium leading-none";
const COLS = ["Device Name", "IP", "OS", "Scale", "Orientation", "Refresh Rate", "Screen Size", ""];
const opts = (...v: string[]) => v.map((x) => ({ value: x, label: x }));

type NumKey = "scale" | "dpr" | "rate" | "videoScale" | "quality";
type AutoKey = "nativeDpr" | "autoRate" | "adaptive";
// key, label, min, max, step, its "Set automatically" flag, tooltip (strings from the app)
const SLIDERS: [NumKey, string, number, number, number, AutoKey | null, string][] = [
  ["scale", "Scale", 25, 200, 25, null, "Zooms the extended desktop's content up or down."],
  ["dpr", "Pixel Ratio", 1, 0, 0.25, "nativeDpr", "Renders this display at the device's pixel density for sharper text and UI."],
  ["rate", "Refresh Rate", 15, 550, 5, "autoRate", "How many frames per second the display targets (Hz)."],
  ["videoScale", "Video Scale", 10, 100, 5, null, "Resolution of the streamed video. Lower uses less bandwidth."],
  ["quality", "Video Quality", 1, 51, 1, "adaptive", "Higher encodes faster but looks worse. Pick the highest value that still looks good."],
];

// openFirst: start with the first device's sheet open (the homepage's
// per-device panel), without taking focus on load
export default function EditDevice({ openFirst = false }: { openFirst?: boolean }) {
  const [devs, setDevs] = useState(DEVICES);
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null);
  const quiet = useRef(openFirst);
  const sheet = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const s = sheet.current;
    if (open === null || !s) return;
    // in the homepage's per-device panel (.se-grow) the window grows to fit the
    // whole sheet instead of cutting it off and scrolling it
    const win = s.closest<HTMLElement>(".se-grow .sed-win");
    if (win) win.style.minHeight = `${s.scrollHeight + win.offsetHeight - win.clientHeight}px`;
    if (quiet.current) quiet.current = false;
    else s.focus({ preventScroll: true });
    return () => {
      if (win) win.style.minHeight = "";
    };
  }, [open]);

  const show = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  };
  const close = () => {
    setOpen(null);
    opener.current?.focus();
  };
  const d = open === null ? null : devs[open];
  const set = (patch: Partial<Dev>) => setDevs((all) => all.map((x, i) => (i === open ? { ...x, ...patch } : x)));

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-y-2">
          <p role="presentation" className="text-2xl font-semibold">Connected Devices</p>
          <span className="ml-1.5" title="Rearrange extended displays in your system's display settings.">
            <Info size={15} aria-hidden="true" />
          </span>
          <div className="flex-grow" />
          <DemoBtn className={bc("secondary", "sm")} wrap="end">
            <ExternalLink className="mr-2" size={16} aria-hidden="true" />
            Display Settings
          </DemoBtn>
        </div>
        <p className="sed-muted">{devs.length} Screens Connected</p>
      </div>
      <div className="overflow-x-auto">
        <table className="sed-table">
          <thead>
            <tr>{COLS.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {devs.map((x, i) => (
              <tr
                key={x.ip}
                data-selected={open === i || undefined}
                className="cursor-pointer"
                onClick={(e) => {
                  // leave room to select text, and let the row's own buttons act alone
                  if (window.getSelection()?.toString() || (e.target as HTMLElement).closest("button")) return;
                  show(i);
                }}
              >
                {[x.name, x.ip, x.os, `${x.scale}%`, x.orientation, `${x.rate} Hz`, x.screenSize].map((v, c) => (
                  <td key={c}>{v}</td>
                ))}
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <DemoBtn className={bc("outline", "icon")} aria-label="Refresh stream">
                      <RefreshCw size={16} aria-hidden="true" />
                    </DemoBtn>
                    <button type="button" className={bc("outline")} onClick={() => show(i)}>
                      Edit Device
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {d && (
        <>
          <div className="sed-overlay" aria-hidden="true" onClick={close} />
          <div
            ref={sheet}
            role="dialog"
            aria-label={`Edit Device: ${d.name}`}
            tabIndex={-1}
            className="sed-sheet"
            onKeyDown={(e) => e.key === "Escape" && close()}
          >
            <button type="button" className="sed-plain sed-x" aria-label="Close" onClick={close}>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <p role="presentation" className="text-lg font-semibold">Edit Device</p>
            <div className="py-4">
              <div className="flex gap-4">
                <div className="min-w-0 flex-1">
                  <div className={`mb-2 ${LABEL}`}>
                    <Tip text="The name for this device in ScreenExtend.">Device Name</Tip>
                  </div>
                  <input className="sed-input" value={d.name} aria-label="Device Name" onChange={(e) => set({ name: e.target.value })} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`mb-2 ${LABEL}`}>
                    <Tip text="Rotates the extended display for this device.">Orientation</Tip>
                  </div>
                  <Select
                    label="Orientation"
                    value={d.orientation}
                    disabled={d.autoOrientation}
                    options={opts("Portrait", "Landscape")}
                    onChange={(v) => set({ orientation: v })}
                  />
                  <Checkbox checked={d.autoOrientation} onChange={(v) => set({ autoOrientation: v })}>
                    Set automatically
                  </Checkbox>
                </div>
              </div>
              {(
                [
                  ["Device IP", "The device's network address (read-only).", d.ip],
                  ["Device OS", "The operating system of this device (read-only).", d.os],
                  ["Screen Size", "The device's screen resolution in pixels (read-only).", d.screenSize],
                ] as const
              ).map(([label, tip, value]) => (
                <div key={label} className="mt-4">
                  <div className={`mb-2 ${LABEL}`}>
                    <Tip text={tip}>{label}</Tip>
                  </div>
                  <input className="sed-input" value={value} aria-label={label} disabled />
                </div>
              ))}
              <SwitchRow
                label="Remote Control"
                tip="Let this device control your PC with touch and keyboard. Turn off to keep the display view-only."
                on={d.remote}
                set={(v) => set({ remote: v })}
              />
              {d.remote && (
                <Checkbox checked={d.pointerScope} onChange={(v) => set({ pointerScope: v })}>
                  <Tip text="Keep the cursor on this device's screen. Off lets it cross onto your other monitors.">
                    Restrict Cursor to This Display
                  </Tip>
                </Checkbox>
              )}
              <SwitchRow
                label="System Audio"
                tip="Streams this computer's audio output to the device."
                on={d.audio}
                set={(v) => set({ audio: v })}
              />
              {d.audio && (
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className={`${LABEL} whitespace-nowrap`}>
                    <Tip text="Choose which of this device's speakers plays the streamed audio.">Audio Output</Tip>
                  </span>
                  <Select
                    className="w-[55%]"
                    label="Audio Output"
                    value={d.audioOut}
                    options={opts("System Default", "Speaker", "Earpiece")}
                    onChange={(v) => set({ audioOut: v })}
                  />
                </div>
              )}
              <div className="mt-4 border-t" />
              {SLIDERS.map(([key, name, min, max, step, auto, tip]) => {
                const v = d[key];
                const off = auto ? d[auto] : false;
                const num = key === "rate" || key === "quality";
                return (
                  <div key={key} className="mt-4">
                    <div className={`my-2 flex items-center ${LABEL}`}>
                      <Tip text={tip}>
                        {num ? (
                          <Num name={name} unit={key === "rate" ? "Hz" : ""} value={v} min={min} max={max} off={off} set={(n) => set({ [key]: n })} />
                        ) : (
                          `${name} - (${v}${key === "dpr" ? "×" : "%"})`
                        )}
                      </Tip>
                    </div>
                    <Range label={name} value={v} min={min} max={key === "dpr" ? d.maxDpr : max} step={step} disabled={off} onChange={(n) => set({ [key]: n })} />
                    {auto && (
                      <Checkbox checked={off} onChange={(c) => set(key === "dpr" && c ? { [auto]: c, dpr: d.maxDpr } : { [auto]: c })}>
                        Set automatically
                      </Checkbox>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex w-full gap-4">
              <DemoBtn className={`${bc("danger")} w-full`} wrap="flex-1">
                Remove Device
              </DemoBtn>
              <DemoBtn className={`${bc()} w-full !text-white`} wrap="flex-1">
                Save changes
              </DemoBtn>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SwitchRow({ label, tip, on, set }: { label: string; tip: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
      <span className={LABEL}>
        <Tip text={tip}>{label}</Tip>
      </span>
      <Switch label={label} checked={on} onChange={set} />
    </div>
  );
}

// "Refresh Rate - [120] Hz": the number box beside a slider. Out-of-range input snaps back on blur.
function Num(p: { name: string; unit?: string; value: number; min: number; max: number; off: boolean; set: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <span className="flex items-center">
      {p.name} -
      <input
        className="sed-input sed-num ml-1"
        type="number"
        inputMode="numeric"
        aria-label={`${p.name} value`}
        min={p.min}
        max={p.max}
        value={draft ?? p.value}
        disabled={p.off}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          const n = Number(draft);
          if (draft !== null && n >= p.min && n <= p.max) p.set(Math.round(n));
          setDraft(null);
        }}
      />
      {p.unit && <span className="ml-1">{p.unit}</span>}
    </span>
  );
}

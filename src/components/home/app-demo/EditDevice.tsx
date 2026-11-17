import { useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, Info, RefreshCw, X } from "lucide-react";

import { Checkbox, DemoBtn, Range, Select, Switch, Tip } from "@/components/home/app-demo/ui.tsx";
import { DEVICES, bc, type Dev } from "@/components/home/app-demo/shared.ts";

const LABEL = "text-sm font-medium leading-none";
const COLS = ["Device Name", "IP", "OS", "Scale", "Orientation", "Refresh Rate", "Screen Size", ""];
const opts = (...v: string[]) => v.map((x) => ({ value: x, label: x }));

export default function EditDevice() {
  const [devs, setDevs] = useState(DEVICES);
  const [open, setOpen] = useState<number | null>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open !== null) sheet.current?.focus();
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
          <h3 className="text-2xl font-semibold">Connected Devices</h3>
          <span className="ml-1.5" title="Rearrange extended displays in your system's display settings.">
            <Info size={15} aria-hidden="true" />
          </span>
          <div className="flex-grow" />
          <DemoBtn className={bc("secondary", "sm")} wrap="end">
            <ExternalLink className="mr-2" size={16} aria-hidden="true" />
            Display Settings
          </DemoBtn>
        </div>
        <p className="text-gray-500">{devs.length} Screens Connected</p>
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
            <h3 className="text-lg font-semibold">Edit Device</h3>
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
                  <span className={LABEL}>
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
              <Slide
                label={`Scale - (${d.scale}%)`}
                tip="Zooms the extended desktop's content up or down."
                name="Scale"
                value={d.scale}
                min={25}
                max={200}
                step={25}
                onChange={(v) => set({ scale: v })}
              />
              <Slide
                label={`Pixel Ratio - (${d.dpr}×)`}
                tip="Renders this display at the device's pixel density for sharper text and UI."
                name="Pixel Ratio"
                value={d.dpr}
                min={1}
                max={d.maxDpr}
                step={0.25}
                auto={d.nativeDpr}
                onAuto={(v) => set({ nativeDpr: v, dpr: v ? d.maxDpr : d.dpr })}
                onChange={(v) => set({ dpr: v })}
              />
              <Slide
                label={<Num name="Refresh Rate" unit="Hz" value={d.rate} min={15} max={550} off={d.autoRate} set={(v) => set({ rate: v })} />}
                tip="How many frames per second the display targets (Hz)."
                name="Refresh Rate"
                value={d.rate}
                min={15}
                max={550}
                step={5}
                auto={d.autoRate}
                onAuto={(v) => set({ autoRate: v })}
                onChange={(v) => set({ rate: v })}
              />
              <Slide
                label={`Video Scale - (${d.videoScale}%)`}
                tip="Resolution of the streamed video. Lower uses less bandwidth."
                name="Video Scale"
                value={d.videoScale}
                min={10}
                max={100}
                step={5}
                onChange={(v) => set({ videoScale: v })}
              />
              <Slide
                label={<Num name="Video Quality" value={d.quality} min={1} max={51} off={d.adaptive} set={(v) => set({ quality: v })} />}
                tip="Higher encodes faster but looks worse. Pick the highest value that still looks good."
                name="Video Quality"
                value={d.quality}
                min={1}
                max={51}
                step={1}
                auto={d.adaptive}
                onAuto={(v) => set({ adaptive: v })}
                onChange={(v) => set({ quality: v })}
              />
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

function Slide({
  label,
  tip,
  name,
  auto,
  onAuto,
  ...range
}: {
  label: ReactNode;
  tip: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  auto?: boolean;
  onAuto?: (v: boolean) => void;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mt-4">
      <div className={`my-2 flex items-center ${LABEL}`}>
        <Tip text={tip}>{label}</Tip>
      </div>
      <Range label={name} disabled={auto} {...range} />
      {onAuto && (
        <Checkbox checked={!!auto} onChange={onAuto}>
          Set automatically
        </Checkbox>
      )}
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

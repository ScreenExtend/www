import { useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, Info, RefreshCw, X } from "lucide-react";

import { Checkbox, DemoBtn, Range, Select, Switch, Tip } from "@/components/home/app-demo/ui.tsx";
import { DEVICES, bc, type Dev } from "@/components/home/app-demo/shared.ts";

const fmt = (n: number) => String(Math.round(n * 100) / 100);

function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-4">
      <div className="mb-2 text-sm font-medium leading-none">{label}</div>
      {children}
    </div>
  );
}

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
  const set = (patch: Partial<Dev>) =>
    setDevs((all) => all.map((x, i) => (i === open ? { ...x, ...patch } : x)));

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
            <tr>
              {["Device Name", "IP", "OS", "Scale", "Orientation", "Refresh Rate", "Screen Size", ""].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {devs.map((x, i) => (
              <tr
                key={x.ip}
                data-selected={open === i || undefined}
                className="cursor-pointer"
                onClick={(e) => {
                  // let people select text in the table without opening the sheet
                  if (window.getSelection()?.toString()) return;
                  if ((e.target as HTMLElement).closest("button")) return;
                  show(i);
                }}
              >
                <td>{x.name}</td>
                <td>{x.ip}</td>
                <td>{x.os}</td>
                <td>{x.scale}%</td>
                <td>{x.orientation}</td>
                <td>{x.rate} Hz</td>
                <td>{x.screenSize}</td>
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
                  <div className="mb-2 text-sm font-medium leading-none">
                    <Tip text="The name for this device in ScreenExtend.">Device Name</Tip>
                  </div>
                  <input
                    className="sed-input"
                    value={d.name}
                    aria-label="Device Name"
                    onChange={(e) => set({ name: e.target.value })}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 text-sm font-medium leading-none">
                    <Tip text="Rotates the extended display for this device.">Orientation</Tip>
                  </div>
                  <Select
                    label="Orientation"
                    value={d.orientation}
                    disabled={d.autoOrientation}
                    options={[
                      { value: "Portrait", label: "Portrait" },
                      { value: "Landscape", label: "Landscape" },
                    ]}
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
                <Row key={label} label={<Tip text={tip}>{label}</Tip>}>
                  <input className="sed-input" value={value} aria-label={label} disabled />
                </Row>
              ))}
              <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
                <span className="text-sm font-medium leading-none">
                  <Tip text="Let this device control your PC with touch and keyboard. Turn off to keep the display view-only.">
                    Remote Control
                  </Tip>
                </span>
                <Switch label="Remote Control" checked={d.remote} onChange={(v) => set({ remote: v })} />
              </div>
              {d.remote && (
                <Checkbox checked={d.pointerScope} onChange={(v) => set({ pointerScope: v })}>
                  <Tip text="Keep the cursor on this device's screen. Off lets it cross onto your other monitors.">
                    Restrict Cursor to This Display
                  </Tip>
                </Checkbox>
              )}
              <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
                <span className="text-sm font-medium leading-none">
                  <Tip text="Streams this computer's audio output to the device.">System Audio</Tip>
                </span>
                <Switch label="System Audio" checked={d.audio} onChange={(v) => set({ audio: v })} />
              </div>
              {d.audio && (
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium leading-none">
                    <Tip text="Choose which of this device's speakers plays the streamed audio.">Audio Output</Tip>
                  </span>
                  <Select
                    className="w-[55%]"
                    label="Audio Output"
                    value={d.audioOut}
                    options={[
                      { value: "default", label: "System Default" },
                      { value: "speaker", label: "Speaker" },
                      { value: "earpiece", label: "Earpiece" },
                    ]}
                    onChange={(v) => set({ audioOut: v })}
                  />
                </div>
              )}
              <div className="mt-4 border-t pt-4">
                <div className="my-2 text-sm font-medium leading-none">
                  <Tip text="Zooms the extended desktop's content up or down.">Scale - ({d.scale}%)</Tip>
                </div>
                <Range label="Scale" value={d.scale} min={25} max={200} step={25} onChange={(v) => set({ scale: v })} />
              </div>
              <div className="mt-4">
                <div className="my-2 text-sm font-medium leading-none">
                  <Tip text="Renders this display at the device's pixel density for sharper text and UI.">
                    Pixel Ratio - ({fmt(d.dpr)}×)
                  </Tip>
                </div>
                <Range
                  label="Pixel Ratio"
                  value={d.dpr}
                  min={1}
                  max={d.maxDpr}
                  step={0.25}
                  disabled={d.nativeDpr}
                  onChange={(v) => set({ dpr: v })}
                />
                <Checkbox checked={d.nativeDpr} onChange={(v) => set({ nativeDpr: v, dpr: v ? d.maxDpr : d.dpr })}>
                  Set automatically
                </Checkbox>
              </div>
              <NumberSlider
                label="Refresh Rate"
                unit="Hz"
                tip="How many frames per second the display targets (Hz)."
                value={d.rate}
                min={15}
                max={550}
                step={5}
                auto={d.autoRate}
                onChange={(v) => set({ rate: v })}
                onAuto={(v) => set({ autoRate: v })}
              />
              <div className="mt-4">
                <div className="my-2 text-sm font-medium leading-none">
                  <Tip text="Resolution of the streamed video. Lower uses less bandwidth.">
                    Video Scale - ({d.videoScale}%)
                  </Tip>
                </div>
                <Range
                  label="Video Scale"
                  value={d.videoScale}
                  min={10}
                  max={100}
                  step={5}
                  onChange={(v) => set({ videoScale: v })}
                />
              </div>
              <NumberSlider
                label="Video Quality"
                tip="Higher encodes faster but looks worse. Pick the highest value that still looks good."
                value={d.quality}
                min={1}
                max={51}
                step={1}
                auto={d.adaptive}
                onChange={(v) => set({ quality: v })}
                onAuto={(v) => set({ adaptive: v })}
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

function NumberSlider({
  label,
  unit,
  tip,
  value,
  min,
  max,
  step,
  auto,
  onChange,
  onAuto,
}: {
  label: string;
  unit?: string;
  tip: string;
  value: number;
  min: number;
  max: number;
  step: number;
  auto: boolean;
  onChange: (v: number) => void;
  onAuto: (v: boolean) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <div className="mt-4">
      <div className="my-2 flex items-center text-sm font-medium leading-none">
        {label} -
        <input
          className="sed-input sed-num ml-1"
          type="number"
          inputMode="numeric"
          aria-label={label}
          min={min}
          max={max}
          value={draft ?? value}
          disabled={auto}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            const n = Number(draft);
            if (draft !== null && n >= min && n <= max) onChange(Math.round(n));
            setDraft(null);
          }}
        />
        {unit && <span className="ml-1">{unit}</span>}
        <span className="ml-2">
          <Tip text={tip} />
        </span>
      </div>
      <Range label={label} value={value} min={min} max={max} step={step} disabled={auto} onChange={onChange} />
      <Checkbox checked={auto} onChange={onAuto}>
        Set automatically
      </Checkbox>
    </div>
  );
}

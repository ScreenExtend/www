import { useState, type ReactNode } from "react";
import { Ban, Eye, EyeOff, Minus, Plus, RefreshCw, RotateCcw, Trash2 } from "lucide-react";

import { Card, DemoBtn, FloatInput, Switch } from "@/components/home/app-demo/ui.tsx";
import { OTP, bc } from "@/components/home/app-demo/shared.ts";
import Avatar from "@/components/home/app-demo/Avatar.tsx";

function Toggle({
  title,
  desc,
  on,
  set,
}: {
  title: string;
  desc?: string;
  on: boolean;
  set: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        {desc && <p className="sed-muted text-sm">{desc}</p>}
      </div>
      <Switch label={title} checked={on} onChange={set} />
    </div>
  );
}

const Line = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-4 py-3">{children}</div>
);

const PAST = [
  { name: "iPad", os: "iPadOS", ip: "192.168.1.24", seen: "Now", live: true },
  { name: "Pixel 8", os: "Android", ip: "192.168.1.37", seen: "Now", live: true },
  { name: "Work Laptop", os: "Windows", ip: "192.168.1.52", seen: "3 days ago", live: false },
];

export default function Settings() {
  const [pub, setPub] = useState(true);
  const [boot, setBoot] = useState(false);
  const [net, setNet] = useState(false);
  const [netName, setNetName] = useState("ScreenExtend-Home");
  const [pass, setPass] = useState("correct-horse-42");
  const [showPass, setShowPass] = useState(false);
  const [grace, setGrace] = useState("30");
  const [banned, setBanned] = useState<string[]>([]);
  const [name, setName] = useState("Alex");
  const [zoom, setZoom] = useState(100);

  return (
    <div className="p-4 sm:p-8">
      <p role="presentation" className="mb-6 text-2xl font-semibold">Settings</p>
      <Card
        title={
          <>
            Session OTP
            <DemoBtn className={`${bc("ghost")} ml-2 !h-7 !w-7 !p-0`} aria-label="Regenerate OTP">
              <RefreshCw size={15} aria-hidden="true" />
            </DemoBtn>
          </>
        }
        aside={
          <div className="flex items-center" role="group" aria-label={`Session OTP ${OTP}`}>
            {[...OTP].map((c, i) => (
              <div key={i} className="sed-otp">
                {c}
              </div>
            ))}
          </div>
        }
      />
      <Card title="Public Internet Sessions">
        <Toggle
          title={pub ? "Public sessions enabled" : "Public sessions disabled"}
          desc={`Allow devices to join over the internet via the "Anywhere (Internet)" option using session.screenextend.app.`}
          on={pub}
          set={setPub}
        />
      </Card>
      <Card title="Launch at Startup">
        <Toggle
          title={boot ? "Start on login enabled" : "Start on login disabled"}
          desc="Automatically open ScreenExtend when you sign in to your computer."
          on={boot}
          set={setBoot}
        />
      </Card>
      <Card
        title="Create Hosted Network"
        desc="Host a local network for devices to join, useful for speed or when no other network is available."
      >
        <div className="border-b pb-3">
          <Toggle title={net ? "Stop Network" : "Start Network"} on={net} set={setNet} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-4 py-3">
          <FloatInput label="Network Name" value={netName} disabled={!net} onChange={(e) => setNetName(e.target.value)} />
          <FloatInput
            label="Network Password"
            type={showPass ? "text" : "password"}
            value={pass}
            disabled={!net}
            onChange={(e) => setPass(e.target.value)}
          >
            <button
              type="button"
              className="sed-plain sed-eye"
              disabled={!net}
              aria-label={showPass ? "Hide password" : "Show password"}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
            </button>
          </FloatInput>
          <DemoBtn className={bc()} disabled={!net}>
            Save Settings
          </DemoBtn>
        </div>
      </Card>
      <Card
        title="Device Disconnect Timeout"
        desc="How long a disconnected device's virtual display is kept before being removed."
      >
        <Line>
          <FloatInput label="Timeout (seconds)" type="number" min={0} max={600} value={grace} onChange={(e) => setGrace(e.target.value)} />
          <DemoBtn className={bc()}>Save Timeout</DemoBtn>
        </Line>
      </Card>
      <Card
        title="Past Devices"
        desc="Every device that has connected to this PC. These devices rejoin automatically without entering the code. Forget a device to require the code again, or ban it to disconnect and block it by its IP address."
      >
        <Line>
          <FloatInput label="IP address to ban (e.g. 192.168.1.42)" />
          <DemoBtn className={bc("outline")}>
            <Ban className="mr-2 h-4 w-4" aria-hidden="true" />
            Ban IP
          </DemoBtn>
        </Line>
        <div className="overflow-x-auto">
          <table className="sed-table">
            <thead>
              <tr>
                {["Device Name", "OS", "IP", "Last Seen", ""].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAST.map((p) => {
                const isBanned = banned.includes(p.ip);
                return (
                  <tr key={p.ip} className={isBanned ? "opacity-60" : ""}>
                    <td className="font-medium">
                      <span className="flex items-center gap-2">
                        {p.name}
                        {isBanned ? (
                          <span className="text-xs font-medium text-red-500">Banned</span>
                        ) : p.live ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Connected
                          </span>
                        ) : (
                          <span className="sed-muted text-xs">Auto-join</span>
                        )}
                      </span>
                    </td>
                    <td>{p.os}</td>
                    <td>{p.ip}</td>
                    <td className="sed-muted">{p.seen}</td>
                    <td>
                      <span className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className={`${bc("outline", "sm")}${isBanned ? "" : " !text-red-600"}`}
                          onClick={() =>
                            setBanned((b) => (isBanned ? b.filter((x) => x !== p.ip) : [...b, p.ip]))
                          }
                        >
                          {isBanned ? "Unban" : "Ban"}
                        </button>
                        <DemoBtn className={bc("ghost", "icon")} wrap="end" aria-label="Forget device">
                          <Trash2 className="sed-muted h-4 w-4" aria-hidden="true" />
                        </DemoBtn>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Card title="Account Settings">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex flex-col items-center gap-1.5">
            <span className="block h-16 w-16 overflow-hidden rounded-full border">
              <Avatar />
            </span>
            <DemoBtn className="sed-muted text-xs">Change photo</DemoBtn>
          </div>
          <FloatInput label="Name" maxLength={19} value={name} onChange={(e) => setName(e.target.value)} />
          <DemoBtn className={bc()}>Save Name</DemoBtn>
        </div>
      </Card>
      <Card
        title="Zoom"
        desc="Scale the entire interface. You can also use Ctrl and + or − to adjust it, and Ctrl 0 to reset."
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={bc("outline", "icon")}
            aria-label="Zoom out"
            disabled={zoom <= 50}
            onClick={() => setZoom(zoom - 10)}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-16 text-center text-sm font-medium tabular-nums" aria-live="polite">
            {zoom}%
          </span>
          <button
            type="button"
            className={bc("outline", "icon")}
            aria-label="Zoom in"
            disabled={zoom >= 200}
            onClick={() => setZoom(zoom + 10)}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" className={`${bc("ghost")} ml-1`} disabled={zoom === 100} onClick={() => setZoom(100)}>
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            Reset
          </button>
        </div>
      </Card>
    </div>
  );
}

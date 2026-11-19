import { Check } from "lucide-react";

// Every setting in the app, as a checklist (names and wording from the app's own
// Edit Device and Settings pages). The live panels are in git history.
const DEVICE: [string, string][] = [
  ["Device name", "Each device can be renamed."],
  ["Orientation", "Portrait or landscape, or set automatically."],
  ["Device details", "Network address, operating system and screen resolution, shown read-only."],
  ["Remote control", "Touch and keyboard on the device control the computer. Off keeps the display view-only."],
  ["Restrict cursor to this display", "Keeps the cursor on this device's screen instead of crossing onto other monitors."],
  ["System audio", "The computer's audio plays on the device."],
  ["Audio output", "System default, speaker or earpiece."],
  ["Scale", "Zooms the extended desktop's content up or down."],
  ["Pixel ratio", "Renders at the device's pixel density for sharper text, or set automatically."],
  ["Refresh rate", "Frames per second the display targets, or set automatically."],
  ["Video scale", "Resolution of the streamed video. Lower uses less bandwidth."],
  ["Video quality", "Trades encode speed against picture quality, or adapts automatically."],
  ["Remove device", "Disconnects a device and removes its display."],
];

const APP: [string, string][] = [
  ["Session code", "A new code at any time, for pairing new devices."],
  ["Public internet sessions", "Devices join over the internet through session.screenextend.app."],
  ["Launch at startup", "ScreenExtend opens on sign-in."],
  ["Hosted network", "The computer starts a Wi-Fi network of its own, with a name and password."],
  ["Disconnect timeout", "How long a disconnected device's display is kept before it is removed."],
  ["Past devices", "Known devices rejoin without the code. Each one can be forgotten or banned."],
  ["Ban by IP address", "Blocks a device by its network address."],
  ["Display settings", "A shortcut to the system's display arrangement."],
  ["Account", "A name and photo."],
  ["Zoom", "Scales the whole interface, also with Ctrl and + or −."],
];

function List({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="min-w-0">
      <h3 className="wide text-xl font-bold">{title}</h3>
      <ul className="mt-5 border-y-2 border-ink">
        {items.map(([name]) => (
          <li key={name} className="flex items-center gap-3.5 border-b border-line py-3 last:border-b-0">
            <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-spot text-white">
              <Check size={14} strokeWidth={3} />
            </span>
            <span className="font-semibold">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeatureScroll() {
  return (
    <section id="features" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Per-device settings</h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-x-10">
          <List title="Each device" items={DEVICE} />
          <List title="Settings" items={APP} />
        </div>
      </div>
    </section>
  );
}

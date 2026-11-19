import { Check } from "lucide-react";

// Short list; each line matches something documented elsewhere on the page
// (comparison table, GPU table, setup) or in the app's own settings.
const FEATURES: [string, string][] = [
  ["Wireless", "Over the local network, or over the internet when the devices are apart."],
  ["Any browser", "Nothing to install on the tablet, phone or laptop."],
  ["Several screens", "More than one device extends the desktop at once."],
  ["Touch and keyboard", "The device can control the computer, or stay view-only."],
  ["Audio", "The computer's sound can play on the device."],
  ["Per-device settings", "Orientation, scale and refresh rate for each screen."],
  ["Works offline", "The computer can start a Wi-Fi network of its own."],
  ["Graphics-chip encoding", "About 8 ms to capture and encode a frame."],
];

export default function Features() {
  return (
    <section id="features" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Features</h2>
        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(([name, text]) => (
            <li key={name} className="flex gap-2.5">
              <Check size={16} strokeWidth={2.75} aria-hidden="true" className="mt-[0.2rem] shrink-0 text-link" />
              <span>
                <span className="font-semibold leading-snug">{name}</span>
                <span className="mt-0.5 block text-sm leading-snug text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

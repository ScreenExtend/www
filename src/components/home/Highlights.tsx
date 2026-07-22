import {
  Cpu,
  Globe,
  ShieldCheck,
  WifiOff,
  SlidersHorizontal,
  Radio,
} from "lucide-react";

import Reveal from "@/components/Reveal.tsx";

const ITEMS = [
  {
    icon: Cpu,
    label: "GPU-encoded",
    desc: "Capture is encoded on the host GPU with NVENC (Nvidia), Quick Sync (Intel), or VideoToolbox (Mac) and sent over WebRTC for low latency.",
  },
  {
    icon: Globe,
    label: "No client app",
    desc: "The client is just a web page. Any device with a modern browser can become an extended monitor.",
  },
  {
    icon: ShieldCheck,
    label: "Encrypted",
    desc: "Signaling and streaming run over HTTPS/WebRTC with a certificate generated at runtime.",
  },
  {
    icon: WifiOff,
    label: "Offline mode",
    desc: "The host can start its own ad-hoc network, so devices connect with no router in reach.",
  },
  {
    icon: SlidersHorizontal,
    label: "Per-device",
    desc: "Resolution scale, orientation, refresh rate, and quality are set independently for each screen.",
  },
  {
    icon: Radio,
    label: "Auto-discovery",
    desc: "The host watches every network adapter and rebuilds join URLs and QR codes as things change.",
  },
];

export default function Highlights() {
  return (
    <section className="py-16 lg:py-28">
      <div className="container">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Architecture
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Under the hood
          </h2>
        </Reveal>

        <div className="mt-10 grid overflow-hidden rounded-xl border border-base-content/10 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.label}
              delay={(i % 3) * 80}
              className="group border-b border-r border-base-content/10 bg-base-100/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-base-100/70 lg:[&:nth-child(3n)]:border-r-0"
            >
              <item.icon
                size={22}
                className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <h3 className="mt-4 font-mono text-sm uppercase tracking-wide text-base-content">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/65">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

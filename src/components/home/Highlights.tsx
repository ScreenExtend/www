const SPECS = [
  {
    term: "Encoding",
    desc: "On the host GPU: NVENC (Nvidia), Quick Sync (Intel) or VideoToolbox (Mac), sent over WebRTC for low latency.",
  },
  {
    term: "Client",
    desc: "A web page. Any device with a modern browser can be the extra screen.",
  },
  {
    term: "Encryption",
    desc: "Signaling and streaming run over HTTPS and WebRTC, using a certificate generated at runtime.",
  },
  {
    term: "Offline mode",
    desc: "The host can start its own network, so devices connect with no router nearby.",
  },
  {
    term: "Per-device settings",
    desc: "Resolution scale, orientation, refresh rate and quality are set separately for each screen.",
  },
  {
    term: "Limits",
    desc: "Up to 200% scale and 500 Hz per device. Any number of devices, though performance drops as you add more.",
  },
  {
    term: "Network discovery",
    desc: "The host watches every network adapter and rebuilds join URLs and QR codes when they change.",
  },
];

export default function Highlights() {
  return (
    <section id="specs" className="border-t border-line bg-surface py-16 lg:py-20">
      <div className="container grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h2 className="section-title lg:col-span-4">Technical details</h2>
        <dl className="lg:col-span-8">
          {SPECS.map((s) => (
            <div
              key={s.term}
              className="grid gap-1 border-t border-line py-4 first:border-t-0 first:pt-0 sm:grid-cols-[12rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-sm font-medium leading-6">{s.term}</dt>
              <dd className="leading-relaxed text-muted">{s.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

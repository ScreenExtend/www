// Short spec lines. Each fact comes from the earlier site copy and the FAQ.
const SPECS = [
  { term: "Encoding", desc: "On the host GPU: NVENC (NVIDIA), Quick Sync (Intel) or VideoToolbox (Mac)." },
  { term: "Streaming", desc: "WebRTC, for low latency." },
  { term: "Client", desc: "Any device with a modern browser. No app to install." },
  { term: "Networks", desc: "Local Wi-Fi, the host's own offline network, or Anywhere (Internet) across networks." },
  { term: "Encryption", desc: "HTTPS and WebRTC, with a certificate generated at runtime." },
  { term: "Per device", desc: "Scale, orientation, refresh rate and quality, set separately." },
  { term: "Limits", desc: "Up to 200% scale and 500 Hz per device. Performance drops as you add devices." },
  { term: "Discovery", desc: "Watches every network adapter and rebuilds join links when they change." },
];

// The one full-bleed colour band on the page, in the logo blue (#2456d6 is a
// darker step of #316cff so body text passes AA: white 6.2:1, #dfe8ff 5.1:1,
// lime 5.5:1).
export default function Highlights() {
  return (
    <section id="specs" className="bg-[#2456d6] py-16 text-white lg:py-20">
      <div className="container">
        <h2 className="section-title">Technical details</h2>
        <dl className="mt-8 grid gap-x-12 md:grid-cols-2">
          {SPECS.map((s) => (
            <div
              key={s.term}
              className="grid content-start gap-1 border-t border-white/25 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
            >
              <dt className="font-mono text-sm font-medium leading-6 text-[#dcff4a]">{s.term}</dt>
              <dd className="leading-relaxed text-[#dfe8ff]">{s.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

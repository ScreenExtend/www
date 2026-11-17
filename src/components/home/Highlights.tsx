// The technical dive, after the value is clear. Each fact comes from the earlier
// site copy and the FAQ.
const SPECS = [
  { term: "Encoding", desc: "Your computer's GPU encodes the extra screen: NVENC on NVIDIA, Quick Sync on Intel, VideoToolbox on Mac." },
  { term: "Streaming", desc: "WebRTC carries the picture and your input, for low latency." },
  { term: "The other device", desc: "Any device with a modern browser. Nothing to install." },
  { term: "Networks", desc: "Local Wi-Fi, the computer's own offline network, or Anywhere (Internet) across networks." },
  { term: "Encryption", desc: "HTTPS and WebRTC, with a certificate generated at runtime." },
  { term: "Per device", desc: "Scale, orientation, refresh rate and quality, set separately." },
  { term: "Limits", desc: "Up to 200% scale and 500 Hz per device. Performance drops as you add devices." },
  { term: "Discovery", desc: "Watches every network adapter and rebuilds the join links when they change." },
];

// Same ground as the rest of the page; a subtle surface tint marks the technical part.
export default function Highlights() {
  return (
    <section id="specs" className="border-t border-line bg-surface py-16 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display-lg">Under the hood</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            For the curious: what happens between your computer and the other
            screen.
          </p>
        </div>
        <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {SPECS.map((s) => (
            <div key={s.term} className="border-t border-line py-5">
              <dt className="font-semibold">{s.term}</dt>
              <dd className="mt-1.5 leading-relaxed text-muted">{s.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

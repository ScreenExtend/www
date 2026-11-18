import { EmptyBox } from "@/components/home/drawings.tsx";

// The packing list, honestly filled in. Facts: browser-only client and no extra
// hardware (Compare.tsx), free app for Windows and Mac.
const CONTENTS: { item: string; note: string; inside?: boolean }[] = [
  { item: "Cable", note: "Not needed. It's wireless." },
  { item: "Dongle or dummy plug", note: "Not needed either." },
  { item: "An app for the tablet", note: "It uses the web browser it already has." },
  { item: "A stand", note: "Not included. A mug works." },
  { item: "One free app for your Windows PC or Mac", note: "This is the whole box.", inside: true },
];

function Tick({ on }: { on?: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className="mt-0.5 h-[22px] w-[22px] shrink-0" aria-hidden="true">
      <rect x="1.25" y="1.25" width="19.5" height="19.5" rx="1.5" fill={on ? "#dcff4a" : "none"} stroke={on ? "#15171b" : "#fff"} strokeWidth="1.5" />
      {on && <path d="M5.5 11.5 L9.5 15.5 L16.5 6.5" fill="none" stroke="#15171b" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export default function InTheBox() {
  return (
    <section id="box" className="bg-spot py-16 text-white lg:py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <EmptyBox className="mx-auto w-full max-w-lg" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="display-lg">What's in the box</h2>
          <p className="display mt-3 text-[clamp(1.6rem,2.6vw,2.1rem)] text-spot-soft">Nothing. It's a download.</p>

          <ul className="mt-10 space-y-4" aria-label="Contents">
            {CONTENTS.map((c) => (
              <li key={c.item} className="flex gap-4">
                <Tick on={c.inside} />
                <p className="leading-snug">
                  <span className="font-semibold">{c.item}</span>
                  <span className="sr-only">{c.inside ? " (included)" : " (not included)"}</span>
                  <span className="text-spot-soft">. {c.note}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

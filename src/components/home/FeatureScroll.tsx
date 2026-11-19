import { Check } from "lucide-react";

// The per-device settings worth naming, as a checklist (names and wording from the app's own
// Edit Device and Settings pages). The live panels are in git history.
const DEVICE: [string, string][] = [
  ["Orientation", "Portrait or landscape, or set automatically."],
  ["Scale", "Zooms the extended desktop's content up or down."],
  ["Refresh rate", "Frames per second the display targets, or set automatically."],
];

function List({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="min-w-0">
      <h3 className="wide text-xl font-bold">{title}</h3>
      <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-3">
        {items.map(([name, text]) => (
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
  );
}

export default function FeatureScroll() {
  return (
    <section id="features" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Per-device settings</h2>
        <div className="mt-12">
          <List title="Each device" items={DEVICE} />
        </div>
      </div>
    </section>
  );
}

import { useImage } from "@/components/ImageContext.tsx";
import editCrop from "@/assets/app/crop-edit.webp";
import settingsCrop from "@/assets/app/crop-settings.webp";

// Crops of the real screenshots (src/assets/app/feature-2.png and feature-3.png),
// readable at phone width. Clicking one opens the full screenshot.
const FEATURES = [
  {
    shot: 1,
    src: editCrop,
    w: 383,
    h: 440,
    panel: "bg-logo-mint",
    title: "Adjust each display",
    desc: "Scale, orientation, refresh rate and video quality, set per device. Changing one leaves the others alone, and you can remove a device here.",
    alt: "Edit Device controls: screen size, scale, refresh rate, video scale and video quality sliders, with Remove Device and Save changes buttons.",
  },
  {
    shot: 2,
    src: settingsCrop,
    w: 1050,
    h: 496,
    panel: "bg-lime",
    title: "Session settings",
    desc: "Regenerate the session code, start an offline hosted network, set a disconnect timeout and read the debug logs.",
    alt: "Settings screen showing the Session OTP cells, the Public Internet Sessions toggle and the Create Hosted Network switch.",
  },
];

export default function FeatureScroll() {
  const { setCurrentImage } = useImage();

  return (
    <section id="features" className="border-t border-line py-16 lg:py-24">
      <div className="container">
        <h2 className="section-title">Inside the host app</h2>

        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {FEATURES.map((f) => (
            <figure key={f.title}>
              <button
                type="button"
                onClick={() => setCurrentImage(f.shot)}
                title="See the full screenshot"
                className={`flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-panel p-6 sm:p-10 ${f.panel}`}
              >
                <span className="sr-only">Open full screenshot: </span>
                <img
                  src={f.src}
                  width={f.w}
                  height={f.h}
                  loading="lazy"
                  decoding="async"
                  alt={f.alt}
                  className="max-h-full w-auto max-w-full rounded-control shadow-shot"
                />
              </button>
              <figcaption className="mt-4">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-1.5 max-w-[46ch] leading-relaxed text-muted">{f.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

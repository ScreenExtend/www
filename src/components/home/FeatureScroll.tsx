import { useImage } from "@/components/ImageContext.tsx";
import { usePinProgress, useCinematic } from "@/hooks/useScroll.ts";
import Reveal from "@/components/Reveal.tsx";
import { range, mix, clamp } from "@/lib/anim.ts";
import feature1 from "@/assets/app/feature-1.png";
import feature2 from "@/assets/app/feature-2.png";
import feature3 from "@/assets/app/feature-3.png";

const FEATURES = [
  {
    eyebrow: "Dashboard",
    title: "Add a new device",
    desc: "Every network you're on gets its own QR code and URL, plus an Anywhere tile for joining across networks. Scan, enter the code, and a fullscreen extended monitor appears.",
    img: feature1,
  },
  {
    eyebrow: "Per-device Control",
    title: "Adjust each display",
    desc: "Each connected device has live settings: resolution scale, orientation, refresh rate, and video quality. Adjust one without affecting the others, or remove it with ease.",
    img: feature2,
  },
  {
    eyebrow: "Settings",
    title: "Session settings",
    desc: "Regenerate the one-time session code, start an offline hosted network with no router, set a disconnect timeout, and view debug logs.",
    img: feature3,
  },
];

const FRAME =
  "overflow-hidden rounded-xl border border-white/12 bg-[#0d1319] shadow-2xl shadow-black/50 ring-1 ring-primary/15";

// Cinematic: the screenshot stack is pinned while the copy cross-fades through
// the three features on scroll. Engages only when there's real room.
function FeatureScrollCinematic() {
  const { ref, progress: p } = usePinProgress<HTMLDivElement>();
  const { setCurrentImage } = useImage();

  // cross-fade opacities for the three screenshots
  const op = [
    1 - range(p, 0.3, 0.4),
    clamp(range(p, 0.3, 0.4) - range(p, 0.63, 0.73)),
    range(p, 0.63, 0.73),
  ];
  const active = p < 0.35 ? 0 : p < 0.68 ? 1 : 2;

  return (
    <section
      id="features"
      ref={ref}
      className="relative"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
        <div className="container">
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
            <div className="order-2 md:order-2 md:col-span-5 lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                The app
              </p>
              {/* all features share one grid cell so the block sizes to the
              tallest — no fixed height to overflow into the rail */}
              <div className="mt-4 grid">
                {FEATURES.map((f, i) => (
                  <div
                    key={f.eyebrow}
                    className="col-start-1 row-start-1 transition-all duration-500"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: `translateY(${active === i ? 0 : 14}px)`,
                      pointerEvents: active === i ? "auto" : "none",
                    }}
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-base-content/50">
                      {f.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-base-content/70">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                {FEATURES.map((f, i) => (
                  <div
                    key={f.eyebrow}
                    className="h-1 w-10 overflow-hidden rounded-full bg-base-content/10"
                  >
                    <div
                      className="h-full origin-left rounded-full bg-primary transition-transform duration-300"
                      style={{
                        transform: `scaleX(${active > i ? 1 : active === i ? 0.5 : 0})`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-1 md:col-span-7 lg:col-span-8">
              <div
                className="relative mx-auto w-full max-w-3xl"
                style={{
                  transform: `translateY(${mix(20, -20, p)}px)`,
                  width: "min(100%, 42rem, calc((100vh - 11rem) * 1369 / 817))",
                }}
              >
                <div className={`relative aspect-[1369/817] ${FRAME}`}>
                  {FEATURES.map((f, i) => (
                    <img
                      key={f.eyebrow}
                      src={f.img}
                      alt={f.title}
                      onClick={() => setCurrentImage(i)}
                      className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                      style={{ opacity: op[i] }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Static: the three features flow as normal stacked rows, screenshot beside
// copy (alternating sides on wide screens, stacked on narrow). Bulletproof at
// any viewport size.
function FeatureScrollStatic() {
  const { setCurrentImage } = useImage();

  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            The app
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Inside the host app
          </h2>
        </Reveal>

        <div className="mt-12 space-y-14 md:space-y-20">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.eyebrow}
              className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={f.img}
                  alt={f.title}
                  onClick={() => setCurrentImage(i)}
                  className={`aspect-[1369/817] w-full cursor-pointer object-cover ${FRAME}`}
                />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-wide text-base-content/50">
                  {f.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-base-content/70">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FeatureScroll() {
  return useCinematic() ? <FeatureScrollCinematic /> : <FeatureScrollStatic />;
}

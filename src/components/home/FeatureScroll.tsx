import AppDemo from "@/components/home/app-demo/AppDemo.tsx";

// Two frameless live pages from the app (app-demo/, bare mode): Edit Device and
// Settings. No hover gate here; they're usable straight away.
export default function FeatureScroll() {
  return (
    <section id="features" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <div>
          <h2 className="display-lg">Each device gets its own settings</h2>
          <p className="lede mt-3 max-w-2xl">
            Make the phone bigger without touching the tablet. Both panels below are live, so go ahead.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <h3 className="wide text-xl font-bold">Edit Device</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Scale, orientation, refresh rate and video quality, set per device.
            </p>
            <AppDemo bare initialPage="edit" className="se-fit mt-5" />
          </div>
          <div className="min-w-0">
            <h3 className="wide text-xl font-bold">Settings</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Make a new session code, start a Wi-Fi network of its own, and choose how long to wait
              before a quiet device is disconnected.
            </p>
            <AppDemo bare initialPage="settings" className="se-cut mt-5" />
            <p className="small-print mt-2">Scroll inside the panel for the rest, from start at login down to past devices.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

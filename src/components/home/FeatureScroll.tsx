import AppDemo from "@/components/home/app-demo/AppDemo.tsx";

// Two frameless live pages from the app (app-demo/, bare mode): Edit Device and
// Settings. No hover gate here; they're usable straight away.
export default function FeatureScroll() {
  return (
    <section id="features" className="border-t border-line py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Settings for each device</h2>
        <p className="mt-3 text-lg text-muted">Pick a device and change how it looks.</p>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">Edit Device</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Scale, orientation, refresh rate and video quality, per device.
              Changing one leaves the others alone.
            </p>
            <AppDemo bare initialPage="edit" className="mt-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Regenerate the session code, start a network of its own so
              devices connect without a router, and set a disconnect timeout.
            </p>
            <AppDemo bare initialPage="settings" className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

import AppDemo from "@/components/home/app-demo/AppDemo.tsx";

// Two frameless live pages from the app (app-demo/, bare mode): Edit Device and
// Settings, both a fixed height that scrolls inside.
export default function FeatureScroll() {
  return (
    <section id="features" className="border-t-[1.5px] border-ink bg-mint py-16 lg:py-24">
      <div className="container">
        <div>
          <h2 className="display-lg">Per-device settings</h2>
          <p className="lede mt-3">
            Each device keeps its own scale, orientation, refresh rate and quality. Both panels are live.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-10 lg:gap-y-0">
          <div className="min-w-0 lg:row-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
            <h3 className="wide text-xl font-bold">Edit Device</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Scale, orientation, refresh rate and video quality, set per device.
            </p>
            <div className="self-start">
              <AppDemo bare initialPage="edit" openFirst className="se-fixed mt-5" />
            </div>
          </div>
          <div className="min-w-0 lg:row-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
            <h3 className="wide text-xl font-bold">Settings</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Make a new session code, start a Wi-Fi network of its own, and choose how long to wait
              before a quiet device is disconnected.
            </p>
            <div className="self-start">
              <AppDemo bare initialPage="settings" className="se-fixed mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

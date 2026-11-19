import AppDemo from "@/components/home/app-demo/AppDemo.tsx";

// Two frameless live pages from the app (app-demo/, bare mode): Edit Device and
// Settings. No hover gate here; they're usable straight away. The two columns
// share grid rows, so the titles, the lines under them and the panels start
// level. Edit Device shows all of its rows and grows to fit its sheet when a
// device is opened; Settings stops on a card edge and scrolls.
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

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-10 lg:gap-y-0">
          <div className="min-w-0 lg:row-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
            <h3 className="wide text-xl font-bold">Edit Device</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Scale, orientation, refresh rate and video quality, set per device.
            </p>
            <div className="self-start">
              <AppDemo bare initialPage="edit" className="se-fit se-grow mt-5" />
              <p className="small-print mt-2">Pick a device and the panel grows to show all of its settings.</p>
            </div>
          </div>
          <div className="min-w-0 lg:row-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
            <h3 className="wide text-xl font-bold">Settings</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              Make a new session code, start a Wi-Fi network of its own, and choose how long to wait
              before a quiet device is disconnected.
            </p>
            <div className="self-start">
              <AppDemo bare initialPage="settings" className="se-cut mt-5" />
              <p className="small-print mt-2">Scroll inside the panel for the rest, from start at login down to past devices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

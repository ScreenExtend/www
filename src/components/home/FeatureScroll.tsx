import AppDemo from "@/components/home/app-demo/AppDemo.tsx";

// A second live copy of the app (app-demo/), opened on Edit Device, instead of
// screenshots. The text says what each page does; the window lets people try it.
export default function FeatureScroll() {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="container">
        <h2 className="display-lg">Every screen gets its own settings</h2>
        <p className="mt-3 text-lg text-muted">
          Pick a device and change how it looks. Try it below. It works like the
          real app, but nothing here is saved.
        </p>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <dl className="space-y-6 lg:col-span-4">
            <div>
              <dt className="text-lg font-semibold">Edit Device</dt>
              <dd className="mt-1.5 leading-relaxed text-muted">
                Scale, orientation, refresh rate and video quality, per device.
                Changing one leaves the others alone, and you remove a device here.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold">Settings</dt>
              <dd className="mt-1.5 leading-relaxed text-muted">
                Regenerate the session code, start a network of its own so devices
                connect without a router, set a disconnect timeout and read the
                debug logs.
              </dd>
            </div>
          </dl>

          <div className="min-w-0 lg:col-span-8">
            <AppDemo initialPage="edit" />
          </div>
        </div>
      </div>
    </section>
  );
}

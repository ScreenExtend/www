import AppDemo from "@/components/home/app-demo/AppDemo.tsx";
import DemoGate from "@/components/home/app-demo/DemoGate.tsx";

// The live replica of the desktop app.
export default function TryApp() {
  return (
    <section id="app" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 className="display-lg lg:col-span-6">The app</h2>
          <p className="lede lg:col-span-6">
            This is a working copy of the window you'll see on your computer. Click around. It runs in
            this page, so nothing here touches your machine.
          </p>
        </div>
        <div className="mt-12">
          <DemoGate>
            <AppDemo />
          </DemoGate>
        </div>
      </div>
    </section>
  );
}

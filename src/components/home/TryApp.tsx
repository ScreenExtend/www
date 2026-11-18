import AppDemo from "@/components/home/app-demo/AppDemo.tsx";
import DemoGate from "@/components/home/app-demo/DemoGate.tsx";

// The live replica of the desktop app, on its own after the hero. Screen 1 from the
// arrangement panel, opened up: the blue plate sits behind it as the frame.
export default function TryApp() {
  return (
    <section id="app" className="py-16 lg:py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <h2 className="display-lg">The app on your computer</h2>
            <p className="mt-3 text-lg text-muted">It shows a code, the other device scans it, and that's the setup.</p>
          </div>
        </div>
        <div className="mt-10 rounded-[14px] bg-logo-blue p-[1.25%] sm:p-3">
          <DemoGate>
            <AppDemo />
          </DemoGate>
        </div>
      </div>
    </section>
  );
}

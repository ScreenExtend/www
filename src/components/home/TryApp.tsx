import AppDemo from "@/components/home/app-demo/AppDemo.tsx";
import DemoGate from "@/components/home/app-demo/DemoGate.tsx";

// The live replica of the desktop app.
export default function TryApp() {
  return (
    <section id="app" className="py-16 lg:py-24">
      <div className="container">
        <div>
          <h2 className="display-lg">Functionality</h2>
          <p className="lede mt-3">
            A working copy of the app. It runs in this page and doesn't touch the computer.
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

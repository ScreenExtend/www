import "@/components/home/app-demo/app-demo.css";
import { QrArt } from "@/components/home/app-demo/ui.tsx";

// The app's "Expand QR" view (the .sed-qrbig overlay in AddDevice.tsx), set in
// the page instead of over it: the window dimmed behind, and the big code on
// white. Nothing else is in that view in the app. The code is an example
// pattern and leads nowhere.
export default function QrInline({ className = "" }: { className?: string }) {
  return (
    <div className={`sed-root ${className}`}>
      <div className="sed-qrinline">
        <span className="block w-full rounded-2xl bg-white p-2.5">
          <QrArt seed={7} label="Example of the app's expanded QR code. It isn't a real code." />
        </span>
      </div>
    </div>
  );
}

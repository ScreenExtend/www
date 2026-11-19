import "@/components/home/app-demo/app-demo.css";
import { QrArt } from "@/components/home/app-demo/ui.tsx";

// The app's "Expand QR" view (the .sed-qrbig overlay in AddDevice.tsx), set in
// the page instead of over it. In the app the window dims behind the code; here
// the sheet stands in for that, framed like the code cells in step 2, so it
// sits on the leaflet instead of looking pasted in. The code is an example
// pattern and leads nowhere.
export default function QrInline({ className = "" }: { className?: string }) {
  return (
    <div className={`sed-root ${className}`}>
      <div className="flex aspect-square items-center justify-center rounded-cell border-[1.5px] border-ink bg-sheet p-[9%]">
        <span className="block w-full rounded-cell border border-ink bg-white p-2.5">
          <QrArt seed={7} label="Example of the app's expanded QR code. It isn't a real code." />
        </span>
      </div>
    </div>
  );
}

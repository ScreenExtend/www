import { useState } from "react";

import "@/components/home/app-demo/app-demo.css";
import { QrArt } from "@/components/home/app-demo/ui.tsx";
import { SESSION_ID, bc } from "@/components/home/app-demo/shared.ts";

// The app's "Expand QR" view (AddDevice.tsx), set in the page instead of over
// it: the dimmed window with the big code on white. The two buttons switch
// network the way the two tiles do in the app. The codes are example patterns
// and lead nowhere.
const NETS = [
  { name: "Anywhere (Internet)", url: `https://session.screenextend.app/?id=${SESSION_ID}`, seed: 7 },
  { name: "Wifi-Home", url: `http://192.168.1.12:8080/?id=${SESSION_ID}`, seed: 23 },
];

export default function QrInline({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const net = NETS[i];
  return (
    <div className={`sed-root ${className}`} role="group" aria-label="Example of the QR code the app shows">
      <div className="sed-qrinline">
        <div className="flex gap-1.5" role="group" aria-label="Network">
          {NETS.map((n, k) => (
            <button
              key={n.name}
              type="button"
              aria-pressed={i === k}
              onClick={() => setI(k)}
              className={`${bc(i === k ? "primary" : "outline", "sm")} sed-netbtn`}
            >
              {n.name}
            </button>
          ))}
        </div>
        <span className="block w-[min(100%,9rem)] rounded-2xl bg-white p-2">
          <QrArt seed={net.seed} label={`Example QR pattern for ${net.name}. It isn't a real code.`} />
        </span>
        <p className="sed-qrurl" title={net.url}>
          {net.url}
        </p>
      </div>
    </div>
  );
}

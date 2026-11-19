import { useState } from "react";

import "@/components/home/app-demo/app-demo.css";
import { QrBig, QrTile } from "@/components/home/app-demo/QrTile.tsx";
import { TILES } from "@/components/home/app-demo/shared.ts";

// Setup step 1: the app's own network tile (same markup and styles as the Add
// Device screen), framed and live. Copy copies the example link; Expand QR
// opens the app's enlarged view inside the frame. The code leads nowhere.
export default function QrInline({ className = "" }: { className?: string }) {
  const [big, setBig] = useState(false);
  const t = TILES[0];
  return (
    <div className={`sed-root ${className}`}>
      <div className="relative overflow-hidden rounded-[10px] border border-line bg-[hsl(var(--sed-bg))] px-3 py-4">
        <div className="flex justify-center">
          <QrTile t={t} live onExpand={() => setBig(true)} />
        </div>
        {big && <QrBig t={t} onClose={() => setBig(false)} />}
      </div>
    </div>
  );
}

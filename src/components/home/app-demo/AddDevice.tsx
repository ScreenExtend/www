import { useState } from "react";

import { QrBig, QrTile } from "@/components/home/app-demo/QrTile.tsx";
import { TILES } from "@/components/home/app-demo/shared.ts";

export default function AddDevice() {
  const [big, setBig] = useState<number | null>(null);

  return (
    <>
      <div className="px-4 pb-4 pt-5 sm:px-8 sm:pt-6">
        <p role="presentation" className="text-center text-2xl font-semibold leading-tight lg:text-[2rem]">
          What network is your device connected to?
        </p>
      </div>
      <div className="mb-6 flex flex-wrap items-start justify-evenly gap-y-8 px-4 sm:px-6">
        {TILES.map((t, i) => (
          <QrTile key={t.name} t={t} onExpand={() => setBig(i)} />
        ))}
      </div>
      {big !== null && <QrBig t={TILES[big]} onClose={() => setBig(null)} />}
    </>
  );
}

import { useState } from "react";
import { Copy } from "lucide-react";

import { DemoBtn, QrArt } from "@/components/home/app-demo/ui.tsx";
import { SESSION_ID, bc } from "@/components/home/app-demo/shared.ts";

const TILES = [
  { name: "Anywhere (Internet)", url: `https://session.screenextend.app/?id=${SESSION_ID}`, seed: 7, online: true },
  { name: "Wifi-Home", url: `http://192.168.1.12:8080/?id=${SESSION_ID}`, seed: 23, online: false },
];

export default function AddDevice() {
  const [big, setBig] = useState<number | null>(null);

  return (
    <>
      <div className="px-4 pb-5 pt-6 sm:px-8 sm:pt-7">
        <h3 className="text-center text-2xl font-semibold leading-tight lg:text-[2rem]">
          What network is your device connected to?
        </h3>
      </div>
      <div className="mb-8 flex flex-wrap items-start justify-evenly gap-y-8 px-4 sm:px-6">
        {TILES.map((t, i) => (
          <div key={t.name} className="w-[264px] max-w-full p-1">
            <h4 className="mb-2 flex flex-wrap items-center justify-center text-center text-xl font-bold sm:text-2xl">
              {t.name}
              {t.online && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-500">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  Online
                </span>
              )}
            </h4>
            <div className="sed-card overflow-hidden p-1">
              <QrArt seed={t.seed} label={`Sample QR pattern for ${t.name} (not a real code)`} />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center rounded-md border">
                <input
                  className="w-full min-w-0 rounded-md border-0 bg-transparent p-2 text-[15px] text-inherit"
                  type="text"
                  value={t.url}
                  readOnly
                  aria-label={`${t.name} join link`}
                />
                <DemoBtn className="flex h-10 shrink-0 items-center rounded-r-md border-l px-2" wrap="end" aria-label="Copy URL">
                  <Copy size={15} aria-hidden="true" />
                </DemoBtn>
              </div>
              <button type="button" className={`${bc()} w-full`} onClick={() => setBig(i)}>
                Expand QR
              </button>
            </div>
          </div>
        ))}
      </div>
      {big !== null && (
        <button
          type="button"
          className="sed-qrbig"
          aria-label="Close expanded QR"
          autoFocus
          onClick={() => setBig(null)}
          onKeyDown={(e) => e.key === "Escape" && setBig(null)}
        >
          <span className="block w-[min(90%,85vmin,520px)] rounded-2xl bg-white p-3">
            <QrArt seed={TILES[big].seed} label={`Sample QR pattern for ${TILES[big].name}, enlarged`} />
          </span>
        </button>
      )}
    </>
  );
}

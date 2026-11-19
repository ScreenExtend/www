import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { DemoBtn, QrArt } from "@/components/home/app-demo/ui.tsx";
import { bc, type Tile } from "@/components/home/app-demo/shared.ts";

// One network tile from the app's Add Device screen: name, QR, join link with
// copy, Expand QR. `live` makes copy actually copy; in the full demo it stays a
// no-op like the other demo buttons.
export function QrTile({ t, onExpand, live = false }: { t: Tile; onExpand: () => void; live?: boolean }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.url);
      setCopied(true);
    } catch {
      /* clipboard blocked: nothing to show */
    }
  };

  return (
    <div className="w-[288px] max-w-full p-1">
      <p role="presentation" className="mb-2 flex flex-wrap items-center justify-center text-center text-xl font-bold lg:text-[1.35rem]">
        {t.name}
        {t.online && (
          <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            Online
          </span>
        )}
      </p>
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
          {live ? (
            <button
              type="button"
              className="flex h-10 shrink-0 items-center rounded-r-md border-l px-2"
              aria-label={copied ? "Copied" : "Copy URL"}
              onClick={copy}
            >
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            </button>
          ) : (
            <DemoBtn className="flex h-10 shrink-0 items-center rounded-r-md border-l px-2" wrap="end" aria-label="Copy URL">
              <Copy size={15} aria-hidden="true" />
            </DemoBtn>
          )}
          <span className="sr-only" aria-live="polite">{copied ? "Link copied" : ""}</span>
        </div>
        <button type="button" className={`${bc()} w-full`} onClick={onExpand}>
          Expand QR
        </button>
      </div>
    </div>
  );
}

export function QrBig({ t, onClose }: { t: Tile; onClose: () => void }) {
  return (
    <button
      type="button"
      className="sed-qrbig"
      aria-label="Close expanded QR"
      autoFocus
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <span className="block w-[min(90%,85vmin,520px)] rounded-2xl bg-white p-3">
        <QrArt seed={t.seed} label={`Sample QR pattern for ${t.name}, enlarged`} />
      </span>
    </button>
  );
}

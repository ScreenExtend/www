import { useEffect, useState } from "react";

import { isTouchDevice } from "@/lib/device.ts";

const URL_TO_SHARE = "https://screenextend.app/";

// Phones and tablets (iPads included): the download is for Windows or Mac, so a
// visitor reading this on the device that will become the second screen is told
// what to do, with a way to get the link onto their computer (share sheet or
// copy). Nothing is sent anywhere by the site itself. Not prerendered.
export default function SendToComputer({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setShow(isTouchDevice()), []);
  if (!show) return null;

  const send = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "ScreenExtend",
          text: "Open this on my computer to download ScreenExtend",
          url: URL_TO_SHARE,
        });
        return;
      }
      await navigator.clipboard.writeText(URL_TO_SHARE);
      setCopied(true);
    } catch {
      // share sheet dismissed or clipboard blocked: nothing to do
    }
  };

  return (
    <div className={`max-w-xl border-l-4 border-spot py-1 pl-4 ${className}`}>
      <p className="leading-relaxed text-muted">
        <span className="font-semibold text-ink">Reading this on a phone or tablet?</span> That's
        the second screen. The download goes on your Windows PC or Mac.
      </p>
      <button type="button" onClick={send} className="btn-line mt-3 w-full sm:w-auto">
        {copied ? "Link copied" : "Send this link to my computer"}
      </button>
    </div>
  );
}

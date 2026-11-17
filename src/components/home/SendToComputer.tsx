import { useState } from "react";

const URL_TO_SHARE = "https://screenextend.app/";

// Phones only: the download is for Windows or Mac, so a phone visitor gets told
// what to do and a way to get the link onto their computer (share sheet: email,
// AirDrop, messages; or copy). Nothing is sent anywhere by the site itself.
export default function SendToComputer() {
  const [copied, setCopied] = useState(false);

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
    <div className="mx-auto mt-6 rounded-panel border border-line bg-surface px-4 py-4 text-left sm:hidden">
      <p className="text-[0.9375rem] leading-relaxed text-muted">
        <span className="font-semibold text-ink">On your phone?</span> Install
        ScreenExtend on your computer. Your phone becomes the second screen later.
      </p>
      <button
        type="button"
        onClick={send}
        className="btn-line mt-3 w-full"
      >
        {copied ? "Link copied" : "Send this link to my computer"}
      </button>
    </div>
  );
}

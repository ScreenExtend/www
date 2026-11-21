import { Minus, Plus } from "lucide-react";

// Keep in sync with the FAQPage JSON-LD in index.html. Same facts as before,
// in the leaflet's voice.
const QA = [
  {
    q: "Which devices can I use as the second screen?",
    a: "Anything with a modern web browser: an iPad or Android tablet, a phone, or another laptop. Nothing gets installed on it. The ScreenExtend app runs on the Windows PC or Mac, and that's the only install.",
  },
  {
    q: "How do I set it up?",
    a: "ScreenExtend runs on the computer and shows a QR code. The other device scans it (or opens the link) and enters the 6-digit code, and it becomes an extra monitor.",
  },
  {
    q: "Is my data secure?",
    a: "The picture and sound are always encrypted. A device can only join with the session's 6-digit code, and a new code can be made at any time to keep others out. One caveat: the join page itself loads over plain HTTP on the local network unless the HTTPS version is switched on, and browsers may warn about that one because the app makes its own certificate.",
  },
  {
    q: "What resolution and refresh rate can it do? Can it game?",
    a: "Each device goes up to 200% scale, with a refresh rate anywhere from 15 to 550 Hz. In testing, the computer sent about 150 frames a second; the result on screen depends on the other device and the Wi-Fi. Gaming works if the network keeps up. HDR is coming in a future release.",
  },
  {
    q: "How many devices can connect at once?",
    a: "Several. Each one gets its own display, and each one added uses more of the computer. With NVIDIA graphics, up to 8 devices are encoded on the graphics chip; past that, the processor takes the rest.",
  },
  {
    q: "How does offline mode work?",
    a: "ScreenExtend starts its own Wi-Fi network from Settings, with a name and password. The other device joins that Wi-Fi and opens the link ScreenExtend shows. No router involved.",
  },
  {
    q: "What data does ScreenExtend collect?",
    a: "Screens are never stored. When a device joins over the internet, the ScreenExtend relay passes a hashed IP address and a rough region to the computer, and the ScreenExtend server keeps short-lived service logs. The Privacy Policy has the details.",
  },
];

export default function FaqSimple() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <h2 className="display-lg">Before you ask</h2>
          <p className="lede mt-3">
            Something missing? Email{" "}
            <a href="mailto:support@screenextend.app" className="u-link">
              support@screenextend.app
            </a>
            .
          </p>
        </div>

        <div className="border-b border-line lg:col-span-8">
          {QA.map((item) => (
            <details key={item.q} className="group border-t border-line">
              <summary className="wide flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold leading-snug [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus size={20} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link group-open:hidden" />
                <Minus size={20} strokeWidth={2} aria-hidden="true" className="hidden shrink-0 text-link group-open:block" />
              </summary>
              <p className="pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Minus, Plus } from "lucide-react";

// Keep in sync with the FAQPage JSON-LD in index.html. Same facts as before,
// in the leaflet's voice.
const QA = [
  {
    q: "Which devices can I use as the second screen?",
    a: "Anything with a modern web browser: an iPad or Android tablet, a phone, or another laptop. Nothing gets installed on it. The ScreenExtend app runs on your Windows PC or Mac, and that's the only install.",
  },
  {
    q: "How do I set it up?",
    a: "Run ScreenExtend on your computer. On the other device, scan the QR code (or open the link) and type the 6-digit code. It's now an extra monitor.",
  },
  {
    q: "Is my data secure?",
    a: "The picture and sound are always encrypted. A device can only join with the session's 6-digit code, and you can make a new code whenever you like to keep others out. One caveat: the join page itself loads over plain HTTP on your own network unless you switch on the HTTPS version, and your browser may warn about that one because the app makes its own certificate.",
  },
  {
    q: "What resolution and refresh rate can it do? Can it game?",
    a: "Each device goes up to 200% scale, with a refresh rate you can set anywhere from 15 to 550 Hz. In our tests the computer sent about 150 frames a second; what you actually see depends on the other device and your Wi-Fi. Gaming works if your network keeps up. HDR is coming in a future release.",
  },
  {
    q: "How many devices can connect at once?",
    a: "Several. Each one gets its own display, and each one you add uses more of your computer. With NVIDIA graphics, up to 8 devices are encoded on the graphics chip; past that, the processor takes the rest.",
  },
  {
    q: "How does offline mode work?",
    a: "Open Settings and start the hosted network with a name and password. On the other device, join that Wi-Fi and open the link ScreenExtend shows. No router involved.",
  },
  {
    q: "What data does ScreenExtend collect?",
    a: "Your screen is never stored. When a device joins over the internet, our relay passes a hashed IP address and a rough region to your computer, and our server keeps short-lived service logs. The Privacy Policy has the details.",
  },
];

export default function FaqSimple() {
  return (
    <section id="faq" className="border-t-[1.5px] border-ink py-16 lg:py-24">
      <div className="container grid gap-8 lg:grid-cols-12 lg:gap-12">
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

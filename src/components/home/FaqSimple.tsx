import { Plus } from "lucide-react";

// Keep in sync with the FAQPage JSON-LD in index.html.
const QA = [
  {
    q: "Which devices can I use as the second screen?",
    a: "Anything with a modern web browser: an iPad or Android tablet, a phone, or another laptop. Nothing gets installed on it. ScreenExtend itself runs on your Windows PC or Mac.",
  },
  {
    q: "How do I use ScreenExtend?",
    a: "Run it on your computer, scan the QR code (or open the link) on the other device, and type the 6-digit code. That device becomes an extra monitor.",
  },
  {
    q: "Is my data secure?",
    a: "The picture and sound are always encrypted. A device can only join with the session's 6-digit code, and you can make a new code any time to keep others out. The join page itself loads over plain HTTP on your own network unless you switch on the HTTPS version, which your browser may warn about because the app makes its own certificate.",
  },
  {
    q: "What resolution and refresh rate can it do? Can it game?",
    a: "Each device can go up to 200% scale, and you can set its refresh rate anywhere from 15 to 550 Hz. In our tests the computer sent about 150 frames a second; what you actually see depends on the other device and your Wi-Fi. Gaming works if your network keeps up. HDR is coming in a future release.",
  },
  {
    q: "How many devices can connect at once?",
    a: "Several. Each one gets its own display, and each one you add uses more of your computer. With NVIDIA graphics, up to 8 devices use the graphics chip; any more fall back to the processor.",
  },
  {
    q: "How does offline mode work?",
    a: "Open Settings and start the hosted network with a name and password. Join that Wi-Fi on the other device and open the link ScreenExtend shows. No router needed.",
  },
  {
    q: "What data does ScreenExtend collect?",
    a: "Your screen is never stored. When a device joins over the internet, our relay passes a hashed IP address and a rough region to your computer, and our server keeps short-lived service logs. The Privacy Policy has the details.",
  },
];

export default function FaqSimple() {
  return (
    <section id="faq" className="border-t border-line py-16 lg:py-24">
      <div className="container grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="display-lg">Frequently asked questions</h2>
          <p className="mt-4 text-muted">
            Not covered here? Email{" "}
            <a href="mailto:support@screenextend.app" className="u-link">
              support@screenextend.app
            </a>
            .
          </p>
        </div>

        <div className="border-b border-line lg:col-span-8">
          {QA.map((item) => (
            <details key={item.q} className="group border-t border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="shrink-0 text-muted transition-transform duration-150 group-open:rotate-45"
                />
              </summary>
              <p className=" pb-5 leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

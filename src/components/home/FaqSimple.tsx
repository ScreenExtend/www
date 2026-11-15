import { Plus } from "lucide-react";

// Keep in sync with the FAQPage JSON-LD in index.html.
const QA = [
  {
    q: "How do I use ScreenExtend?",
    a: "Run it on your computer, scan a QR code (or open the URL) on any other device, and enter the 6-digit session code. That device becomes an extended monitor.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Every session needs a one-time code to join, which you can regenerate anytime to lock out unknown devices, and the stream is encrypted.",
  },
  {
    q: "What resolution and refresh rate can it do? Can it game?",
    a: "Each device goes up to 200% scale and 500 Hz. Gaming works if your network keeps up; heavy high-refresh video needs a strong connection. HDR is coming in a future release.",
  },
  {
    q: "How many devices can connect at once?",
    a: "As many as you like; each one gets its own virtual display. Performance drops as you add more.",
  },
  {
    q: "How does offline mode work?",
    a: "In Settings, start the hosted network with a name and password. Join that Wi-Fi on the other device and open the URL on the dashboard, no router needed.",
  },
  {
    q: "What data does ScreenExtend collect?",
    a: "None is stored. Settings stay on your device; a session only exchanges what's needed to set up the connection, then it's gone.",
  },
];

export default function FaqSimple() {
  return (
    <section id="faq" className="border-t border-line py-16 lg:py-24">
      <div className="container grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="section-title">Questions</h2>
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
              <p className="max-w-[62ch] pb-5 leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

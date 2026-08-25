import Reveal from "@/components/Reveal.tsx";

const COLLAPSE =
  "collapse collapse-arrow border border-base-content/10 bg-base-100/50 backdrop-blur-sm transition-colors duration-200 hover:border-primary/40";

const QA = [
  {
    q: "How do I use ScreenExtend?",
    a: "Run it on your PC, scan a QR code (or open the URL) on any other device, and enter the 6-digit session code. That device becomes an extended monitor.",
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
    <section id="faq" className="cv-auto py-16 lg:py-28">
      <div className="container">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {QA.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className={COLLAPSE}>
                <summary className="collapse-title list-none text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                </summary>
                <div className="collapse-content">
                  <p className="text-base text-base-content/80">{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-base-content/80">
            Still stuck? Email{" "}
            <a
              href="mailto:support@screenextend.app"
              className="link link-primary"
            >
              support@screenextend.app
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

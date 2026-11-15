import ShotButton from "@/components/home/ShotButton.tsx";

const FEATURES = [
  {
    title: "Add a device",
    desc: "Every network you're on gets its own QR code and URL, plus an Anywhere tile for joining across networks. Scan, enter the code, and the device turns into a fullscreen extended monitor.",
    alt: "Add Device screen with QR codes for the Anywhere (Internet) and Wifi-Home networks.",
  },
  {
    title: "Adjust each display",
    desc: "Each connected device has its own live settings: resolution scale, orientation, refresh rate and video quality. Changing one leaves the others alone. You can also remove a device from here.",
    alt: "Edit Device panel with resolution scale, orientation, refresh rate and video quality controls for one connected device.",
  },
  {
    title: "Session settings",
    desc: "Regenerate the one-time session code, start an offline hosted network with no router, set a disconnect timeout and read the debug logs.",
    alt: "Settings screen showing the Session OTP, Public Internet Sessions, Create Hosted Network and Device Disconnect Timeout options.",
  },
];

export default function FeatureScroll() {
  return (
    <section id="features" className="border-t border-line py-16 lg:py-24">
      <div className="container">
        <h2 className="section-title">Inside the host app</h2>

        <div className="mt-10 space-y-14 lg:mt-14 lg:space-y-20">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="grid items-center gap-6 md:grid-cols-12 md:gap-10"
            >
              <div
                className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <ShotButton
                  index={i}
                  alt={f.alt}
                  sizes="(min-width: 768px) 42rem, 100vw"
                />
              </div>
              <div
                className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                <h3 className="text-xl font-semibold sm:text-2xl">{f.title}</h3>
                <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

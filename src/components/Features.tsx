import { Badge } from "react-daisyui";

import { useImage } from "@/components/ImageContext.tsx";
import Reveal from "@/components/Reveal.tsx";
import feature1Image from "@/assets/app/feature-1.png";
import feature2Image from "@/assets/app/feature-2.png";
import feature3Image from "@/assets/app/feature-3.png";

const CARD =
  "group overflow-hidden rounded-lg border border-base-content/10 bg-base-200/60 shadow-sm backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 cursor-pointer";
const CARD_IMG = "overflow-hidden rounded-ss-lg";

export default function Features() {
  const { setCurrentImage } = useImage();

  return (
    <section className="relative py-8 lg:py-20" id="features">
      <div className="container">
        <Reveal className="flex flex-col items-center">
          <h2 className="inline text-4xl font-semibold">Features</h2>
          <span className="mt-3 h-1 w-16 rounded-full bg-primary" />
        </Reveal>
        <div className="relative z-[2] mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <Reveal direction="left" className={CARD} onClick={() => setCurrentImage(0)}>
            <img alt="ScreenExtend dashboard showing the device connection screen" className={CARD_IMG} src={feature1Image} />
          </Reveal>
          <Reveal direction="right" className="lg:mt-8">
            <Badge color="primary" className="font-mono">Dashboard</Badge>
            <h3 className="mt-2 text-3xl font-semibold">Easy-to-Use Dashboard</h3>
            <p className="mt-2 text-base font-medium">
              Easily connect secondary (or more!) displays that act as extended monitors via scanning the QR code or entering the URL on the receiver:
            </p>
            <ul className="mt-4 list-inside list-disc text-base">
              <li>Easy-to-scan QR codes</li>
              <li>Hosted network support for faster connections</li>
              <li>Instant login to extended desktop</li>
              <li>Fast and secure connection using WebRTC</li>
            </ul>
          </Reveal>
        </div>
        <div className="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <Reveal direction="left">
            <Badge color="primary" className="font-mono">Configuration</Badge>
            <h3 className="mt-2 text-3xl font-semibold">Customizable Devices</h3>
            <p className="mt-2 text-base">
              Modify or remove connected devices in the devices panel:
            </p>
            <ul className="mt-4 list-inside list-disc text-base">
              <li>Rename displays for easy identification</li>
              <li>Adjust video quality or refresh rate to optimize latency</li>
              <li>Modify scale and refresh rate for various use cases</li>
              <li>Easily remove devices with a single click</li>
            </ul>
          </Reveal>
          <Reveal
            direction="right"
            className={`order-first lg:order-last ${CARD}`}
            onClick={() => setCurrentImage(1)}
          >
            <img alt="ScreenExtend device configuration panel" className={CARD_IMG} src={feature2Image} />
          </Reveal>
        </div>
        <div className="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <Reveal direction="left" className={CARD} onClick={() => setCurrentImage(2)}>
            <img alt="ScreenExtend settings panel" className={CARD_IMG} src={feature3Image} />
          </Reveal>
          <Reveal direction="right" className="lg:mt-7">
            <Badge color="primary" className="font-mono">Settings</Badge>
            <h3 className="mt-2 text-3xl font-semibold">Adaptive Settings</h3>
            <p className="mt-2 text-base">
              Customize your experience in ScreenExtend through the settings panel:
            </p>
            <ul className="mt-4 list-inside list-disc text-base">
              <li>Regenerate OTP for devices to join</li>
              <li>Option to use as a guest or with a password-protected personal account</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

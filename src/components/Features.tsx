import { Badge } from "react-daisyui";

import { useImage } from "@/components/ImageContext.tsx";
import feature1Image from "@/assets/app/feature-1.png";
import feature2Image from "@/assets/app/feature-2.png";
import feature3Image from "@/assets/app/feature-3.png";

export default function Features() {
  const { setCurrentImage } = useImage();
  
  return (
    <section className="relative py-8 lg:py-20" id="features">
      <div className="absolute start-[10%] z-0">
        <div className="pointer-events-none aspect-square w-60 rounded-full bg-gradient-to-r from-primary/10 via-violet-500/10 to-purple-500/10 blur-3xl [transform:translate3d(0,0,0)] lg:w-[600px]"></div>
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <h2 className="inline text-4xl font-semibold">Features</h2>
        </div>
        <div className="relative z-[2] mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl cursor-pointer" onClick={() => setCurrentImage(0)}>
            <img alt="saas img" className="overflow-hidden rounded-ss-lg" src={feature1Image} />
          </div>
          <div className="lg:mt-8">
            <Badge color="primary">Dashboard</Badge>
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
          </div>
        </div>
        <div className="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <div>
            <Badge color="primary">Configuration</Badge>
            <h3 className="mt-2 text-3xl font-semibold">Customizable Devices</h3>
            <p className="mt-2 text-base">
              Devices can easily be modified or remove connected devices in the devices panel:
            </p>
            <ul className="mt-4 list-inside list-disc text-base">
              <li>Rename displays for easy identification</li>
              <li>Adjust video quality or refresh rate to optimize latency</li>
              <li>Modify scale and refresh rate for various use cases</li>
              <li>Easily remove devices with a single click</li>
            </ul>
          </div>
          <div className="order-first lg:order-last">
            <div className="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl cursor-pointer" onClick={() => setCurrentImage(1)}>
              <img alt="saas img" className="overflow-hidden rounded-ss-lg" src={feature2Image} />
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl cursor-pointer" onClick={() => setCurrentImage(2)}>
            <img alt="saas img" className="overflow-hidden rounded-ss-lg" src={feature3Image} />
          </div>
          <div className="lg:mt-7">
            <Badge color="primary">Settings</Badge>
            <h3 className="mt-2 text-3xl font-semibold">Adaptive Settings</h3>
            <p className="mt-2 text-base">
              Customize your experience in ScreenExtend through the settings panel:
            </p>
            <ul className="mt-4 list-inside list-disc text-base">
              <li>Regenerate OTP for devices to join</li>
              <li>Option to use as a guest or with a password-protected personal account</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

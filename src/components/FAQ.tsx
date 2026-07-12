import { Collapse } from "react-daisyui";

import Reveal from "@/components/Reveal.tsx";

const COLLAPSE =
  "border border-base-content/10 bg-base-100/50 backdrop-blur-sm transition-colors duration-200 hover:border-primary/40";

export default function FAQ() {
  return (
    <section className="py-8 lg:py-20" id="faq">
      <div className="container">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-semibold text-base-content">FAQs</h2>
          <span className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-info" />
        </Reveal>
        <div className="mt-12 flex justify-center gap-6">
          <div className="space-y-4 lg:w-1/2">
            <Reveal delay={0}>
              <Collapse className={COLLAPSE} icon="arrow">
                <input type="checkbox" />
                <Collapse.Title className="text-xl font-medium">How do I use ScreenExtend?</Collapse.Title>
                <Collapse.Content>
                  <p className="text-base">
                    Once logged in, you'll see QR codes for different network options. Select the QR code that matches the network your target device is on. For example, choose "Wifi-Home" if both devices are connected to your home Wi-Fi. After scanning the QR code or entering the URL, enter the OTP displayed on the settings screen to complete the connection. Your screen will then be extended.
                  </p>
                </Collapse.Content>
              </Collapse>
            </Reveal>
            <Reveal delay={80}>
              <Collapse className={COLLAPSE} icon="arrow">
                <input type="checkbox" />
                <Collapse.Title className="text-xl font-medium">Is my device secure by using ScreenExtend?</Collapse.Title>
                <Collapse.Content>
                  <p className="text-base">
                    Sessions have an OTP that devices need to enter when connecting. This can be regenerated if needed, ensuring unauthorized devices cannot join.
                  </p>
                </Collapse.Content>
              </Collapse>
            </Reveal>
            <Reveal delay={160}>
              <Collapse className={COLLAPSE} icon="arrow">
                <input type="checkbox" />
                <Collapse.Title className="text-xl font-medium">What's the maximum resolution and refresh rate of ScreenExtend? Can it support gaming?</Collapse.Title>
                <Collapse.Content>
                  <p className="text-base">
                    For each device, you can customize the resolution and refresh rate. Gaming is possible, depending on network bandwith; streaming video at high refresh rates is not possible on all Wifi networks. However, in the device settings, you can modify the resolution up to 200% and refresh rate up to 500hz. In a future release, HDR displays will be supported.
                  </p>
                </Collapse.Content>
              </Collapse>
            </Reveal>
            <Reveal delay={240}>
              <Collapse className={COLLAPSE} icon="arrow">
                <input type="checkbox" />
                <Collapse.Title className="text-xl font-medium">How many devices can be connected at once?</Collapse.Title>
                <Collapse.Content>
                  <p className="text-base">
                    ScreenExtend doesn't have a limit of devices, but performance is known to reduce with the more devices you add.
                  </p>
                </Collapse.Content>
              </Collapse>
            </Reveal>
            <Reveal delay={320}>
              <Collapse className={COLLAPSE} icon="arrow">
                <input type="checkbox" />
                <Collapse.Title className="text-xl font-medium">What is the offline mode? How do I use it?</Collapse.Title>
                <Collapse.Content>
                  <p className="text-base">
                    If you aren't near a Wifi network or have a weak connection, you can use ScreenExtend's offline mode. Simply go into settings and configure your network name and password. Once the hosted network is enabled, join the Wifi network on the receiver and go to the URL displayed on the ScreenExtend dashboard.
                  </p>
                </Collapse.Content>
              </Collapse>
            </Reveal>
            <Reveal delay={400}>
              <Collapse className={COLLAPSE} icon="arrow">
                <input type="checkbox" />
                <Collapse.Title className="text-xl font-medium">What data is sent to ScreenExtend?</Collapse.Title>
                <Collapse.Content>
                  <p className="text-base">
                    ScreenExtend doesn't store any device data. All account data and preferences are stored locally. When establishing a session, device information including the device's IP address is sent to create a WebRTC connection. However, it is not stored and is solely used to set up a ScreenExtend session.
                  </p>
                </Collapse.Content>
              </Collapse>
            </Reveal>
          </div>
        </div>
        <Reveal>
          <p className="mt-10 text-lg sm:text-center">
            For additional questions or concerns, contact us at <a href="mailto:support@screenextend.app" style={{ textDecoration: "underline" }}>support@screenextend.app</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

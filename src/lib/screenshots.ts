import feature1 from "@/assets/app/feature-1.png";
import feature2 from "@/assets/app/feature-2.png";
import feature3 from "@/assets/app/feature-3.png";
import feature1Webp from "@/assets/app/feature-1.webp";
import feature2Webp from "@/assets/app/feature-2.webp";
import feature3Webp from "@/assets/app/feature-3.webp";
import feature1WebpSm from "@/assets/app/feature-1-760.webp";
import feature2WebpSm from "@/assets/app/feature-2-760.webp";
import feature3WebpSm from "@/assets/app/feature-3-760.webp";

export interface Shot {
  png: string;
  webp: string;
  webpSmall: string;
}

export const SHOTS: Shot[] = [
  { png: feature1, webp: feature1Webp, webpSmall: feature1WebpSm },
  { png: feature2, webp: feature2Webp, webpSmall: feature2WebpSm },
  { png: feature3, webp: feature3Webp, webpSmall: feature3WebpSm },
];

export const SHOT_WIDTH = 1369;
export const SHOT_HEIGHT = 817;

// Alt text for the lightbox, in SHOTS order.
export const SHOT_ALTS = [
  "Add Device screen with QR codes and join URLs for the Anywhere (Internet) and Wifi-Home networks.",
  "Edit Device panel with resolution scale, orientation, refresh rate and video quality controls for one connected device.",
  "Settings screen showing the Session OTP, Public Internet Sessions, Create Hosted Network and Device Disconnect Timeout options.",
];

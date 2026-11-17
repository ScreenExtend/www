import { useImage } from "@/components/ImageContext.tsx";
import editCrop from "@/assets/app/crop-edit.webp";
import settingsCrop from "@/assets/app/crop-settings.webp";

// Crops of the real screenshots (src/assets/app/feature-2.png and feature-3.png),
// shown near their native size so the controls are readable. Clicking one opens
// the full screenshot.
function Crop({
  shot,
  src,
  w,
  h,
  alt,
  plate,
  className = "",
}: {
  shot: number;
  src: string;
  w: number;
  h: number;
  alt: string;
  plate: string;
  className?: string;
}) {
  const { setCurrentImage } = useImage();
  return (
    <button
      type="button"
      onClick={() => setCurrentImage(shot)}
      title="See the full screenshot"
      className={`group relative block w-full cursor-zoom-in ${className}`}
    >
      <span className="sr-only">Open full screenshot: </span>
      {/* one plate behind, offset like the logo's stacked screens */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-x-[4%] translate-y-[5%] rounded-[1rem] ${plate}`}
      />
      <span className="relative block rounded-[1rem] bg-[#060b14] p-2 transition-transform duration-150 group-active:scale-[0.99] sm:p-3">
        <img
          src={src}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          alt={alt}
          className="block h-auto w-full rounded-[0.5rem]"
        />
      </span>
    </button>
  );
}

// A full-bleed band in the logo's mint: the first light ground after the dark
// hero and pairing sections. data-theme="light" scopes the light tokens here.
export default function FeatureScroll() {
  return (
    <section
      id="features"
      data-theme="light"
      className="bg-logo-mint py-16 text-[#0f1419] lg:py-24"
    >
      <div className="container">
        <h2 className="display-lg">Every screen gets its own settings</h2>
        <p className="mt-3 max-w-[48ch] text-lg text-[#2c3640]">Set each device up the way it suits you. Click a screenshot to see it full size.</p>

        <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Crop
              shot={1}
              src={editCrop}
              w={383}
              h={440}
              plate="bg-logo-blue"
              className="max-w-[24rem]"
              alt="Edit Device controls: screen size, scale, refresh rate, video scale and video quality sliders, with Remove Device and Save changes buttons."
            />
            <h3 className="mt-10 text-lg font-semibold">Edit Device</h3>
            <p className="mt-2 max-w-[42ch] leading-relaxed text-[#2c3640]">
              Scale, orientation, refresh rate and video quality, per device.
              Changing one leaves the others alone, and you remove a device here.
            </p>
          </div>

          <div className="lg:col-span-7 lg:-mr-12 lg:pt-24 xl:-mr-24">
            <Crop
              shot={2}
              src={settingsCrop}
              w={1050}
              h={496}
              plate="bg-lime"
              alt="Settings screen showing the Session OTP cells, the Public Internet Sessions toggle and the Create Hosted Network switch."
            />
            <h3 className="mt-10 text-lg font-semibold">Settings</h3>
            <p className="mt-2 max-w-[48ch] leading-relaxed text-[#2c3640]">
              Regenerate the session code, start an offline hosted network so
              devices connect without a router, set a disconnect timeout and read
              the debug logs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

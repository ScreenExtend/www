// Ambient brand background: slow-drifting gradient blooms in the ScreenExtend
// logo colors. A deliberate design choice for visual interest, not a default.
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-logo-blue/30 to-logo-cyan/10 blur-3xl animate-blob" /> {/* unslop-ignore */}
      <div className="absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-logo-cyan/25 to-logo-mint/15 blur-3xl animate-blob animation-delay-2000" /> {/* unslop-ignore */}
      <div className="absolute bottom-[-10rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-logo-lime/20 to-logo-blue/10 blur-3xl animate-blob animation-delay-4000" /> {/* unslop-ignore */}
    </div>
  );
}

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-logo-blue/25 blur-3xl animate-blob" />
      <div className="absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-logo-mint/30 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-logo-lime/20 blur-3xl animate-blob animation-delay-4000" />
    </div>
  );
}

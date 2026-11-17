// The app's default profile picture (se-app src/assets/default.svg), simplified.
export default function Avatar() {
  return (
    <svg viewBox="0 0 40 40" className="block h-full w-full" aria-hidden="true">
      <rect width="40" height="40" fill="#cfcfcf" />
      <circle cx="20" cy="15.5" r="7" fill="#f4f4f4" />
      <path d="M6 37c1.5-8 7-11.5 14-11.5S32.5 29 34 37v3H6z" fill="#f4f4f4" />
    </svg>
  );
}

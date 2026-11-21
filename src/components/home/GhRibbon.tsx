// The old-style corner ribbon: a stitched red band across the hero's top-right
// corner. Only the band itself takes clicks, so the corner around it stays free.
export default function GhRibbon() {
  return (
    <a
      href="https://github.com/ScreenExtend/ScreenExtend"
      target="_blank"
      rel="noopener noreferrer"
      className="gh-ribbon"
      aria-label="Star ScreenExtend on GitHub"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="149" height="149" viewBox="0 0 149 149" aria-hidden="true">
        <defs>
          <linearGradient id="gh-ribbon-g" gradientUnits="userSpaceOnUse" x1="61" y1="0" x2="149" y2="88">
            <stop offset="0" stopColor="#d40000" />
            <stop offset="1" stopColor="#8a0000" />
          </linearGradient>
          <filter id="gh-ribbon-s" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000" floodOpacity=".5" />
          </filter>
        </defs>
        <polygon className="gh-ribbon-band" points="40,0 82,0 149,67 149,109" fill="url(#gh-ribbon-g)" filter="url(#gh-ribbon-s)" />
        <line x1="40" y1="0" x2="149" y2="109" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
        <line x1="82" y1="0" x2="149" y2="67" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
        <line x1="49" y1="0" x2="149" y2="100" stroke="#fff" strokeOpacity=".45" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="73" y1="0" x2="149" y2="76" stroke="#fff" strokeOpacity=".45" strokeWidth="1" strokeDasharray="2 2" />
        <text
          transform="translate(105 44) rotate(45)"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Collegiate, 'Trebuchet MS', 'DejaVu Sans', Arial, sans-serif"
          fontWeight="bold"
          fontSize="10.5"
          fill="#fff"
          style={{ textShadow: "0 -1px 0 rgba(0,0,0,.4)" }}
        >
          Star me on GitHub
        </text>
      </svg>
    </a>
  );
}

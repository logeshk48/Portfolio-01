export default function BoardFallback() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-70"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g fill="none" stroke="#1c2026" strokeWidth="1">
        <path d="M-20 214 H 300 L 360 154 H 980 L 1040 214 H 1460" />
        <path d="M-20 640 H 250 L 320 710 H 900 L 960 650 H 1460" />
        <path d="M120 -20 V 120 L 190 190 V 500" />
        <path d="M1330 920 V 760 L 1260 690 V 300" />
      </g>
      <g fill="#08090b" stroke="#2a2118" strokeWidth="1">
        <circle cx="360" cy="154" r="3.4" />
        <circle cx="1040" cy="214" r="3.4" />
        <circle cx="320" cy="710" r="3.4" />
        <circle cx="1260" cy="690" r="3.4" />
      </g>
      <rect x="620" y="400" width="200" height="90" fill="#111418" stroke="#1c2026" />
    </svg>
  );
}
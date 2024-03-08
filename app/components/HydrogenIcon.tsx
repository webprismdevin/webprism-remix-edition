export default function HydrogenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="81"
      fill="none"
      viewBox="0 0 76 81"
      className={className}
    >
      <path
        fill="#000"
        d="M37.817 80.149 0 60.057l12.934-6.817 14.561 7.733 12.218-6.441-14.561-7.733 12.933-6.833 37.818 20.091-12.934 6.817-13.757-7.307-12.236 6.457 13.775 7.308-12.934 6.817Z"
      />
      <path
        fill="url(#a)"
        d="M37.818 40.183 0 20.092l12.934-6.818 14.562 7.733 12.218-6.441-14.562-7.733L38.086 0l37.817 20.091-12.934 6.817-13.756-7.307-12.236 6.457 13.774 7.308-12.933 6.817Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1="54.285"
          x2="42.84"
          y1="0"
          y2="46.16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0DA3D3" />
          <stop offset="1" stop-color="#27245D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
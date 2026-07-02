// Refined brand mark: a rounded gradient badge with a gold star (Vietnam flag
// motif) plus a subtle top gloss and inner hairline for a premium, dimensional
// feel. `id` must be unique per instance so the SVG gradients don't collide.
export default function BrandMark({ size = 36, id = 'bm' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EE3A31" />
          <stop offset="1" stopColor="#B01610" />
        </linearGradient>
        <linearGradient id={`${id}-star`} x1="32" y1="14" x2="32" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDD57" />
          <stop offset="1" stopColor="#F5A300" />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="32" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="17" fill={`url(#${id}-bg)`} />
      <rect x="2" y="2" width="60" height="30" rx="17" fill={`url(#${id}-gloss)`} />
      <rect
        x="2.75"
        y="2.75"
        width="58.5"
        height="58.5"
        rx="16.25"
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />
      <path
        d="M32 15.5l4.36 9.87 10.73.98-8.09 7.12 2.38 10.53L32 48.4l-9.38 5.6 2.38-10.53-8.09-7.12 10.73-.98z"
        fill={`url(#${id}-star)`}
      />
    </svg>
  )
}

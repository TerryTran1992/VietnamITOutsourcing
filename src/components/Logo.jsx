// Monogram logo generated from the company name + brand color.
export default function Logo({ company, size = 'md' }) {
  const initials = company.name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const bg = company.brandColor || '#0b6bcb'
  return (
    <div
      className={`logo ${size === 'lg' ? 'lg' : ''}`}
      style={{
        background: `linear-gradient(135deg, ${bg}, ${shade(bg, -18)})`,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

// darken/lighten a hex color
function shade(hex, percent) {
  const n = hex.replace('#', '')
  const num = parseInt(n.length === 3 ? n.replace(/./g, '$&$&') : n, 16)
  let r = (num >> 16) + Math.round(2.55 * percent)
  let g = ((num >> 8) & 0xff) + Math.round(2.55 * percent)
  let b = (num & 0xff) + Math.round(2.55 * percent)
  r = Math.max(0, Math.min(255, r))
  g = Math.max(0, Math.min(255, g))
  b = Math.max(0, Math.min(255, b))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

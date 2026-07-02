export default function StarRating({ value }) {
  const pct = `${(value / 5) * 100}%`
  return (
    <span className="stars" style={{ '--pct': pct }} aria-label={`${value} out of 5 stars`}>
      <span>★★★★★</span>
    </span>
  )
}

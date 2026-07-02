// VITO Score — the transparent ranking formula used across the site.
//
// Design intent: reward client-reported satisfaction, value, communication and
// verified quality signals rather than raw company size. Headcount and review
// volume are log-compressed so that enterprise giants do not automatically
// dominate over highly-rated specialist firms.
//
// Every component is normalized to 0–100 and combined with the weights below.
// The final VITO Score is on a 0–100 scale.

export const WEIGHTS = [
  { key: 'rating', label: 'Client rating', weight: 0.32 },
  { key: 'delivery', label: 'Quality, schedule, cost & communication', weight: 0.26 },
  { key: 'retention', label: 'Client retention', weight: 0.16 },
  { key: 'credentials', label: 'Certifications & awards', weight: 0.12 },
  { key: 'reviews', label: 'Verified review volume', weight: 0.08 },
  { key: 'scale', label: 'Delivery scale (talent)', weight: 0.06 },
]

function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n))
}

// log scaling that maps [1..cap] -> [0..100]
function logScore(value, cap) {
  if (value <= 0) return 0
  return clamp((Math.log(value + 1) / Math.log(cap + 1)) * 100)
}

export function componentScores(c) {
  const ratingScore = (c.rating / 5) * 100

  const s = c.scores
  const deliveryScore = ((s.quality + s.schedule + s.cost + s.communication) / 40) * 100

  const retentionScore = c.clientRetention // already 0..100

  const credentialsScore = clamp(
    (c.certifications.length * 12 + c.awards.length * 9),
  )

  const reviewsScore = logScore(c.reviews, 250)

  const scaleScore = logScore(c.employees, 32000)

  return {
    rating: ratingScore,
    delivery: deliveryScore,
    retention: retentionScore,
    credentials: credentialsScore,
    reviews: reviewsScore,
    scale: scaleScore,
  }
}

export function vitoScore(c) {
  const parts = componentScores(c)
  const total = WEIGHTS.reduce((sum, w) => sum + parts[w.key] * w.weight, 0)
  return Math.round(total * 10) / 10
}

// Returns companies sorted by VITO score (desc) with rank + score attached.
export function rankCompanies(companies) {
  return companies
    .map((c) => ({ ...c, score: vitoScore(c) }))
    .sort((a, b) => b.score - a.score || b.rating - a.rating)
    .map((c, i) => ({ ...c, rank: i + 1 }))
}

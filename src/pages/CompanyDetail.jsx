import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { companies } from '../data/companies'
import { reviewsByCompany } from '../data/reviews'
import { rankCompanies, componentScores, WEIGHTS } from '../utils/scoring'
import Logo from '../components/Logo'
import StarRating from '../components/StarRating'
import { CompanyCard } from '../components/CompanyCard'
import Icon from '../components/Icon'

const SCORE_LABELS = {
  quality: 'Quality',
  schedule: 'Schedule / On-time',
  cost: 'Value for cost',
  communication: 'Communication',
}

export default function CompanyDetail() {
  const { slug } = useParams()
  const ranked = useMemo(() => rankCompanies(companies), [])
  const c = ranked.find((x) => x.slug === slug)

  if (!c) {
    return (
      <div className="container empty" style={{ padding: '100px 20px' }}>
        <h2>Company not found</h2>
        <Link to="/directory" className="btn btn-primary" style={{ marginTop: 12 }}>
          Back to directory
        </Link>
      </div>
    )
  }

  const reviews = reviewsByCompany[c.slug] || []
  const parts = componentScores(c)
  const similar = ranked
    .filter((x) => x.id !== c.id && x.services.some((s) => c.services.includes(s)))
    .slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/directory">Directory</Link> /{' '}
            <span style={{ color: '#fff' }}>{c.name}</span>
          </div>
          <div className="detail-head">
            <Logo company={c} size="lg" />
            <div style={{ flex: 1, minWidth: 240 }}>
              <h1>{c.name}</h1>
              <div style={{ color: '#c3ccdf', marginTop: 6 }}>{c.tagline}</div>
              <div className="detail-tags">
                <span className="badge flag">
                  <Icon name="trophy" size={12} style={{ color: 'var(--gold)' }} /> Ranked #{c.rank} of{' '}
                  {companies.length}
                </span>
                <span className="badge flag">
                  <StarRating value={c.rating} /> {c.rating.toFixed(1)} ({c.reviews})
                </span>
                <span className="badge flag">
                  <Icon name="mapPin" size={12} /> {c.hqCity}
                </span>
                {c.editorsChoice && (
                  <span className="badge editor">
                    <Icon name="sparkles" size={12} /> Editor’s Choice
                  </span>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: '#9fd0ff',
                }}
              >
                {c.score}
              </div>
              <div style={{ fontSize: 12, color: '#93a0bd', letterSpacing: '0.05em' }}>
                VITO SCORE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="container detail-body">
        <div>
          {/* Overview */}
          <div className="panel">
            <h3>Overview</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {c.description}
            </p>
            <div className="kv-grid" style={{ marginTop: 20 }}>
              <div className="kv">
                <div className="k">Founded</div>
                <div className="v">{c.founded}</div>
              </div>
              <div className="kv">
                <div className="k">Team size</div>
                <div className="v">{c.employeeRange} employees</div>
              </div>
              <div className="kv">
                <div className="k">Headquarters</div>
                <div className="v">{c.hqCity}</div>
              </div>
              <div className="kv">
                <div className="k">Locations</div>
                <div className="v">{c.locations.join(', ')}</div>
              </div>
              <div className="kv">
                <div className="k">Hourly rate</div>
                <div className="v">{c.hourlyRate}</div>
              </div>
              <div className="kv">
                <div className="k">Min. project size</div>
                <div className="v">{c.minProject}</div>
              </div>
              <div className="kv">
                <div className="k">Client retention</div>
                <div className="v">{c.clientRetention}%</div>
              </div>
              <div className="kv">
                <div className="k">Website</div>
                <div className="v">
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="icon-inline"
                    style={{ color: 'var(--brand)' }}
                  >
                    Visit <Icon name="externalLink" size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings breakdown */}
          <div className="panel">
            <h3>Client ratings</h3>
            {Object.entries(SCORE_LABELS).map(([key, label]) => {
              const val = c.scores[key]
              return (
                <div className="score-bar" key={key}>
                  <div className="top">
                    <span>{label}</span>
                    <b>{val.toFixed(1)}</b>
                  </div>
                  <div className="track">
                    <span style={{ width: `${(val / 10) * 100}%` }} />
                  </div>
                </div>
              )
            })}
            <p className="faint" style={{ fontSize: 13, marginTop: 14 }}>
              Aggregated from {c.reviews} verified client reviews.
            </p>
          </div>

          {/* VITO score breakdown */}
          <div className="panel">
            <h3>How this VITO Score is calculated</h3>
            <div className="compare-wrap">
              <table className="formula-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Weight</th>
                    <th>This company</th>
                  </tr>
                </thead>
                <tbody>
                  {WEIGHTS.map((w) => (
                    <tr key={w.key}>
                      <td>{w.label}</td>
                      <td className="w">{Math.round(w.weight * 100)}%</td>
                      <td>{Math.round(parts[w.key])} / 100</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ fontWeight: 800 }}>Weighted VITO Score</td>
                    <td className="w">100%</td>
                    <td style={{ fontWeight: 800, color: 'var(--good)' }}>{c.score} / 100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="faint" style={{ fontSize: 13, marginTop: 12 }}>
              See the full <Link to="/methodology" style={{ color: 'var(--brand)' }}>methodology →</Link>
            </p>
          </div>

          {/* Reviews */}
          <div className="panel">
            <h3>Client reviews ({reviews.length})</h3>
            {reviews.length === 0 && <p className="muted">No reviews yet.</p>}
            {reviews.map((r, i) => (
              <div className="review" key={i}>
                <div className="review-head">
                  <div>
                    <div className="review-author">{r.author}</div>
                    <div className="review-role">{r.role}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <StarRating value={r.rating} />
                    <div className="faint" style={{ fontSize: 12 }}>
                      {r.date}
                    </div>
                  </div>
                </div>
                <h4>{r.title}</h4>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ASIDE */}
        <aside>
          <div className="panel aside-card">
            <a href={c.website} target="_blank" rel="noreferrer noopener" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
              Visit website <Icon name="externalLink" size={16} />
            </a>
            <Link to="/compare" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
              Add to comparison
            </Link>

            <h3 style={{ marginTop: 24 }}>Services</h3>
            <div className="chips">
              {c.services.map((s) => (
                <span className="chip brand" key={s}>
                  {s.replace(' / Dedicated Teams', '')}
                </span>
              ))}
            </div>

            <h3 style={{ marginTop: 22 }}>Tech stack</h3>
            <div className="chips">
              {c.techStack.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <h3 style={{ marginTop: 22 }}>Industries</h3>
            <div className="chips">
              {c.industries.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <h3 style={{ marginTop: 22 }}>Certifications</h3>
            <ul className="list-plain">
              {c.certifications.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <h3 style={{ marginTop: 22 }}>Awards &amp; recognition</h3>
            <ul className="list-plain award-list">
              {c.awards.map((t) => (
                <li key={t}>
                  <Icon name="award" size={16} style={{ color: 'var(--gold)' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">Compare options</div>
                <h2>Similar companies</h2>
              </div>
            </div>
            <div className="grid cols-3">
              {similar.map((s) => (
                <CompanyCard company={s} key={s.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

import { Link } from 'react-router-dom'
import Logo from './Logo'
import StarRating from './StarRating'
import Icon from './Icon'

function rankClass(rank) {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return ''
}

// Card used in grids (home page, featured).
export function CompanyCard({ company }) {
  const c = company
  return (
    <Link to={`/company/${c.slug}`} className="card co-card">
      {c.rank && <span className={`rank-badge ${rankClass(c.rank)}`}>#{c.rank}</span>}
      <div className="co-card-head">
        <Logo company={c} />
        <div style={{ minWidth: 0 }}>
          <div className="co-name">
            {c.name}
            {c.verified && (
              <span className="verified" title="Verified profile">
                <Icon name="badgeCheck" size={17} filled />
              </span>
            )}
          </div>
          <div className="co-loc icon-inline">
            <Icon name="mapPin" size={14} /> {c.hqCity} · Est. {c.founded}
          </div>
        </div>
      </div>

      <p className="co-tagline">{c.tagline}</p>

      <div className="rating-line">
        <StarRating value={c.rating} />
        <b>{c.rating.toFixed(1)}</b>
        <span className="faint">({c.reviews} reviews)</span>
      </div>

      <div className="chips">
        {c.services.slice(0, 3).map((s) => (
          <span className="chip brand" key={s}>
            {s.replace(' / Dedicated Teams', '')}
          </span>
        ))}
      </div>

      <div className="co-meta">
        <div>
          <div className="k">Team</div>
          <div className="v">{c.employeeRange}</div>
        </div>
        <div>
          <div className="k">Rate</div>
          <div className="v">{c.hourlyRate}</div>
        </div>
      </div>

      <div className="co-card-foot">
        <span className="score-pill">
          {c.score}
          <small>VITO</small>
        </span>
        <span className="btn btn-ghost btn-sm">
          View profile <Icon name="arrowRight" size={15} />
        </span>
      </div>
    </Link>
  )
}

// Row used in the directory list view.
export function CompanyRow({ company }) {
  const c = company
  return (
    <Link to={`/company/${c.slug}`} className="dir-row">
      <div className={`rank-num ${c.rank <= 3 ? 'top' : ''}`}>{c.rank}</div>

      <div className="dir-main">
        <div className="co-card-head">
          <Logo company={c} />
          <div style={{ minWidth: 0 }}>
            <div className="co-name">
              {c.name}
              {c.verified && (
                <span className="verified" title="Verified">
                  <Icon name="badgeCheck" size={17} filled />
                </span>
              )}
              {c.editorsChoice && (
                <span className="badge editor">
                  <Icon name="sparkles" size={12} /> Editor’s Choice
                </span>
              )}
            </div>
            <div className="co-loc icon-inline">
              <Icon name="mapPin" size={14} /> {c.hqCity} · {c.employeeRange} staff · Est. {c.founded}
            </div>
          </div>
        </div>
        <p className="co-tagline" style={{ minHeight: 0, margin: '12px 0 10px' }}>
          {c.tagline}
        </p>
        <div className="chips">
          {c.services.slice(0, 4).map((s) => (
            <span className="chip" key={s}>
              {s.replace(' / Dedicated Teams', '')}
            </span>
          ))}
        </div>
      </div>

      <div className="dir-right">
        <span className="score-pill">
          {c.score}
          <small>VITO</small>
        </span>
        <div className="rating-line">
          <StarRating value={c.rating} />
          <b>{c.rating.toFixed(1)}</b>
        </div>
        <span className="faint" style={{ fontSize: 13 }}>
          {c.reviews} reviews · {c.hourlyRate}
        </span>
        <span className="btn btn-primary btn-sm">
          View profile <Icon name="arrowRight" size={15} />
        </span>
      </div>
    </Link>
  )
}

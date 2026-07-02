import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { companies } from '../data/companies'
import { rankCompanies } from '../utils/scoring'
import { CompanyCard } from '../components/CompanyCard'
import Icon from '../components/Icon'

export default function Home() {
  const ranked = useMemo(() => rankCompanies(companies), [])
  const featured = ranked.slice(0, 6)
  const top5 = ranked.slice(0, 5)
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    navigate(`/directory${q ? `?q=${encodeURIComponent(q)}` : ''}`)
  }

  const totalReviews = companies.reduce((s, c) => s + c.reviews, 0)
  const avgRating = (companies.reduce((s, c) => s + c.rating, 0) / companies.length).toFixed(1)

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-badges">
              <span className="badge flag">
                <Icon name="star" size={12} filled style={{ color: 'var(--gold)' }} /> Vietnam · 2026
                Edition
              </span>
              <span className="badge flag">
                <Icon name="shieldCheck" size={12} /> Independent &amp; data-driven
              </span>
            </div>
            <h1>
              Find Vietnam’s best <span className="grad">IT outsourcing</span> partner
            </h1>
            <p className="lead">
              Compare {companies.length}+ leading software development companies in Vietnam by
              verified ratings, client reviews, rates and team size — ranked transparently with our
              VITO Score.
            </p>

            <form className="search hero-search" onSubmit={submit}>
              <span className="icon">
                <Icon name="search" size={19} />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by company, service or technology…"
                aria-label="Search companies"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>

            <div className="stat-row">
              <div className="stat">
                <div className="n">{companies.length}+</div>
                <div className="l">Vetted companies</div>
              </div>
              <div className="stat">
                <div className="n">{totalReviews.toLocaleString()}+</div>
                <div className="l">Verified reviews</div>
              </div>
              <div className="stat">
                <div className="n">{avgRating}★</div>
                <div className="l">Average rating</div>
              </div>
            </div>
          </div>

          {/* Leaderboard preview */}
          <div className="leaderboard-card">
            <h3 className="icon-inline">
              <Icon name="trophy" size={17} style={{ color: 'var(--gold)' }} /> Top-ranked this month
            </h3>
            <p className="faint" style={{ fontSize: 13, marginTop: 0, color: '#8fa0c0' }}>
              By VITO Score · updated Jul 2026
            </p>
            {top5.map((c) => (
              <Link
                to={`/company/${c.slug}`}
                className={`lb-row ${c.rank === 1 ? 'top' : ''}`}
                key={c.id}
              >
                <span className="lb-rank">
                  {c.rank === 1 ? <Icon name="star" size={15} filled /> : c.rank}
                </span>
                <span className="lb-name">{c.name}</span>
                <span className="lb-score">{c.score}</span>
              </Link>
            ))}
            <Link
              to="/directory"
              className="btn btn-light btn-sm"
              style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}
            >
              View full ranking <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="section" style={{ paddingBottom: 20 }}>
        <div className="container">
          <div className="grid cols-4">
            {[
              { ic: 'badgeCheck', t: 'Verified profiles', d: 'Every firm profile is checked against public records and client reviews.' },
              { ic: 'barChart', t: 'Transparent ranking', d: 'Our open VITO Score formula weights satisfaction, value and quality — not ad spend.' },
              { ic: 'compare', t: 'Compare side by side', d: 'Shortlist and compare up to four companies across every metric that matters.' },
              { ic: 'globe', t: 'Built for buyers', d: 'Filter by budget, team size, location and expertise to find the right fit fast.' },
            ].map((f) => (
              <div className="feature" key={f.t}>
                <div className="ic">
                  <Icon name={f.ic} size={22} />
                </div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Top ranked</div>
              <h2>Leading IT outsourcing companies in Vietnam</h2>
              <p>
                The highest-scoring software development partners this quarter, ranked by our
                data-driven VITO Score.
              </p>
            </div>
            <Link to="/directory" className="btn btn-ghost">
              Browse all {companies.length} companies <Icon name="arrowRight" size={16} />
            </Link>
          </div>

          <div className="grid cols-3">
            {featured.map((c) => (
              <CompanyCard company={c} key={c.id} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="cta-band">
            <h2>Not sure where to start?</h2>
            <p>
              Tell us your budget, timeline and tech stack — then compare shortlisted Vietnamese
              partners in minutes.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/directory" className="btn btn-light">
                Explore the directory
              </Link>
              <Link to="/compare" className="btn btn-light">
                Compare companies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

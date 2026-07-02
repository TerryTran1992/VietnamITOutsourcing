import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { companies } from '../data/companies'
import { rankCompanies } from '../utils/scoring'
import Logo from '../components/Logo'
import StarRating from '../components/StarRating'

const MAX = 4

export default function Compare() {
  const ranked = useMemo(() => rankCompanies(companies), [])
  const [selected, setSelected] = useState(() => ranked.slice(0, 3).map((c) => c.id))

  const toggle = (id) =>
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX) return prev
      return [...prev, id]
    })

  const chosen = ranked.filter((c) => selected.includes(c.id))

  const rows = [
    { label: 'VITO Score', render: (c) => <b style={{ color: 'var(--good)' }}>{c.score}</b> },
    { label: 'Overall rating', render: (c) => (
      <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <StarRating value={c.rating} /> {c.rating.toFixed(1)}
      </span>
    ) },
    { label: 'Reviews', render: (c) => c.reviews },
    { label: 'Founded', render: (c) => c.founded },
    { label: 'Team size', render: (c) => `${c.employeeRange}` },
    { label: 'Headquarters', render: (c) => c.hqCity },
    { label: 'Hourly rate', render: (c) => c.hourlyRate },
    { label: 'Min. project', render: (c) => c.minProject },
    { label: 'Quality', render: (c) => `${c.scores.quality.toFixed(1)} / 10` },
    { label: 'On-time delivery', render: (c) => `${c.scores.schedule.toFixed(1)} / 10` },
    { label: 'Value for cost', render: (c) => `${c.scores.cost.toFixed(1)} / 10` },
    { label: 'Communication', render: (c) => `${c.scores.communication.toFixed(1)} / 10` },
    { label: 'Client retention', render: (c) => `${c.clientRetention}%` },
    { label: 'Certifications', render: (c) => c.certifications.join(', ') },
    { label: 'Top services', render: (c) => c.services.slice(0, 3).map((s) => s.replace(' / Dedicated Teams', '')).join(', ') },
  ]

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <div className="eyebrow" style={{ color: '#6db6ff' }}>
            Compare
          </div>
          <h1>Compare IT outsourcing companies</h1>
          <p>
            Select up to {MAX} companies to compare side by side across ratings, rates, team size and
            delivery scores.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <h3 style={{ marginBottom: 14 }}>
            Choose companies{' '}
            <span className="faint" style={{ fontWeight: 400, fontSize: 15 }}>
              ({selected.length}/{MAX} selected)
            </span>
          </h3>
          <div className="select-grid" style={{ marginBottom: 36 }}>
            {ranked.map((c) => {
              const on = selected.includes(c.id)
              const disabled = !on && selected.length >= MAX
              return (
                <label
                  className={`select-card ${on ? 'on' : ''}`}
                  key={c.id}
                  style={{ opacity: disabled ? 0.45 : 1 }}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={disabled}
                    onChange={() => toggle(c.id)}
                  />
                  <Logo company={c} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                    <div className="faint" style={{ fontSize: 12.5 }}>
                      #{c.rank} · {c.score} VITO
                    </div>
                  </div>
                </label>
              )
            })}
          </div>

          {chosen.length === 0 ? (
            <div className="empty">Select at least one company to compare.</div>
          ) : (
            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: 160 }}>Metric</th>
                    {chosen.map((c) => (
                      <th key={c.id} style={{ minWidth: 180 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <Logo company={c} />
                          <Link to={`/company/${c.slug}`} style={{ color: 'var(--brand)' }}>
                            {c.name}
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <td className="rowlabel">{row.label}</td>
                      {chosen.map((c) => (
                        <td key={c.id}>{row.render(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

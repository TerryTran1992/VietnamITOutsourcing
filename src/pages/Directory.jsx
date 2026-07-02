import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { companies, SERVICES } from '../data/companies'
import { rankCompanies } from '../utils/scoring'
import { CompanyRow } from '../components/CompanyCard'
import Icon from '../components/Icon'

const CITIES = ['Ho Chi Minh City', 'Hanoi', 'Da Nang']
const SIZES = [
  { label: '100 – 249', test: (n) => n >= 100 && n < 250 },
  { label: '250 – 999', test: (n) => n >= 250 && n < 1000 },
  { label: '1,000 – 4,999', test: (n) => n >= 1000 && n < 5000 },
  { label: '10,000+', test: (n) => n >= 5000 },
]
const RATES = ['$25 – $49 / hr']

const SORTS = {
  score: { label: 'Top ranked (VITO Score)', fn: (a, b) => b.score - a.score },
  rating: { label: 'Highest rated', fn: (a, b) => b.rating - a.rating || b.reviews - a.reviews },
  reviews: { label: 'Most reviews', fn: (a, b) => b.reviews - a.reviews },
  size: { label: 'Largest team', fn: (a, b) => b.employees - a.employees },
  newest: { label: 'Newest', fn: (a, b) => b.founded - a.founded },
}

export default function Directory() {
  const rankedAll = useMemo(() => rankCompanies(companies), [])
  const [params, setParams] = useSearchParams()

  const [q, setQ] = useState(params.get('q') || '')
  const [sort, setSort] = useState(params.get('sort') || 'score')
  const [selServices, setSelServices] = useState(
    params.get('service') ? [params.get('service')] : [],
  )
  const [selCities, setSelCities] = useState(params.get('city') ? [params.get('city')] : [])
  const [selSizes, setSelSizes] = useState([])
  const [minRating, setMinRating] = useState(0)

  // keep the URL query param in sync with the search box + sort (shareable links)
  useEffect(() => {
    const next = {}
    if (q) next.q = q
    if (sort !== 'score') next.sort = sort
    if (selServices.length === 1) next.service = selServices[0]
    if (selCities.length === 1) next.city = selCities[0]
    setParams(next, { replace: true })
  }, [q, sort, selServices, selCities, setParams])

  const toggle = (setter, value) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

  const clearAll = () => {
    setQ('')
    setSelServices([])
    setSelCities([])
    setSelSizes([])
    setMinRating(0)
    setSort('score')
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return rankedAll
      .filter((c) => {
        if (query) {
          const hay = [
            c.name,
            c.tagline,
            c.hqCity,
            ...c.services,
            ...c.techStack,
            ...c.industries,
          ]
            .join(' ')
            .toLowerCase()
          if (!hay.includes(query)) return false
        }
        if (selServices.length && !selServices.some((s) => c.services.includes(s))) return false
        if (selCities.length && !selCities.some((city) => c.locations.includes(city))) return false
        if (selSizes.length) {
          const match = SIZES.filter((s) => selSizes.includes(s.label)).some((s) =>
            s.test(c.employees),
          )
          if (!match) return false
        }
        if (minRating && c.rating < minRating) return false
        return true
      })
      .sort(SORTS[sort].fn)
  }, [rankedAll, q, selServices, selCities, selSizes, minRating, sort])

  const activeFilterCount =
    selServices.length + selCities.length + selSizes.length + (minRating ? 1 : 0)

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <div className="eyebrow" style={{ color: '#6db6ff' }}>
            Directory · 2026
          </div>
          <h1>IT outsourcing companies in Vietnam</h1>
          <p>
            Browse and filter {companies.length} vetted software development partners. Ranked by the
            transparent VITO Score — refine by service, location, team size and rating.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container dir-layout">
          {/* FILTERS */}
          <aside className="filters">
            <div className="search" style={{ boxShadow: 'none', maxWidth: 'none', marginBottom: 8 }}>
              <span className="icon">
                <Icon name="search" size={17} />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                aria-label="Search"
                style={{ fontSize: 14 }}
              />
            </div>

            <h4>Service</h4>
            {SERVICES.map((s) => (
              <label className="filter-opt" key={s}>
                <input
                  type="checkbox"
                  checked={selServices.includes(s)}
                  onChange={() => toggle(setSelServices, s)}
                />
                {s.replace(' / Dedicated Teams', '')}
              </label>
            ))}

            <h4>Location</h4>
            {CITIES.map((c) => (
              <label className="filter-opt" key={c}>
                <input
                  type="checkbox"
                  checked={selCities.includes(c)}
                  onChange={() => toggle(setSelCities, c)}
                />
                {c}
              </label>
            ))}

            <h4>Team size</h4>
            {SIZES.map((s) => (
              <label className="filter-opt" key={s.label}>
                <input
                  type="checkbox"
                  checked={selSizes.includes(s.label)}
                  onChange={() => toggle(setSelSizes, s.label)}
                />
                {s.label} employees
              </label>
            ))}

            <h4>Minimum rating</h4>
            {[4.8, 4.5, 4.0].map((r) => (
              <label className="filter-opt" key={r}>
                <input
                  type="radio"
                  name="minRating"
                  checked={minRating === r}
                  onChange={() => setMinRating(r)}
                />
                {r.toFixed(1)} &amp; up
              </label>
            ))}
            <label className="filter-opt">
              <input
                type="radio"
                name="minRating"
                checked={minRating === 0}
                onChange={() => setMinRating(0)}
              />
              Any rating
            </label>

            {(activeFilterCount > 0 || q || sort !== 'score') && (
              <button className="filters-clear icon-inline" onClick={clearAll}>
                <Icon name="x" size={14} /> Clear all filters
              </button>
            )}
          </aside>

          {/* RESULTS */}
          <div>
            <div className="dir-toolbar">
              <span className="dir-count">
                {filtered.length} {filtered.length === 1 ? 'company' : 'companies'}
                {activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''}`}
              </span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <span className="faint">Sort by</span>
                <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(SORTS).map(([key, s]) => (
                    <option value={key} key={key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="empty">
                <h3>No companies match your filters</h3>
                <p>Try removing a filter or broadening your search.</p>
                <button className="btn btn-ghost" onClick={clearAll}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="dir-list">
                {filtered.map((c) => (
                  <CompanyRow company={c} key={c.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

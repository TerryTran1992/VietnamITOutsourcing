import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Icon from './Icon'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="flag">
            <Icon name="star" size={17} filled />
          </span>
          <span>
            Vietnam<b>IT</b>Outsourcing
          </span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>
            Home
          </NavLink>
          <NavLink to="/directory" onClick={close}>
            Directory
          </NavLink>
          <NavLink to="/compare" onClick={close}>
            Compare
          </NavLink>
          <NavLink to="/methodology" onClick={close}>
            Methodology
          </NavLink>
          <Link className="btn btn-primary btn-sm nav-cta" to="/directory" onClick={close}>
            Find a partner
          </Link>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} size={20} />
        </button>
      </div>
    </header>
  )
}

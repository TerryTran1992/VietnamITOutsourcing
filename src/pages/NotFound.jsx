import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container empty" style={{ padding: '110px 20px' }}>
      <div style={{ fontSize: 60 }}>🔍</div>
      <h1 style={{ fontSize: 34, marginTop: 10 }}>Page not found</h1>
      <p style={{ marginBottom: 20 }}>The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  )
}

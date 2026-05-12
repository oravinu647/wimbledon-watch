import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4"
      style={{ minHeight: '70vh', background: 'var(--cream)' }}>
      <p className="font-display font-bold mb-2"
        style={{ fontSize: '6rem', color: 'var(--light-gray)', lineHeight: 1 }}>
        404
      </p>
      <h1 className="font-display font-bold mb-3"
        style={{ fontSize: '1.75rem', color: 'var(--charcoal)', letterSpacing: '-0.02em' }}>
        Page not found
      </h1>
      <p className="font-serif mb-8"
        style={{ fontSize: '1.0625rem', color: 'var(--mid-gray)', fontStyle: 'italic', maxWidth: 380 }}>
        The page you're looking for may have been moved, deleted, or perhaps never existed.
        Like a ball landing on the line — it's a matter of perspective.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/"
          className="px-5 py-3 rounded font-sans font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--green)', fontSize: '0.875rem' }}>
          Back to home
        </Link>
        <Link to="/scores"
          className="px-5 py-3 rounded font-sans font-medium transition-colors"
          style={{ background: 'var(--white)', border: '1px solid var(--light-gray)', fontSize: '0.875rem', color: 'var(--charcoal)' }}>
          Live scores
        </Link>
      </div>
    </div>
  )
}

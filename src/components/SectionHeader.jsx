import { Link } from 'react-router-dom'

export default function SectionHeader({ label, title, linkTo, linkLabel = 'See all', dark = false }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        {label && (
          <p
            className="font-sans font-semibold uppercase mb-1"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: dark ? 'rgba(201,168,76,0.9)' : 'var(--green)',
            }}
          >
            {label}
          </p>
        )}
        <h2
          className="font-display font-bold"
          style={{
            fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: dark ? 'var(--white)' : 'var(--charcoal)',
          }}
        >
          {title}
        </h2>
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="shrink-0 flex items-center gap-1.5 font-sans font-medium transition-colors duration-150"
          style={{
            fontSize: '0.8125rem',
            color: dark ? 'var(--gold)' : 'var(--green)',
            paddingBottom: 2,
            borderBottom: `1px solid ${dark ? 'rgba(201,168,76,0.4)' : 'rgba(27,92,46,0.3)'}`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderBottomColor = dark ? 'var(--gold)' : 'var(--green)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderBottomColor = dark
              ? 'rgba(201,168,76,0.4)'
              : 'rgba(27,92,46,0.3)'
          }}
        >
          {linkLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      )}
    </div>
  )
}

import { Link } from 'react-router-dom'

const CategoryPill = ({ label, dark = false }) => (
  <span
    className="inline-block font-sans font-semibold uppercase"
    style={{
      fontSize: '0.65rem',
      letterSpacing: '0.1em',
      padding: '3px 8px',
      borderRadius: 3,
      background: dark ? 'rgba(201,168,76,0.18)' : 'rgba(27,92,46,0.10)',
      color: dark ? 'var(--gold)' : 'var(--green)',
    }}
  >
    {label}
  </span>
)

const ImagePlaceholder = ({ color, alt, aspectRatio = '16/9' }) => (
  <div
    style={{ aspectRatio, background: color, position: 'relative', width: '100%', overflow: 'hidden' }}
    aria-label={alt}
    role="img"
  >
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
      <defs>
        <pattern id={`grass-${color.replace('#', '')}`} x="0" y="0" width="20" height="20"
          patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="0.8" opacity="0.5"/>
          <line x1="10" y1="0" x2="10" y2="20" stroke="white" strokeWidth="0.4" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grass-${color.replace('#', '')})`}/>
    </svg>
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.3">
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="1.5"/>
        <path d="M5 10 Q16 16 5 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M27 10 Q16 16 27 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
  </div>
)

export const ArticleCardFeatured = ({ article }) => {
  const { slug, categoryLabel, title, subtitle, author, publishedAt, readTime, imagePlaceholderColor } = article
  const date = new Date(publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <Link
      to={`/news/${slug}`}
      className="group block rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--light-gray)',
        boxShadow: '0 1px 3px rgba(26,26,26,0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,26,26,0.12)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(26,26,26,0.05)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="grid md:grid-cols-5">
        <div className="md:col-span-3 overflow-hidden">
          <ImagePlaceholder color={imagePlaceholderColor} alt={title} aspectRatio="4/3" />
        </div>
        <div className="md:col-span-2 flex flex-col justify-between p-6 lg:p-8">
          <div>
            <CategoryPill label={categoryLabel} />
            <h2
              className="font-display font-bold mt-3 mb-3 transition-colors duration-200 group-hover:text-wimbledon-green"
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              {title}
            </h2>
            <p
              className="font-serif leading-relaxed"
              style={{
                fontSize: '1.0625rem',
                color: 'var(--mid-gray)',
                fontStyle: 'italic',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {subtitle}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-sans font-medium"
                style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                {author.name}
              </p>
              <p className="font-sans"
                style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
                {date} · {readTime} min read
              </p>
            </div>
            <span
              className="flex items-center justify-center rounded-full transition-all duration-200 group-hover:bg-wimbledon-green group-hover:text-white"
              style={{ width: 36, height: 36, border: '1px solid var(--light-gray)', color: 'var(--mid-gray)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ArticleCard({ article }) {
  const { slug, categoryLabel, title, subtitle, author, publishedAt, readTime, imagePlaceholderColor } = article
  const date = new Date(publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long',
  })

  return (
    <Link
      to={`/news/${slug}`}
      className="group flex flex-col rounded-lg overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--light-gray)',
        boxShadow: '0 1px 3px rgba(26,26,26,0.04)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(26,26,26,0.10)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(26,26,26,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="overflow-hidden">
        <ImagePlaceholder color={imagePlaceholderColor} alt={title} aspectRatio="16/9" />
      </div>
      <div className="flex flex-col flex-1 p-4 lg:p-5">
        <CategoryPill label={categoryLabel} />
        <h3
          className="font-display font-bold mt-2.5 mb-2 transition-colors duration-200 group-hover:text-wimbledon-green"
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: 'var(--charcoal)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </h3>
        <p
          className="font-sans flex-1"
          style={{
            fontSize: '0.875rem',
            color: 'var(--mid-gray)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {subtitle}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3"
          style={{ borderTop: '1px solid var(--light-gray)' }}>
          <span className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
            {author.name} · {date}
          </span>
          <span className="font-sans font-medium" style={{ fontSize: '0.75rem', color: 'var(--green)' }}>
            {readTime} min
          </span>
        </div>
      </div>
    </Link>
  )
}

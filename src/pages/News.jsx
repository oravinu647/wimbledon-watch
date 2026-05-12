import { useState } from 'react'
import { Link } from 'react-router-dom'
import articles from '../data/articles.json'
import SectionHeader from '../components/SectionHeader'

const CATEGORIES = [
  { id: 'all',          label: 'All'          },
  { id: 'match-report', label: 'Match Reports' },
  { id: 'analysis',     label: 'Analysis'      },
  { id: 'feature',      label: 'Features'      },
  { id: 'schedule',     label: 'Schedule'      },
]

const IMAGES = {
  'a001': 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
  'a002': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80',
  'a003': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80',
  'a004': 'https://images.unsplash.com/photo-1521925942786-5e8af8d4e5f5?w=800&q=80',
  'a005': 'https://images.unsplash.com/photo-1568659358410-6d3780bcb4ff?w=800&q=80',
  'a006': 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=800&q=80',
}

const CategoryPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full font-sans font-medium transition-all duration-200"
    style={{
      fontSize: '0.8125rem',
      letterSpacing: '0.01em',
      background: active ? 'var(--green)' : 'var(--white)',
      color: active ? 'var(--white)' : 'var(--mid-gray)',
      border: `1px solid ${active ? 'var(--green)' : 'var(--light-gray)'}`,
    }}
  >
    {label}
  </button>
)

const ArticleRow = ({ article }) => {
  const date = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const img = IMAGES[article.id] || IMAGES['a001']

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group flex gap-5 py-6 transition-all duration-200"
      style={{ borderBottom: '1px solid var(--light-gray)' }}
    >
      <div className="shrink-0 overflow-hidden rounded-lg"
        style={{ width: 140, height: 96 }}>
        <img src={img} alt={article.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="inline-block font-sans font-semibold uppercase mb-2"
            style={{
              fontSize: '0.6rem', letterSpacing: '0.1em', padding: '2px 7px',
              borderRadius: 3, background: 'rgba(27,92,46,0.08)', color: 'var(--green)',
            }}>
            {article.categoryLabel}
          </span>
          <h3 className="font-display font-bold leading-snug transition-colors duration-200 group-hover:text-wimbledon-green"
            style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em', color: 'var(--charcoal)' }}>
            {article.title}
          </h3>
          <p className="font-sans mt-1 line-clamp-2"
            style={{ fontSize: '0.875rem', color: 'var(--mid-gray)', lineHeight: 1.55 }}>
            {article.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
            {article.author.name}
          </span>
          <span style={{ color: 'var(--light-gray)' }}>·</span>
          <span className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
            {date}
          </span>
          <span style={{ color: 'var(--light-gray)' }}>·</span>
          <span className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--green)' }}>
            {article.readTime} min read
          </span>
        </div>
      </div>
    </Link>
  )
}

const FeaturedHero = ({ article }) => {
  const img = IMAGES[article.id] || IMAGES['a001']
  const date = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  return (
    <Link to={`/news/${article.slug}`}
      className="group block rounded-xl overflow-hidden mb-10 relative"
      style={{ height: 420 }}>
      <img src={img} alt={article.imageAlt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(15,30,15,0.92) 0%, rgba(15,30,15,0.4) 55%, transparent 100%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <span className="inline-block font-sans font-semibold uppercase mb-3"
          style={{
            fontSize: '0.6rem', letterSpacing: '0.12em', padding: '3px 8px',
            borderRadius: 3, background: 'var(--gold)', color: 'var(--charcoal)',
          }}>
          {article.categoryLabel}
        </span>
        <h2 className="font-display font-bold text-white mb-2 transition-opacity duration-200 group-hover:opacity-90"
          style={{ fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {article.title}
        </h2>
        <p className="font-serif text-white/70"
          style={{ fontSize: '1rem', fontStyle: 'italic' }}>
          {article.author.name} · {date}
        </p>
      </div>
    </Link>
  )
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'all' || a.category === activeCategory
    const matchQ   = query === '' ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.author.name.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const featured = articles.find(a => a.featured && a.id === 'a001')
  const rest = filtered.filter(a => a.id !== 'a001')

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: 'var(--green)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-site">
          <p className="font-sans font-semibold uppercase text-white/60 mb-2"
            style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}>
            Wimbledon 2025
          </p>
          <h1 className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            News & Analysis
          </h1>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2">
            {activeCategory === 'all' && query === '' && featured && (
              <FeaturedHero article={featured} />
            )}

            {/* Filters + search */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <CategoryPill key={c.id} label={c.label}
                    active={activeCategory === c.id}
                    onClick={() => setActiveCategory(c.id)} />
                ))}
              </div>
              <input
                type="search" placeholder="Search…" value={query}
                onChange={e => setQuery(e.target.value)}
                className="px-3 py-2 rounded-lg outline-none font-sans"
                style={{
                  fontSize: '0.875rem', width: 180,
                  background: 'var(--white)', border: '1px solid var(--light-gray)',
                  color: 'var(--charcoal)', fontFamily: "'DM Sans', sans-serif",
                }} />
            </div>

            {rest.length === 0 ? (
              <p className="font-sans py-12 text-center" style={{ color: 'var(--mid-gray)' }}>
                No articles found.
              </p>
            ) : (
              <div>{rest.map(a => <ArticleRow key={a.id} article={a} />)}</div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            {/* Latest */}
            <div className="rounded-xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h3 className="font-display font-bold mb-4"
                style={{ fontSize: '1.125rem', color: 'var(--charcoal)' }}>
                Latest Stories
              </h3>
              {articles.slice(0, 4).map((a, i) => (
                <Link key={a.id} to={`/news/${a.slug}`}
                  className="flex gap-3 py-3 group transition-opacity hover:opacity-75"
                  style={{ borderBottom: i < 3 ? '1px solid var(--light-gray)' : 'none' }}>
                  <span className="font-display font-bold shrink-0"
                    style={{ fontSize: '1.5rem', color: 'var(--light-gray)', lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-sans font-medium"
                    style={{ fontSize: '0.875rem', color: 'var(--charcoal)', lineHeight: 1.4 }}>
                    {a.title}
                  </p>
                </Link>
              ))}
            </div>

            {/* Players widget */}
            <div className="rounded-xl p-5"
              style={{ background: 'var(--green)', border: '1px solid var(--green-dark)' }}>
              <h3 className="font-display font-bold text-white mb-1"
                style={{ fontSize: '1.125rem' }}>
                Player Profiles
              </h3>
              <p className="font-sans text-white/60 mb-4" style={{ fontSize: '0.8125rem' }}>
                Stats, bios and records for every contender.
              </p>
              <Link to="/players"
                className="inline-flex items-center gap-2 px-4 py-2 rounded font-sans font-medium transition-opacity hover:opacity-90"
                style={{ background: 'var(--gold)', color: 'var(--charcoal)', fontSize: '0.8125rem' }}>
                View all players
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

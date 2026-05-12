import { useParams, Link, Navigate } from 'react-router-dom'
import articles from '../data/articles.json'

const IMAGES = {
  'a001': 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80',
  'a002': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80',
  'a003': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&q=80',
  'a004': 'https://images.unsplash.com/photo-1521925942786-5e8af8d4e5f5?w=1200&q=80',
  'a005': 'https://images.unsplash.com/photo-1568659358410-6d3780bcb4ff?w=1200&q=80',
  'a006': 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=1200&q=80',
}

const PULLQUOTES = {
  'a001': '"I knew it was going to be incredibly tough today. Daniil is one of the best players in the world on any surface."',
  'a002': '"Djokovic\'s ability to read a match and change it midway through a set is, quite simply, unmatched in the modern game."',
  'a003': '"Sinner moved through the gears so smoothly it was easy to miss just how ruthless he had been."',
}

export default function Article() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  if (!article) return <Navigate to="/news" replace />

  const related = articles.filter(a => a.id !== article.id).slice(0, 3)
  const date = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const img   = IMAGES[article.id] || IMAGES['a001']
  const quote = PULLQUOTES[article.id]
  const paragraphs = article.body.split('\n\n').filter(Boolean)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero image */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 50vh, 520px)' }}>
        <img src={img} alt={article.imageAlt} className="w-full h-full object-cover" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
        }} />
        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0">
          <div className="container-site">
            <nav className="flex items-center gap-2 font-sans"
              style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/news" className="hover:text-white transition-colors">News</Link>
              <span>/</span>
              <span className="text-white/50 truncate max-w-xs">{article.title}</span>
            </nav>
          </div>
        </div>
        {/* Category on image */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container-site">
            <span className="inline-block font-sans font-semibold uppercase"
              style={{
                fontSize: '0.65rem', letterSpacing: '0.1em', padding: '3px 9px',
                borderRadius: 3, background: 'var(--gold)', color: 'var(--charcoal)',
              }}>
              {article.categoryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="container-site py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Body */}
          <article className="lg:col-span-2">
            <h1 className="font-display font-bold mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--charcoal)',
              }}>
              {article.title}
            </h1>
            <p className="font-serif mb-6"
              style={{ fontSize: '1.1875rem', color: 'var(--mid-gray)', fontStyle: 'italic', lineHeight: 1.5 }}>
              {article.subtitle}
            </p>

            {/* Byline */}
            <div className="flex items-center gap-4 py-4 mb-8"
              style={{ borderTop: '2px solid var(--green)', borderBottom: '1px solid var(--light-gray)' }}>
              <div className="flex items-center justify-center rounded-full font-display font-bold text-white shrink-0"
                style={{ width: 40, height: 40, background: 'var(--green)', fontSize: '0.875rem' }}>
                {article.author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-sans font-semibold" style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                  {article.author.name}
                </p>
                <p className="font-sans" style={{ fontSize: '0.775rem', color: 'var(--mid-gray)' }}>
                  {article.author.role} · {date} · {article.readTime} min read
                </p>
              </div>
            </div>

            {/* Body paragraphs with pullquote injection */}
            <div className="prose-article">
              {paragraphs.map((para, i) => (
                <div key={i}>
                  <p className="font-serif mb-5"
                    style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--charcoal)' }}>
                    {para}
                  </p>
                  {quote && i === 1 && (
                    <blockquote className="my-8 px-6 py-2"
                      style={{ borderLeft: '3px solid var(--gold)' }}>
                      <p className="font-serif font-bold"
                        style={{
                          fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                          lineHeight: 1.45, color: 'var(--green)',
                          fontStyle: 'italic',
                        }}>
                        {quote}
                      </p>
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6"
              style={{ borderTop: '1px solid var(--light-gray)' }}>
              {article.tags.map(tag => (
                <span key={tag} className="font-sans px-3 py-1 rounded-full"
                  style={{
                    fontSize: '0.75rem', letterSpacing: '0.03em',
                    background: 'var(--cream-dark)', color: 'var(--mid-gray)',
                    border: '1px solid var(--light-gray)',
                  }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share row */}
            <div className="flex items-center gap-3 mt-6">
              <span className="font-sans font-medium" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)' }}>
                Share:
              </span>
              {['X', 'Facebook', 'Copy link'].map(s => (
                <button key={s}
                  className="px-3 py-1.5 rounded font-sans font-medium transition-colors duration-150"
                  style={{
                    fontSize: '0.75rem',
                    background: 'var(--white)', border: '1px solid var(--light-gray)',
                    color: 'var(--charcoal)',
                  }}
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                  {s}
                </button>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Related */}
            <div className="rounded-xl p-5 sticky top-28"
              style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h3 className="font-display font-bold mb-4"
                style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}>
                Related Stories
              </h3>
              {related.map((a, i) => (
                <Link key={a.id} to={`/news/${a.slug}`}
                  className="flex gap-3 py-3 group transition-opacity hover:opacity-75"
                  style={{ borderBottom: i < related.length - 1 ? '1px solid var(--light-gray)' : 'none' }}>
                  <div className="shrink-0 rounded overflow-hidden" style={{ width: 60, height: 44 }}>
                    <img src={IMAGES[a.id]} alt={a.imageAlt}
                      className="w-full h-full object-cover" />
                  </div>
                  <p className="font-sans font-medium leading-snug"
                    style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                    {a.title}
                  </p>
                </Link>
              ))}
              <Link to="/news"
                className="block mt-4 text-center font-sans font-medium transition-colors hover:text-wimbledon-green"
                style={{ fontSize: '0.8125rem', color: 'var(--green)' }}>
                All articles →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* More stories */}
      <div className="py-12" style={{ background: 'var(--cream-dark)', borderTop: '1px solid var(--light-gray)' }}>
        <div className="container-site">
          <h2 className="font-display font-bold mb-8"
            style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}>
            More Stories
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map(a => (
              <Link key={a.id} to={`/news/${a.slug}`}
                className="group block rounded-lg overflow-hidden transition-all duration-300"
                style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="overflow-hidden" style={{ height: 160 }}>
                  <img src={IMAGES[a.id]} alt={a.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <span className="font-sans font-semibold uppercase"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--green)' }}>
                    {a.categoryLabel}
                  </span>
                  <h3 className="font-display font-bold mt-1 transition-colors group-hover:text-wimbledon-green"
                    style={{ fontSize: '1rem', lineHeight: 1.25, color: 'var(--charcoal)' }}>
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

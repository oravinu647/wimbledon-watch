import { Link } from 'react-router-dom'
import matches  from '../data/matches.json'
import articles from '../data/articles.json'
import players  from '../data/players.json'
import MatchCard from '../components/MatchCard'
import ArticleCard, { ArticleCardFeatured } from '../components/ArticleCard'
import SectionHeader from '../components/SectionHeader'

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const Hero = () => (
  <section
    className="relative overflow-hidden"
    style={{ background: 'var(--green)', minHeight: 'clamp(480px, 60vh, 680px)' }}
  >
    {/* Grass stripe texture */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `repeating-linear-gradient(
        90deg,
        rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 40px,
        transparent 40px, transparent 80px
      )`,
    }} />
    {/* Bottom fade */}
    <div aria-hidden="true" style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
      background: 'linear-gradient(to bottom, transparent, rgba(15,50,25,0.5))',
      pointerEvents: 'none',
    }} />

    <div className="container-site relative flex flex-col justify-center py-16 md:py-24"
      style={{ minHeight: 'inherit' }}>
      <div className="max-w-3xl">

        {/* Live badge */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded"
            style={{ background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.35)' }}>
            <span className="live-dot" />
            <span className="font-sans font-semibold uppercase text-white"
              style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
              Live · Wimbledon 2025
            </span>
          </div>
          <span className="font-sans text-white/50" style={{ fontSize: '0.8rem' }}>
            Quarter-Finals, Day 9
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-white mb-5"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
          Alcaraz Survives<br />
          <span style={{ color: 'var(--gold)' }}>Five-Set Thriller</span><br />
          to Reach Semi-Finals
        </h1>

        {/* Subheadline */}
        <p className="font-serif text-white/75 mb-8"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontStyle: 'italic', maxWidth: '38rem', lineHeight: 1.55 }}>
          The Spaniard recovered from a set down in a pulsating Centre Court encounter
          lasting three hours and forty-two minutes
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/news/alcaraz-medvedev-five-set-thriller"
            className="inline-flex items-center gap-2 px-5 py-3 rounded font-sans font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: 'var(--gold)', color: 'var(--charcoal)', fontSize: '0.875rem' }}>
            Read full report
            <ArrowRight size={14} />
          </Link>
          <Link to="/scores"
            className="inline-flex items-center gap-2 px-5 py-3 rounded font-sans font-medium text-white transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', fontSize: '0.875rem' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}>
            <span className="live-dot" />
            Live scores
          </Link>
        </div>
      </div>

      {/* Stage progress */}
      <div className="absolute bottom-6 right-0 hidden md:flex items-center gap-3 pr-12">
        {[['QF', true], ['SF', false], ['F', false]].map(([stage, active], i) => (
          <div key={stage} className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full font-sans font-semibold"
              style={{
                width: 40, height: 40,
                background: active ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
                border: active ? 'none' : '1px solid rgba(255,255,255,0.18)',
                fontSize: '0.7rem', letterSpacing: '0.02em',
                color: active ? 'var(--charcoal)' : 'rgba(255,255,255,0.4)',
              }}>
              {stage}
            </div>
            {i < 2 && <div style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.15)' }} />}
          </div>
        ))}
      </div>
    </div>
  </section>
)

const ScoresTicker = () => {
  const liveMatches = matches.filter(m => m.status === 'live')
  if (!liveMatches.length) return null
  return (
    <div style={{ background: 'var(--charcoal)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="container-site py-2.5 flex items-center gap-5 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}>
        <span className="flex items-center gap-1.5 font-sans font-semibold uppercase shrink-0 text-white"
          style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
          <span className="live-dot" />
          Live
        </span>
        {liveMatches.map(m => (
          <Link key={m.id} to={`/scores#${m.id}`}
            className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-70">
            <span className="font-sans text-white/50" style={{ fontSize: '0.72rem' }}>{m.court}</span>
            <span className="font-sans font-semibold text-white" style={{ fontSize: '0.8125rem' }}>
              {m.players.home.name.split(' ').pop()}
            </span>
            <span className="font-sans font-bold text-white tabular-nums" style={{ fontSize: '0.8rem' }}>
              {m.score.sets.map(s => s.home).join(' ')}
            </span>
            <span className="font-sans text-white/30" style={{ fontSize: '0.72rem' }}>—</span>
            <span className="font-sans font-bold text-white tabular-nums" style={{ fontSize: '0.8rem' }}>
              {m.score.sets.map(s => s.away).join(' ')}
            </span>
            <span className="font-sans font-semibold text-white" style={{ fontSize: '0.8125rem' }}>
              {m.players.away.name.split(' ').pop()}
            </span>
          </Link>
        ))}
        <Link to="/scores" className="ml-auto shrink-0 font-sans font-medium"
          style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>
          All scores →
        </Link>
      </div>
    </div>
  )
}

const TodaysMatches = () => (
  <section className="py-12 md:py-16" style={{ background: 'var(--cream)' }}>
    <div className="container-site">
      <SectionHeader
        label="Quarter-Finals · Day 9"
        title="Today's Matches"
        linkTo="/scores"
        linkLabel="Full scores"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {matches.slice(0, 4).map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  </section>
)

const FeaturedStory = () => {
  const article = articles.find(a => a.id === 'a002')
  if (!article) return null
  return (
    <section className="py-12 md:py-16" style={{ background: 'var(--cream-dark)' }}>
      <div className="container-site">
        <SectionHeader label="Analysis" title="Editor's Pick" />
        <ArticleCardFeatured article={article} />
      </div>
    </section>
  )
}

const LatestNews = () => {
  const grid = articles.filter(a => !['a001', 'a002'].includes(a.id)).slice(0, 4)
  return (
    <section className="py-12 md:py-16" style={{ background: 'var(--cream)' }}>
      <div className="container-site">
        <SectionHeader label="Latest" title="News & Analysis" linkTo="/news" linkLabel="All articles" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {grid.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

const PlayersSpotlight = () => (
  <section className="py-12 md:py-16" style={{ background: 'var(--charcoal)' }}>
    <div className="container-site">
      <SectionHeader
        label="Championships"
        title="Players to Watch"
        linkTo="/players"
        linkLabel="All profiles"
        dark
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {players.slice(0, 4).map(player => (
          <Link key={player.id} to={`/players/${player.id}`}
            className="group flex flex-col gap-3 p-4 rounded-lg transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}>
            <div className="flex items-center justify-center rounded-full font-display font-bold text-white"
              style={{ width: 52, height: 52, background: player.imagePlaceholderColor, fontSize: '1.125rem' }}>
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span style={{ fontSize: '1rem' }}>{player.flag}</span>
                <span className="font-sans font-semibold text-white transition-colors duration-150 group-hover:text-wimbledon-gold"
                  style={{ fontSize: '0.9375rem' }}>
                  {player.name}
                </span>
              </div>
              <p className="font-sans" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                {player.atp_rank ? `ATP #${player.atp_rank}` : `WTA #${player.wta_rank}`}
                {' · '}Seed {player.wimbledonSeed}
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="font-sans" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                {player.stats.winLoss} this season
              </span>
              <span className="font-sans font-medium transition-colors duration-150 group-hover:text-wimbledon-gold"
                style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                Profile →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

const Newsletter = () => (
  <section className="py-14 md:py-20 text-center"
    style={{ background: 'var(--cream-dark)', borderTop: '1px solid var(--light-gray)' }}>
    <div className="container-site" style={{ maxWidth: 560 }}>
      <div className="inline-flex items-center justify-center mb-5 rounded-full"
        style={{ width: 56, height: 56, background: 'rgba(27,92,46,0.10)', border: '1px solid rgba(27,92,46,0.15)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h2 className="font-display font-bold mb-3"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em', color: 'var(--charcoal)' }}>
        Never miss a result
      </h2>
      <p className="font-serif mb-6"
        style={{ fontSize: '1.0625rem', color: 'var(--mid-gray)', fontStyle: 'italic' }}>
        Match results, order of play, and morning analysis — delivered every day of The Championships.
      </p>
      <form className="flex gap-2 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Your email address" required
          className="flex-1 px-4 py-3 rounded outline-none font-sans"
          style={{
            background: 'var(--white)', border: '1px solid var(--light-gray)',
            color: 'var(--charcoal)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
          }} />
        <button type="submit"
          className="shrink-0 px-5 py-3 rounded font-sans font-medium transition-opacity hover:opacity-90"
          style={{ background: 'var(--green)', color: 'var(--white)', fontSize: '0.875rem' }}>
          Subscribe
        </button>
      </form>
      <p className="font-sans mt-3" style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
        Free. No spam. Unsubscribe any time.
      </p>
    </div>
  </section>
)

export default function Home() {
  return (
    <>
      <Hero />
      <ScoresTicker />
      <TodaysMatches />
      <FeaturedStory />
      <LatestNews />
      <PlayersSpotlight />
      <Newsletter />
    </>
  )
}

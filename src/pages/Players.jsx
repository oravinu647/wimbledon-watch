import { useState } from 'react'
import { Link } from 'react-router-dom'
import players from '../data/players.json'

const PLAYER_IMAGES = {
  'p001': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&q=80',
  'p002': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&q=80',
  'p003': 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80',
  'p004': 'https://images.unsplash.com/photo-1521925942786-5e8af8d4e5f5?w=400&q=80',
  'p005': 'https://images.unsplash.com/photo-1568659358410-6d3780bcb4ff?w=400&q=80',
}

const TOURS = ['All', 'ATP', 'WTA']

const PlayerCard = ({ player }) => {
  const tour = player.atp_rank ? 'ATP' : 'WTA'
  const rank = player.atp_rank || player.wta_rank
  const img  = PLAYER_IMAGES[player.id] || PLAYER_IMAGES['p001']

  return (
    <Link to={`/players/${player.id}`}
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300"
      style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,26,26,0.12)'
        e.currentTarget.style.borderColor = 'var(--green)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--light-gray)'
      }}>
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <img src={img} alt={`${player.name} tennis`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(15,40,20,0.85) 0%, transparent 55%)',
        }} />
        {/* Seed badge */}
        <div className="absolute top-3 right-3 font-sans font-bold text-white rounded px-2 py-0.5"
          style={{ fontSize: '0.7rem', background: 'var(--green)', letterSpacing: '0.04em' }}>
          Seed {player.wimbledonSeed}
        </div>
        {/* Name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.25rem' }}>{player.flag}</span>
            <h3 className="font-display font-bold text-white"
              style={{ fontSize: '1.125rem', letterSpacing: '-0.01em' }}>
              {player.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: tour === 'ATP' ? 'ATP' : 'WTA', value: `#${rank}` },
            { label: 'W/L',    value: player.stats.winLoss },
            { label: 'Titles', value: player.titles        },
          ].map(({ label, value }) => (
            <div key={label} className="text-center py-2 rounded-lg"
              style={{ background: 'var(--cream)' }}>
              <p className="font-display font-bold" style={{ fontSize: '1rem', color: 'var(--green)' }}>
                {value}
              </p>
              <p className="font-sans uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--mid-gray)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="font-sans line-clamp-2" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)', lineHeight: 1.55 }}>
          {player.bio}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
            {player.nationality} · Age {player.age}
          </span>
          <span className="font-sans font-medium transition-colors group-hover:text-wimbledon-green"
            style={{ fontSize: '0.8125rem', color: 'var(--green)' }}>
            Full profile →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Players() {
  const [tour, setTour] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = players.filter(p => {
    const matchTour = tour === 'All' ||
      (tour === 'ATP' && p.atp_rank) ||
      (tour === 'WTA' && p.wta_rank)
    const matchQ = query === '' || p.name.toLowerCase().includes(query.toLowerCase())
    return matchTour && matchQ
  })

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--green)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-site">
          <p className="font-sans font-semibold uppercase text-white/60 mb-2"
            style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}>
            Wimbledon 2025
          </p>
          <h1 className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            Player Profiles
          </h1>
          <p className="font-serif text-white/70 mt-2"
            style={{ fontSize: '1.0625rem', fontStyle: 'italic' }}>
            The contenders for this year's Championships
          </p>
        </div>
      </div>

      <div className="container-site py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            {TOURS.map(t => (
              <button key={t} onClick={() => setTour(t)}
                className="px-5 py-2 rounded-full font-sans font-medium transition-all duration-200"
                style={{
                  fontSize: '0.8125rem',
                  background: tour === t ? 'var(--green)' : 'var(--white)',
                  color: tour === t ? 'var(--white)' : 'var(--mid-gray)',
                  border: `1px solid ${tour === t ? 'var(--green)' : 'var(--light-gray)'}`,
                }}>
                {t}
              </button>
            ))}
          </div>
          <input type="search" placeholder="Search player…" value={query}
            onChange={e => setQuery(e.target.value)}
            className="px-3 py-2 rounded-lg outline-none font-sans"
            style={{
              fontSize: '0.875rem', width: 180,
              background: 'var(--white)', border: '1px solid var(--light-gray)',
              color: 'var(--charcoal)', fontFamily: "'DM Sans', sans-serif",
            }} />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center py-16 font-sans" style={{ color: 'var(--mid-gray)' }}>
            No players found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(p => <PlayerCard key={p.id} player={p} />)}
          </div>
        )}

        {/* Rankings CTA */}
        <div className="mt-12 text-center">
          <p className="font-sans mb-3" style={{ fontSize: '0.9rem', color: 'var(--mid-gray)' }}>
            Viewing featured profiles only
          </p>
          <Link to="/rankings"
            className="inline-flex items-center gap-2 px-5 py-3 rounded font-sans font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--green)', color: 'var(--white)', fontSize: '0.875rem' }}>
            See full world rankings
          </Link>
        </div>
      </div>
    </div>
  )
}

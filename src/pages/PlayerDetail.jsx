import { useParams, Link, Navigate } from 'react-router-dom'
import players from '../data/players.json'

const PLAYER_IMAGES = {
  'p001': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&q=80',
  'p002': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80',
  'p003': 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80',
  'p004': 'https://images.unsplash.com/photo-1521925942786-5e8af8d4e5f5?w=1200&q=80',
  'p005': 'https://images.unsplash.com/photo-1568659358410-6d3780bcb4ff?w=1200&q=80',
}

const StatBar = ({ label, value, max = 100, unit = '%' }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <span className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)' }}>{label}</span>
      <span className="font-sans font-semibold" style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
        {value}{unit}
      </span>
    </div>
    <div className="rounded-full overflow-hidden" style={{ height: 5, background: 'var(--light-gray)' }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${(value / max) * 100}%`, background: 'var(--green)' }} />
    </div>
  </div>
)

export default function PlayerDetail() {
  const { id } = useParams()
  const player  = players.find(p => p.id === id)

  if (!player) return <Navigate to="/players" replace />

  const img  = PLAYER_IMAGES[player.id] || PLAYER_IMAGES['p001']
  const tour = player.atp_rank ? 'ATP' : 'WTA'
  const rank = player.atp_rank || player.wta_rank
  const others = players.filter(p => p.id !== player.id).slice(0, 3)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(340px, 50vh, 520px)' }}>
        <img src={img} alt={`${player.name} at Wimbledon`}
          className="w-full h-full object-cover object-top" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(15,40,20,0.92) 0%, rgba(15,40,20,0.5) 55%, transparent 100%)',
        }} />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0">
          <div className="container-site">
            <nav className="flex items-center gap-2 font-sans"
              style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/players" className="hover:text-white transition-colors">Players</Link>
              <span>/</span>
              <span className="text-white/40">{player.name}</span>
            </nav>
          </div>
        </div>

        {/* Player intro */}
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container-site">
            <div className="flex items-end gap-5">
              {/* Seed badge */}
              <div className="hidden sm:flex flex-col items-center justify-center rounded-xl shrink-0"
                style={{
                  width: 70, height: 70,
                  background: 'var(--gold)', color: 'var(--charcoal)',
                }}>
                <span className="font-sans font-semibold uppercase"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}>Seed</span>
                <span className="font-display font-bold" style={{ fontSize: '2rem', lineHeight: 1 }}>
                  {player.wimbledonSeed}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span style={{ fontSize: '2rem' }}>{player.flag}</span>
                  <span className="font-sans font-medium text-white/70"
                    style={{ fontSize: '0.875rem' }}>
                    {player.nationality} · {tour} #{rank}
                  </span>
                </div>
                <h1 className="font-display font-bold text-white"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                  {player.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-site py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left: Bio + Stats */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Quick stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Grand Slams', value: player.grandSlams },
                { label: 'Career titles', value: player.titles },
                { label: 'Win rate',  value: `${player.stats.winPercentage}%` },
                { label: 'Season W/L', value: player.stats.winLoss },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl p-4 text-center"
                  style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
                  <p className="font-display font-bold"
                    style={{ fontSize: '1.75rem', color: 'var(--green)', letterSpacing: '-0.02em' }}>
                    {value}
                  </p>
                  <p className="font-sans uppercase"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--mid-gray)', marginTop: 2 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="rounded-xl p-6"
              style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                About {player.name.split(' ')[0]}
              </h2>
              <p className="font-serif leading-relaxed"
                style={{ fontSize: '1.125rem', color: 'var(--charcoal)', lineHeight: 1.8 }}>
                {player.bio}
              </p>
            </div>

            {/* Performance stats */}
            <div className="rounded-xl p-6"
              style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h2 className="font-display font-bold mb-6"
                style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                2025 Season Statistics
              </h2>
              <div className="flex flex-col gap-5">
                <StatBar label="First serve percentage"    value={player.stats.firstServePercentage} />
                <StatBar label="Break points converted"    value={player.stats.breakPointsConverted} />
                <StatBar label="Win percentage"            value={player.stats.winPercentage} />
                <StatBar label="Aces per match"            value={player.stats.acesPerMatch} max={15} unit="" />
              </div>
            </div>
          </div>

          {/* Right: Player info card */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden sticky top-28"
              style={{ border: '1px solid var(--light-gray)' }}>
              <div className="p-4"
                style={{ background: 'var(--green)', borderBottom: '1px solid var(--green-dark)' }}>
                <h3 className="font-display font-bold text-white" style={{ fontSize: '1rem' }}>
                  Player Info
                </h3>
              </div>
              <div style={{ background: 'var(--white)' }}>
                {[
                  ['Nationality',  player.nationality],
                  ['Age',          player.age],
                  ['Height',       player.height],
                  ['Plays',        player.plays],
                  ['Turned pro',   player.turnedPro],
                  [tour + ' rank', `#${rank}`],
                  ['Wimbledon seed', player.wimbledonSeed],
                  ['Career titles', player.titles],
                  ['Grand Slams',  player.grandSlams],
                  ['Career prize', player.careerEarnings],
                ].map(([label, value], i, arr) => (
                  <div key={label}
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--light-gray)' : 'none' }}>
                    <span className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)' }}>
                      {label}
                    </span>
                    <span className="font-sans font-semibold" style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Other players */}
        <div className="mt-12">
          <h2 className="font-display font-bold mb-6" style={{ fontSize: '1.375rem', color: 'var(--charcoal)' }}>
            Other Contenders
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map(p => (
              <Link key={p.id} to={`/players/${p.id}`}
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--green)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--light-gray)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                <div className="rounded-full overflow-hidden shrink-0" style={{ width: 52, height: 52 }}>
                  <img src={PLAYER_IMAGES[p.id]} alt={p.name}
                    className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-sans font-semibold transition-colors group-hover:text-wimbledon-green"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                    {p.flag} {p.name}
                  </p>
                  <p className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
                    {p.atp_rank ? `ATP #${p.atp_rank}` : `WTA #${p.wta_rank}`} · Seed {p.wimbledonSeed}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

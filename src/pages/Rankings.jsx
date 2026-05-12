import { useState } from 'react'
import { Link } from 'react-router-dom'
import players from '../data/players.json'

const ATP_RANKINGS = [
  { rank: 1,  prev: 1,  name: 'Jannik Sinner',      country: '🇮🇹', age: 23, points: 11330, playerId: 'p001' },
  { rank: 2,  prev: 2,  name: 'Novak Djokovic',     country: '🇷🇸', age: 38, points: 8570,  playerId: 'p002' },
  { rank: 3,  prev: 3,  name: 'Carlos Alcaraz',     country: '🇪🇸', age: 22, points: 8270,  playerId: 'p003' },
  { rank: 4,  prev: 5,  name: 'Alexander Zverev',   country: '🇩🇪', age: 27, points: 6885,  playerId: null   },
  { rank: 5,  prev: 4,  name: 'Daniil Medvedev',    country: '🇷🇺', age: 28, points: 6055,  playerId: null   },
  { rank: 6,  prev: 6,  name: 'Casper Ruud',        country: '🇳🇴', age: 25, points: 4805,  playerId: null   },
  { rank: 7,  prev: 9,  name: 'Holger Rune',        country: '🇩🇰', age: 21, points: 4270,  playerId: null   },
  { rank: 8,  prev: 7,  name: 'Andrey Rublev',      country: '🇷🇺', age: 26, points: 4085,  playerId: null   },
  { rank: 9,  prev: 10, name: 'Grigor Dimitrov',    country: '🇧🇬', age: 33, points: 3900,  playerId: null   },
  { rank: 10, prev: 8,  name: 'Hubert Hurkacz',     country: '🇵🇱', age: 27, points: 3785,  playerId: null   },
  { rank: 11, prev: 11, name: 'Taylor Fritz',       country: '🇺🇸', age: 27, points: 3650,  playerId: null   },
  { rank: 12, prev: 13, name: 'Tommy Paul',         country: '🇺🇸', age: 27, points: 3420,  playerId: null   },
  { rank: 13, prev: 12, name: 'Alex de Minaur',     country: '🇦🇺', age: 25, points: 3380,  playerId: null   },
  { rank: 14, prev: 15, name: 'Ben Shelton',        country: '🇺🇸', age: 22, points: 2890,  playerId: null   },
  { rank: 15, prev: 14, name: 'Stefanos Tsitsipas', country: '🇬🇷', age: 26, points: 2765,  playerId: null   },
]

const WTA_RANKINGS = [
  { rank: 1,  prev: 1,  name: 'Aryna Sabalenka',   country: '🇧🇾', age: 27, points: 10895, playerId: 'p004' },
  { rank: 2,  prev: 2,  name: 'Iga Swiatek',        country: '🇵🇱', age: 23, points: 9595,  playerId: null   },
  { rank: 3,  prev: 3,  name: 'Coco Gauff',         country: '🇺🇸', age: 21, points: 6880,  playerId: null   },
  { rank: 4,  prev: 4,  name: 'Elena Rybakina',     country: '🇰🇿', age: 25, points: 6175,  playerId: 'p005' },
  { rank: 5,  prev: 6,  name: 'Jessica Pegula',     country: '🇺🇸', age: 30, points: 5285,  playerId: null   },
  { rank: 6,  prev: 5,  name: 'Jasmine Paolini',    country: '🇮🇹', age: 28, points: 5240,  playerId: null   },
  { rank: 7,  prev: 8,  name: 'Mirra Andreeva',     country: '🇷🇺', age: 17, points: 3810,  playerId: null   },
  { rank: 8,  prev: 7,  name: 'Qinwen Zheng',       country: '🇨🇳', age: 22, points: 3680,  playerId: null   },
  { rank: 9,  prev: 9,  name: 'Emma Navarro',       country: '🇺🇸', age: 23, points: 3340,  playerId: null   },
  { rank: 10, prev: 11, name: 'Daria Kasatkina',    country: '🇷🇺', age: 27, points: 3185,  playerId: null   },
  { rank: 11, prev: 10, name: 'Madison Keys',       country: '🇺🇸', age: 30, points: 3020,  playerId: null   },
  { rank: 12, prev: 12, name: 'Maria Sakkari',      country: '🇬🇷', age: 29, points: 2870,  playerId: null   },
  { rank: 13, prev: 14, name: 'Anna Kalinskaya',    country: '🇷🇺', age: 25, points: 2640,  playerId: null   },
  { rank: 14, prev: 13, name: 'Barbora Krejcikova', country: '🇨🇿', age: 29, points: 2560,  playerId: null   },
  { rank: 15, prev: 15, name: 'Liudmila Samsonova', country: '🇷🇺', age: 25, points: 2390,  playerId: null   },
]

const MovementIcon = ({ rank, prev }) => {
  const diff = prev - rank
  if (diff > 0) return (
    <span className="flex items-center gap-0.5 font-sans font-semibold"
      style={{ fontSize: '0.7rem', color: '#16A34A' }}>
      ▲{diff}
    </span>
  )
  if (diff < 0) return (
    <span className="flex items-center gap-0.5 font-sans font-semibold"
      style={{ fontSize: '0.7rem', color: '#DC2626' }}>
      ▼{Math.abs(diff)}
    </span>
  )
  return <span className="font-sans" style={{ fontSize: '0.7rem', color: 'var(--mid-gray)' }}>—</span>
}

const RankingsTable = ({ data, tour }) => (
  <div className="rounded-xl overflow-hidden"
    style={{ border: '1px solid var(--light-gray)', background: 'var(--white)' }}>
    <div className="px-5 py-4 flex items-center justify-between"
      style={{ background: 'var(--green)', borderBottom: '1px solid var(--green-dark)' }}>
      <h2 className="font-display font-bold text-white" style={{ fontSize: '1.125rem' }}>
        {tour} Rankings
      </h2>
      <span className="font-sans text-white/60" style={{ fontSize: '0.75rem' }}>
        Updated · Week 27, 2025
      </span>
    </div>

    {/* Table header */}
    <div className="grid px-4 py-2"
      style={{
        gridTemplateColumns: '48px 32px 1fr 60px 100px 80px',
        borderBottom: '1px solid var(--light-gray)',
        background: 'var(--cream)',
      }}>
      {['Rank', '±', 'Player', 'Age', 'Points', ''].map((h, i) => (
        <span key={i} className="font-sans font-semibold uppercase"
          style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--mid-gray)' }}>
          {h}
        </span>
      ))}
    </div>

    {data.map((row, i) => {
      const isTop3 = row.rank <= 3
      const RowEl  = row.playerId ? Link : 'div'
      const rowProps = row.playerId ? { to: `/players/${row.playerId}` } : {}

      return (
        <RowEl key={row.rank} {...rowProps}
          className="grid items-center px-4 py-3 transition-colors duration-150"
          style={{
            gridTemplateColumns: '48px 32px 1fr 60px 100px 80px',
            borderBottom: i < data.length - 1 ? '1px solid var(--light-gray)' : 'none',
            background: isTop3 ? 'rgba(27,92,46,0.03)' : 'transparent',
            cursor: row.playerId ? 'pointer' : 'default',
            textDecoration: 'none',
          }}
          onMouseEnter={e => { if (row.playerId) e.currentTarget.style.background = 'rgba(27,92,46,0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.background = isTop3 ? 'rgba(27,92,46,0.03)' : 'transparent' }}
        >
          {/* Rank */}
          <span className="font-display font-bold"
            style={{
              fontSize: isTop3 ? '1.125rem' : '0.9375rem',
              color: isTop3 ? 'var(--green)' : 'var(--charcoal)',
            }}>
            {row.rank}
          </span>

          {/* Movement */}
          <MovementIcon rank={row.rank} prev={row.prev} />

          {/* Name + flag */}
          <div className="flex items-center gap-2 min-w-0">
            <span style={{ fontSize: '1rem' }}>{row.country}</span>
            <span className="font-sans font-medium truncate"
              style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
              {row.name}
            </span>
            {isTop3 && (
              <span className="shrink-0 font-sans font-semibold uppercase px-1.5 py-0.5 rounded-sm"
                style={{
                  fontSize: '0.55rem', letterSpacing: '0.08em',
                  background: 'rgba(201,168,76,0.18)', color: 'var(--gold)',
                }}>
                {['Champion', 'Runner-up', 'SF'][row.rank - 1]}
              </span>
            )}
          </div>

          {/* Age */}
          <span className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--mid-gray)' }}>
            {row.age}
          </span>

          {/* Points */}
          <div>
            <span className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
              {row.points.toLocaleString()}
            </span>
            {/* Points bar */}
            <div className="mt-1 rounded-full overflow-hidden" style={{ height: 3, background: 'var(--light-gray)' }}>
              <div className="h-full rounded-full"
                style={{ width: `${(row.points / data[0].points) * 100}%`, background: 'var(--green)' }} />
            </div>
          </div>

          {/* Profile link */}
          {row.playerId ? (
            <span className="font-sans font-medium text-right"
              style={{ fontSize: '0.75rem', color: 'var(--green)' }}>
              Profile →
            </span>
          ) : <span />}
        </RowEl>
      )
    })}
  </div>
)

export default function Rankings() {
  const [tour, setTour] = useState('ATP')

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
            World Rankings
          </h1>
        </div>
      </div>

      <div className="container-site py-10">
        {/* Tour toggle */}
        <div className="flex items-center gap-2 mb-8">
          {['ATP', 'WTA'].map(t => (
            <button key={t} onClick={() => setTour(t)}
              className="px-6 py-2.5 rounded-full font-sans font-medium transition-all duration-200"
              style={{
                fontSize: '0.875rem',
                background: tour === t ? 'var(--green)' : 'var(--white)',
                color: tour === t ? 'var(--white)' : 'var(--mid-gray)',
                border: `1px solid ${tour === t ? 'var(--green)' : 'var(--light-gray)'}`,
              }}>
              {t} Rankings
            </button>
          ))}
          <span className="font-sans ml-3" style={{ fontSize: '0.8rem', color: 'var(--mid-gray)' }}>
            Wimbledon seedings based on current ranking
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <RankingsTable data={tour === 'ATP' ? ATP_RANKINGS : WTA_RANKINGS} tour={tour} />
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Wimbledon seeds box */}
            <div className="rounded-xl p-5"
              style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h3 className="font-display font-bold mb-1" style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}>
                Wimbledon Seedings
              </h3>
              <p className="font-sans mb-4" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)' }}>
                Seeds are based on world ranking with grass-court performance adjustments.
              </p>
              {(tour === 'ATP' ? ATP_RANKINGS : WTA_RANKINGS).slice(0, 8).map(r => (
                <div key={r.rank} className="flex items-center justify-between py-2"
                  style={{ borderBottom: r.rank < 8 ? '1px solid var(--light-gray)' : 'none' }}>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-white flex items-center justify-center rounded"
                      style={{
                        width: 22, height: 22, fontSize: '0.7rem',
                        background: r.rank <= 3 ? 'var(--green)' : 'var(--mid-gray)',
                      }}>
                      {r.rank}
                    </span>
                    <span style={{ fontSize: '0.9rem' }}>{r.country}</span>
                    <span className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                      {r.name}
                    </span>
                  </div>
                  <span className="font-sans font-semibold" style={{ fontSize: '0.8rem', color: 'var(--green)' }}>
                    [{r.rank}]
                  </span>
                </div>
              ))}
            </div>

            {/* Info card */}
            <div className="rounded-xl p-5"
              style={{ background: 'var(--green)' }}>
              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1rem' }}>
                How points are awarded
              </h3>
              <p className="font-sans text-white/60 mb-4" style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                Wimbledon awards 2000 points to the singles champion, 1200 to the finalist,
                and 720 to each semi-finalist.
              </p>
              <div className="flex flex-col gap-2">
                {[['W', 2000], ['F', 1200], ['SF', 720], ['QF', 360], ['R4', 180]].map(([r, p]) => (
                  <div key={r} className="flex items-center justify-between">
                    <span className="font-sans text-white/70" style={{ fontSize: '0.8rem' }}>{r}</span>
                    <div className="flex items-center gap-2 flex-1 mx-3">
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: 'rgba(255,255,255,0.15)' }}>
                        <div className="h-full rounded-full" style={{ width: `${(p / 2000) * 100}%`, background: 'var(--gold)' }} />
                      </div>
                    </div>
                    <span className="font-sans font-semibold text-white" style={{ fontSize: '0.8rem' }}>
                      {p.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'

const StatusBadge = ({ status }) => {
  if (status === 'live') return (
    <span className="flex items-center gap-1.5 font-sans font-semibold uppercase"
      style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: '#B91C1C' }}>
      <span className="live-dot" />
      Live
    </span>
  )
  if (status === 'completed') return (
    <span className="font-sans font-medium uppercase"
      style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--mid-gray)' }}>
      Final
    </span>
  )
  return (
    <span className="font-sans font-medium uppercase"
      style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--green)' }}>
      Upcoming
    </span>
  )
}

export default function MatchCard({ match }) {
  const { status, round, court, players, score, scheduledTime } = match
  const homeWinner = score?.winner === 'home'
  const awayWinner = score?.winner === 'away'
  const serving    = score?.serving

  return (
    <Link
      to={`/scores#${match.id}`}
      className="block rounded-lg transition-all duration-200"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--light-gray)',
        padding: '1.125rem 1.25rem',
        boxShadow: '0 1px 3px rgba(26,26,26,0.04)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,26,26,0.10)'
        e.currentTarget.style.borderColor = 'var(--green)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(26,26,26,0.04)'
        e.currentTarget.style.borderColor = 'var(--light-gray)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
          <span className="font-sans"
            style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
            {court}
          </span>
        </div>
        <span className="font-sans"
          style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
          {status === 'upcoming' ? scheduledTime : round}
        </span>
      </div>

      {/* Players + scores */}
      <div className="flex items-stretch justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {/* Home */}
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '0.875rem' }}>{players.home.flag}</span>
            <span className="font-sans truncate"
              style={{
                fontSize: '0.9375rem',
                color: homeWinner ? 'var(--green)' : 'var(--charcoal)',
                fontWeight: homeWinner ? 600 : 500,
              }}>
              {players.home.name}
            </span>
            {players.home.seed && (
              <span className="font-sans shrink-0"
                style={{ fontSize: '0.7rem', color: 'var(--mid-gray)' }}>
                [{players.home.seed}]
              </span>
            )}
            {status === 'live' && serving === 'home' && (
              <span style={{ fontSize: '0.6rem', color: 'var(--green)' }}>●</span>
            )}
          </div>
          {/* Away */}
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '0.875rem' }}>{players.away.flag}</span>
            <span className="font-sans truncate"
              style={{
                fontSize: '0.9375rem',
                color: awayWinner ? 'var(--green)' : 'var(--charcoal)',
                fontWeight: awayWinner ? 600 : 500,
              }}>
              {players.away.name}
            </span>
            {players.away.seed && (
              <span className="font-sans shrink-0"
                style={{ fontSize: '0.7rem', color: 'var(--mid-gray)' }}>
                [{players.away.seed}]
              </span>
            )}
            {status === 'live' && serving === 'away' && (
              <span style={{ fontSize: '0.6rem', color: 'var(--green)' }}>●</span>
            )}
          </div>
        </div>

        {/* Set scores */}
        {score && status !== 'upcoming' && (
          <div className="flex flex-col gap-2 items-end shrink-0">
            <div className="flex items-center gap-1">
              {score.sets.map((s, i) => (
                <span key={i} className="font-sans font-semibold tabular-nums text-center"
                  style={{
                    fontSize: '0.9375rem', minWidth: 18,
                    color: s.home >= s.away ? 'var(--charcoal)' : 'var(--mid-gray)',
                  }}>
                  {s.home}
                </span>
              ))}
              {status === 'live' && (
                <span className="font-sans font-bold tabular-nums text-center"
                  style={{ fontSize: '0.875rem', minWidth: 24, color: '#B91C1C' }}>
                  {score.currentGame?.split('-')[0]}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {score.sets.map((s, i) => (
                <span key={i} className="font-sans font-semibold tabular-nums text-center"
                  style={{
                    fontSize: '0.9375rem', minWidth: 18,
                    color: s.away > s.home ? 'var(--charcoal)' : 'var(--mid-gray)',
                  }}>
                  {s.away}
                </span>
              ))}
              {status === 'live' && (
                <span className="font-sans font-bold tabular-nums text-center"
                  style={{ fontSize: '0.875rem', minWidth: 24, color: '#B91C1C' }}>
                  {score.currentGame?.split('-')[1]}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Upcoming time */}
        {status === 'upcoming' && (
          <div className="flex flex-col items-end justify-center gap-1 shrink-0">
            <span className="font-display font-bold"
              style={{ fontSize: '1.25rem', color: 'var(--green)' }}>
              {scheduledTime}
            </span>
            <span className="font-sans"
              style={{ fontSize: '0.7rem', color: 'var(--mid-gray)', letterSpacing: '0.04em' }}>
              {round}
            </span>
          </div>
        )}
      </div>

      {/* Duration */}
      {status === 'completed' && score?.duration && (
        <p className="font-sans mt-2"
          style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
          Duration: {score.duration}
        </p>
      )}
    </Link>
  )
}

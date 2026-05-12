import { useState } from 'react'
import { Link } from 'react-router-dom'
import schedule from '../data/schedule.json'
import matches  from '../data/matches.json'

export default function Schedule() {
  const [dayIdx, setDayIdx] = useState(0)
  const day = schedule[dayIdx]

  const getMatch = (matchId) => matches.find(m => m.id === matchId)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--green)', paddingTop: '3rem', paddingBottom: '0' }}>
        <div className="container-site">
          <p className="font-sans font-semibold uppercase text-white/60 mb-2"
            style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}>
            Wimbledon 2025
          </p>
          <h1 className="font-display font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            Order of Play
          </h1>
          {/* Day tabs */}
          <div className="flex gap-0 overflow-x-auto">
            {schedule.map((d, i) => (
              <button key={d.day} onClick={() => setDayIdx(i)}
                className="px-5 py-3 font-sans font-medium transition-all duration-150 shrink-0"
                style={{
                  fontSize: '0.875rem',
                  color: dayIdx === i ? 'var(--green)' : 'rgba(255,255,255,0.6)',
                  background: dayIdx === i ? 'var(--cream)' : 'transparent',
                  borderRadius: dayIdx === i ? '8px 8px 0 0' : 0,
                  border: 'none', cursor: 'pointer',
                }}>
                Day {d.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        {/* Day header */}
        <div className="mb-8">
          <h2 className="font-display font-bold" style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}>
            {day.dayLabel}
          </h2>
          <p className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--mid-gray)' }}>
            {day.phase} · {day.courts.reduce((acc, c) => acc + c.matches.length, 0)} matches scheduled
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {day.courts.map(court => (
            <div key={court.name} className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--light-gray)', background: 'var(--white)' }}>
              {/* Court header */}
              <div className="px-5 py-4"
                style={{
                  background: court.name === 'Centre Court' ? 'var(--green)' : 'var(--charcoal)',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                <h3 className="font-display font-bold text-white" style={{ fontSize: '1.0625rem' }}>
                  {court.name}
                </h3>
              </div>

              {/* Matches */}
              <div className="divide-y" style={{ borderColor: 'var(--light-gray)' }}>
                {court.matches.map((cm, i) => {
                  const match = getMatch(cm.matchId)
                  return (
                    <div key={cm.matchId} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold" style={{ fontSize: '1.125rem', color: 'var(--green)' }}>
                            {cm.time}
                          </span>
                          {match?.status === 'live' && <span className="live-dot" />}
                        </div>
                        <span className="font-sans px-2 py-0.5 rounded"
                          style={{
                            fontSize: '0.65rem', letterSpacing: '0.06em', fontWeight: 600,
                            background: cm.tour === 'ATP' ? 'rgba(27,92,46,0.1)' : 'rgba(75,45,110,0.1)',
                            color: cm.tour === 'ATP' ? 'var(--green)' : 'var(--purple)',
                          }}>
                          {cm.tour}
                        </span>
                      </div>

                      <p className="font-sans font-medium mb-0.5"
                        style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                        {cm.round}
                      </p>

                      <div className="flex flex-col gap-1.5 mt-2">
                        {cm.players.map((p, pi) => (
                          <p key={pi} className="font-sans"
                            style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                            {p}
                          </p>
                        ))}
                      </div>

                      {cm.notes && (
                        <p className="font-sans mt-2"
                          style={{ fontSize: '0.75rem', color: 'var(--mid-gray)', fontStyle: 'italic' }}>
                          * {cm.notes}
                        </p>
                      )}

                      {match && (
                        <Link to={`/scores#${match.id}`}
                          className="inline-block mt-3 font-sans font-medium transition-colors hover:text-wimbledon-green"
                          style={{ fontSize: '0.75rem', color: 'var(--green)' }}>
                          {match.status === 'completed' ? 'View result →' :
                           match.status === 'live'      ? 'Live score →' :
                           'Match details →'}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Info card */}
          <div className="rounded-xl p-5"
            style={{ background: 'var(--cream-dark)', border: '1px solid var(--light-gray)' }}>
            <h3 className="font-display font-bold mb-3" style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}>
              Schedule notes
            </h3>
            <div className="flex flex-col gap-3">
              {[
                'Play begins at 11:00 BST on all courts unless otherwise stated.',
                'Centre Court and No. 1 Court have roof coverage for inclement weather.',
                'The order of play is subject to change. Check back on the morning of play for confirmation.',
                'Night sessions on Centre Court begin at 19:00 BST.',
              ].map((note, i) => (
                <div key={i} className="flex gap-3">
                  <span className="font-sans font-bold shrink-0 mt-0.5"
                    style={{ fontSize: '0.7rem', color: 'var(--green)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)', lineHeight: 1.6 }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

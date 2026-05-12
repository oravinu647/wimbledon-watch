import { useState } from 'react'
import { Link } from 'react-router-dom'
import matches from '../data/matches.json'
import MatchCard from '../components/MatchCard'
import SectionHeader from '../components/SectionHeader'

const FILTERS = ['All', 'Live', 'Completed', 'Upcoming']

export default function LiveScores() {
  const [filter, setFilter] = useState('All')

  const filtered = matches.filter(m => {
    if (filter === 'All') return true
    return m.status === filter.toLowerCase()
  })

  const live      = matches.filter(m => m.status === 'live')
  const completed = matches.filter(m => m.status === 'completed')
  const upcoming  = matches.filter(m => m.status === 'upcoming')

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--green)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container-site">
          <div className="flex items-center gap-3 mb-2">
            <span className="live-dot" />
            <p className="font-sans font-semibold uppercase text-white/70"
              style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}>
              Live · Wimbledon 2025
            </p>
          </div>
          <h1 className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            Scores & Results
          </h1>
          <p className="font-serif text-white/70 mt-1"
            style={{ fontSize: '1rem', fontStyle: 'italic' }}>
            Quarter-Finals · Day 9 · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Filter tabs */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-medium transition-all duration-200"
                  style={{
                    fontSize: '0.8125rem',
                    background: filter === f ? 'var(--green)' : 'var(--white)',
                    color: filter === f ? 'var(--white)' : 'var(--mid-gray)',
                    border: `1px solid ${filter === f ? 'var(--green)' : 'var(--light-gray)'}`,
                  }}>
                  {f === 'Live' && <span className="live-dot" />}
                  {f}
                  <span className="ml-0.5 font-sans"
                    style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                    ({f === 'All' ? matches.length : f === 'Live' ? live.length : f === 'Completed' ? completed.length : upcoming.length})
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {filtered.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Summary */}
            <div className="rounded-xl p-5"
              style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h3 className="font-display font-bold mb-4" style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}>
                Day 9 Summary
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Live',      value: live.length,      color: '#DC2626' },
                  { label: 'Done',      value: completed.length, color: 'var(--green)' },
                  { label: 'To come',   value: upcoming.length,  color: 'var(--mid-gray)' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="text-center py-3 rounded-lg"
                    style={{ background: 'var(--cream)' }}>
                    <p className="font-display font-bold" style={{ fontSize: '1.5rem', color }}>{value}</p>
                    <p className="font-sans uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--mid-gray)' }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Courts */}
            <div className="rounded-xl p-5"
              style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h3 className="font-display font-bold mb-4" style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}>
                Courts in play
              </h3>
              {['Centre Court', 'No. 1 Court', 'No. 2 Court'].map(court => {
                const courtMatches = matches.filter(m => m.court === court)
                const hasLive = courtMatches.some(m => m.status === 'live')
                return (
                  <div key={court} className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: '1px solid var(--light-gray)' }}>
                    <div className="flex items-center gap-2">
                      {hasLive && <span className="live-dot" />}
                      <span className="font-sans font-medium" style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                        {court}
                      </span>
                    </div>
                    <span className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
                      {courtMatches.length} match{courtMatches.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="rounded-xl p-5" style={{ background: 'var(--green)' }}>
              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1rem' }}>
                Full schedule
              </h3>
              <p className="font-sans text-white/60 mb-4" style={{ fontSize: '0.8125rem' }}>
                View the complete order of play for all courts.
              </p>
              <Link to="/schedule"
                className="inline-flex items-center gap-2 px-4 py-2 rounded font-sans font-medium transition-opacity hover:opacity-90"
                style={{ background: 'var(--gold)', color: 'var(--charcoal)', fontSize: '0.8125rem' }}>
                View schedule
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

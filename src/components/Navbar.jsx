import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Live Scores', to: '/scores',   live: true  },
  { label: 'Rankings',    to: '/rankings', live: false },
  { label: 'News',        to: '/news',     live: false },
  { label: 'Schedule',    to: '/schedule', live: false },
  { label: 'Players',     to: '/players',  live: false },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>

      {/* ── Top bar ── */}
      <div style={{ background: 'var(--green)', height: 36 }}>
        <div className="container-site h-full flex items-center justify-between">
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' }}>
            Wimbledon 2025 · The Championships
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/about" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif', transition: 'color 0.15s'" }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
              About
            </Link>
            <Link to="/contact" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav style={{
        background: 'var(--cream)',
        height: 68,
        borderBottom: scrolled ? '1px solid var(--light-gray)' : '1px solid var(--light-gray)',
        boxShadow: scrolled ? '0 2px 20px rgba(26,26,26,0.08)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <div className="container-site h-full flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            {/* Emblem */}
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', flexShrink: 0,
            }}>
              <svg width="38" height="38" viewBox="0 0 38 38" style={{ position: 'absolute', inset: 0 }}>
                <path d="M10 14 Q19 19 10 24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <path d="M28 14 Q19 19 28 24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 14, color: '#fff', position: 'relative', zIndex: 1 }}>W</span>
            </div>
            {/* Wordmark */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.05rem', color: 'var(--green)', letterSpacing: '-0.01em' }}>
                Wimbledon
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.58rem', color: 'var(--mid-gray)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2 }}>
                Watch
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, justifyContent: 'center' }}
            className="hidden-mobile">
            {NAV_LINKS.map(({ label, to, live }) => (
              <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9rem',
                    color: isActive ? 'var(--green)' : 'var(--charcoal)',
                    paddingBottom: 4,
                    borderBottom: isActive ? '2px solid var(--green)' : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--green)' } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--charcoal)' } }}
                  >
                    {live && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 3,
                        fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em',
                        textTransform: 'uppercase', color: '#B91C1C',
                        background: '#FEE2E2', padding: '2px 5px', borderRadius: 3,
                      }}>
                        <span className="live-dot" style={{ width: 5, height: 5 }} />
                        Live
                      </span>
                    )}
                    {label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Right: Subscribe + hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link to="/about"
              className="hidden-mobile"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                fontSize: '0.8rem', color: 'var(--white)',
                background: 'var(--green)', borderRadius: 6,
                padding: '8px 18px', textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Subscribe
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="show-mobile"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 8, display: 'flex', flexDirection: 'column',
                gap: 5, width: 36, alignItems: 'flex-end',
              }}>
              <span style={{
                display: 'block', height: 1.5, width: menuOpen ? 22 : 22,
                background: 'var(--charcoal)', borderRadius: 2,
                transform: menuOpen ? 'rotate(45deg) translate(3px, 5px)' : 'none',
                transition: 'transform 0.25s',
              }}/>
              <span style={{
                display: 'block', height: 1.5, width: 16,
                background: 'var(--charcoal)', borderRadius: 2,
                opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s',
              }}/>
              <span style={{
                display: 'block', height: 1.5, width: 22,
                background: 'var(--charcoal)', borderRadius: 2,
                transform: menuOpen ? 'rotate(-45deg) translate(3px, -5px)' : 'none',
                transition: 'transform 0.25s',
              }}/>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div style={{
          background: 'var(--cream)',
          borderBottom: '1px solid var(--light-gray)',
          boxShadow: '0 8px 32px rgba(26,26,26,0.12)',
        }}>
          <div className="container-site" style={{ paddingTop: 12, paddingBottom: 16 }}>
            {NAV_LINKS.map(({ label, to, live }) => (
              <NavLink key={to} to={to} style={{ textDecoration: 'none', display: 'block' }}>
                {({ isActive }) => (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: 8, marginBottom: 2,
                    background: isActive ? 'rgba(27,92,46,0.08)' : 'transparent',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9375rem',
                    color: isActive ? 'var(--green)' : 'var(--charcoal)',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {live && <span className="live-dot" />}
                      {label}
                    </span>
                    <span style={{ color: 'var(--mid-gray)', fontSize: '0.8rem' }}>›</span>
                  </div>
                )}
              </NavLink>
            ))}
            <div style={{ height: 1, background: 'var(--light-gray)', margin: '8px 0' }} />
            {[{ label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }].map(({ label, to }) => (
              <NavLink key={to} to={to} style={{ textDecoration: 'none', display: 'block' }}>
                {({ isActive }) => (
                  <div style={{
                    padding: '10px 16px', borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem',
                    color: isActive ? 'var(--green)' : 'var(--mid-gray)',
                  }}>
                    {label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Responsive style — hide/show classes */}
      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none  !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none  !important; }
          .show-mobile   { display: flex  !important; }
        }
      `}</style>
    </header>
  )
}

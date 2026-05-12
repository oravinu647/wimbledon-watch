import { useState } from 'react'
import { Link } from 'react-router-dom'

const TEAM = [
  {
    name: 'James Whitmore',
    role: 'Senior Tennis Correspondent',
    bio: 'James has covered Wimbledon for over fourteen years. Previously at The Times and BBC Sport, he brings an unrivalled depth of knowledge to Centre Court.',
    initials: 'JW',
    color: '#1B5C2E',
  },
  {
    name: 'Sarah Chen',
    role: 'Tactical Analyst',
    bio: 'A former WTA touring professional, Sarah provides the kind of technical insight that only a player who has faced the very best can offer.',
    initials: 'SC',
    color: '#4B2D6E',
  },
  {
    name: 'Priya Nair',
    role: "Women's Tennis Correspondent",
    bio: 'Priya joined WimbledonWatch from the Guardian, where she spent eight years covering the women\'s game from Melbourne to New York.',
    initials: 'PN',
    color: '#133F20',
  },
  {
    name: 'Oliver Hartley',
    role: 'Features Writer',
    bio: 'Oliver specialises in the history and culture of the game, with a particular love for the traditions and eccentricities that make Wimbledon incomparable.',
    initials: 'OH',
    color: '#C9A84C',
  },
]

const TABS = ['About', 'Contact']

export default function About() {
  const [tab, setTab] = useState('About')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--green)', paddingTop: '3rem', paddingBottom: '0' }}>
        <div className="container-site">
          <p className="font-sans font-semibold uppercase text-white/60 mb-2"
            style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}>
            WimbledonWatch
          </p>
          <h1 className="font-display font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            {tab === 'About' ? 'About Us' : 'Contact Us'}
          </h1>
          {/* Tab strip */}
          <div className="flex gap-0">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-6 py-3 font-sans font-medium transition-all duration-150"
                style={{
                  fontSize: '0.875rem',
                  color: tab === t ? 'var(--green)' : 'rgba(255,255,255,0.65)',
                  background: tab === t ? 'var(--cream)' : 'transparent',
                  borderRadius: tab === t ? '8px 8px 0 0' : 0,
                  border: 'none', cursor: 'pointer',
                }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-12">
        {tab === 'About' ? (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* Mission */}
              <div>
                <h2 className="font-display font-bold mb-4"
                  style={{ fontSize: '1.625rem', color: 'var(--charcoal)', letterSpacing: '-0.02em' }}>
                  Independent. Expert. Unrivalled.
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    'WimbledonWatch was founded in 2025 with a single purpose: to provide the most comprehensive, authoritative, and beautifully presented coverage of the Wimbledon Championships available anywhere.',
                    'We are an independent publication with no affiliation to the All England Lawn Tennis Club. Our editorial decisions are made entirely by our team of journalists and analysts, free from commercial or institutional pressure.',
                    'From the first qualifying match to the moment the champion holds the trophy aloft on Centre Court, we are here — with live scores, tactical analysis, long-form features, and the kind of unhurried, intelligent writing that the sport deserves.',
                  ].map((para, i) => (
                    <p key={i} className="font-serif leading-relaxed"
                      style={{ fontSize: '1.125rem', color: 'var(--charcoal)', lineHeight: 1.8 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div>
                <h2 className="font-display font-bold mb-6"
                  style={{ fontSize: '1.375rem', color: 'var(--charcoal)', letterSpacing: '-0.02em' }}>
                  What we stand for
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: '✦', title: 'Editorial independence', body: 'Our views are our own. We take no advertising, accept no paid placements, and follow no editorial lines but our own.' },
                    { icon: '◆', title: 'Accuracy first',         body: 'Every score, statistic and quote is verified before publication. We correct errors promptly and transparently.' },
                    { icon: '●', title: 'Depth over speed',       body: 'We would rather be second and right than first and wrong. We believe readers deserve context, not just headlines.' },
                    { icon: '▲', title: 'Respect for the game',   body: 'Tennis at this level is extraordinary. Our writing tries to do justice to the players and the occasion.' },
                  ].map(({ icon, title, body }) => (
                    <div key={title} className="p-5 rounded-xl"
                      style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: 'var(--green)', fontSize: '0.75rem' }}>{icon}</span>
                        <h3 className="font-sans font-semibold"
                          style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                          {title}
                        </h3>
                      </div>
                      <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--mid-gray)', lineHeight: 1.6 }}>
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <h2 className="font-display font-bold mb-6"
                  style={{ fontSize: '1.375rem', color: 'var(--charcoal)', letterSpacing: '-0.02em' }}>
                  Our team
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {TEAM.map(member => (
                    <div key={member.name} className="flex gap-4 p-5 rounded-xl"
                      style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
                      <div className="flex items-center justify-center rounded-full font-display font-bold text-white shrink-0"
                        style={{ width: 48, height: 48, background: member.color, fontSize: '0.875rem' }}>
                        {member.initials}
                      </div>
                      <div>
                        <p className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                          {member.name}
                        </p>
                        <p className="font-sans mb-2" style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 500 }}>
                          {member.role}
                        </p>
                        <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)', lineHeight: 1.55 }}>
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">
              <div className="rounded-xl p-5 sticky top-28"
                style={{ background: 'var(--charcoal)' }}>
                <p className="font-sans font-semibold uppercase text-white/50 mb-2"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  Get in touch
                </p>
                <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '1.125rem' }}>
                  Press & partnerships
                </h3>
                <p className="font-sans text-white/60 mb-5" style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                  For media enquiries, partnership opportunities, or tip-offs, use our contact form or reach us directly.
                </p>
                <button onClick={() => setTab('Contact')}
                  className="w-full py-2.5 rounded font-sans font-medium transition-opacity hover:opacity-90"
                  style={{ background: 'var(--gold)', color: 'var(--charcoal)', fontSize: '0.875rem' }}>
                  Contact the team
                </button>
              </div>
            </aside>
          </div>
        ) : (
          /* Contact tab */
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="rounded-xl p-10 text-center"
                  style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
                  <div className="inline-flex items-center justify-center rounded-full mb-4"
                    style={{ width: 56, height: 56, background: 'rgba(27,92,46,0.1)' }}>
                    <span style={{ fontSize: '1.5rem' }}>✓</span>
                  </div>
                  <h2 className="font-display font-bold mb-2"
                    style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}>
                    Message received
                  </h2>
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--mid-gray)' }}>
                    Thank you for getting in touch. We aim to respond within two working days.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl p-8"
                  style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
                  <h2 className="font-display font-bold mb-6"
                    style={{ fontSize: '1.375rem', color: 'var(--charcoal)' }}>
                    Send us a message
                  </h2>
                  <form className="flex flex-col gap-5"
                    onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { label: 'Your name', id: 'name', type: 'text',  placeholder: 'Full name'      },
                        { label: 'Email',     id: 'email', type: 'email', placeholder: 'you@email.com'  },
                      ].map(({ label, id, type, placeholder }) => (
                        <div key={id} className="flex flex-col gap-1.5">
                          <label htmlFor={id} className="font-sans font-medium"
                            style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                            {label}
                          </label>
                          <input id={id} type={type} placeholder={placeholder} required
                            className="px-3 py-2.5 rounded-lg outline-none font-sans"
                            style={{
                              border: '1px solid var(--light-gray)', background: 'var(--cream)',
                              fontSize: '0.9rem', color: 'var(--charcoal)', fontFamily: "'DM Sans', sans-serif",
                            }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="font-sans font-medium"
                        style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                        Subject
                      </label>
                      <select id="subject"
                        className="px-3 py-2.5 rounded-lg outline-none font-sans"
                        style={{
                          border: '1px solid var(--light-gray)', background: 'var(--cream)',
                          fontSize: '0.9rem', color: 'var(--charcoal)', fontFamily: "'DM Sans', sans-serif",
                        }}>
                        <option>General enquiry</option>
                        <option>Press & media</option>
                        <option>Partnership opportunity</option>
                        <option>Tip or story idea</option>
                        <option>Correction or complaint</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="font-sans font-medium"
                        style={{ fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                        Message
                      </label>
                      <textarea id="message" rows={6} required placeholder="Your message…"
                        className="px-3 py-2.5 rounded-lg outline-none font-sans resize-none"
                        style={{
                          border: '1px solid var(--light-gray)', background: 'var(--cream)',
                          fontSize: '0.9rem', color: 'var(--charcoal)', fontFamily: "'DM Sans', sans-serif",
                        }} />
                    </div>
                    <button type="submit"
                      className="self-start px-6 py-3 rounded font-sans font-medium transition-opacity hover:opacity-90"
                      style={{ background: 'var(--green)', color: 'var(--white)', fontSize: '0.875rem' }}>
                      Send message
                    </button>
                  </form>
                </div>
              )}
            </div>

            <aside className="flex flex-col gap-5">
              {[
                { label: 'Editorial',  value: 'editorial@wimbledonwatch.com' },
                { label: 'Press',      value: 'press@wimbledonwatch.com'     },
                { label: 'Partnerships', value: 'partners@wimbledonwatch.com' },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-xl"
                  style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
                  <p className="font-sans font-semibold uppercase mb-1"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--green)' }}>
                    {label}
                  </p>
                  <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                    {value}
                  </p>
                </div>
              ))}
              <div className="p-4 rounded-xl"
                style={{ background: 'var(--cream-dark)', border: '1px solid var(--light-gray)' }}>
                <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)', lineHeight: 1.6 }}>
                  We aim to respond to all enquiries within two working days during The Championships,
                  and within five days at all other times.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

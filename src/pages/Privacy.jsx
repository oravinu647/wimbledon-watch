import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const TABS = [
  { label: 'Privacy Policy',   path: '/privacy' },
  { label: 'Terms of Service', path: '/terms'   },
  { label: 'Cookie Policy',    path: '/cookies' },
]

const PRIVACY_SECTIONS = [
  {
    title: '1. Who we are',
    body: 'WimbledonWatch is an independent sports journalism publication covering the Wimbledon Championships. We are not affiliated with, endorsed by, or connected to The All England Lawn Tennis Club (AELTC) or the Wimbledon Championships. Our registered address is available upon request by emailing legal@wimbledonwatch.com.',
  },
  {
    title: '2. What information we collect',
    body: 'We collect information you provide directly to us, including your email address when you subscribe to our newsletter, and any information you provide when you contact us via our contact form. We also collect certain technical data automatically when you visit our site, including your IP address, browser type, operating system, referring URLs, and pages visited. This information is collected via standard server logs and analytics tools.',
  },
  {
    title: '3. How we use your information',
    body: 'We use the information we collect to send you our newsletter if you have subscribed, respond to enquiries submitted through our contact form, improve our website and editorial content, and understand how our audience engages with our coverage. We do not sell, rent, or share your personal information with third parties for their marketing purposes.',
  },
  {
    title: '4. Newsletter and email communications',
    body: 'If you subscribe to our newsletter, we will send you regular updates about Wimbledon coverage including match results, order of play, and editorial content. You may unsubscribe at any time by clicking the unsubscribe link in any email we send, or by contacting us at editorial@wimbledonwatch.com. We use a third-party email service provider to send our newsletter; your email address will be stored on their servers in accordance with their privacy policy.',
  },
  {
    title: '5. Cookies',
    body: 'We use essential cookies necessary for the website to function, and analytics cookies to understand how visitors interact with our content. We do not use advertising cookies or tracking pixels for third-party advertising purposes. You can manage your cookie preferences at any time via our Cookie Policy page. Refusing non-essential cookies will not affect your ability to use our website.',
  },
  {
    title: '6. Data retention',
    body: 'We retain your email address for as long as you remain subscribed to our newsletter. Contact form submissions are retained for up to 24 months for the purposes of correspondence and record-keeping. Technical analytics data is retained in aggregated, anonymised form indefinitely, and in identifiable form for up to 26 months.',
  },
  {
    title: '7. Your rights',
    body: 'Subject to applicable law, you have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to or restrict certain processing of your data, and withdraw consent at any time where processing is based on consent. To exercise any of these rights, please contact us at legal@wimbledonwatch.com. You also have the right to lodge a complaint with your national data protection authority.',
  },
  {
    title: '8. Changes to this policy',
    body: 'We may update this Privacy Policy from time to time. We will notify subscribers of material changes via email. The date at the top of this page reflects the date of the most recent revision. Continued use of our website following the posting of changes constitutes acceptance of those changes.',
  },
]

const TERMS_SECTIONS = [
  {
    title: '1. Acceptance of terms',
    body: 'By accessing or using WimbledonWatch, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website. These terms apply to all visitors, subscribers, and others who access or use our service.',
  },
  {
    title: '2. Editorial content',
    body: 'All editorial content published on WimbledonWatch, including match reports, analysis, features, and news articles, is the intellectual property of WimbledonWatch and its contributors. You may not reproduce, republish, distribute, or commercially exploit any content without our prior written permission. Brief quotation with attribution is permitted for journalistic and educational purposes.',
  },
  {
    title: '3. Disclaimer of accuracy',
    body: 'While we take all reasonable steps to ensure the accuracy of our content, including live scores and statistics, we cannot guarantee that all information is accurate, complete, or current at all times. Live sports data is inherently subject to error and delay. We accept no liability for decisions made on the basis of information published on this site.',
  },
  {
    title: '4. Third-party links',
    body: 'Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.',
  },
  {
    title: '5. Limitation of liability',
    body: 'To the fullest extent permitted by law, WimbledonWatch shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of our website or services.',
  },
  {
    title: '6. Governing law',
    body: 'These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
  },
]

const COOKIE_SECTIONS = [
  {
    title: 'What are cookies?',
    body: 'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, or work more efficiently, and to provide information to the website owner.',
  },
  {
    title: 'Essential cookies',
    body: 'These cookies are necessary for our website to function and cannot be switched off. They are usually only set in response to actions you take, such as setting your privacy preferences. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.',
  },
  {
    title: 'Analytics cookies',
    body: 'We use analytics cookies to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies, we will not know when you have visited our site.',
  },
  {
    title: 'Managing cookies',
    body: 'You can control and manage cookies in your browser settings. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible. For more information about cookies and how to manage them, visit www.allaboutcookies.org.',
  },
]

const CONTENT = {
  '/privacy': { title: 'Privacy Policy',   updated: '1 July 2025',   sections: PRIVACY_SECTIONS },
  '/terms':   { title: 'Terms of Service', updated: '1 July 2025',   sections: TERMS_SECTIONS  },
  '/cookies': { title: 'Cookie Policy',    updated: '1 July 2025',   sections: COOKIE_SECTIONS },
}

export default function Privacy() {
  const { pathname } = useLocation()
  const content = CONTENT[pathname] || CONTENT['/privacy']

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--charcoal)', paddingTop: '3rem', paddingBottom: '0' }}>
        <div className="container-site">
          <p className="font-sans font-semibold uppercase text-white/40 mb-2"
            style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}>
            Legal
          </p>
          <h1 className="font-display font-bold text-white mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}>
            {content.title}
          </h1>
          {/* Tab strip */}
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map(t => (
              <Link key={t.path} to={t.path}
                className="px-5 py-3 font-sans font-medium transition-all duration-150 shrink-0"
                style={{
                  fontSize: '0.875rem',
                  color: pathname === t.path ? 'var(--charcoal)' : 'rgba(255,255,255,0.55)',
                  background: pathname === t.path ? 'var(--cream)' : 'transparent',
                  borderRadius: pathname === t.path ? '8px 8px 0 0' : 0,
                  textDecoration: 'none',
                }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid lg:grid-cols-4 gap-10">

          {/* Main content */}
          <div className="lg:col-span-3">
            <p className="font-sans mb-8" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)' }}>
              Last updated: {content.updated}
            </p>

            <div className="flex flex-col gap-8">
              {content.sections.map(({ title, body }) => (
                <div key={title} className="pb-8" style={{ borderBottom: '1px solid var(--light-gray)' }}>
                  <h2 className="font-display font-bold mb-3"
                    style={{ fontSize: '1.1875rem', color: 'var(--charcoal)', letterSpacing: '-0.01em' }}>
                    {title}
                  </h2>
                  <p className="font-sans leading-relaxed"
                    style={{ fontSize: '0.9375rem', color: '#3D3D3D', lineHeight: 1.8 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5">
            <div className="rounded-xl p-5 sticky top-28"
              style={{ background: 'var(--white)', border: '1px solid var(--light-gray)' }}>
              <h3 className="font-sans font-semibold uppercase mb-4"
                style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--mid-gray)' }}>
                Legal documents
              </h3>
              <div className="flex flex-col gap-1">
                {TABS.map(t => (
                  <Link key={t.path} to={t.path}
                    className="px-3 py-2.5 rounded-lg font-sans font-medium transition-colors duration-150"
                    style={{
                      fontSize: '0.875rem',
                      color: pathname === t.path ? 'var(--white)' : 'var(--charcoal)',
                      background: pathname === t.path ? 'var(--green)' : 'transparent',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => { if (pathname !== t.path) e.currentTarget.style.background = 'var(--cream)' }}
                    onMouseLeave={e => { if (pathname !== t.path) e.currentTarget.style.background = 'transparent' }}>
                    {t.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--light-gray)' }}>
                <p className="font-sans mb-3" style={{ fontSize: '0.8125rem', color: 'var(--mid-gray)', lineHeight: 1.6 }}>
                  Questions about our policies?
                </p>
                <Link to="/contact"
                  className="block text-center px-4 py-2.5 rounded font-sans font-medium transition-opacity hover:opacity-90"
                  style={{ background: 'var(--green)', color: 'var(--white)', fontSize: '0.8125rem', textDecoration: 'none' }}>
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

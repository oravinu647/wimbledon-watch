import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

/* ─── Pages (lazy-loaded for performance) ───────────────────────────────── */
import { lazy, Suspense } from 'react'

const Home        = lazy(() => import('./pages/Home'))
const LiveScores  = lazy(() => import('./pages/LiveScores'))
const Rankings    = lazy(() => import('./pages/Rankings'))
const News        = lazy(() => import('./pages/News'))
const Article     = lazy(() => import('./pages/Article'))
const Players     = lazy(() => import('./pages/Players'))
const PlayerDetail= lazy(() => import('./pages/PlayerDetail'))
const Schedule    = lazy(() => import('./pages/Schedule'))
const About       = lazy(() => import('./pages/About'))
const Privacy     = lazy(() => import('./pages/Privacy'))
const NotFound    = lazy(() => import('./pages/NotFound'))

/* ─── Simple loading fallback ───────────────────────────────────────────── */
const PageLoader = () => (
  <div
    className="flex items-center justify-center"
    style={{ minHeight: '50vh' }}
  >
    <div
      className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
      style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }}
      role="status"
      aria-label="Loading"
    />
  </div>
)

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index          element={<Home />} />
            <Route path="scores"  element={<LiveScores />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="news"    element={<News />} />
            <Route path="news/:slug" element={<Article />} />
            <Route path="players" element={<Players />} />
            <Route path="players/:id" element={<PlayerDetail />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="about"   element={<About />} />
            <Route path="contact" element={<About />} />  {/* same component, tabbed */}
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms"   element={<Privacy />} />  {/* same component, tabbed */}
            <Route path="cookies" element={<Privacy />} />
            <Route path="subscribe" element={<Navigate to="/" replace />} />
            <Route path="*"       element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

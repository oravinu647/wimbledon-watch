import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {/*
        Top bar  = 36px
        Main nav = 68px
        Total    = 104px
      */}
      <main style={{ flex: 1, paddingTop: 104 }} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import AuthGuard from '../auth/AuthGuard'
import Navbar from './Navbar'
import SEO from './SEO'
import Head from 'next/head'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthGuard>
        <Navbar />
        {children}
      </AuthGuard>
    </div>
  )
}

export default Layout

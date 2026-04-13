import React, { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      <div className="z-10 flex flex-col min-h-screen">
        <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="flex flex-1 mx-auto w-full max-w-[1600px]">
          {/* Sidebar Navigation - Hidden on mobile, visible on tablet+ */}
          <aside className="hidden md:block w-64 lg:w-72 border-r border-gray-200 bg-white">
            <div className="h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
              <Navigation setMobileMenuOpen={setMobileMenuOpen} />
            </div>
          </aside>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div 
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-50 overflow-y-auto">
                <Navigation setMobileMenuOpen={setMobileMenuOpen} />
              </aside>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="px-4 sm:px-6 lg:px-8 py-8 h-full">
              <Outlet />
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  )
}

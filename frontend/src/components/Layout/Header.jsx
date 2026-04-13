import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'

export default function Header({ onMenuToggle }) {
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userName = localStorage.getItem('userName') || 'User'
  const userRole = localStorage.getItem('userRole') || 'coordinator'

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onMenuToggle}
              className="md:hidden p-2 -ml-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl text-gray-900 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg shadow-sm">
                F
              </div>
              <span className="hidden sm:inline tracking-tight">FOSSEE</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all select-none"
              >
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold border border-blue-200">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">{userName}</span>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                      <p className="text-xs text-gray-500 capitalize mt-0.5">{userRole}</p>
                    </div>
                    <div className="py-1">
                      <Link 
                        to="/profile" 
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={16} className="text-gray-400" /> Account Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 mt-1 border-t border-gray-100 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <LogOut size={16} className="text-red-500" /> Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

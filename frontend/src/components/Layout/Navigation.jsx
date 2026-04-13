import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Settings, Home, LogOut } from 'lucide-react'

export default function Navigation({ setMobileMenuOpen }) {
  const location = useLocation()
  const userRole = localStorage.getItem('userRole') || 'coordinator'

  const isActive = (path) => location.pathname.startsWith(path)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/statistics', label: 'Statistics', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: Settings },
  ]

  return (
    <div className="flex flex-col h-full py-6">
      <div className="px-4 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = isActive(path)
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
              }`}
            >
              <Icon size={18} className={active ? 'text-blue-600' : 'text-zinc-500'} />
              <span>{label}</span>
            </Link>
          )
        })}
        
        {/* Role-specific items */}
        {userRole === 'instructor' && (
          <Link
            to="/workshop-types"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              isActive('/workshop-types')
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
            }`}
          >
            <BarChart3 size={18} className={isActive('/workshop-types') ? 'text-blue-600' : 'text-zinc-500'} />
            <span>Workshop Types</span>
          </Link>
        )}
      </div>

      <div className="mt-auto px-4 pt-6 pb-2">
        <button
          onClick={() => {
            localStorage.removeItem('authToken')
            window.location.href = '/login'
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-600 hover:bg-red-50 hover:text-red-700 transition-all font-medium"
        >
          <LogOut size={18} className="text-zinc-500 group-hover:text-red-600" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
}

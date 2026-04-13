import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/api'
import toast from 'react-hot-toast'
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const response = await authService.login(formData.email, formData.password)
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userName', response.data.user.name)
      localStorage.setItem('userRole', response.data.user.role)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      const message = error.response?.data?.detail || 'Login failed'
      toast.error(message)
      setErrors({ general: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left side - Branding/Image */}
      <div className="hidden md:flex flex-col justify-between bg-zinc-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700 via-zinc-900 to-zinc-900"></div>
        <div className="relative z-10 w-full max-w-md mx-auto h-full flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
              F
            </div>
            <span className="text-2xl font-bold tracking-tight">FOSSEE</span>
          </div>
          
          <div className="mt-auto mb-auto">
            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              Empowering Education through Open Source.
            </h1>
            <p className="text-zinc-400 text-lg">
              Sign in to coordinate workshops, manage participants, and track your educational impact all in one place.
            </p>
          </div>
          
          <div className="text-zinc-500 text-sm flex items-center justify-between">
            <span>&copy; {new Date().getFullYear()} FOSSEE IIT Bombay</span>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          
          <div className="md:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-sm">
              F
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">FOSSEE</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight">Welcome back</h2>
            <p className="text-zinc-500 mt-2">Enter your credentials to access your account.</p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex gap-3 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <p>{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Email address
              </label>
              <div className="relative flex items-center text-zinc-500 focus-within:text-blue-600">
                <Mail className="absolute left-3.5 w-5 h-5 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-11 pr-4 py-2.5 bg-white border shadow-sm rounded-xl outline-none hover:border-zinc-400 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-500/20 transition-all text-zinc-900 placeholder-zinc-400 ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300'
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative flex items-center text-zinc-500 focus-within:text-blue-600">
                <Lock className="absolute left-3.5 w-5 h-5 transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-2.5 bg-white border shadow-sm rounded-xl outline-none hover:border-zinc-400 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-500/20 transition-all text-zinc-900 placeholder-zinc-400 ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300'
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1.5">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center mt-[3px]">
                  <input type="checkbox" className="peer w-4 h-4 border-2 border-zinc-300 rounded cursor-pointer transition-all outline-none checked:bg-blue-600 checked:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-500/20 appearance-none bg-white" />
                  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">Remember for 30 days</span>
              </label>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 bg-zinc-900 text-white font-medium rounded-xl transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/20 active:scale-[0.98] flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed hidden' : ''
              }`}
            >
              Sign In
            </button>
            {loading && (
              <button disabled className="w-full py-3.5 px-4 bg-zinc-800 text-zinc-400 font-medium rounded-xl flex items-center justify-center gap-3 cursor-not-allowed">
                <div className="w-5 h-5 border-2 border-zinc-400 border-t-zinc-700 rounded-full animate-spin"></div>
                Signing in...
              </button>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

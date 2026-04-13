import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/api'
import toast from 'react-hot-toast'
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react'

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar',
  'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu',
  'Lakshadweep', 'Puducherry', 'Delhi'
]

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    role: 'coordinator',
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
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.phone || formData.phone.length !== 10) newErrors.phone = 'Valid 10-digit phone is required'
    if (!formData.state) newErrors.state = 'State is required'
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
      const { confirmPassword, ...data } = formData
      await authService.register(data)
      toast.success('Registration successful! Please check your email.')
      navigate('/login')
    } catch (error) {
      const message = error.response?.data?.detail || 'Registration failed'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left side - Branding/Image */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700 via-zinc-900 to-zinc-900"></div>
        <div className="relative z-10 w-full max-w-lg mx-auto h-full flex flex-col">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
                F
              </div>
              <span className="text-2xl font-bold tracking-tight">FOSSEE</span>
            </Link>
          </div>
          
          <div className="mt-auto mb-auto">
            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              Join the FOSSEE Workshop Community.
            </h1>
            <p className="text-zinc-400 text-lg">
              Create an account to participate in or coordinate workshops. We are committed to promoting open-source software in education.
            </p>
          </div>
          
          <div className="text-zinc-500 text-sm flex items-center justify-between">
            <span>&copy; {new Date().getFullYear()} FOSSEE IIT Bombay</span>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto max-h-screen">
        <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10 py-8">
          
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-sm">
              F
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">FOSSEE</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight">Create your account</h2>
            <p className="text-zinc-500 mt-2">Enter your details to register as a new user.</p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex gap-3 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <p>{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name</label>
              <div className="relative flex items-center text-zinc-500 focus-within:text-blue-600">
                <User className="absolute left-3.5 w-5 h-5 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className={`w-full pl-11 pr-4 py-2.5 bg-white border shadow-sm rounded-xl outline-none hover:border-zinc-400 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-500/20 transition-all text-zinc-900 placeholder-zinc-400 ${
                    errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300'
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email Address</label>
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

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone Number</label>
                <div className="relative flex items-center text-zinc-500 focus-within:text-blue-600">
                  <Phone className="absolute left-3.5 w-5 h-5 transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength="10"
                    className={`w-full pl-11 pr-4 py-2.5 bg-white border shadow-sm rounded-xl outline-none hover:border-zinc-400 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-500/20 transition-all text-zinc-900 placeholder-zinc-400 ${
                      errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300'
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1.5">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* State Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">State</label>
                <div className="relative flex items-center text-zinc-500 focus-within:text-blue-600">
                  <MapPin className="absolute left-3.5 w-5 h-5 transition-colors" />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-2.5 bg-white border shadow-sm rounded-xl outline-none hover:border-zinc-400 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-500/20 transition-all appearance-none text-zinc-900 ${
                      errors.state ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300'
                    }`}
                    disabled={loading}
                  >
                    <option value="" className="text-zinc-500">Select your state</option>
                    {STATES.map(state => (
                      <option key={state} value={state} className="text-zinc-900">{state}</option>
                    ))}
                  </select>
                </div>
                {errors.state && <p className="text-red-500 text-sm mt-1.5">{errors.state}</p>}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['coordinator', 'instructor'].map(role => (
                    <label key={role} className={`flex items-center justify-center p-2.5 border shadow-sm rounded-xl cursor-pointer transition-all duration-200 select-none ${
                        formData.role === role 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' 
                          : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={handleChange}
                        className="sr-only"
                        disabled={loading}
                      />
                      <span className="font-semibold text-sm capitalize">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Password</label>
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

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Confirm Password</label>
                <div className="relative flex items-center text-zinc-500 focus-within:text-blue-600">
                  <Lock className="absolute left-3.5 w-5 h-5 transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-4 py-2.5 bg-white border shadow-sm rounded-xl outline-none hover:border-zinc-400 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-500/20 transition-all text-zinc-900 placeholder-zinc-400 ${
                      errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300'
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1.5">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms */}
            <div className="pt-2">
              <label className="flex items-start group cursor-pointer">
                <div className="relative flex items-center mt-[3px]">
                  <input type="checkbox" className="peer w-4 h-4 border-2 border-zinc-300 rounded cursor-pointer transition-all outline-none checked:bg-blue-600 checked:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-500/20 appearance-none bg-white" required />
                  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">
                  I agree to the <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3.5 px-4 bg-zinc-900 text-white font-medium rounded-xl transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/20 active:scale-[0.98] flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed hidden' : ''
              }`}
            >
              Create Account
            </button>
            {loading && (
              <button disabled className="w-full mt-6 py-3.5 px-4 bg-zinc-800 text-zinc-400 font-medium rounded-xl flex items-center justify-center gap-3 cursor-not-allowed">
                <div className="w-5 h-5 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin"></div>
                Creating Account...
              </button>
            )}
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

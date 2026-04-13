import React, { useState, useEffect } from 'react'
import { Calendar, Users, CheckCircle, Clock, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

/**
 * Dashboard Component
 * 
 * Serves as the primary landing page after authentication. It displays a high-level 
 * statistical overview of workshop statuses (Total, Accepted, Pending, Participants)
 * and presents an interactive data table of individual workshops.
 * Coordinators are also provided an action button to propose new workshops.
 * 
 * @returns {JSX.Element} The rendered dashboard.
 */
export default function Dashboard() {
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const userRole = localStorage.getItem('userRole')

  useEffect(() => {
    loadWorkshops()
  }, [])

  /**
   * Asynchronously fetches workshop data.
   * Currently uses mock data representing a typical API payload.
   */
  const loadWorkshops = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      setWorkshops([
        {
          id: 1,
          title: 'Python Basics',
          type: 'Programming',
          date: '2026-04-20',
          status: 'accepted',
          coordinator: 'Dr. Smith',
          participants: 45,
        },
        {
          id: 2,
          title: 'Web Development',
          type: 'Web',
          date: '2026-05-10',
          status: 'pending',
          coordinator: 'Prof. Johnson',
          participants: 0,
        },
      ])
    } catch (error) {
      toast.error('Failed to load workshops')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
    }
    return colors[status] || colors.pending
  }

  const getStatusIcon = (status) => {
    const icons = {
      accepted: <CheckCircle size={14} />,
      pending: <Clock size={14} />,
      rejected: <Clock size={14} />,
    }
    return icons[status] || icons.pending
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your workshops and view statistics</p>
        </div>
        {/* Actions */}
        {userRole === 'coordinator' && (
          <div>
            <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm shadow-sm">
              <Plus size={18} />
              Propose New Workshop
            </button>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Workshops', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Accepted', value: '8', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Participants', value: '156', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={22} strokeWidth={2} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100/80 p-1 w-max rounded-lg border border-gray-200/50">
        {['all', 'accepted', 'pending'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === status
                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Workshops Table - Mobile Responsive */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600 mt-4">Loading workshops...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Workshop</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Coordinator</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Participants</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {workshops.map(workshop => (
                  <tr key={workshop.id} className="hover:bg-gray-50/80 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{workshop.title}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{workshop.type}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{new Date(workshop.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{workshop.coordinator}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusColor(workshop.status)}`}>
                        {getStatusIcon(workshop.status)}
                        {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{workshop.participants}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">View Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View - Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {workshops.map(workshop => (
              <div key={workshop.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{workshop.title}</h3>
                    <p className="text-sm text-gray-500">{workshop.type}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workshop.status)}`}>
                    {getStatusIcon(workshop.status)}
                    {workshop.status === 'accepted' ? 'Accepted' : 'Pending'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{new Date(workshop.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Participants</p>
                    <p className="font-medium text-gray-900">{workshop.participants}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <button className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium text-sm">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {workshops.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">No workshops found</p>
          <p className="text-gray-500 text-sm mt-1">Start by creating a new workshop</p>
        </div>
      )}
    </div>
  )
}

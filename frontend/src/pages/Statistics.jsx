import React, { useState } from 'react'
import { BarChart3, Download, Filter } from 'lucide-react'

/**
 * Statistics Component
 * 
 * Displays aggregate data regarding workshops including state-wide distribution
 * and workshop types. Allows coordinators/instructors to filter data by date range
 * and export the current data view to a CSV file.
 * 
 * @returns {JSX.Element} The rendered statistics dashboard view.
 */
export default function Statistics() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    state: '',
    workshopType: '',
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Generates a CSV file from the current workshop statistics data
   * and triggers an automatic browser download. Uses native Blob APIs
   * to avoid heavy external dependencies.
   */
  const handleExportCSV = () => {
    // Determine which data to export (mocking the export of workshop state distribution)
    const headers = ['Region/State', 'Total Workshops', 'Percentage'];
    const data = [
      ['Maharashtra', 45, '28%'],
      ['Karnataka', 32, '20%'],
      ['Delhi', 25, '15%'],
      ['Rajasthan', 20, '12%'],
      ['Others', 39, '25%']
    ];

    // Build the CSV string
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', `workshop_statistics.csv`); // Explicitly setting the attribute
    document.body.appendChild(link);
    link.click();
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workshop Statistics</h1>
        <p className="text-gray-600">View and analyze workshop data</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All States</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Workshop Type</label>
            <select
              name="workshopType"
              value={filters.workshopType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              <option>Python</option>
              <option>Web Development</option>
              <option>Data Science</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="px-5 py-2.5 bg-gray-900 shadow-sm text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
            Apply Filters
          </button>
          <button 
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 shadow-sm text-zinc-700 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors font-medium text-sm"
          >
            <Download size={18} className="text-zinc-500" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* State Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workshops by State</h3>
          <div className="space-y-3">
            {[
              { state: 'Maharashtra', count: 45, percentage: 28 },
              { state: 'Karnataka', count: 32, percentage: 20 },
              { state: 'Delhi', count: 25, percentage: 15 },
              { state: 'Rajasthan', count: 20, percentage: 12 },
              { state: 'Others', count: 39, percentage: 25 },
            ].map((item) => (
              <div key={item.state}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.state}</span>
                  <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Type Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workshops by Type</h3>
          <div className="space-y-3">
            {[
              { type: 'Python', count: 52, percentage: 32 },
              { type: 'Web Development', count: 40, percentage: 25 },
              { type: 'Data Science', count: 35, percentage: 21 },
              { type: 'Mobile Development', count: 22, percentage: 14 },
              { type: 'Others', count: 12, percentage: 8 },
            ].map((item) => (
              <div key={item.type}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-accent-400 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Workshops', value: '161', subtext: 'All time' },
          { label: 'Total Participants', value: '12,847', subtext: 'Estimated' },
          { label: 'Average Per Workshop', value: '79.8', subtext: 'Participants' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

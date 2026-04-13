import React from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Users, Calendar, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function WorkshopDetails() {
  const { id } = useParams()
  
  const workshop = {
    id,
    title: 'Python Basics and Web Development',
    type: 'Programming',
    description: 'Learn the fundamentals of Python programming and web development with hands-on projects.',
    date: '2026-04-20',
    time: '10:00 AM - 2:00 PM',
    location: 'IIT Bombay, Computer Lab 1',
    coordinator: 'Dr. John Doe',
    instructors: ['Prof. Smith', 'Prof. Johnson'],
    participants: 45,
    status: 'accepted',
    termsAndConditions: 'All participants must bring their laptops...',
  }

  return (
    <div className="max-w-4xl">
      {/* Back Button */}
      <Link 
        to="/dashboard" 
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{workshop.title}</h1>
            <p className="text-gray-600 mt-2">{workshop.type} Workshop</p>
          </div>
          <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium text-sm">
            Accepted
          </span>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mt-4">
            <Calendar size={20} className="text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-semibold text-gray-900">{new Date(workshop.date).toLocaleDateString()} {workshop.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <MapPin size={20} className="text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-900">{workshop.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Users size={20} className="text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Participants</p>
              <p className="font-semibold text-gray-900">{workshop.participants} registered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Workshop</h2>
            <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
          </div>

          {/* Organizers */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Organizers</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Coordinator</p>
                <p className="font-semibold text-gray-900">{workshop.coordinator}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Instructors</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {workshop.instructors.map(instructor => (
                    <span key={instructor} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {instructor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
            <p className="text-gray-700 leading-relaxed">{workshop.termsAndConditions}</p>
            <label className="flex items-center gap-2 mt-4">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
            </div>

            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex gap-3 mt-3">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
                  Post Comment
                </button>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Private (visible to organizers only)</span>
                </label>
              </div>
            </div>

            {/* Existing Comments */}
            <div className="space-y-4">
              {[
                { author: 'You', time: '2 hours ago', text: 'Looking forward to this workshop!', isPrivate: false },
                { author: 'Dr. John Doe', time: '1 day ago', text: 'Please bring your laptops with Python installed.', isPrivate: true },
              ].map((comment, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{comment.author}</p>
                    <p className="text-sm text-gray-500">{comment.time}</p>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                  {comment.isPrivate && (
                    <p className="text-xs text-gray-500 mt-2">✓ Private comment</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
                Register
              </button>
              <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm">
                Share
              </button>
              <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm">
                Save
              </button>
            </div>
          </div>

          {/* Workshop Info Card */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Workshop Info</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-600">Type</dt>
                <dd className="font-medium text-gray-900">{workshop.type}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Seats Available</dt>
                <dd className="font-medium text-gray-900">15 / 60</dd>
              </div>
              <div>
                <dt className="text-gray-600">Duration</dt>
                <dd className="font-medium text-gray-900">4 hours</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-3">About FOSSEE</h3>
            <p className="text-sm text-gray-400">
              Free and Open-source Software for Science and Engineering Education
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Statistics</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-400">
              IIT Bombay<br />
              Mumbai, India
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {currentYear} FOSSEE, IIT Bombay. Developed by FOSSEE group, IIT Bombay
          </p>
        </div>
      </div>
    </footer>
  )
}

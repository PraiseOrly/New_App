import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulseIcon, MenuIcon, XIcon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/real_logo.png" alt="CardiacTek Logo" className="h-16 w-21" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            <Link
              to="/for-doctors"
              className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium"
            >
              For Doctors
            </Link>
            <Link
              to="/for-patients"
              className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium"
            >
              For Patients
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Authentication Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/auth"
              className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-semibold"
            >
              Log In
            </Link>
            <Link
              to="/auth"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition-colors duration-300 font-semibold"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <XIcon className="h-7 w-7" aria-hidden="true" /> : <MenuIcon className="h-7 w-7" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg border-t border-gray-200 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          <Link
            to="/for-doctors"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            For Doctors
          </Link>
          <Link
            to="/for-patients"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            For Patients
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="border-t border-gray-200 my-3"></div>
          <Link
            to="/auth"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
          <Link
            to="/auth"
            className="block px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

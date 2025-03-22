import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulseIcon, MenuIcon, XIcon } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <HeartPulseIcon className="h-8 w-8 text-red-600" />
            <span className="font-bold text-xl text-gray-900">CardiacTek</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/for-doctors" className="text-gray-700 hover:text-red-600 transition-colors">
              For Doctors
            </Link>
            <Link to="/for-patients" className="text-gray-700 hover:text-red-600 transition-colors">
              For Patients
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-red-600 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
              Contact
            </Link>
          </div>
          {/* Authentication Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth" className="text-gray-700 hover:text-red-600 transition-colors">
              Log In
            </Link>
            <Link to="/auth" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
              Sign Up
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-red-600 focus:outline-none">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/for-doctors" className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md" onClick={() => setIsMenuOpen(false)}>
              For Doctors
            </Link>
            <Link to="/for-patients" className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md" onClick={() => setIsMenuOpen(false)}>
              For Patients
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            <Link to="/auth" className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Log In
            </Link>
            <Link to="/auth" className="block px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>}
    </nav>;
};
export default Navbar;
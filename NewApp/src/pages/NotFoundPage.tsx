import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, HeartPulseIcon } from 'lucide-react';
const NotFoundPage = () => {
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-red-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 H30 L40 30 L50 70 L60 30 L70 70 L80 50 H90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-20" />
            <path d="M10 50 H30 L40 30 L50 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 70 L60 30 L70 70 L80 50 H90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
          </svg>
        </div>
        <HeartPulseIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved. Your
          heart health matters to us, so let's get you back on track.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/" className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
            <HomeIcon className="h-4 w-4 mr-2" />
            Homepage
          </Link>
          <Link to="/contact" className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>;
};
export default NotFoundPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircleIcon, RefreshCwIcon, HomeIcon } from 'lucide-react';
const ErrorPage = () => {
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <AlertCircleIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-3">System Error</h1>
        <p className="text-gray-600 mb-6">
          We've encountered a technical issue. Our team has been notified and is
          working to resolve it.
        </p>
        <div className="space-y-4">
          <button onClick={() => window.location.reload()} className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Try Again
          </button>
          <Link to="/" className="flex items-center justify-center w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors">
            <HomeIcon className="h-4 w-4 mr-2" />
            Return to Homepage
          </Link>
        </div>
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-gray-700 mb-2">Error Details</h3>
          <p className="text-sm text-gray-600">
            Error ID:{' '}
            <span className="font-mono">
              ERR-{Math.random().toString(36).substr(2, 9)}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please quote this ID if contacting support.
          </p>
        </div>
      </div>
    </div>;
};
export default ErrorPage;
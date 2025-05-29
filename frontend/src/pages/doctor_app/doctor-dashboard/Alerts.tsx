import React from 'react';
import Navbar from '../../components/Navbar';
import { AlertCircleIcon, XIcon } from 'lucide-react';

const Alerts: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Priority Alerts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Stay informed about critical patient alerts requiring your immediate attention.
          </p>
        </div>
      </section>

      {/* Alerts List */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-300 rounded-lg p-6 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <AlertCircleIcon className="text-red-600 w-8 h-8" />
              <div>
                <p className="font-semibold text-red-900">Critical: Jane Smith</p>
                <p className="text-red-700">Troponin Elevated - 0.5 ng/mL</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-900 font-medium">
              View Details
            </button>
          </div>
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <AlertCircleIcon className="text-yellow-600 w-8 h-8" />
              <div>
                <p className="font-semibold text-yellow-900">Overdue Follow-up</p>
                <p className="text-yellow-700">3 Patients Pending Review</p>
              </div>
            </div>
            <button className="text-yellow-600 hover:text-yellow-900 font-medium">
              View List
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-auto">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CardiacAI. For professional use only.</p>
          <nav className="flex gap-4 text-sm text-gray-400 mt-4 sm:mt-0">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms" className="hover:text-white">Terms of Use</a>
            <a href="/contact" className="hover:text-white">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Alerts;

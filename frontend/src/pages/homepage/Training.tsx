import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Homepage/Navbar";
import { UserCheckIcon, ChevronDownIcon, XIcon, PlayCircleIcon } from "lucide-react";

import { LazyImage, Slideshow, ResourceModal } from "../../components/shared/ResourceModal";

const Training: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        .animate-progress { animation: drawCircle 2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drawCircle { from { stroke-dashoffset: 440; } to { stroke-dashoffset: 0; } }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
                Training Programs
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
                Empower your team with our certified training modules on AI-driven cardiac diagnostics.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
              >
                Register for Training
              </button>
            </div>
            <div className="lg:w-1/2">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Circle */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 animate-fade-in">
            Training Progress
          </h2>
          <div className="animate-slide-up">
            <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20" />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#b91c1c"
                strokeWidth="20"
                strokeDasharray="440"
                strokeDashoffset="440"
                className="animate-progress"
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="110" textAnchor="middle" fill="#b91c1c" fontSize="24">
                100%
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* CTA and Footer */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Train Your Team</h2>
          <Link to="/demo" className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto">
            <PlayCircleIcon className="w-5 h-5" />
            Request Demo
          </Link>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <UserCheckIcon className="w-6 h-6 text-red-600" />
            <span className="text-sm font-medium">CardiacAI © {new Date().getFullYear()}</span>
          </div>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </footer>
      <ResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Training;
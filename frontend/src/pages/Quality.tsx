import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircleIcon, ChevronDownIcon, XIcon, DownloadIcon } from "lucide-react";

import { LazyImage, Slideshow, ResourceModal } from "../components/ResourceModal";

const Quality: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        .animate-check { animation: fillCheck 1s forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fillCheck { from { transform: scale(0); } to { transform: scale(1); } }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
                Quality Management
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
                Our ISO 13485-certified processes ensure the highest standards in medical device quality.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
              >
                <DownloadIcon className="w-5 h-5" />
                Download Certification
              </button>
            </div>
            <div className="lg:w-1/2">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Our Quality Standards
          </h2>
          <div className="space-y-4 animate-slide-up">
            {["ISO 13485 Compliance", "Regular Audits", "Continuous Improvement"].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-red-600 animate-check" style={{ animationDelay: `${index * 0.2}s` }} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA and Footer */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Committed to Quality</h2>
          <Link to="/contact" className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto">
            Contact Us
          </Link>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <CheckCircleIcon className="w-6 h-6 text-red-600" />
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

export default Quality;
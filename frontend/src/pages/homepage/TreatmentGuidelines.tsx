import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Homepage/Navbar";
import { HeartIcon, ChevronDownIcon, XIcon, DownloadIcon } from "lucide-react";

import { LazyImage, Slideshow, ResourceModal } from "../../components/shared/ResourceModal";

const TreatmentGuidelines: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const guidelines = [
    {
      title: "Atrial Fibrillation Treatment",
      category: "Arrhythmia",
      description: "Protocols for anticoagulation and rate control.",
    },
    {
      title: "Heart Failure Management",
      category: "Heart Failure",
      description: "Guidelines for ACE inhibitors and beta-blockers.",
    },
    {
      title: "Hypertension Therapy",
      category: "Hypertension",
      description: "Stepwise approach to blood pressure management.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        .animate-pathway { animation: pulsePath 2s infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulsePath { 0% { stroke-opacity: 0.5; } 50% { stroke-opacity: 1; } 100% { stroke-opacity: 0.5; } }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
                Treatment Guidelines
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
                Evidence-based protocols for managing cardiac conditions, aligned with AHA/ACC standards.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
              >
                <DownloadIcon className="w-5 h-5" />
                Download Guidelines
              </button>
            </div>
            <div className="lg:w-1/2">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* Guideline Cards */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Explore Treatment Guidelines
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            {["all", "Arrhythmia", "Heart Failure", "Hypertension"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  filter === category.toLowerCase() ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines
              .filter((guideline) => filter === "all" || guideline.category.toLowerCase() === filter)
              .map((guideline, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{guideline.title}</h3>
                  <p className="text-gray-600 text-sm">{guideline.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Pathway Diagram */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Treatment Pathway
          </h2>
          <svg className="w-full h-64" viewBox="0 0 400 200">
            <rect x="50" y="20" width="80" height="40" fill="#fee2e2" rx="8" />
            <text x="90" y="45" text-anchor="middle" fill="#b91c1c" font-size="12">Diagnosis</text>
            <rect x="270" y="20" width="80" height="40" fill="#fee2e2" rx="8" />
            <text x="310" y="45" text-anchor="middle" fill="#b91c1c" font-size="12">Treatment</text>
            <path
              d="M130 40 H270"
              stroke="#b91c1c"
              stroke-width="2"
              fill="none"
              className="animate-pathway"
            />
          </svg>
        </div>
      </section>

      {/* CTA and Footer */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Access More Guidelines</h2>
          <Link to="/clinical-guidance" className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto">
            View Clinical Guidance
          </Link>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <HeartIcon className="w-6 h-6 text-red-600" />
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

export default TreatmentGuidelines;
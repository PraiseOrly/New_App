import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Homepage/Navbar";
import { TrendingUpIcon, ChevronDownIcon, XIcon, DownloadIcon, PlayCircleIcon } from "lucide-react";

import { LazyImage, Slideshow, ResourceModal } from "../../components/shared/ResourceModal";

const LongitudinalTracking: React.FC = () => {
  const [trendIndex, setTrendIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trends = [
    { src: "https://images.pexels.com/photos/8460041/pexels-photo-8460041.jpeg", alt: "6-month trend" },
    { src: "https://images.pexels.com/photos/4164760/pexels-photo-4164760.jpeg", alt: "12-month trend" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        .animate-chart { animation: drawLine 2s infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drawLine { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
                Longitudinal Patient Tracking
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
                Monitor ECG trends, medication impacts, and disease progression with our AI-driven analytics.
              </p>
              <Link
                to="/demo"
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
              >
                <PlayCircleIcon className="w-5 h-5" />
                Request Demo
              </Link>
            </div>
            <div className="lg:w-1/2">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* Trend Slider */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Visualize Patient Trends
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            {trends.map((_, index) => (
              <button
                key={index}
                onClick={() => setTrendIndex(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  trendIndex === index ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index === 0 ? "6 Months" : "12 Months"}
              </button>
            ))}
          </div>
          <LazyImage
            src={trends[trendIndex].src}
            alt={trends[trendIndex].alt}
            className="rounded-xl shadow-lg w-full max-w-2xl mx-auto h-auto"
            width={800}
            height={400}
          />
        </div>
      </section>

      {/* Animated Chart */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Trend Analysis
          </h2>
          <svg className="w-full h-32 bg-white rounded-xl shadow-md" viewBox="0 0 200 50">
            <path
              className="animate-chart"
              d="M0 40 L50 30 L100 20 L150 35 L200 25"
              stroke="#b91c1c"
              stroke-width="2"
              fill="none"
              stroke-dasharray="100"
            />
          </svg>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Explore Longitudinal Tracking
            </h2>
            <p className="text-base sm:text-lg mb-6">
              Schedule a demo to see our tracking tools in action.
            </p>
            <Link
              to="/demo"
              className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalistic Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <TrendingUpIcon className="w-6 h-6 text-red-600" />
            <span className="text-sm font-medium">CardiacAI © {new Date().getFullYear()}</span>
          </div>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>

      <ResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LongitudinalTracking;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BookOpenIcon, ChevronDownIcon, XIcon } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  eager?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  eager = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (eager) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = imgRef.current.dataset.src!;
            imgRef.current.removeAttribute("data-src");
            observer.unobserve(imgRef.current);
          }
        });
      },
      { rootMargin: "100px 0px", threshold: 0.01 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [eager]);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
    />
  );
};

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

const Slideshow: React.FC = () => {
  const slides: Slide[] = [
    {
      src: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Research lab",
      caption: "Cutting-Edge Research",
    },
    {
      src: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Medical study",
      caption: "Advancing Diagnostics",
    },
    {
      src: "https://images.pexels.com/photos/4164760/pexels-photo-4164760.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Clinical dashboard",
      caption: "Data-Driven Insights",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <LazyImage
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            width={1200}
            height={400}
            eager={index === 0}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
            <h3 className="text-white text-lg sm:text-2xl font-bold">{slide.caption}</h3>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            } hover:bg-white/80 transition-colors duration-300`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Research: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const research = [
    {
      title: "AI in Arrhythmia Detection",
      category: "Cardiology",
      description: "Study on AI accuracy in detecting arrhythmias with 98.7% precision.",
    },
    {
      title: "ECG Trend Analysis",
      category: "Analytics",
      description: "Longitudinal ECG data analysis for improved patient outcomes.",
    },
    {
      title: "Heart Failure Prediction",
      category: "Cardiology",
      description: "Machine learning models for early heart failure detection.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        .animate-card {
          transition: transform 0.3s ease;
        }
        .animate-card:hover {
          transform: scale(1.05);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
                Cutting-Edge Research
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
                Explore our ongoing studies advancing cardiac diagnostics and patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/research-library"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
                >
                  Visit Research Library
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* Research Topics */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Research Topics
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            {["all", "Cardiology", "Analytics"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  filter === category.toLowerCase()
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {research
              .filter((item) => filter === "all" || item.category.toLowerCase() === filter)
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-card animate-slide-up"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <Link
                    to="/research-library"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Dive into Our Research
            </h2>
            <p className="text-base sm:text-lg mb-6">
              Visit our research library for detailed studies and publications.
            </p>
            <Link
              to="/research-library"
              className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              Explore Library
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalistic Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <BookOpenIcon className="w-6 h-6 text-red-600" />
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
    </div>
  );
};

export default Research;
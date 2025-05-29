import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LibraryIcon, ChevronDownIcon, XIcon, DownloadIcon } from "lucide-react";

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
      src: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Medical library",
      caption: "Knowledge Hub",
    },
    {
      src: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Research papers",
      caption: "Curated Publications",
    },
    {
      src: "https://images.pexels.com/photos/4164760/pexels-photo-4164760.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Clinical data",
      caption: "Evidence-Based Insights",
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

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Close modal"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Download Bibliography</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Access our curated bibliography of cardiac research publications.
        </p>
        <a
          href="/resources/bibliography.pdf"
          download
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
        >
          Download Now
          <DownloadIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const ResearchLibrary: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const publications = [
    {
      title: "AI-Driven Arrhythmia Detection",
      abstract: "A study on AI models achieving 98.7% accuracy in arrhythmia detection.",
      doi: "10.1000/xyz123",
    },
    {
      title: "Longitudinal ECG Analysis",
      abstract: "Analysis of ECG trends for predictive diagnostics.",
      doi: "10.1000/xyz124",
    },
    {
      title: "Heart Failure Prediction Models",
      abstract: "Machine learning approaches for early heart failure detection.",
      doi: "10.1000/xyz125",
    },
  ];

  const filteredPublications = publications.filter((pub) =>
    pub.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        .animate-flip {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .animate-flip:hover {
          transform: rotateY(180deg);
        }
        .flip-back {
          transform: rotateY(180deg);
          backface-visibility: hidden;
        }
        .flip-front {
          backface-visibility: hidden;
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
                Research Library
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
                Access our curated collection of cardiac research publications and studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Bibliography
                </button>
                <Link
                  to="/research"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
                >
                  Explore Research
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* Searchable Database */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Search Publications
          </h2>
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-700"
              aria-label="Search publications"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((pub, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-xl shadow-md h-64 animate-flip animate-slide-up"
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between flip-front">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{pub.abstract}</p>
                  </div>
                  <p className="text-gray-500 text-sm">DOI: {pub.doi}</p>
                </div>
                <div className="absolute inset-0 p-6 bg-red-600 text-white flex items-center justify-center flip-back">
                  <Link
                    to="/research"
                    className="text-white font-medium hover:underline"
                  >
                    View Full Study
                  </Link>
                </div>
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
              Explore More Research
            </h2>
            <p className="text-base sm:text-lg mb-6">
              Dive into our ongoing studies and contribute to cardiac advancements.
            </p>
            <Link
              to="/research"
              className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              View Research
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalistic Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <LibraryIcon className="w-6 h-6 text-red-600" />
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

      {/* Resource Modal */}
      <ResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ResearchLibrary;
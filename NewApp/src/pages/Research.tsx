import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BookOpenIcon, ChevronDownIcon, PlayIcon, PauseIcon, MailIcon } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
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
            height={500}
            eager={index === 0}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
            <h3 className="text-white text-xl sm:text-3xl font-bold">{slide.caption}</h3>
          </div>
        </div>
      ))}
      <button
        onClick={togglePlay}
        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 focus:ring-2 focus:ring-red-600 focus:outline-none"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
              index === currentSlide ? "bg-red-600 scale-125" : "bg-white/50 hover:scale-110"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </div>
  );
};

const Research: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const research = [
    {
      title: "AI in Arrhythmia Detection",
      category: "Cardiology",
      description: "Study on AI accuracy in detecting arrhythmias with 98.7% precision.",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "ECG Trend Analysis",
      category: "Analytics",
      description: "Longitudinal ECG data analysis for improved patient outcomes.",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Heart Failure Prediction",
      category: "Cardiology",
      description: "Machine learning models for early heart failure detection.",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      alert("Subscribed to newsletter!");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .animate-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .animate-card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 to-white z-0" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block bg-yellow-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              All Research is Still in Progress
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Pioneering Cardiac Research
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our research is ongoing with no publications yet. Reach out to learn more.
            </p>
          </div>
          <Slideshow />
          <div className="flex justify-center mt-8 animate-fade-in">
            <Link
              to="/contact"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Research Topics */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Ongoing Research Projects</h2>
            <p className="text-gray-600 text-sm">No publications available; all projects are in progress.</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="relative sm:hidden">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none w-40 py-2.5 px-4 pr-8 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-red-600 focus:border-red-600"
                aria-label="Filter research by category"
              >
                <option value="all">All</option>
                <option value="cardiology">Cardiology</option>
                <option value="analytics">Analytics</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <div className="hidden sm:flex gap-3">
              {["all", "Cardiology", "Analytics"].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category.toLowerCase())}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    filter === category.toLowerCase()
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  } focus:ring-2 focus:ring-red-600 focus:ring-offset-2`}
                  aria-pressed={filter === category.toLowerCase()}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {research
              .filter((item) => filter === "all" || item.category.toLowerCase() === filter)
              .map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white p-5 rounded-2xl shadow-lg animate-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-4 right-4 bg-yellow-500/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                    In Progress
                  </div>
                  <LazyImage
                    src={item.image}
                    alt={`${item.title} illustration`}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    width={400}
                    height={160}
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4">Stay Updated on Our Research</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Our cardiac research is ongoing with no publications available. Subscribe to our newsletter or contact us for updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-300 inline-flex items-center gap-2 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
              >
                Contact Us
              </Link>
              <button
                onClick={() => document.getElementById("newsletter-form")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-8 rounded-full transition-colors duration-300 inline-flex items-center gap-2 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
              >
                Subscribe
                <MailIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpenIcon className="w-6 h-6 text-red-600" />
                <span className="text-lg font-semibold">CardiacAI</span>
              </div>
              <p className="text-sm text-gray-400">
                Advancing cardiac care through cutting-edge research.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav className="flex flex-col gap-2 text-sm text-gray-400">
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
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  aria-label="Email for newsletter"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Subscribe to newsletter"
                >
                  <MailIcon className="h-5 w-5" />
                </button>
              </form>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Follow us on Twitter/X"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            © {new Date().getFullYear()} CardiacAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Research;
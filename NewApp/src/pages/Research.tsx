import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  HeartPulseIcon,
  LinkedinIcon,
  TwitterIcon,
  XIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Slideshow: React.FC = () => {
  const slides = [
    {
      id: 1,
      image: "/innovate.jpg",
      alt: "Innovate Slide",
      caption: "Innovating Cardiac Care with AI",
    },
    {
      id: 2,
      image: "/cardiacteklogo.jpg",
      alt: "CardiacTek Logo Slide",
      caption: "Trusted Cardiac Technology",
    },
    {
      id: 3,
      image: "/image.png",
      alt: "Research Slide",
      caption: "Cutting-edge Research and Development",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
      <img
        src={slides[currentIndex].image}
        alt={slides[currentIndex].alt}
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
        {slides[currentIndex].caption}
      </div>
    </div>
  );
};

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
          src={eager ? src : undefined}
          data-src={eager ? undefined : src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
        />
      );
};

interface ResearchItem {
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
}

interface ResearchCardProps {
  item: ResearchItem;
  onLearnMore: () => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ item, onLearnMore }) => (
  <div className="bg-red-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <LazyImage
      src={item.image}
      alt={`${item.title} illustration`}
      className="w-full h-48 object-cover rounded-lg mb-4"
      width={400}
      height={192}
    />
    <div className="absolute top-4 right-4 bg-yellow-600 text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
      {item.status}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
    <LearnMoreButton onClick={onLearnMore} label="Learn More" />
  </div>
);

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  status: string;
  link?: string;
}

const ResearchModal: React.FC<ResearchModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  status,
  link,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Close modal"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">Status: {status}</p>
        <p className="text-gray-600 mb-6 leading-relaxed">{content}</p>
        {link && (
          <Link
            to={link}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
          >
            Explore More
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

const LearnMoreButton: React.FC<{
  onClick: () => void;
  label: string;
}> = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="group inline-flex items-center gap-2 text-red-600 font-medium py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
  >
    <span>{label}</span>
    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
  </button>
);

const Research: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
    status: string;
    link?: string;
  }>({
    isOpen: false,
    title: "",
    content: "",
    status: "",
    link: "",
  });

  const research: ResearchItem[] = [
    {
      title: "AI Arrhythmia Detection",
      category: "Cardiology",
      description: "Deep learning for 98.7% arrhythmia detection.",
      image: "advanced.jpg",
      status: "In Progress",
    },
    {
      title: "ECG Trend Analysis",
      category: "Analytics",
      description: "Algorithms for ECG data analysis.",
      image: "insights.jpg",
      status: "Data Collection",
    },
    {
      title: "Heart Failure Prediction",
      category: "Cardiology",
      description: "ML models for heart failure risk prediction.",
      image: "trusted.png",
      status: "In Progress",
    },
    
  ];

  const openModal = (title: string, content: string, status: string, link?: string) => {
    setModalState({ isOpen: true, title, content, status, link });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: "", content: "", status: "", link: "" });
  };

  const clearFilter = () => setFilter("all");

  return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<style>{`
        html { scroll-behavior: smooth; }
        .animate-pulse-dot::after {
          content: '';
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          margin-left: 0.5rem;
          background-color: #dc2626;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
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
			<section
				className="mt-12 bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4 sm:py-16"
				aria-labelledby="hero-heading">
				<div className="container mx-auto max-w-7xl">
					<div className="flex flex-col lg:flex-row items-center gap-8">
						<div className="mt-12 lg:w-[700px] text-center lg:text-left">
							<div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-sm animate-fade-in">
								<span className="text-red-600 font-medium animate-pulse-dot">
									AI Research Hub
								</span>
							</div>
							<h1
								id="hero-heading"
								className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
								Advancing Cardiac Research{" "}
								<span className="text-red-600">with AI</span>
							</h1>
							<p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
								Explore cutting-edge AI-driven cardiology studies.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative left-16">
								<button
									onClick={() =>
										document
											.getElementById("research-projects")
											?.scrollIntoView({ behavior: "smooth" })
									}
									className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in">
									Explore Research
								</button>
							</div>
						</div>
						<div className="mt-12 lg:w-[700px]">
							<Slideshow />
						</div>
					</div>
				</div>
			</section>
			{/* Research Projects Section */}
			<section className="py-12 px-4 bg-white" id="research-projects">
				<div className="container mx-auto max-w-7xl">
					<div className="text-center mb-8">
						<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 animate-fade-in">
							Our Research Projects
						</h2>
						<p className="text-gray-600 max-w-xl mx-auto animate-fade-in">
							Discover ongoing AI-driven cardiac studies.
						</p>
					</div>
					<div
						className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
						role="tablist"
						aria-label="Research category filters">
						<div className="relative sm:hidden w-full max-w-xs">
							<select
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
								className="appearance-none w-full py-3 px-4 pr-8 bg-white/80 backdrop-blur-md border border-gray-300 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-red-600 focus:border-red-600"
								aria-label="Filter research by category">
								<option value="all">All Categories</option>
								<option value="cardiology">Cardiology</option>
								<option value="analytics">Analytics</option>
							</select>
							<ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
						</div>
						<div className="hidden sm:flex gap-3">
							{["All", "Cardiology", "Analytics"].map((category) => (
								<button
									key={category}
									onClick={() => setFilter(category.toLowerCase())}
									className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
										filter === category.toLowerCase()
											? "bg-red-600 text-white shadow-md"
											: "bg-white/80 backdrop-blur-md text-gray-700 border border-gray-300 hover:bg-red-100"
									} focus:ring-2 focus:ring-red-600 focus:ring-offset-2`}
									aria-pressed={filter === category.toLowerCase()}
									role="tab"
									aria-selected={filter === category.toLowerCase()}>
									{category}
								</button>
							))}
						</div>
						<button
							onClick={clearFilter}
							className="text-red-600 hover:text-red-700 font-medium text-sm underline focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
							aria-label="Clear filter">
							Clear Filter
						</button>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{research
							.filter(
								(item) =>
									filter === "all" || item.category.toLowerCase() === filter
							)
							.map((item, index) => (
								<div
									key={index}
									className="animate-slide-up"
									style={{ animationDelay: `${index * 0.1}s` }}>
									<ResearchCard
										item={item}
										onLearnMore={() =>
											openModal(
												item.title,
												item.description,
												item.status,
												"/contact"
											)
										}
									/>
								</div>
							))}
					</div>
				</div>
			</section>

			{/* Research Impact Section */}
			<section className="py-12 px-4 bg-gray-50">
				<div className="container mx-auto max-w-7xl">
					<div className="flex flex-col lg:flex-row items-center gap-8">
						<div className="lg:w-1/2 order-2 lg:order-1">
							<LazyImage
								src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="AI cardiac research innovation"
								className="w-full h-[250px] sm:h-[350px] object-cover rounded-xl shadow-lg"
								width={600}
								height={350}
								eager
							/>
						</div>
						<div className="lg:w-1/2 order-1 lg:order-2">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 animate-fade-in">
								Impact of AI in Cardiology
							</h2>
							<p className="text-gray-600 mb-4 text-sm sm:text-base animate-fade-in">
								Our research drives innovation in cardiac care.
							</p>
							<ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm sm:text-base mb-4 animate-fade-in">
								<li>98.7% accuracy in arrhythmia detection</li>
								<li>Real-time monitoring with wearables</li>
								<li>Predictive models for heart failure</li>
								<li>Advanced ECG trend analysis</li>
							</ul>
							<LearnMoreButton
								onClick={() =>
									openModal(
										"Research Impact",
										"Our AI-driven research achieves 98.7% accuracy in arrhythmia detection, enables real-time monitoring via wearables, predicts heart failure risks, and enhances ECG trend analysis.",
										"In Progress",
										"/contact"
									)
								}
								label="Discover Impact"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
				<div className="container mx-auto max-w-4xl text-center">
					<div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm animate-fade-in">
						<h2 className="text-2xl sm:text-3xl font-bold mb-3">
							Join Our Research Mission
						</h2>
						<p className="text-base sm:text-lg mb-6">
							Collaborate to advance cardiac care.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/contact"
								className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
								<HeartPulseIcon className="w-5 h-5" />
								Contact Us
							</Link>
							<Link
								to="/subscribe"
								className="border-2 border-white hover:bg-white/20 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300">
								Subscribe
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 bg-opacity-95 py-12 px-4 sm:px-6 md:px-8">
				<div className="container mx-auto max-w-7xl">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
						<div>
							<img
								src="/real_logo.png"
								alt="CardiacTek Logo"
								className="w-24 h-auto mb-4 rounded transition-all duration-300 hover:shadow-[0_0_10px_rgba(220,38,38,0.3)]"
							/>
							<p className="text-gray-400 text-sm max-w-xs leading-relaxed">
								AI-driven cardiac care.
							</p>
							<div className="flex gap-4 mt-4">
								<a
									href="https://twitter.com"
									className="text-gray-400 hover:text-red-600 transition-all duration-300 hover:scale-105"
									aria-label="Twitter">
									<TwitterIcon className="h-5 w-5" />
								</a>
								<a
									href="https://linkedin.com"
									className="text-gray-400 hover:text-red-600 transition-all duration-300 hover:scale-105"
									aria-label="LinkedIn">
									<LinkedinIcon className="h-5 w-5" />
								</a>
							</div>
						</div>
						<div>
							<h4 className="font-semibold mb-4 text-base border-b border-red-600 pb-2 leading-tight">
								Clinical Tools
							</h4>
							<ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
								<li>
									<Link
										to="/ecg-analysis"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										ECG Analysis
									</Link>
								</li>
								<li>
									<Link
										to="/risk-assessment"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										Risk Assessment
									</Link>
								</li>
								<li>
									<Link
										to="/treatment-guidelines"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										Treatment Guidelines
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4 text-base border-b border-red-600 pb-2 leading-tight">
								Resources
							</h4>
							<ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
								<li>
									<Link
										to="/clinical-guidance"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										Clinical Guidance
									</Link>
								</li>
								<li>
									<Link
										to="/research-library"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										Research Library
									</Link>
								</li>
								<li>
									<Link
										to="/training"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										Clinician Training
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4 text-base border-b border-red-600 pb-2 leading-tight">
								Compliance
							</h4>
							<ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
								<li>
									<Link
										to="/hipaa"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										HIPAA Compliance
									</Link>
								</li>
								<li>
									<Link
										to="/gdpr"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										GDPR
									</Link>
								</li>
								<li>
									<Link
										to="/quality"
										className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
										Quality Management
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-red-600 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
						<p className="leading-relaxed">
							© {new Date().getFullYear()} CardiacTek. For professional use.
						</p>
						<div className="flex gap-6 mt-3 sm:mt-0">
							<Link
								to="/privacy"
								className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
								Privacy Policy
							</Link>
							<Link
								to="/terms"
								className="hover:text-red-600 hover:underline hover:scale-105 transition-all duration-300 font-medium">
								Terms of Use
							</Link>
							<button
								onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
								className="hover:text-red-600 transition-all duration-300 font-medium flex items-center gap-2 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900"
								aria-label="Back to top">
								<ArrowUpIcon className="h-5 w-5" />
								Back to Top
							</button>
						</div>
					</div>
				</div>
			</footer>

			{/* Research Modal */}
			<ResearchModal
				isOpen={modalState.isOpen}
				onClose={closeModal}
				title={modalState.title}
				content={modalState.content}
				status={modalState.status}
				link={modalState.link}
			/>
		</div>
	);
};

export default Research;
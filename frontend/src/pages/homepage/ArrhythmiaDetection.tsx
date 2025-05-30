import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Homepage/Navbar";
import RequestDemoModal from "../../components/Homepage/RequestDemoModal";
import Footer from "../../components/Homepage/Footer";
import {
	HeartPulseIcon,
	ChevronDownIcon,
	XIcon,
	DownloadIcon,
	PlayCircleIcon,
	ArrowRightIcon,
} from "lucide-react";

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
			data-src={src}
			alt={alt}
			width={width}
			height={height}
			className={`${className} ${
				isLoaded ? "opacity-100" : "opacity-0"
			} transition-opacity duration-500`}
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
			src: "/advanced.jpg",
			alt: "Advanced cardiac technology",
			caption: "Precision Arrhythmia Detection",
		},
		{
			src: "/innovate.jpg",
			alt: "Arrhythmia detection technology",
			caption: "AI-Powered Arrhythmia Detection",
		},
		{
			src: "/insights.jpg",
			alt: "Medical insights and data",
			caption: "Real-Time Diagnostics",
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
						index === currentSlide
							? "opacity-100 scale-100"
							: "opacity-0 scale-105"
					}`}>
					<LazyImage
						src={slide.src}
						alt={slide.alt}
						className="w-full h-full object-cover"
						width={1200}
						height={400}
						eager={true}
					/>
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
						<h3 className="text-white text-lg sm:text-2xl font-bold">
							{slide.caption}
						</h3>
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
					aria-label="Close modal">
					<XIcon className="w-6 h-6" />
				</button>
				<h3 className="text-2xl font-bold text-gray-900 mb-4">
					Download Resource
				</h3>
				<p className="text-gray-600 mb-6 leading-relaxed">
					Download our guide on AI-driven arrhythmia detection, including case
					studies and technical insights.
				</p>
				<a
					href="/resources/arrhythmia-guide.pdf"
					download
					className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2">
					Download Now
					<DownloadIcon className="w-4 h-4" />
				</a>
			</div>
		</div>
	);
};

const ArrhythmiaDetectionPage: React.FC = () => {
	const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [requestDemoOpen, setRequestDemoOpen] = useState(false);

	const toggleFaq = (index: number) => {
		setActiveFaqIndex(activeFaqIndex === index ? null : index);
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<style>{`
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
			<section className="mt-16 bg-gradient-to-br from-red-50 to-white py-12 px-4">
				<div className="container mx-auto max-w-7xl">
					<div className="flex flex-col lg:flex-row items-center gap-8">
						<div className="lg:w-1/2 text-center lg:text-left">
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
								Advanced Arrhythmia Detection
							</h1>
							<p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
								Our AI achieves 98.7% sensitivity in identifying cardiac
								arrhythmias, supporting clinicians with precise diagnostics.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-start lg:justify-start">
								<button
									onClick={() => setRequestDemoOpen(true)}
									className="bg-red-600 text-white  font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
									<PlayCircleIcon className="w-5 h-5" />
									Request Demo
								</button>
							</div>
						</div>
						<div className="lg:w-1/2">
							<Slideshow />
						</div>
					</div>
				</div>
			</section>

			{/* Details Section */}
			<section className="py-12 px-4 bg-white">
				<div className="container mx-auto max-w-7xl">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="order-2 lg:order-1">
						<img
							src="/advanced.jpg"
							alt="Arrhythmia visualization image"
							className="rounded-xl shadow-lg w-full h-auto object-cover"
						/>
						</div>
						<div className="order-1 lg:order-2">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
								How Our AI Detects Arrhythmias
							</h2>
							<p className="text-gray-600 mb-4 text-sm sm:text-base animate-fade-in">
								Our deep learning models identify subtle patterns indicative of
								arrhythmias, such as atrial fibrillation, ventricular
								tachycardia, and more, with 98.7% sensitivity.
							</p>
							<ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm sm:text-base mb-4 animate-fade-in">
								<li>Real-time arrhythmia pattern recognition</li>
								<li>Automated alerts for critical rhythms</li>
								<li>Clinician-verified results</li>
							</ul>
							{/* <Link
								to="/arrhythmia-detection"
								className="inline-flex items-center gap-2 text-red-600 font-medium py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-300 animate-fade-in">
								Explore Arrhythmia Detection
								<ArrowRightIcon className="w-4 h-4" />
							</Link> */}
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-12 px-4 bg-gray-50">
				<div className="container mx-auto max-w-3xl">
					<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						{[
							{
								question: "What types of arrhythmias can the AI detect?",
								answer:
									"Our AI detects a wide range of arrhythmias, including atrial fibrillation, ventricular tachycardia, bradycardia, and supraventricular tachycardia, with high accuracy.",
							},
							{
								question: "How does the system ensure accuracy?",
								answer:
									"The AI uses deep learning to identify patterns and is validated by cardiologists, ensuring 98.7% sensitivity in arrhythmia detection.",
							},
							{
								question: "Can the system integrate with hospital systems?",
								answer:
									"Yes, our platform supports standard healthcare protocols for seamless integration with hospital workflows.",
							},
						].map((faq, index) => (
							<div
								key={index}
								className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md animate-fade-in"
								role="region"
								aria-labelledby={`faq-question-${index}`}>
								<button
									onClick={() => toggleFaq(index)}
									className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-600"
									aria-expanded={activeFaqIndex === index}
									aria-controls={`faq-answer-${index}`}>
									<h3
										id={`faq-question-${index}`}
										className="text-lg font-medium text-gray-900">
										{faq.question}
									</h3>
									<ChevronDownIcon
										className={`h-6 w-6 text-red-600 transform transition-transform duration-300 ${
											activeFaqIndex === index ? "rotate-180" : ""
										}`}
									/>
								</button>
								<div
									id={`faq-answer-${index}`}
									className={`overflow-hidden transition-all duration-300 ${
										activeFaqIndex === index
											? "max-h-[500px] opacity-100"
											: "max-h-0 opacity-0"
									}`}>
									<div className="px-6 pb-4 pt-2 border-t border-gray-100">
										<p className="text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<Footer />

			{/* Resource Modal */}
			<ResourceModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>

			<RequestDemoModal
				isOpen={requestDemoOpen}
				onClose={() => setRequestDemoOpen(false)}
			/>
		</div>
	);
};

export default ArrhythmiaDetectionPage;

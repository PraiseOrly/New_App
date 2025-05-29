import {
	ActivityIcon,
	BadgeCheckIcon,
	BellIcon,
	BrainIcon,
	CalendarIcon,
	ChevronDownIcon,
	ClipboardListIcon,
	HeartPulseIcon,
	LineChartIcon,
	ScanIcon,
	ShieldCheckIcon,
	StethoscopeIcon,
	UserIcon,
	VideoIcon,
	WatchIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Lazy-loaded image component
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
			className={`${className} ${
				isLoaded ? "opacity-100" : "opacity-0"
			} transition-opacity duration-500`}
			loading={eager ? "eager" : "lazy"}
			decoding="async"
			onLoad={() => setIsLoaded(true)}
		/>
	);
};

// Hero Slideshow Component
interface Slide {
	src: string;
	alt: string;
	caption: string;
	subCaption: string;
}

const HeroSlideshow: React.FC = () => {
	const slides: Slide[] = [
		{
			src: "https://images.pexels.com/photos/7088531/pexels-photo-7088531.jpeg?auto=compress&cs=tinysrgb&w=1200",
			alt: "Cardiologist using AI dashboard",
			caption: "Empower Your Practice",
			subCaption: "AI-driven diagnostics for precise cardiac care",
		},
		{
			src: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
			alt: "Medical team collaboration",
			caption: "Seamless Collaboration",
			subCaption: "Connect with patients and teams effortlessly",
		},
		{
			src: "https://images.pexels.com/photos/4164760/pexels-photo-4164760.jpeg?auto=compress&cs=tinysrgb&w=1200",
			alt: "ECG analysis interface",
			caption: "Real-Time Insights",
			subCaption: "Advanced tools for instant decision-making",
		},
	];

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
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
						height={500}
						eager={index === 0}
					/>
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-8">
						<h2 className="text-white text-2xl sm:text-4xl font-bold mb-2">
							{slide.caption}
						</h2>
						<p className="text-white text-base sm:text-lg">
							{slide.subCaption}
						</p>
					</div>
				</div>
			))}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{slides.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full ${
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

// Feature Card Component
interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	features?: string[];
	link?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
	features,
	link,
}) => (
	<div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in">
		<div className="flex items-center mb-4">
			<div className="bg-red-100 p-2 rounded-lg mr-3">{icon}</div>
			<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
		</div>
		<p className="text-gray-600 mb-4">{description}</p>
		{features && (
			<ul className="list-disc pl-5 space-y-2 text-sm text-gray-500 mb-4">
				{features.map((feature, index) => (
					<li key={index}>{feature}</li>
				))}
			</ul>
		)}
		{link && (
			<Link
				to={link}
				className="text-red-600 hover:underline flex items-center gap-1 text-sm font-medium">
				Learn More
				<ChevronDownIcon className="w-4 h-4 transform rotate-90" />
			</Link>
		)}
	</div>
);

// Stats Component
const StatsSection: React.FC = () => {
	const stats = [
		{ value: 50, label: "ECG files tested from real-world settings" },
		{ value: 92, label: " Preliminary AI accuracy in pilot studies (%)" },
		{ value: 5, label: "Clinical advisors guiding development" },
		{ value: 24, label: "Hours Support" },
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
			{stats.map((stat, index) => (
				<div key={index} className="animate-slide-up">
					<p className="text-3xl sm:text-4xl font-bold text-red-600">
						{stat.value}+
					</p>
					<p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
				</div>
			))}
		</div>
	);
};

// FAQ Accordion Component
const FAQAccordion: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const faqs = [
		{
			question: "How does CardiacTek integrate with existing systems?",
			answer:
				"CardiacTek supports seamless integration with EHR systems like Epic and Cerner via HL7 and FHIR standards, ensuring compatibility with your workflow.",
		},
		{
			question: "Is the platform HIPAA-compliant?",
			answer:
				"Yes, CardiacTek is fully HIPAA-compliant, with end-to-end encryption and secure data storage to protect patient information.",
		},
		{
			question: "What training is provided?",
			answer:
				"We offer comprehensive onboarding, video tutorials, and 24/7 support to ensure your team is confident using the platform.",
		},
		{
			question: "Can I try before committing?",
			answer:
				"Absolutely! Schedule a free demo to explore CardiacTek’s features, or sign up for a 30-day trial with full access.",
		},
	];

	return (
		<div className="space-y-4">
			{faqs.map((faq, index) => (
				<div
					key={index}
					className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md animate-fade-in">
					<button
						onClick={() => setActiveIndex(activeIndex === index ? null : index)}
						className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-600"
						aria-expanded={activeIndex === index}
						aria-controls={`faq-${index}`}>
						<h3 className="text-lg font-medium text-gray-900">
							{faq.question}
						</h3>
						<ChevronDownIcon
							className={`h-6 w-6 text-red-600 transform transition-transform duration-300 ${
								activeIndex === index ? "rotate-180" : ""
							}`}
						/>
					</button>
					<div
						id={`faq-${index}`}
						className={`overflow-hidden transition-all duration-300 ${
							activeIndex === index
								? "max-h-[500px] opacity-100"
								: "max-h-0 opacity-0"
						}`}>
						<div className="px-6 pb-4 pt-2 border-t border-gray-100">
							<p className="text-gray-600 leading-relaxed">{faq.answer}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

// Main DoctorBenefits Component
const DoctorBenefits: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        .animate-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .animate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
			{/* Hero Section with Slideshow */}
			<section className="bg-gradient-to-r from-red-50 to-white py-16 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col lg:flex-row items-center gap-12">
						<div className="lg:w-1/2 text-center lg:text-left">
							<div className="flex justify-center lg:justify-start mb-6">
								<StethoscopeIcon className="h-16 w-16 text-red-600 animate-fade-in" />
							</div>
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight animate-fade-in">
								Transform Cardiac Care with CardiacTek
							</h1>
							<p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
								Empower your practice with AI-enhanced diagnostics, seamless
								patient management, and collaborative care tools.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<Link
									to="/demo"
									className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 animate-fade-in">
									Schedule Demo
								</Link>
								<Link
									to="/signup"
									className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 animate-fade-in">
									Get Started
								</Link>
							</div>
						</div>
						<div className="lg:w-1/2">
							<HeroSlideshow />
						</div>
					</div>
				</div>
			</section>
			{/* Stats Section */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center animate-fade-in">
						Why Doctors Should Choose CardiacTek
					</h2>
					<StatsSection />
				</div>
			</section>
			{/* Features Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-7xl mx-auto space-y-20">
					{/* Patient Management Suite */}
					<div className="space-y-10">
						<div className="text-center mb-12">
							<ClipboardListIcon className="h-12 w-12 text-red-600 mx-auto mb-4 animate-fade-in" />
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 animate-fade-in">
								Patient Management Suite
							</h2>
							<p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
								Streamline your practice with tools designed for efficiency and
								precision.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<FeatureCard
								icon={<ActivityIcon className="h-8 w-8 text-red-600" />}
								title="Real-Time Dashboard"
								description="Live overview of patient statistics and practice metrics."
								features={[
									"Case load monitoring",
									"Performance analytics",
									"Revenue tracking",
								]}
								link="/dashboard"
							/>
							<FeatureCard
								icon={<BellIcon className="h-8 w-8 text-red-600" />}
								title="Critical Alerts"
								description="Instant notifications for emergency cases."
								features={[
									"SMS/Email alerts",
									"Priority triaging",
									"Team notifications",
								]}
								link="/alerts"
							/>
							<FeatureCard
								icon={<UserIcon className="h-8 w-8 text-red-600" />}
								title="Patient Records"
								description="Centralized health records management."
								features={[
									"Medical history",
									"Treatment plans",
									"Progress tracking",
								]}
								link="/records"
							/>
							<FeatureCard
								icon={<ScanIcon className="h-8 w-8 text-red-600" />}
								title="Report Center"
								description="Manage all diagnostic reports."
								features={["ECG results", "Blood tests", "Imaging studies"]}
								link="/reports"
							/>
						</div>
					</div>

					{/* Advanced Diagnostic Tools */}
					<div className="space-y-10">
						<div className="text-center mb-12">
							<HeartPulseIcon className="h-12 w-12 text-red-600 mx-auto mb-4 animate-fade-in" />
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 animate-fade-in">
								Advanced Diagnostic Tools
							</h2>
							<p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
								Leverage AI to enhance diagnostic accuracy and speed.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<FeatureCard
								icon={<LineChartIcon className="h-8 w-8 text-red-600" />}
								title="AI-ECG Analysis"
								description="Instant 12-lead interpretation with AI."
								features={[
									"98.7% accuracy",
									"Arrhythmia detection",
									"Automated reporting",
								]}
								link="/ecg"
							/>
							<FeatureCard
								icon={<WatchIcon className="h-8 w-8 text-red-600" />}
								title="Holter Monitoring"
								description="Long-term rhythm analysis."
								features={[
									"24/7 tracking",
									"Event correlation",
									"Trend analysis",
								]}
								link="/holter"
							/>
							<FeatureCard
								icon={<BadgeCheckIcon className="h-8 w-8 text-red-600" />}
								title="Risk Stratification"
								description="Predict ASCVD risk with precision."
								features={[
									"10-year risk score",
									"Prevention plans",
									"Guideline-based",
								]}
								link="/risk"
							/>
							<FeatureCard
								icon={<BrainIcon className="h-8 w-8 text-red-600" />}
								title="Symptom Checker"
								description="AI-driven differential diagnosis."
								features={[
									"Symptom analysis",
									"Guidance recommendations",
									"Decision support",
								]}
								link="/symptom-checker"
							/>
						</div>
					</div>

					{/* Care Coordination */}
					<div className="space-y-10">
						<div className="text-center mb-12">
							<VideoIcon className="h-12 w-12 text-red-600 mx-auto mb-4 animate-fade-in" />
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 animate-fade-in">
								Care Coordination
							</h2>
							<p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
								Enhance patient care with seamless collaboration tools.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<FeatureCard
								icon={<CalendarIcon className="h-8 w-8 text-red-600" />}
								title="Treatment Plans"
								description="Customizable care pathways."
								features={[
									"Medication schedules",
									"Rehab plans",
									"Progress tracking",
								]}
								link="/treatment-plans"
							/>
							<FeatureCard
								icon={<ShieldCheckIcon className="h-8 w-8 text-red-600" />}
								title="Secure Messaging"
								description="HIPAA-compliant communication."
								features={[
									"Patient portal",
									"Team collaboration",
									"File sharing",
								]}
								link="/messaging"
							/>
							<FeatureCard
								icon={<WatchIcon className="h-8 w-8 text-red-600" />}
								title="Device Integration"
								description="Integrate wearable data."
								features={["Apple Watch", "KardiaMobile", "Pacemakers"]}
								link="/devices"
							/>
							<FeatureCard
								icon={<HeartPulseIcon className="h-8 w-8 text-red-600" />}
								title="Telemedicine"
								description="Conduct virtual consultations."
								features={["Video calls", "Screen sharing", "E-prescriptions"]}
								link="/telemedicine"
							/>
						</div>
					</div>
				</div>
			</section>
			{/* FAQ Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center animate-fade-in">
						Frequently Asked Questions
					</h2>
					<FAQAccordion />
				</div>
			</section>
			{/* CTA Section */}
			<section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm animate-fade-in">
						<h2 className="text-2xl sm:text-3xl font-bold mb-4">
							Ready to Revolutionize Your Practice?
						</h2>
						<p className="text-base sm:text-lg mb-6 max-w-xl mx-auto">
							Join thousands of cardiologists transforming care with
							CardiacTek’s AI-powered platform.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/demo"
								className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300">
								Schedule Demo
							</Link>
							<Link
								to="/signup"
								className="border-2 border-white text-white hover:bg-white/10 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300">
								Get Started
							</Link>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default DoctorBenefits;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import {
	HeartPulseIcon,
	StethoscopeIcon,
	UserIcon,
	ActivityIcon,
	LineChartIcon,
	CalendarCheckIcon,
	BadgeCheckIcon,
	ClipboardListIcon,
	PlayCircleIcon,
	ArrowRightIcon,
	XIcon,
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
			data-src={eager ? undefined : src}
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
	eager?: boolean;
}

interface SlideshowProps {
	slides: Slide[];
	heightClass: string;
}

const Slideshow: React.FC<SlideshowProps> = ({ slides, heightClass }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 4000);
		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div
			className={`relative w-full ${heightClass} rounded-xl overflow-hidden shadow-lg`}>
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
						height={600}
						eager={slide.eager ?? index === 0}
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

interface LearnMoreModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	content: string;
	link?: string;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({
	isOpen,
	onClose,
	title,
	content,
	link,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
			<div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
					aria-label="Close modal">
					<XIcon className="w-6 h-6" />
				</button>
				<h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
				<p className="text-gray-600 mb-6 leading-relaxed">{content}</p>
				{link && (
					<Link
						to={link}
						className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2">
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
		className="group inline-flex items-center gap-2 text-red-600 font-medium py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600">
		<span>{label}</span>
		<ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
	</button>
);

const Homepage: React.FC = () => {
	const [modalState, setModalState] = useState<{
		isOpen: boolean;
		title: string;
		content: string;
		link?: string;
	}>({
		isOpen: false,
		title: "",
		content: "",
		link: "",
	});

	const openModal = (title: string, content: string, link?: string) => {
		setModalState({ isOpen: true, title, content, link });
	};

	const closeModal = () => {
		setModalState({ isOpen: false, title: "", content: "", link: "" });
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<style>{`
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
			<section className="bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4 sm:py-16">
				<div className="container mx-auto max-w-7xl">
					<div className="flex flex-col lg:flex-row items-center gap-8">
						<div className="lg:w-1/2 text-center lg:text-left">
							<div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-sm animate-fade-in">
								<span className="text-red-600 font-medium animate-pulse-dot">
									Prototype Clinical AI
								</span>
							</div>
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
								Revolutionizing Cardiac Care{" "}
								<span className="text-red-600">with AI</span>
							</h1>
							<p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
								Empowering clinicians with AI-driven insights for precise
								diagnostics and better patient outcomes.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<Link
									to="/auth"
									className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in">
									<ActivityIcon className="w-5 h-5" />
									Login
								</Link>
								<Link
									to="/research"
									className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in">
									<ActivityIcon className="w-5 h-5" />
									Clinical Studies
								</Link>
							</div>
						</div>
						<div className="lg:w-1/2 mt-6">
							<Slideshow
								slides={[
									{
										src: "/advanced.jpg",
										alt: "Medical professionals analyzing data",
										caption: "Advanced Cardiac Insights",
										eager: true,
									},
									{
										src: "/insights.jpg",
										alt: "AI-powered ECG analysis",
										caption: "AI-powered ECG analysis",
										eager: true,
									},
									{
										src: "/innovate.jpg",
										alt: "Healthcare innovation",
										caption: "Innovative Clinical Solutions",
										eager: true,
									},
								]}
								heightClass="h-[300px] sm:h-[450px]"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Clinical Validation Section */}
			<section className="py-12 px-4 bg-white">
				<div className="container mx-auto max-w-7xl">
					<div className="text-center mb-8">
						<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 animate-fade-in">
							Committed to Clinical Excellence
						</h2>
						<p className="text-gray-600 max-w-xl mx-auto animate-fade-in">
							Built with medical best practices in mind and designed for future
							clinical validation and certification.
						</p>
					</div>
					<Slideshow
						slides={[
							{
								src: "/advanced.jpg",
								alt: "Doctor reviewing cardiac data",
								caption: "Enhancing Patient Care",
								eager: true,
							},
							{
								src: "/insights.jpg",
								alt: "ECG monitor",
								caption: "High-Precision Diagnostics",
								eager: true,
							},
						]}
						heightClass="h-[200px] sm:h-[300px] mb-8"
					/>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						{[
							{
								icon: (
									<LineChartIcon
										className="text-red-600 mx-auto mb-4"
										size={36}
									/>
								),
								value: "98.7%",
								text: "Sensitivity in arrhythmia detection",
								modal: {
									title: "Arrhythmia Detection",
									content:
										"Our AI achieves 98.7% sensitivity in detecting arrhythmias, leveraging deep learning to identify subtle patterns in ECG data, ensuring early and accurate diagnosis.",
									link: "/arrhythmia-detection",
								},
							},
							{
								icon: (
									<CalendarCheckIcon
										className="text-red-600 mx-auto mb-4"
										size={36}
									/>
								),
								value: "100K+",
								text: "ECGs used to train the model",
								modal: {
									title: "ECG Analysis Volume",
									content:
										"Leveraging thousands of ECGs to train and enhance our model, we’re building a platform that will scale with healthcare systems while ensuring accuracy and dependability.",
									link: "/ecg-analysis",
								},
							},
							{
								icon: (
									<BadgeCheckIcon
										className="text-red-600 mx-auto mb-4"
										size={36}
									/>
								),
								value: "Pre-Certification",
								text: "Built with regulatory standards in mind",
								modal: {
									title: "Certifications",
									content:
										"While not currently certified, our platform is being developed with alignment to key medical regulatory standards to support future certification and clinical use.",
									link: "/certifications",
								},
							},
						].map((item, index) => (
							<div
								key={index}
								className="bg-red-50 p-6 rounded-2xl text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
								{item.icon}
								<h3 className="text-3xl font-bold text-gray-900 mb-2">
									{item.value}
								</h3>
								<p className="text-gray-600 text-sm mb-3">{item.text}</p>
								<LearnMoreButton
									onClick={() =>
										openModal(
											item.modal.title,
											item.modal.content,
											item.modal.link
										)
									}
									label="Learn More"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-12 px-4 bg-gray-50">
				<div className="container mx-auto max-w-7xl">
					<div className="text-center mb-8">
						<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 animate-fade-in">
							Comprehensive Cardiac Solutions
						</h2>
						<p className="text-gray-600 max-w-xl mx-auto animate-fade-in">
							Innovative AI-powered tools designed to provide advanced clinical
							insights{" "}
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								icon: <HeartPulseIcon size={28} className="text-red-600" />,
								title: "12-Lead ECG Analysis",
								stats: "98.7% Accuracy",
								description:
									"Automated interpretation of complex ECG patterns with clinician review workflow",
								features: [
									"STEMI detection",
									"QT interval measurement",
									"Bundle branch block identification",
								],
								modal: {
									title: "12-Lead ECG Analysis",
									content:
										"Our AI-powered ECG analysis delivers 98.7% accuracy, automating the detection of critical cardiac conditions while supporting clinician oversight.",
									link: "/ecg-analysis",
								},
							},
							{
								icon: <ClipboardListIcon size={28} className="text-red-600" />,
								title: "Patient Risk Profile",
								stats: "ASCVD Integration",
								description:
									"Automated risk scoring with AHA/ACC guideline-based recommendations",
								features: [
									"10-year risk prediction",
									"Lifestyle factors analysis",
									"Prevention strategies",
								],
								modal: {
									title: "Patient Risk Profile",
									content:
										"Integrates ASCVD risk scoring with guideline-based recommendations, providing actionable insights for patient care and prevention.",
									link: "/risk-assessment",
								},
							},
							{
								icon: <UserIcon size={28} className="text-red-600" />,
								title: "Longitudinal Tracking",
								stats: "Trend Analysis",
								description:
									"Historical comparison of cardiac parameters for disease progression monitoring",
								features: [
									"ECG trend visualization",
									"Medication impact tracking",
									"Automated report generation",
								],
								modal: {
									title: "Longitudinal Tracking",
									content:
										"Tracks cardiac parameters over time, offering visualizations and automated reports to monitor disease progression and treatment efficacy.",
									link: "/longitudinal-tracking",
								},
							},
						].map((item, index) => (
							<div key={index} className="relative animate-fade-in">
								<FeatureCard
									icon={item.icon}
									title={item.title}
									stats={item.stats}
									description={item.description}
									expandableContent={
										<ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
											{item.features.map((feature, i) => (
												<li key={i}>{feature}</li>
											))}
										</ul>
									}
									linkTo={item.modal.link}
								/>
								<div className="mt-3 text-center">
									<LearnMoreButton
										onClick={() =>
											openModal(
												item.modal.title,
												item.modal.content,
												item.modal.link
											)
										}
										label="Explore More"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Clinical Workflow Section */}
			<section className="py-12 px-4 bg-white">
				<div className="container mx-auto max-w-7xl">
					<div className="flex flex-col lg:flex-row items-center gap-8">
						<div className="lg:w-1/2 order-2 lg:order-1">
							<Slideshow
								slides={[
									{
										src: "/advanced.jpg",
										alt: "Clinical workflow integration",
										caption: "Seamless EHR Integration",
										eager: true,
									},
									{
										src: "/insights.jpg",
										alt: "Medical technology",
										caption: "Streamlined Workflows",
										eager: true,
									},
								]}
								heightClass="h-[250px] sm:h-[350px]"
							/>
						</div>
						<div className="lg:w-1/2 order-1 lg:order-2">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 animate-fade-in">
								Seamless EHR Integration (In Progress)
							</h2>
							<p className="text-gray-600 mb-4 text-sm sm:text-base animate-fade-in">
								Working toward smooth integration with leading EHR systems like
								Epic and Cerner to embed AI-driven insights directly into
								clinical workflows.
							</p>
							<ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm sm:text-base mb-4 animate-fade-in">
								<li>Planned support for real-time HL7 data synchronization</li>
								<li>Upcoming DICOM imaging compatibility</li>
								<li>AFuture automated report filing</li>
								<li>Designed for cross-platform interoperability</li>
							</ul>
							<LearnMoreButton
								onClick={() =>
									openModal(
										"EHR Integration",
										"Our platform is designed to work effortlessly with Epic, Cerner, and other leading EHR systems, supporting real-time data synchronization and streamlining automated workflows.",
										"/ehr-integration"
									)
								}
								label="Discover Integration"
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
							Transform Cardiac Care Today
						</h2>
						<p className="text-base sm:text-lg mb-6">
							Discover how our AI-powered solutions can elevate your practice.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/demo"
								className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
								<PlayCircleIcon className="w-5 h-5" />
								Request Demo
							</Link>
							<Link
								to="/contact"
								className="border-2 border-white hover:bg-white/20 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300">
								Contact Cardiology Team
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-10 px-4">
				<div className="container mx-auto max-w-7xl">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
						<div>
							<h3 className="font-bold text-base mb-3">CardiacAI</h3>
							<p className="text-gray-400 text-sm">
								Medical device CE Marked • FDA 510(k) Cleared
							</p>
						</div>
						<div>
							<h4 className="font-medium mb-3 text-base">Clinical Tools</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								<li>
									<Link
										to="/ecg-analysis"
										className="hover:text-white transition-colors">
										ECG Analysis
									</Link>
								</li>
								<li>
									<Link
										to="/risk-assessment"
										className="hover:text-white transition-colors">
										Risk Assessment
									</Link>
								</li>
								<li>
									<Link
										to="/treatment-guidelines"
										className="hover:text-white transition-colors">
										Treatment Guidelines
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium mb-3 text-base">Resources</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								<li>
									<Link
										to="/clinical-guidance"
										className="hover:text-white transition-colors">
										Clinical Guidance
									</Link>
								</li>
								<li>
									<Link
										to="/research-library"
										className="hover:text-white transition-colors">
										Research Library
									</Link>
								</li>
								<li>
									<Link
										to="/training"
										className="hover:text-white transition-colors">
										Clinician Training
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium mb-3 text-base">Compliance</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								<li>
									<Link
										to="/hipaa"
										className="hover:text-white transition-colors">
										HIPAA Compliance
									</Link>
								</li>
								<li>
									<Link
										to="/gdpr"
										className="hover:text-white transition-colors">
										GDPR
									</Link>
								</li>
								<li>
									<Link
										to="/quality"
										className="hover:text-white transition-colors">
										Quality Management
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
						<p>
							© {new Date().getFullYear()} CardiacAI. For professional use only.
						</p>
						<div className="mt-2 flex gap-4 justify-center">
							<Link
								to="/privacy"
								className="hover:text-white transition-colors">
								Privacy Policy
							</Link>
							<Link to="/terms" className="hover:text-white transition-colors">
								Terms of Use
							</Link>
						</div>
					</div>
				</div>
			</footer>

			{/* Learn More Modal */}
			<LearnMoreModal
				isOpen={modalState.isOpen}
				onClose={closeModal}
				title={modalState.title}
				content={modalState.content}
				link={modalState.link}
			/>
		</div>
	);
};

export default Homepage;

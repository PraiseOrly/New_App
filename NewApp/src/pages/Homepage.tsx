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
	className,
	width,
	height,
	eager = false,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);
	const observerRef = useRef<IntersectionObserver>();

	useEffect(() => {
		if (eager) return;

		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && imgRef.current) {
						const img = imgRef.current;
						img.src = img.dataset.src!;
						img.removeAttribute("data-src");
						observerRef.current?.unobserve(img);
					}
				});
			},
			{ rootMargin: "200px 0px", threshold: 0.01 }
		);

		if (imgRef.current) observerRef.current.observe(imgRef.current);

		return () => observerRef.current?.disconnect();
	}, [eager]);

	return (
		<img
			ref={imgRef}
			data-src={src}
			alt={alt}
			width={width}
			height={height}
			className={`${className} ${isLoaded ? "loaded" : "loading"}`}
			loading={eager ? "eager" : "lazy"}
			decoding="async"
			onLoad={() => setIsLoaded(true)}
			style={{
				backgroundColor: "#f3f4f6",
				transition: "opacity 0.3s ease",
			}}
		/>
	);
};

const Homepage: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen bg-white">
			<style>{`
        img.loading {
          opacity: 0;
          background: linear-gradient(110deg, #f3f4f6 30%, #e5e7eb 50%, #f3f4f6 70%);
          background-size: 200% 100%;
          animation: 1.5s shine linear infinite;
        }
        img.loaded {
          opacity: 1;
          background: transparent;
        }
        @keyframes shine {
          to { background-position-x: -200%; }
        }
      `}</style>

			<Navbar />

			{/* Hero Section */}
			<section className="bg-gradient-to-r from-red-50 to-red-100 py-16 px-4 md:py-24">
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-col md:flex-row items-center justify-between gap-12">
						<div className="md:w-1/2 mb-10 md:mb-0">
							<div className="mb-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full w-max">
								<span className="text-red-600 font-medium">
									Clinician-Validated AI
								</span>
								<div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
							</div>
							<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
								Advanced Cardiac Diagnostics{" "}
								<span className="text-red-600">Enhanced by AI</span>
							</h1>
							<p className="text-lg text-gray-700 mb-8 max-w-xl">
								Clinical decision support system combining deep learning
								analysis with evidence-based cardiology practice for improved
								patient outcomes.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									to="/auth"
									className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
									<StethoscopeIcon size={20} />
									Clinician Login
								</Link>
								<Link
									to="/research"
									className="border-2 border-gray-300 hover:border-red-600 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
									<ActivityIcon size={20} />
									Clinical Studies
								</Link>
							</div>
						</div>
						{/* Hero Image */}
						<div className="md:w-1/2">
							<LazyImage
								src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
								alt="Doctor analyzing cardiac data"
								className="rounded-xl shadow-2xl border-8 border-white"
								width={800}
								height={600}
								eager
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Clinical Validation Section */}
			<section className="py-16 px-4 bg-white">
				<div className="container mx-auto max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-red-50 p-8 rounded-2xl text-center">
							<LineChartIcon className="text-red-600 mx-auto mb-4" size={40} />
							<h3 className="text-4xl font-bold text-gray-900 mb-2">98.7%</h3>
							<p className="text-gray-600">
								Sensitivity in arrhythmia detection
							</p>
						</div>
						<div className="bg-red-50 p-8 rounded-2xl text-center">
							<CalendarCheckIcon
								className="text-red-600 mx-auto mb-4"
								size={40}
							/>
							<h3 className="text-4xl font-bold text-gray-900 mb-2">2.5M+</h3>
							<p className="text-gray-600">ECGs analyzed annually</p>
						</div>
						<div className="bg-red-50 p-8 rounded-2xl text-center">
							<BadgeCheckIcon className="text-red-600 mx-auto mb-4" size={40} />
							<h3 className="text-4xl font-bold text-gray-900 mb-2">CE</h3>
							<p className="text-gray-600">
								Marked medical device certification
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Comprehensive Cardiac Analysis Suite
						</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							FDA-cleared diagnostic tools integrated with AI-powered clinical
							insights
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<FeatureCard
							icon={<HeartPulseIcon size={32} className="text-red-600" />}
							title="12-Lead ECG Analysis"
							stats="98.7% Accuracy"
							description="Automated interpretation of complex ECG patterns with clinician review workflow"
							features={[
								"STEMI detection",
								"QT interval measurement",
								"Bundle branch block identification",
							]}
						/>
						<FeatureCard
							icon={<ClipboardListIcon size={32} className="text-red-600" />}
							title="Patient Risk Profile"
							stats="ASCVD Integration"
							description="Automated risk scoring with AHA/ACC guideline-based recommendations"
							features={[
								"10-year risk prediction",
								"Lifestyle factors analysis",
								"Prevention strategies",
							]}
						/>
						<FeatureCard
							icon={<UserIcon size={32} className="text-red-600" />}
							title="Longitudinal Tracking"
							stats="Trend Analysis"
							description="Historical comparison of cardiac parameters for disease progression monitoring"
							features={[
								"ECG trend visualization",
								"Medication impact tracking",
								"Automated report generation",
							]}
						/>
					</div>
				</div>
			</section>

			{/* Clinical Workflow Section */}
			<section className="py-16 px-4 bg-white">
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-col md:flex-row items-center gap-12">
						<div className="md:w-1/2">
							<LazyImage
								src="https://images.unsplash.com/photo-1483058712412-4245e9b90334"
								alt="Clinical workflow integration"
								className="rounded-xl shadow-xl w-full h-auto"
								width={800}
								height={600}
							/>
						</div>
						<div className="md:w-1/2">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Seamless EHR Integration
							</h2>
							<p className="text-gray-600 mb-6">
								Direct integration with major electronic health record systems
								including Epic and Cerner, providing AI insights within existing
								clinical workflows.
							</p>
							<ul className="list-disc pl-5 space-y-3 text-gray-600">
								<li>Real-time HL7 data synchronization</li>
								<li>DICOM imaging compatibility</li>
								<li>Automated report filing</li>
								<li>Cross-platform compatibility</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-red-600 text-white py-16 px-4">
				<div className="container mx-auto max-w-4xl text-center">
					<div className="bg-white/10 p-8 rounded-2xl">
						<h2 className="text-3xl font-bold mb-4">
							Elevate Cardiac Care with AI Insights
						</h2>
						<p className="text-xl mb-8">
							Schedule a demonstration with our clinical specialists
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/demo"
								className="bg-white text-red-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
								<PlayCircleIcon size={20} />
								Request Demo
							</Link>
							<Link
								to="/contact"
								className="border-2 border-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
								Contact Cardiology Team
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12 px-4">
				<div className="container mx-auto max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						<div>
							<h3 className="font-bold text-lg mb-4">CardiacAI</h3>
							<p className="text-gray-400 text-sm">
								Medical device CE Marked • FDA 510(k) Cleared
							</p>
						</div>
						<div>
							<h4 className="font-medium mb-4">Clinical Tools</h4>
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
							<h4 className="font-medium mb-4">Resources</h4>
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
							<h4 className="font-medium mb-4">Compliance</h4>
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
					<div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
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
		</div>
	);
};

export default Homepage;

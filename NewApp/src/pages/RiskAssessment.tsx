import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { HeartPulseIcon, XIcon, DownloadIcon } from "lucide-react";
import Footer from "../components/Footer";

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
			src: "https://images.pexels.com/photos/4028359/pexels-photo-4028359.jpeg?auto=compress&cs=tinysrgb&w=1200",
			alt: "Risk assessment dashboard",
			caption: "Accurate Risk Prediction",
		},
		{
			src: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1200",
			alt: "Heart health monitoring",
			caption: "Personalized Insights",
		},
		{
			src: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200",
			alt: "Clinical data analysis",
			caption: "Guideline-Based Care",
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
						eager={index === 0}
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
					Download Risk Guide
				</h3>
				<p className="text-gray-600 mb-6 leading-relaxed">
					Access our guide on ASCVD risk assessment, including case studies and
					prevention strategies.
				</p>
				<a
					href="/resources/risk-guide.pdf"
					download
					className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2">
					Download Now
					<DownloadIcon className="w-4 h-4" />
				</a>
			</div>
		</div>
	);
};

const RiskAssessment: React.FC = () => {
	const [formData, setFormData] = useState({
		age: "",
		gender: "male",
		cholesterol: "",
		hdl: "",
		bp: "",
		diabetes: false,
		smoker: false,
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [riskScore, setRiskScore] = useState<number | null>(null);
	const [riskLevel, setRiskLevel] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		const age = parseInt(formData.age);
		const cholesterol = parseInt(formData.cholesterol);
		const hdl = parseInt(formData.hdl);
		const bp = parseInt(formData.bp);

		if (!formData.age || isNaN(age) || age < 20 || age > 79)
			newErrors.age = "Age must be between 20 and 79";
		if (
			!formData.cholesterol ||
			isNaN(cholesterol) ||
			cholesterol < 130 ||
			cholesterol > 320
		)
			newErrors.cholesterol = "Cholesterol must be between 130 and 320 mg/dL";
		if (!formData.hdl || isNaN(hdl) || hdl < 20 || hdl > 100)
			newErrors.hdl = "HDL must be between 20 and 100 mg/dL";
		if (!formData.bp || isNaN(bp) || bp < 90 || bp > 200)
			newErrors.bp = "Systolic BP must be between 90 and 200 mmHg";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const calculateASCVD = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		const age = parseInt(formData.age);
		const total_chol = parseInt(formData.cholesterol);
		const hdl = parseInt(formData.hdl);
		const sbp = parseInt(formData.bp);
		const is_diabetic = formData.diabetes;
		const is_smoker = formData.smoker;
		const gender = formData.gender;

		// Calculate cholesterol ratio
		const chol_ratio = total_chol / hdl;

		let risk_score = 0;

		// Age factor
		if (age < 40) {
			risk_score += 1;
		} else if (age <= 59) {
			risk_score += 3;
		} else {
			risk_score += 5;
		}

		// Cholesterol ratio factor
		if (chol_ratio > 5) {
			risk_score += 3;
		} else if (chol_ratio > 4) {
			risk_score += 2;
		} else {
			risk_score += 1;
		}

		// Blood pressure factor
		if (sbp >= 140) {
			risk_score += 3;
		} else if (sbp >= 120) {
			risk_score += 2;
		} else {
			risk_score += 1;
		}

		// Smoking
		if (is_smoker) {
			risk_score += 3;
		}

		// Diabetes
		if (is_diabetic) {
			risk_score += 4;
		}

		// Gender modifier
		if (gender.toLowerCase() === "female") {
			risk_score -= 2;
		}

		// Final risk interpretation
		let category = "";
		if (risk_score >= 12) {
			category = "High Risk (≥20%)";
		} else if (risk_score >= 8) {
			category = "Intermediate Risk (7.5–19.9%)";
		} else if (risk_score >= 5) {
			category = "Borderline Risk (5–7.4%)";
		} else {
			category = "Low Risk (<5%)";
		}

		setRiskScore(risk_score);
		setRiskLevel(category);
		setRecommendations(getRecommendations(category));
		setIsModalOpen(true);
	};

	const getRecommendations = (category: string): string[] => {
		switch (category) {
			case "High Risk (≥20%)":
				return [
					"Initiate statin therapy",
					"Strict lifestyle modifications",
					"Frequent monitoring",
				];
			case "Intermediate Risk (7.5–19.9%)":
				return [
					"Consider statin therapy",
					"Encourage lifestyle changes",
					"Schedule follow-up",
				];
			case "Borderline Risk (5–7.4%)":
				return [
					"Adopt heart-healthy diet",
					"Increase physical activity",
					"Monitor risk factors",
				];
			case "Low Risk (<5%)":
			default:
				return [
					"Maintain healthy lifestyle",
					"Regular physical activity",
					"Balanced diet",
				];
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		setErrors((prev) => ({ ...prev, [name]: "" }));
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
        .animate-progress {
          animation: progress 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          from { --progress: 0%; }
          to { --progress: ${riskScore || 0}%; }
        }
        .radial-progress {
          background: conic-gradient(#b91c1c var(--progress), #e5e7eb var(--progress));
          border-radius: 50%;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .radial-progress::before {
          content: '';
          position: absolute;
          width: 120px;
          height: 120px;
          background: #fff;
          border-radius: 50%;
        }
      `}</style>

			<Navbar />

			{/* Hero Section */}
			<section
				className="mt-16 bg-gradient-to-br from-red-50 to-white py-12 px-4"
				aria-labelledby="hero-title">
				<div className="container mx-auto max-w-7xl">
					<div className="flex flex-col lg:flex-row items-center gap-8">
						<div className="lg:w-1/2 text-center lg:text-left">
							<h1
								id="hero-title"
								className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
								Patient Risk Profile
							</h1>
							<div
								id="hero-description"
								className="text-base sm:text-lg text-gray-600 mb-6 max-w-lg mx-auto lg:mx-0 animate-fade-in">
								<p className="mb-4">
									Our ASCVD risk assessment predicts your 10-year risk of heart
									attack or stroke using the American Heart Association (AHA)
									and American College of Cardiology (ACC) guidelines. By
									analyzing key factors like age, cholesterol, blood pressure,
									and lifestyle habits, our AI-powered tool delivers a
									personalized risk score and actionable recommendations.
								</p>
								<p className="mb-4">
									This assessment is crucial for early prevention, helping
									clinicians develop tailored prevention plans and empowering
									patients with clear, evidence-based insights to improve heart
									health.
								</p>
								<ul className="list-disc pl-5 space-y-2 text-gray-600">
									<li>10-Year Risk Prediction</li>
									<li>Analysis of Clinical & Lifestyle Factors</li>
									<li>AHA/ACC Guideline-Based Recommendations</li>
									<li>Supports Primary Prevention Planning</li>
								</ul>
							</div>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<Link
									to="/demo"
									className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in">
									Request Demo
								</Link>
							</div>
						</div>
						<div className="lg:w-1/2">
							<Slideshow />
						</div>
					</div>
				</div>
			</section>

			{/* Risk Calculator */}
			<section className="py-12 px-4 bg-white">
				<div className="container mx-auto max-w-5xl">
					<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
						Calculate 10-Year ASCVD Risk
					</h2>
					<div className="bg-white/10 p-6 sm:p-8 rounded-2xl shadow-md border border-red-100 backdrop-blur-sm animate-slide-up">
						<form onSubmit={calculateASCVD} className="grid grid-cols-1 gap-4">
							<div>
								<label htmlFor="age" className="block text-gray-700 mb-2">
									Age
								</label>
								<input
									id="age"
									name="age"
									type="number"
									value={formData.age}
									onChange={handleInputChange}
									className={`w-full px-4 py-2 border ${
										errors.age ? "border-red-600" : "border-gray-300"
									} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
									placeholder="e.g., 45"
									aria-label="Age"
									aria-invalid={!!errors.age}
									aria-describedby={errors.age ? "age-error" : undefined}
									required
								/>
								{errors.age && (
									<p id="age-error" className="text-red-600 text-sm mt-1">
										{errors.age}
									</p>
								)}
							</div>
							<div>
								<label htmlFor="gender" className="block text-gray-700 mb-2">
									Gender
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleInputChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
									aria-label="Gender">
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="cholesterol"
									className="block text-gray-700 mb-2">
									Total Cholesterol (mg/dL)
								</label>
								<input
									id="cholesterol"
									name="cholesterol"
									type="number"
									value={formData.cholesterol}
									onChange={handleInputChange}
									className={`w-full px-4 py-2 border ${
										errors.cholesterol ? "border-red-600" : "border-gray-300"
									} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
									placeholder="e.g., 200"
									aria-label="Total Cholesterol"
									aria-invalid={!!errors.cholesterol}
									aria-describedby={
										errors.cholesterol ? "cholesterol-error" : undefined
									}
									required
								/>
								{errors.cholesterol && (
									<p
										id="cholesterol-error"
										className="text-red-600 text-sm mt-1">
										{errors.cholesterol}
									</p>
								)}
							</div>
							<div>
								<label htmlFor="hdl" className="block text-gray-700 mb-2">
									HDL Cholesterol (mg/dL)
								</label>
								<input
									id="hdl"
									name="hdl"
									type="number"
									value={formData.hdl}
									onChange={handleInputChange}
									className={`w-full px-4 py-2 border ${
										errors.hdl ? "border-red-600" : "border-gray-300"
									} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
									placeholder="e.g., 50"
									aria-label="HDL Cholesterol"
									aria-invalid={!!errors.hdl}
									aria-describedby={errors.hdl ? "hdl-error" : undefined}
									required
								/>
								{errors.hdl && (
									<p id="hdl-error" className="text-red-600 text-sm mt-1">
										{errors.hdl}
									</p>
								)}
							</div>
							<div>
								<label htmlFor="bp" className="block text-gray-700 mb-2">
									Systolic BP (mmHg)
								</label>
								<input
									id="bp"
									name="bp"
									type="number"
									value={formData.bp}
									onChange={handleInputChange}
									className={`w-full px-4 py-2 border ${
										errors.bp ? "border-red-600" : "border-gray-300"
									} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
									placeholder="e.g., 130"
									aria-label="Systolic Blood Pressure"
									aria-invalid={!!errors.bp}
									aria-describedby={errors.bp ? "bp-error" : undefined}
									required
								/>
								{errors.bp && (
									<p id="bp-error" className="text-red-600 text-sm mt-1">
										{errors.bp}
									</p>
								)}
							</div>
							<div className="flex items-center gap-4">
								<div>
									<label
										htmlFor="diabetes"
										className="block text-gray-700 mb-2">
										Diabetes
									</label>
									<input
										id="diabetes"
										name="diabetes"
										type="checkbox"
										checked={formData.diabetes}
										onChange={handleInputChange}
										className="h-5 w-5 text-red-600 focus:ring-red-600 border-gray-300 rounded"
										aria-label="Diabetes"
									/>
								</div>
								<div>
									<label htmlFor="smoker" className="block text-gray-700 mb-2">
										Smoker
									</label>
									<input
										id="smoker"
										name="smoker"
										type="checkbox"
										checked={formData.smoker}
										onChange={handleInputChange}
										className="h-5 w-5 text-red-600 focus:ring-red-600 border-gray-300 rounded"
										aria-label="Smoker"
									/>
								</div>
							</div>
							<button
								type="submit"
								className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 w-full sm:w-auto">
								Calculate Risk
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* Risk Results */}
			{/* Removed inline risk results section to replace with modal */}

			{/* Footer */}
			<Footer />

			{/* Resource Modal */}
			<ResourceModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>

			{/* Risk Result Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
					<div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-slide-up">
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
							aria-label="Close modal">
							<XIcon className="w-6 h-6" />
						</button>
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Your ASCVD Risk Profile
						</h3>
						<div
							className="radial-progress mx-auto mb-4"
							style={{ "--progress": `${riskScore}%` } as React.CSSProperties}>
							<span className="text-2xl font-bold text-gray-900">
								{riskScore}%
							</span>
						</div>
						<p className="text-xl font-semibold text-gray-900 mb-4">
							Risk Level: {riskLevel}
						</p>
						<div className="text-left max-w-md mx-auto">
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								AHA/ACC Recommendations:
							</h3>
							<ul className="list-disc pl-5 space-y-2 text-gray-600">
								{recommendations.map((rec, index) => (
									<li key={index}>{rec}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RiskAssessment;

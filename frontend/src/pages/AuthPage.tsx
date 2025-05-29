import {
	CopyIcon,
	EyeIcon,
	EyeOffIcon,
	HeartPulseIcon,
	LoaderIcon,
	StethoscopeIcon,
	UserIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

// Lazy-loaded image component
interface LazyImageProps {
	src: string;
	alt: string;
	className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "" }) => {
	const imgRef = useRef<HTMLImageElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
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

		return () => {
			if (imgRef.current) observer.disconnect();
		};
	}, []);

	return (
		<img
			ref={imgRef}
			data-src={src}
			alt={alt}
			className={`${className} ${
				isLoaded ? "opacity-100" : "opacity-0"
			} transition-opacity duration-500`}
			onLoad={() => setIsLoaded(true)}
		/>
	);
};

const AuthPage: React.FC = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [role, setRole] = useState<"patient" | "doctor">("patient");
	const [isLoading, setIsLoading] = useState(false);
	const [showDoctorPopup, setShowDoctorPopup] = useState(false);
	const [showPatientPopup, setShowPatientPopup] = useState(false);
	const [showResetModal, setShowResetModal] = useState(false);
	const [doctorId, setDoctorId] = useState("");
	const [patientId, setPatientId] = useState("");
	const [copied, setCopied] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// Slideshow state for branding images
	const brandingImages = ["/innovate.jpg", "/advanced.jpg", "/trusted.png"];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				(prevIndex) => (prevIndex + 1) % brandingImages.length
			);
		}, 3000); // Change image every 3 seconds

		return () => clearInterval(interval);
	}, []);

	// Form inputs state
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [specialty, setSpecialty] = useState("");
	const [country, setCountry] = useState("");
	const [affiliatedHospital, setAffiliatedHospital] = useState("");
	const [medicalLicenseNumber, setMedicalLicenseNumber] = useState("");
	const [doctorIdInput, setDoctorIdInput] = useState("");
	const [patientIdInput, setPatientIdInput] = useState("");
	const [resetEmail, setResetEmail] = useState("");

	const navigate = useNavigate();
	const { setUser } = useUser();
	const doctorModalRef = useRef<HTMLDivElement>(null);
	const patientModalRef = useRef<HTMLDivElement>(null);
	const resetModalRef = useRef<HTMLDivElement>(null);

	// Real-time password validation
	useEffect(() => {
		if (password && password.length >= 8) {
			setErrors((prev) => ({ ...prev, password: "" }));
		}
	}, [password]);

	// Focus trap for modals
	useEffect(() => {
		let modalRefCurrent: HTMLDivElement | null = null;
		if (showDoctorPopup) modalRefCurrent = doctorModalRef.current;
		else if (showPatientPopup) modalRefCurrent = patientModalRef.current;
		else if (showResetModal) modalRefCurrent = resetModalRef.current;

		if (modalRefCurrent) {
			const focusableElements = modalRefCurrent.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const firstElement = focusableElements[0] as HTMLElement;
			const lastElement = focusableElements[
				focusableElements.length - 1
			] as HTMLElement;

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === "Tab") {
					if (e.shiftKey && document.activeElement === firstElement) {
						e.preventDefault();
						lastElement.focus();
					} else if (!e.shiftKey && document.activeElement === lastElement) {
						e.preventDefault();
						firstElement.focus();
					}
				}
				if (e.key === "Escape") {
					setShowDoctorPopup(false);
					setShowPatientPopup(false);
					setShowResetModal(false);
				}
			};

			firstElement?.focus();
			document.addEventListener("keydown", handleKeyDown);

			return () => document.removeEventListener("keydown", handleKeyDown);
		}
	}, [showDoctorPopup, showPatientPopup, showResetModal]);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		if (!email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(email))
			newErrors.email = "Invalid email format";
		if (!password) newErrors.password = "Password is required";
		else if (password.length < 8)
			newErrors.password = "Password must be at least 8 characters";
		if (!isLogin) {
			if (!fullName) newErrors.fullName = "Full name is required";
			if (role === "doctor") {
				if (!specialty) newErrors.specialty = "Specialty is required";
				if (!country) newErrors.country = "Country is required";
				if (!affiliatedHospital)
					newErrors.affiliatedHospital = "Affiliated hospital is required";
				if (!medicalLicenseNumber)
					newErrors.medicalLicenseNumber = "Medical license number is required";
			}
		} else {
			if (role === "doctor" && !doctorIdInput)
				newErrors.doctorId = "Doctor ID is required";
			if (role === "patient" && !patientIdInput)
				newErrors.patientId = "Patient ID is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateResetEmail = () => {
		const newErrors: { [key: string]: string } = {};
		if (!resetEmail) newErrors.resetEmail = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(resetEmail))
			newErrors.resetEmail = "Invalid email format";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);

			const userData: any = { role, email, password };

			if (!isLogin) {
				userData.name = fullName;
				if (role === "doctor") {
					userData.specialty = specialty;
					userData.country = country;
					userData.affiliatedHospital = affiliatedHospital;
					userData.medicalLicenseNumber = medicalLicenseNumber;
					const generatedDoctorId =
						"DOC" + Math.floor(100000 + Math.random() * 900000).toString();
					setDoctorId(generatedDoctorId);
					setShowDoctorPopup(true);
				} else {
					const generatedPatientId =
						"PAT" + Math.floor(100000 + Math.random() * 900000).toString();
					setPatientId(generatedPatientId);
					setShowPatientPopup(true);
				}
			} else {
				if (role === "doctor") userData.doctorId = doctorIdInput;
				else userData.patientId = patientIdInput;
				navigate(
					role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"
				);
			}

			setUser(userData);
		}, 1500);
	};

	const handleProceedToDashboard = () => {
		setShowDoctorPopup(false);
		setShowPatientPopup(false);
		navigate(role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard");
	};

	const handleCopyId = (id: string) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(id).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			});
		} else {
			const textArea = document.createElement("textarea");
			textArea.value = id;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const handleForgotPassword = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateResetEmail()) return;

		setTimeout(() => {
			console.log(`Password reset email sent to: ${resetEmail}`);
			setShowResetModal(false);
			setResetEmail("");
			setErrors({});
		}, 1000);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
			<style>{`
				.animate-gradient {
					background: linear-gradient(-45deg, #dc2626, #b91c1c, #f87171, #dc2626);
					background-size: 400%;
					animation: gradientShift 15s ease infinite;
				}
				.animate-input {
					transition: transform 0.2s ease, box-shadow 0.2s ease;
				}
				.animate-input:focus {
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
				}
				.animate-heartbeat {
					animation: heartbeat 1.5s ease-in-out infinite;
				}
				.animate-fade-in {
					animation: fadeIn 0.3s ease-in;
				}
				.branding-text {
					text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
				}
				@keyframes gradientShift {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
				@keyframes heartbeat {
					0%, 100% { transform: scale(1); }
					10%, 30% { transform: scale(1.1); }
					20%, 40% { transform: scale(1); }
				}
				@keyframes slideUp {
					from { opacity: 0; transform: translateY(20px); }
					to { opacity: 1; transform: translateY(0); }
				}
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
			`}</style>

			{/* Main Container */}
			<div className="max-w-7xl w-[95%] grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white rounded-2xl shadow-xl overflow-hidden">
				{/* Left Panel - Branding */}
				<div className="relative hidden lg:block animate-gradient p-6 text-white">
					<div className="absolute inset-0 bg-black/20" />
					<div className="flex justify-center mb-6 relative z-20">
						<img
							src="/real_logo.png"
							alt="CardiacTek Logo"
							className="h-32 w-auto drop-shadow-[0_6px_8px_rgba(185,28,28,0.9)] filter brightness-110 contrast-125"
						/>
					</div>
					<LazyImage
						src={brandingImages[currentImageIndex]}
						alt="CardiacTek branding"
						className="absolute inset-0 w-full h-full object-cover opacity-30"
					/>
					<div className="relative z-10 flex flex-col h-full justify-between">
						<div>
							<h1 className="text-3xl font-extrabold mt-12 mb-4 animate-slide-up branding-text">
								Revolutionizing Cardiac Care{" "}
							</h1>
							<p className="text-lg mb-4 leading-relaxed animate-slide-up branding-text whitespace-pre-line">
								{role === "doctor" ? (
									<>
										<strong>Advanced tools for cardiologists</strong> with
										AI-powered ECG analysis, real-time alerts, and seamless
										patient management.
									</>
								) : (
									<>
										<strong>Personalized cardiac care</strong> to Monitor your
										heart, connect with doctors, and stay informed.
									</>
								)}
							</p>
							<ul className="space-y-2 text-base animate-slide-up branding-text">
								{[
									"AI-driven diagnostics",
									"Real-time monitoring",
									"Secure communication",
									"Guideline-based support",
								].map((item, index) => (
									<li key={index} className="flex items-center gap-2">
										<svg
											className="h-4 w-4 flex-shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										{item}
									</li>
								))}
							</ul>
						</div>
						<p className="text-xs opacity-75">
							© {new Date().getFullYear()} CardiacTek. All rights reserved.
						</p>
					</div>
				</div>

				{/* Right Panel - Auth Form */}
				<div className="p-4 sm:p-6 flex flex-col justify-center">
					<div className="max-w-xs w-full mx-auto">
						<div className="text-center mb-4">
							<HeartPulseIcon className="h-8 w-8 text-red-600 mx-auto mb-3 animate-heartbeat lg:hidden" />
							<h2 className="text-xl sm:text-2xl font-bold text-gray-900 animate-slide-up">
								{isLogin ? "Welcome Back" : "Join CardiacTek"}
							</h2>
							<p className="text-gray-600 text-sm mt-1 animate-slide-up">
								{isLogin
									? "Access your dashboard"
									: "Start your journey in cardiac care"}
							</p>
						</div>

						{/* Role Toggle */}
						<div className="flex bg-gray-100 rounded-full p-1 mb-4 animate-slide-up">
							<button
								type="button"
								className={`flex-1 py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${
									role === "patient"
										? "bg-red-600 text-white shadow-md"
										: "text-gray-700 hover:bg-gray-200"
								}`}
								onClick={() => setRole("patient")}>
								<UserIcon className="h-4 w-4" />
								<span className="text-sm font-medium">Patient</span>
							</button>
							<button
								type="button"
								className={`flex-1 py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${
									role === "doctor"
										? "bg-red-600 text-white shadow-md"
										: "text-gray-700 hover:bg-gray-200"
								}`}
								onClick={() => setRole("doctor")}>
								<StethoscopeIcon className="h-4 w-4" />
								<span className="text-sm font-medium">Doctor</span>
							</button>
						</div>

						{/* Auth Form with Conditional Container */}
						<div
							className={
								role === "doctor" && !isLogin
									? "max-h-[350px] overflow-y-auto pr-2"
									: "max-h-[400px] overflow-y-auto pr-2"
							}>
							<form onSubmit={handleSubmit} className="space-y-5">
								{isLogin && (
									<>
										{role === "doctor" && (
											<div className="relative animate-slide-up">
												<input
													id="doctorId"
													type="text"
													required
													value={doctorIdInput}
													onChange={(e) => setDoctorIdInput(e.target.value)}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
													placeholder=" "
													aria-invalid={!!errors.doctorId}
													aria-describedby={
														errors.doctorId ? "doctorId-error" : undefined
													}
												/>
												<label
													htmlFor="doctorId"
													className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
													Doctor ID
												</label>
												{errors.doctorId && (
													<p
														id="doctorId-error"
														className="text-red-600 text-xs mt-1"
														aria-live="polite">
														{errors.doctorId}
													</p>
												)}
											</div>
										)}
										{role === "patient" && (
											<div className="relative animate-slide-up">
												<input
													id="patientId"
													type="text"
													required
													value={patientIdInput}
													onChange={(e) => setPatientIdInput(e.target.value)}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
													placeholder=" "
													aria-invalid={!!errors.patientId}
													aria-describedby={
														errors.patientId ? "patientId-error" : undefined
													}
												/>
												<label
													htmlFor="patientId"
													className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
													Patient ID
												</label>
												{errors.patientId && (
													<p
														id="patientId-error"
														className="text-red-600 text-xs mt-1"
														aria-live="polite">
														{errors.patientId}
													</p>
												)}
											</div>
										)}
									</>
								)}
								{!isLogin && (
									<>
										<div className="relative animate-slide-up mt-6">
											<input
												id="fullName"
												type="text"
												required
												value={fullName}
												onChange={(e) => setFullName(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
												placeholder=" "
												aria-invalid={!!errors.fullName}
												aria-describedby={
													errors.fullName ? "fullName-error" : undefined
												}
											/>
											<label
												htmlFor="fullName"
												className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
												Full Name
											</label>
											{errors.fullName && (
												<p
													id="fullName-error"
													className="text-red-600 text-xs mt-1"
													aria-live="polite">
													{errors.fullName}
												</p>
											)}
										</div>
										{role === "doctor" && (
											<>
												<div className="relative animate-slide-up">
													<select
														id="specialty"
														required
														value={specialty}
														onChange={(e) => setSpecialty(e.target.value)}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input appearance-none"
														aria-invalid={!!errors.specialty}
														aria-describedby={
															errors.specialty ? "specialty-error" : undefined
														}>
														<option value="">Select specialty</option>
														<option value="Cardiology">Cardiology</option>
														<option value="Neurology">Neurology</option>
														<option value="Pediatrics">Pediatrics</option>
														<option value="General Medicine">
															General Medicine
														</option>
													</select>
													{errors.specialty && (
														<p
															id="specialty-error"
															className="text-red-600 text-xs mt-1"
															aria-live="polite">
															{errors.specialty}
														</p>
													)}
												</div>
												<div className="relative animate-slide-up">
													<input
														id="country"
														type="text"
														required
														value={country}
														onChange={(e) => setCountry(e.target.value)}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
														placeholder=" "
														aria-invalid={!!errors.country}
														aria-describedby={
															errors.country ? "country-error" : undefined
														}
													/>
													<label
														htmlFor="country"
														className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
														Country
													</label>
													{errors.country && (
														<p
															id="country-error"
															className="text-red-600 text-xs mt-1"
															aria-live="polite">
															{errors.country}
														</p>
													)}
												</div>
												<div className="relative animate-slide-up">
													<input
														id="affiliatedHospital"
														type="text"
														required
														value={affiliatedHospital}
														onChange={(e) =>
															setAffiliatedHospital(e.target.value)
														}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
														placeholder=" "
														aria-invalid={!!errors.affiliatedHospital}
														aria-describedby={
															errors.affiliatedHospital
																? "affiliatedHospital-error"
																: undefined
														}
													/>
													<label
														htmlFor="affiliatedHospital"
														className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
														Affiliated Hospital
													</label>
													{errors.affiliatedHospital && (
														<p
															id="affiliatedHospital-error"
															className="text-red-600 text-xs mt-1"
															aria-live="polite">
															{errors.affiliatedHospital}
														</p>
													)}
												</div>
												<div className="relative animate-slide-up">
													<input
														id="medicalLicenseNumber"
														type="text"
														required
														value={medicalLicenseNumber}
														onChange={(e) =>
															setMedicalLicenseNumber(e.target.value)
														}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
														placeholder=" "
														aria-invalid={!!errors.medicalLicenseNumber}
														aria-describedby={
															errors.medicalLicenseNumber
																? "medicalLicenseNumber-error"
																: undefined
														}
													/>
													<label
														htmlFor="medicalLicenseNumber"
														className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
														Medical License Number
													</label>
													{errors.medicalLicenseNumber && (
														<p
															id="medicalLicenseNumber-error"
															className="text-red-600 text-xs mt-1"
															aria-live="polite">
															{errors.medicalLicenseNumber}
														</p>
													)}
												</div>
											</>
										)}
									</>
								)}
								<div className="relative animate-slide-up">
									<input
										id="email"
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
										placeholder=" "
										aria-invalid={!!errors.email}
										aria-describedby={errors.email ? "email-error" : undefined}
									/>
									<label
										htmlFor="email"
										className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
										Email Address
									</label>
									{errors.email && (
										<p
											id="email-error"
											className="text-red-600 text-xs mt-1"
											aria-live="polite">
											{errors.email}
										</p>
									)}
								</div>
								<div className="relative animate-slide-up">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
										placeholder=" "
										aria-invalid={!!errors.password}
										aria-describedby={
											errors.password ? "password-error" : undefined
										}
									/>
									<label
										htmlFor="password"
										className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
										Password
									</label>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}>
										{showPassword ? (
											<EyeOffIcon className="h-4 w-4" />
										) : (
											<EyeIcon className="h-4 w-4" />
										)}
									</button>
									{errors.password && (
										<p
											id="password-error"
											className="text-red-600 text-xs mt-1"
											aria-live="polite">
											{errors.password}
										</p>
									)}
								</div>
								<button
									type="submit"
									disabled={isLoading}
									className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-slide-up">
									{isLoading ? (
										<>
											<LoaderIcon className="h-4 w-4 animate-spin" />
											<span>Processing...</span>
										</>
									) : isLogin ? (
										"Log In"
									) : (
										"Sign Up"
									)}
								</button>
							</form>
						</div>
						<div className="mt-3 text-center space-y-2 animate-slide-up">
							{isLogin && (
								<button
									type="button"
									onClick={() => setShowResetModal(true)}
									className="text-red-600 hover:underline text-sm font-medium">
									Forgot Password?
								</button>
							)}
							<div>
								<button
									type="button"
									onClick={() => setIsLogin(!isLogin)}
									className="text-red-600 hover:underline text-sm font-medium">
									{isLogin
										? "Need an account? Sign up"
										: "Already have an account? Log in"}
								</button>
							</div>
							<Link
								to="/"
								className="text-gray-600 hover:underline text-sm font-medium block">
								Back to Home
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Doctor ID Modal */}
			{showDoctorPopup && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
					ref={doctorModalRef}>
					<div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
						<HeartPulseIcon className="h-10 w-10 text-red-600 mx-auto mb-3 animate-heartbeat" />
						<h3 className="text-lg font-bold text-gray-900 mb-3">
							Your Doctor ID
						</h3>
						<p className="mb-4 text-gray-600">
							Your unique ID is:{" "}
							<span className="font-mono text-red-600">{doctorId}</span>
						</p>
						<div className="flex justify-center gap-3 mb-4">
							<button
								onClick={() => handleCopyId(doctorId)}
								className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors">
								<CopyIcon className="h-4 w-4" />
								{copied ? "Copied!" : "Copy ID"}
							</button>
							<button
								onClick={handleProceedToDashboard}
								className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
								Go to Dashboard
							</button>
						</div>
						<p className="text-xs text-gray-500">
							Please save your Doctor ID for future logins.
						</p>
					</div>
				</div>
			)}

			{/* Patient ID Modal */}
			{showPatientPopup && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
					ref={patientModalRef}>
					<div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
						<HeartPulseIcon className="h-10 w-10 text-red-600 mx-auto mb-3 animate-heartbeat" />
						<h3 className="text-lg font-bold text-gray-900 mb-3">
							Your Patient ID
						</h3>
						<p className="mb-4 text-gray-600">
							Your unique ID is:{" "}
							<span className="font-mono text-red-600">{patientId}</span>
						</p>
						<div className="flex justify-center gap-3 mb-4">
							<button
								onClick={() => handleCopyId(patientId)}
								className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors">
								<CopyIcon className="h-4 w-4" />
								{copied ? "Copied!" : "Copy ID"}
							</button>
							<button
								onClick={handleProceedToDashboard}
								className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
								Go to Dashboard
							</button>
						</div>
						<p className="text-xs text-gray-500">
							Please save your Patient ID for future logins.
						</p>
					</div>
				</div>
			)}

			{/* Reset Password Modal */}
			{showResetModal && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
					ref={resetModalRef}>
					<div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
						<HeartPulseIcon className="h-10 w-10 text-red-600 mx-auto mb-3 animate-heartbeat" />
						<h3 className="text-lg font-bold text-gray-900 mb-3">
							Reset Your Password
						</h3>
						<p className="mb-4 text-gray-600">
							Enter your email to receive a password reset link.
						</p>
						<form onSubmit={handleForgotPassword} className="space-y-5">
							<div className="relative">
								<input
									id="resetEmail"
									type="email"
									required
									value={resetEmail}
									onChange={(e) => setResetEmail(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 animate-input peer"
									placeholder=" "
									aria-invalid={!!errors.resetEmail}
									aria-describedby={
										errors.resetEmail ? "resetEmail-error" : undefined
									}
								/>
								<label
									htmlFor="resetEmail"
									className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-red-600">
									Email Address
								</label>
								{errors.resetEmail && (
									<p
										id="resetEmail-error"
										className="text-red-600 text-xs mt-1"
										aria-live="polite">
										{errors.resetEmail}
									</p>
								)}
							</div>
							<div className="flex justify-center gap-3">
								<button
									type="button"
									onClick={() => setShowResetModal(false)}
									className="px-4 py-1.5 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors">
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
									Send Reset Link
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default AuthPage;

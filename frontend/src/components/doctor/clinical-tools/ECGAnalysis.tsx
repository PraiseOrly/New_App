
import {
	ActivityIcon,
	AlertCircleIcon,
	CalendarIcon,
	CameraIcon,
	CheckCircleIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	FileIcon,
	HeartPulseIcon,
	InfoIcon,
	RotateCcwIcon,
	SearchIcon,
	UploadIcon,
	XIcon,
	ZoomInIcon,
	ZoomOutIcon,
} from "lucide-react";

import React, { useEffect, useRef, useState } from "react";
import ECGTimelineView from "./ECGTimelineView";


// Interfaces
interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	sex?: "Male" | "Female" | "Other";
	medicalHistory?: string[];
	allergies?: string[];
	profileImage?: string;
	vitals?: {
		bloodPressure: string;
		temperature: string;
		oxygenSaturation: string;
		heartRate?: string;
	};
	upcomingAppointments?: { title: string; date: string }[];
}

interface ECGType {
	id: string;
	type: "resting" | "holter" | "stress";
	name: string;
	description: string;
	icon: React.ElementType;
}

interface ECGRecord {
	id: string;
	patientId: string;
	patientName: string;
	date: string;
	status: "normal" | "abnormal" | "critical" | "pending";
	heartRate: number;
	rhythm: string;
	prInterval: number;
	qrsInterval: number;
	qtInterval: number;
	findings: string[];
	recommendations: string[];
	priority: "routine" | "urgent" | "stat";
	technicianNotes?: string;
}

// Mock Data
const ecgTypes: ECGType[] = [
	{
		id: "resting",
		type: "resting",
		name: "Resting ECG",
		description: "Standard 12-lead ECG recording",
		icon: HeartPulseIcon,
	},
	{
		id: "holter",
		type: "holter",
		name: "Holter Monitor",
		description: "24-48 hour continuous recording",
		icon: ActivityIcon,
	},
	{
		id: "stress",
		type: "stress",
		name: "Stress ECG",
		description: "Exercise stress test recording",
		icon: ActivityIcon,
	},
];

const mockPatients: Patient[] = [
	{
		id: "1",
		name: "Amara Nwosu",
		dateOfBirth: "1975-06-15",
		sex: "Female",
		medicalHistory: ["Hypertension", "Type 2 Diabetes"],
		allergies: ["Penicillin"],
		profileImage: "/public/advanced.jpg",
		vitals: {
			bloodPressure: "130/85 mmHg",
			temperature: "36.8°C",
			oxygenSaturation: "98%",
			heartRate: "78 bpm",
		},
		upcomingAppointments: [
			{ title: "Follow-up ECG", date: "May 30, 2025" },
			{ title: "Referral to cardiologist", date: "TBD" },
		],
	},
	{
		id: "2",
		name: "Sofia Alvarez",
		dateOfBirth: "1982-09-22",
		sex: "Female",
		medicalHistory: ["Asthma", "Hyperlipidemia"],
		allergies: [],
		profileImage: "/public/cardiacteklogo.jpg",
		vitals: {
			bloodPressure: "125/80 mmHg",
			temperature: "37.0°C",
			oxygenSaturation: "97%",
			heartRate: "75 bpm",
		},
		upcomingAppointments: [
			{ title: "Routine Checkup", date: "June 15, 2025" },
		],
	},
	{
		id: "3",
		name: "Hiroshi Tanaka",
		dateOfBirth: "1968-03-10",
		sex: "Male",
		medicalHistory: ["Coronary Artery Disease", "Previous MI"],
		allergies: ["Aspirin"],
		profileImage: "/public/innovate.jpg",
		vitals: {
			bloodPressure: "140/90 mmHg",
			temperature: "36.6°C",
			oxygenSaturation: "96%",
			heartRate: "80 bpm",
		},
		upcomingAppointments: [
			{ title: "Cardiology Consultation", date: "July 1, 2025" },
		],
	},
];

const mockECGs: ECGRecord[] = [
	{
		id: "1",
		patientId: "1",
		patientName: "Amara Nwosu",
		date: "2023-12-15",
		status: "normal",
		heartRate: 72,
		rhythm: "Normal Sinus Rhythm",
		prInterval: 160,
		qrsInterval: 90,
		qtInterval: 380,
		findings: [
			"Normal sinus rhythm",
			"No ST-segment abnormalities",
			"Regular R-R intervals",
		],
		recommendations: [
			"Continue current monitoring",
			"Follow-up in 3 months",
			"No immediate intervention required",
		],
		priority: "routine",
		technicianNotes: "Clear waveform, no artifacts observed.",
	},
	{
		id: "2",
		patientId: "2",
		patientName: "Sofia Alvarez",
		date: "2023-12-14",
		status: "abnormal",
		heartRate: 88,
		rhythm: "Atrial Fibrillation",
		prInterval: 180,
		qrsInterval: 110,
		qtInterval: 410,
		findings: [
			"Atrial fibrillation",
			"Irregular R-R intervals",
			"No acute ST changes",
		],
		recommendations: [
			"Cardiology consultation",
			"Rate control medication adjustment",
			"Weekly monitoring",
		],
		priority: "urgent",
		technicianNotes: "Patient reported palpitations during recording.",
	},
	{
		id: "3",
		patientId: "3",
		patientName: "Hiroshi Tanaka",
		date: "2023-12-13",
		status: "critical",
		heartRate: 115,
		rhythm: "ST-Elevation",
		prInterval: 200,
		qrsInterval: 120,
		qtInterval: 450,
		findings: [
			"ST-segment elevation in V1-V4",
			"Possible anterior STEMI",
			"T-wave inversions",
		],
		recommendations: [
			"Immediate cardiology consultation",
			"Consider emergency intervention",
			"Continuous monitoring",
		],
		priority: "stat",
		technicianNotes: "Patient experienced chest pain during test.",
	},
];

// LazyImage Component
interface LazyImageProps {
	src: string;
	alt: string;
	className?: string;
	width: number;
	height: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
	src,
	alt,
	className = "",
	width,
	height,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

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

		return () => observer.disconnect();
	}, []);

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
			loading="lazy"
			decoding="async"
			onLoad={() => setIsLoaded(true)}
		/>
	);
};

// CameraCaptureModal Component
interface CameraCaptureModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCapture: (file: File) => void;
}

const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
	isOpen,
	onClose,
	onCapture,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);

	useEffect(() => {
		if (isOpen) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((mediaStream) => {
					setStream(mediaStream);
					if (videoRef.current) {
						videoRef.current.srcObject = mediaStream;
						videoRef.current.play();
					}
				})
				.catch((err) => {
					console.error("Error accessing webcam:", err);
					onClose();
				});
		} else {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
				setStream(null);
			}
		}
		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
				setStream(null);
			}
		};
	}, [isOpen, onClose]);

	const handleCapture = () => {
		if (!videoRef.current || !canvasRef.current) return;
		setIsCapturing(true);
		const video = videoRef.current;
		const canvas = canvasRef.current;
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext("2d");
		if (ctx) {
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			canvas.toBlob((blob) => {
				if (blob) {
					const file = new File([blob], `capture_${Date.now()}.png`, {
						type: "image/png",
					});
					onCapture(file);
					setIsCapturing(false);
					onClose();
				}
			}, "image/png");
		} else {
			setIsCapturing(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="camera-capture-title"
		>
			<h2
				id="camera-capture-title"
				className="text-white text-xl mb-4 font-semibold"
			>
				Camera Capture
			</h2>
			<video
				ref={videoRef}
				className="rounded-lg shadow-lg max-w-full max-h-[60vh]"
				autoPlay
				muted
				playsInline
			/>
			<canvas ref={canvasRef} className="hidden" />
			<div className="mt-4 flex gap-4">
				<button
					onClick={handleCapture}
					disabled={isCapturing}
					className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
				>
					{isCapturing ? "Capturing..." : "Capture"}
				</button>
				<button
					onClick={onClose}
					disabled={isCapturing}
					className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

// EcgForm Component
interface EcgFormProps {
	onProcess: (data: {
		images: File[];
		leadType: string;
		voltage: string;
		speed: string;
		reason: string;
		otherReason: string;
	}) => void;
	openCameraRef?: React.RefObject<{ openCamera: () => void }>;
}

const EcgForm: React.FC<EcgFormProps> = ({ onProcess, openCameraRef }) => {
	const [images, setImages] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const [leadType, setLeadType] = useState("");
	const [voltage, setVoltage] = useState("");
	const [speed, setSpeed] = useState("");
	const [reason, setReason] = useState("");
	const [otherReason, setOtherReason] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isDragging, setIsDragging] = useState(false);
	const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
	const dropRef = useRef<HTMLDivElement>(null);
	const cameraInputRef = useRef<HTMLInputElement>(null);

	const validateImages = (files: File[]) => {
		const maxSize = 5 * 1024 * 1024; // 5MB
		const validTypes = ["image/jpeg", "image/png"];
		for (const file of files) {
			if (!validTypes.includes(file.type)) {
				return "Only JPEG and PNG images are supported.";
			}
			if (file.size > maxSize) {
				return "Each image must be less than 5MB.";
			}
		}
		if (files.length + images.length > 3) {
			return "You can upload or capture up to 3 images.";
		}
		return "";
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(e.target.files || []);
		const error = validateImages(newFiles);
		if (error) {
			setErrors({ ...errors, images: error });
			return;
		}
		setImages([...images, ...newFiles]);
		const previews = newFiles.map((file) => URL.createObjectURL(file));
		setImagePreviews([...imagePreviews, ...previews]);
		setErrors({ ...errors, images: "" });
	};

	const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(e.target.files || []);
		const error = validateImages(newFiles);
		if (error) {
			setErrors({ ...errors, images: error });
			return;
		}
		setImages([...images, ...newFiles]);
		const previews = newFiles.map((file) => URL.createObjectURL(file));
		setImagePreviews([...imagePreviews, ...previews]);
		setErrors({ ...errors, images: "" });
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const newFiles = Array.from(e.dataTransfer.files);
		const error = validateImages(newFiles);
		if (error) {
			setErrors({ ...errors, images: error });
			return;
		}
		setImages([...images, ...newFiles]);
		const previews = newFiles.map((file) => URL.createObjectURL(file));
		setImagePreviews([...imagePreviews, ...previews]);
		setErrors({ ...errors, images: "" });
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => setIsDragging(false);

	const removeImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index));
		setImagePreviews(imagePreviews.filter((_, i) => i !== index));
	};

	const openCamera = () => {
		setIsCameraModalOpen(true);
	};

	const handleCaptureImageClick = () => {
		openCamera();
	};

	const handleModalCapture = (file: File) => {
		const error = validateImages([file]);
		if (error) {
			setErrors({ ...errors, images: error });
			return;
		}
		setImages([...images, file]);
		const preview = URL.createObjectURL(file);
		setImagePreviews([...imagePreviews, preview]);
		setErrors({ ...errors, images: "" });
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		if (images.length === 0)
			newErrors.images = "Please upload or capture at least one ECG image.";
		if (!leadType) newErrors.leadType = "Please select a lead type.";
		if (!voltage) newErrors.voltage = "Please select a voltage.";
		if (!speed) newErrors.speed = "Please select a speed.";
		if (!reason) newErrors.reason = "Please select a reason.";
		if (reason === "other" && !otherReason.trim())
			newErrors.otherReason = "Please specify the reason.";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onProcess({ images, leadType, voltage, speed, reason, otherReason });
		} else {
			console.log("Form validation failed:", errors);
		}
	};

	React.useImperativeHandle(openCameraRef, () => ({
		openCamera,
	}));

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
				<div>
					<label
						htmlFor="image-upload"
						className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
					>
						Upload or Capture ECG Images (Max 3)
						<span
							className="relative group"
							aria-label="Images must be JPEG or PNG, up to 5MB each."
						>
							<InfoIcon className="w-4 h-4 text-gray-500" />
							<div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
								Upload or capture up to 3 JPEG or PNG images, each under 5MB.
							</div>
						</span>
					</label>
					<div className="flex justify-center mb-4">
						<button
							type="button"
							onClick={handleCaptureImageClick}
							data-testid="capture-image-button"
							className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
						>
							<CameraIcon className="w-5 h-5" />
							Capture Image
						</button>
					</div>
					<div
						ref={dropRef}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						className={`border-2 border-dashed rounded-lg p-6 text-center ${
							isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
						}`}
					>
						<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
							<input
								type="file"
								id="image-upload"
								accept="image/jpeg,image/png"
								multiple
								onChange={handleImageChange}
								className="hidden"
								aria-describedby="image-error"
							/>
							<label
								htmlFor="image-upload"
								className="cursor-pointer flex flex-col items-center gap-2"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										const input = document.getElementById("image-upload");
										if (input) input.click();
									}
								}}
							>
								<UploadIcon className="w-8 h-8 text-blue-600" />
								<span className="text-sm text-gray-600">
									Drag and drop or click to upload
								</span>
							</label>
							<input
								type="file"
								id="camera-capture"
								accept="image/*"
								capture="environment"
								onChange={handleCameraCapture}
								className="hidden"
								aria-describedby="image-error"
								ref={cameraInputRef}
							/>
						</div>
						{imagePreviews.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-4">
								{imagePreviews.map((preview, index) => (
									<div key={index} className="relative">
										<LazyImage
											src={preview}
											alt={`ECG preview ${index + 1}`}
											className="h-24 w-auto rounded-lg shadow-md"
											width={96}
											height={96}
										/>
										<button
											onClick={() => removeImage(index)}
											className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center -mt-2 -mr-2"
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
					</div>
					{errors.images && (
						<p id="image-error" className="mt-1 text-sm text-red-600">
							{errors.images}
						</p>
					)}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div>
						<label
							htmlFor="lead-type"
							className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
						>
							Lead Type
							<span
								className="relative group"
								aria-label="Select the number of leads used in the ECG."
							>
								<InfoIcon className="w-4 h-4 text-gray-500" />
								<div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
									Choose the lead configuration (e.g., 12-lead for standard ECG).
								</div>
							</span>
						</label>
						<div className="relative">
							<select
								id="lead-type"
								value={leadType}
								onChange={(e) => setLeadType(e.target.value)}
								className="appearance-none w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
								aria-describedby="lead-type-error"
							>
								<option value="">Select Lead Type</option>
								<option value="12-lead">12-Lead</option>
								<option value="6-lead">6-Lead</option>
								<option value="5-lead">5-Lead</option>
								<option value="3-lead">3-Lead</option>
								<option value="1-lead">1-Lead</option>
							</select>
							<ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
						</div>
						{errors.leadType && (
							<p id="lead-type-error" className="mt-1 text-sm text-red-600">
								{errors.leadType}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="voltage"
							className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
						>
							Voltage
							<span
								className="relative group"
								aria-label="Select the voltage scale for the ECG."
							>
								<InfoIcon className="w-4 h-4 text-gray-500" />
								<div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
									Standard is 10 mm/mV; adjust for signal amplitude.
								</div>
							</span>
						</label>
						<div className="relative">
							<select
								id="voltage"
								value={voltage}
								onChange={(e) => setVoltage(e.target.value)}
								className="appearance-none w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
								aria-describedby="voltage-error"
							>
								<option value="">Select Voltage</option>
								<option value="2.5 mm/mV">2.5 mm/mV</option>
								<option value="5 mm/mV">5 mm/mV</option>
								<option value="10 mm/mV">10 mm/mV</option>
								<option value="20 mm/mV">20 mm/mV</option>
							</select>
							<ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
						</div>
						{errors.voltage && (
							<p id="voltage-error" className="mt-1 text-sm text-red-600">
								{errors.voltage}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div>
						<label
							htmlFor="speed"
							className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
						>
							Speed
							<span
								className="relative group"
								aria-label="Select the paper speed for the ECG."
							>
								<InfoIcon className="w-4 h-4 text-gray-500" />
								<div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
									Standard is 25 mm/s; higher speeds for detailed waveforms.
								</div>
							</span>
						</label>
						<div className="relative">
							<select
								id="speed"
								value={speed}
								onChange={(e) => setSpeed(e.target.value)}
								className="appearance-none w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
								aria-describedby="speed-error"
							>
								<option value="">Select Speed</option>
								<option value="12.5 mm/s">12.5 mm/s</option>
								<option value="25 mm/s">25 mm/s</option>
								<option value="50 mm/s">50 mm/s</option>
								<option value="100 mm/s">100 mm/s</option>
							</select>
							<ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
						</div>
						{errors.speed && (
							<p id="speed-error" className="mt-1 text-sm text-red-600">
								{errors.speed}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="reason"
							className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
						>
							Reason for ECG
							<span
								className="relative group"
								aria-label="Select the clinical reason for the ECG."
							>
								<InfoIcon className="w-4 h-4 text-gray-500" />
								<div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
									Indicate the patient’s symptoms or purpose (e.g., routine checkup).
								</div>
							</span>
						</label>
						<div className="relative">
							<select
								id="reason"
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								className="appearance-none w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
								aria-describedby="reason-error"
							>
								<option value="">Select Reason</option>
								<option value="chest pain">Chest Pain</option>
								<option value="dizziness">Dizziness</option>
								<option value="shortness of breath">Shortness of Breath</option>
								<option value="palpitations">Palpitations</option>
								<option value="syncope">Syncope</option>
								<option value="fatigue">Fatigue</option>
								<option value="routine checkup">Routine Checkup</option>
								<option value="postprocedure">Post-Procedure</option>
								<option value="other">Other</option>
							</select>
							<ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
						</div>
						{errors.reason && (
							<p id="reason-error" className="mt-1 text-sm text-red-600">
								{errors.reason}
							</p>
						)}
						{reason === "other" && (
							<div className="mt-4">
								<input
									type="text"
									id="other-reason"
									value={otherReason}
									onChange={(e) => setOtherReason(e.target.value)}
									placeholder="Specify reason"
									className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
									aria-describedby="other-reason-error"
								/>
								{errors.otherReason && (
									<p id="other-reason-error" className="mt-1 text-sm text-red-600">
										{errors.otherReason}
									</p>
								)}
							</div>
						)}
					</div>
				</div>

				<button
					type="submit"
					className="w-full sm:w-auto mx-auto bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
				>
					<ActivityIcon className="w-5 h-5" />
					Process ECG
				</button>
			</form>
			<CameraCaptureModal
				isOpen={isCameraModalOpen}
				onClose={() => setIsCameraModalOpen(false)}
				onCapture={handleModalCapture}
			/>
		</>
	);
};

// ProcessingModal Component
interface ProcessingModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: {
		images: File[];
		leadType: string;
		voltage: string;
		speed: string;
		reason: string;
		otherReason: string;
		diagnosis?: string;
		message?: string;
		accuracyRating?: string;
		reviewed?: boolean;
	};
}

const ProcessingModal: React.FC<ProcessingModalProps> = ({
	isOpen,
	onClose,
	data,
}) => {
	const [analysisTime, setAnalysisTime] = useState<string>("");
	const [isReviewed, setIsReviewed] = useState<boolean>(data.reviewed ?? false);

	useEffect(() => {
		if (isOpen) {
			const now = new Date();
			setAnalysisTime(now.toLocaleString());
			setIsReviewed(data.reviewed ?? false);
		}
	}, [isOpen, data.reviewed]);

	const handleReviewClick = () => {
		setIsReviewed(true);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
			<div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-scale-in">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
					aria-label="Close modal"
				>
					<XIcon className="w-6 h-6" />
				</button>
				<h3 className="text-2xl font-semibold text-gray-900 mb-4">
					ECG Analysis Report
				</h3>
				<p className="text-gray-600 mb-2">
					Analysis Time: <span className="font-medium">{analysisTime}</span>
				</p>
				<ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm mb-6">
					<li>Images: {data.images.length} uploaded</li>
					<li>Lead Type: {data.leadType}</li>
					<li>Voltage: {data.voltage}</li>
					<li>Speed: {data.speed}</li>
					<li>Reason: {data.reason === "other" ? data.otherReason : data.reason}</li>
				</ul>
				{data.diagnosis && (
					<div className="bg-blue-100 border border-blue-400 text-blue-700 p-4 rounded mb-4">
						<h4 className="font-semibold mb-2">{data.diagnosis}</h4>
						<p>{data.message}</p>
					</div>
				)}
				{data.accuracyRating && (
					<p className="text-gray-700 font-semibold mb-4">
						Accuracy Rating: {data.accuracyRating}
					</p>
				)}
				<button
					onClick={handleReviewClick}
					disabled={isReviewed}
					className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${
						isReviewed
							? "bg-gray-400 text-gray-700 cursor-not-allowed"
							: "bg-blue-600 text-white hover:bg-blue-700"
					}`}
				>
					{isReviewed ? "Reviewed" : "Review"}
				</button>
			</div>
		</div>
	);
};

// Utility Functions
const renderUploadSection = (
	setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>
) => (
	<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
		<div className="flex items-center justify-between mb-4">
			<h3 className="text-lg font-semibold text-gray-900">Upload ECG</h3>
			<button
				onClick={() => setShowUploadModal(true)}
				className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
			>
				<UploadIcon className="h-5 w-5 mr-2" />
				Upload New ECG
			</button>
		</div>
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
				<h4 className="text-sm font-semibold text-gray-900 mb-2">
					Supported Formats
				</h4>
				<ul className="space-y-2 text-sm text-gray-600">
					<li className="flex items-center">
						<FileIcon className="h-4 w-4 mr-2 text-blue-500" />
						PDF (12-lead ECG reports)
					</li>
					<li className="flex items-center">
						<FileIcon className="h-4 w-4 mr-2 text-blue-500" />
						DICOM (Standard medical format)
					</li>
					<li className="flex items-center">
						<FileIcon className="h-4 w-4 mr-2 text-blue-500" />
						CSV (Raw data format)
					</li>
				</ul>
			</div>
			<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
				<h4 className="text-sm font-semibold text-gray-900 mb-2">
					Upload Guidelines
				</h4>
				<ul className="space-y-2 text-sm text-gray-600">
					<li className="flex items-center">
						<CheckCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
						Ensure correct patient identification
					</li>
					<li className="flex items-center">
						<CheckCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
						Verify lead placement accuracy
					</li>
					<li className="flex items-center">
						<CheckCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
						Include relevant clinical context
					</li>
					<li className="flex items-center">
						<CheckCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
						Check file quality before upload
					</li>
				</ul>
			</div>
		</div>
	</div>
);

const renderAnalysisTools = () => (
	<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
		<div className="mb-4">
			<h3 className="text-lg font-semibold text-gray-900">Monitoring Tools</h3>
		</div>
		<div className="space-y-4 text-gray-700 text-sm">
			<button
				type="button"
				className="w-full text-left p-3 rounded-md border border-gray-300 hover:bg-blue-50 transition-colors duration-300"
			>
				<h4 className="font-semibold">Resting ECG</h4>
				<p>Standard 12-lead ECG recording</p>
			</button>
			<button
				type="button"
				className="w-full text-left p-3 rounded-md border border-gray-300 hover:bg-blue-50 transition-colors duration-300"
			>
				<h4 className="font-semibold">Holter Monitor</h4>
				<p>24-48 hour continuous recording</p>
			</button>
			<button
				type="button"
				className="w-full text-left p-3 rounded-md border border-gray-300 hover:bg-blue-50 transition-colors duration-300"
			>
				<h4 className="font-semibold">Stress ECG</h4>
				<p>Exercise stress test recording</p>
			</button>
		</div>
	</div>
);

const renderPatientList = (
	patientSearchTerm: string,
	setPatientSearchTerm: React.Dispatch<React.SetStateAction<string>>,
	setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>
) => {
	const filteredPatients = mockPatients.filter((patient) =>
		patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase())
	);

	return (
		<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
			<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-900">Patient List</h2>
				<div className="relative flex-1 max-w-md">
					<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
					<input
						type="text"
						placeholder="Search patients..."
						className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
						value={patientSearchTerm}
						onChange={(e) => setPatientSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className="divide-y divide-gray-200">
				{filteredPatients.map((patient, index) => (
					<div
						key={patient.id}
						className={`p-6 hover:bg-blue-50 cursor-pointer transition-colors duration-300 ${
							index % 2 === 0 ? "bg-gray-50" : "bg-white"
						}`}
						onClick={() => setSelectedPatient(patient)}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm mr-4">
									{patient.name
										.split(" ")
										.map((n) => n[0])
										.join("")
										.toUpperCase()}
								</div>
								<div>
									<h4 className="text-sm font-semibold text-gray-900">
										{patient.name}
									</h4>
									<p className="text-sm text-gray-600">
										DOB: {patient.dateOfBirth}
									</p>
								</div>
							</div>
							<button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
								Select
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const renderDashboardCards = (
	selectedPatient: Patient | null,
	ecgRecords: ECGRecord[]
) => {
	const patientRecords = selectedPatient
		? ecgRecords.filter((ecg) => ecg.patientId === selectedPatient.id)
		: ecgRecords;
	const pendingCount = patientRecords.filter((ecg) => ecg.status === "pending")
		.length;
	const completedTodayCount = patientRecords.filter(
		(ecg) =>
			ecg.date === new Date().toISOString().split("T")[0] &&
			ecg.status !== "pending"
	).length;
	const requiresAttentionCount = patientRecords.filter(
		(ecg) => ecg.status === "critical" || ecg.status === "abnormal"
	).length;

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<AlertCircleIcon className="h-6 w-6 text-yellow-500 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900">
							Pending Analysis
						</h3>
					</div>
					<span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
						{pendingCount}
					</span>
				</div>
			</div>
			<div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900">
							Completed Today
						</h3>
					</div>
					<span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
						{completedTodayCount}
					</span>
				</div>
			</div>
			<div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<AlertCircleIcon className="h-6 w-6 text-red-500 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900">
							Requires Attention
						</h3>
					</div>
					<span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
						{requiresAttentionCount}
					</span>
				</div>
			</div>
		</div>
	);
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "normal":
			return "text-green-600 ring-green-600/30";
		case "abnormal":
			return "text-yellow-600 ring-yellow-600/30";
		case "critical":
			return "text-red-600 ring-red-600/30";
		case "pending":
			return "text-gray-600 ring-gray-600/30";
		default:
			return "text-gray-600 ring-gray-600/30";
	}
};

const getPriorityIcon = (priority: string) => {
	switch (priority) {
		case "routine":
			return <InfoIcon className="h-6 w-6 text-blue-500" />;
		case "urgent":
			return <AlertCircleIcon className="h-6 w-6 text-yellow-500" />;
		case "stat":
			return <AlertCircleIcon className="h-6 w-6 text-red-500" />;
		default:
			return <InfoIcon className="h-6 w-6 text-gray-500" />;
	}
};

const renderECGRecords = (
	filteredECGs: ECGRecord[],
	expandedRecords: string[],
	toggleRecordExpansion: (id: string) => void
) => (
	<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
		<div className="px-6 py-4 border-b border-gray-200">
			<h2 className="text-lg font-semibold text-gray-900">ECG Records</h2>
		</div>
		<div className="divide-y divide-gray-200">
			{filteredECGs.map((record) => (
				<div
					key={record.id}
					className="p-6 hover:bg-blue-50 transition-colors duration-300"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="flex-shrink-0">{getPriorityIcon(record.priority)}</div>
							<div>
								<h4 className="text-sm font-semibold text-gray-900">
									{record.patientName}
								</h4>
								<div className="flex items-center text-sm text-gray-600">
									<CalendarIcon className="h-4 w-4 mr-1" />
									{record.date}
									<HeartPulseIcon className="h-4 w-4 ml-4 mr-1" />
									{record.rhythm}
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<span
								className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ${getStatusColor(
									record.status
								)}`}
							>
								{record.status.charAt(0).toUpperCase() + record.status.slice(1)}
							</span>
							<button
								onClick={() => toggleRecordExpansion(record.id)}
								className="text-gray-500 hover:text-blue-600"
							>
								{expandedRecords.includes(record.id) ? (
									<ChevronRightIcon className="h-5 w-5 transform rotate-90" />
								) : (
									<ChevronRightIcon className="h-5 w-5" />
								)}
							</button>
						</div>
					</div>
					{expandedRecords.includes(record.id) && (
						<div className="mt-4 pl-12">
							<div className="mb-6">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-sm font-semibold text-gray-900">
										ECG Recording
									</h3>
									<div className="flex space-x-2">
										<button className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-300">
											<ZoomInIcon className="h-4 w-4 text-blue-500" />
										</button>
										<button className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-300">
											<ZoomOutIcon className="h-4 w-4 text-blue-500" />
										</button>
										<button className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-300">
											<RotateCcwIcon className="h-4 w-4 text-blue-500" />
										</button>
									</div>
								</div>
								<div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
									<ActivityIcon className="h-24 w-24 text-blue-300" />
								</div>
							</div>
							<div className="grid grid-cols-4 gap-4 mb-6">
								<div className="bg-blue-50 p-3 rounded-lg">
									<p className="text-xs text-gray-600">Heart Rate</p>
									<p className="text-lg font-semibold text-gray-900">
										{record.heartRate} <span className="text-sm">bpm</span>
									</p>
								</div>
								<div className="bg-blue-50 p-3 rounded-lg">
									<p className="text-xs text-gray-600">PR Interval</p>
									<p className="text-lg font-semibold text-gray-900">
										{record.prInterval} <span className="text-sm">ms</span>
									</p>
								</div>
								<div className="bg-blue-50 p-3 rounded-lg">
									<p className="text-xs text-gray-600">QRS Interval</p>
									<p className="text-lg font-semibold text-gray-900">
										{record.qrsInterval} <span className="text-sm">ms</span>
									</p>
								</div>
								<div className="bg-blue-50 p-3 rounded-lg">
									<p className="text-xs text-gray-600">QT Interval</p>
									<p className="text-lg font-semibold text-gray-900">
										{record.qtInterval} <span className="text-sm">ms</span>
									</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-6 mb-6">
								<div>
									<h4 className="text-sm font-semibold text-gray-900 mb-2">
										Findings
									</h4>
									<ul className="space-y-1">
										{record.findings.map((finding, index) => (
											<li
												key={index}
												className="flex items-start text-sm text-gray-600"
											>
												<ChevronRightIcon className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
												{finding}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h4 className="text-sm font-semibold text-gray-900 mb-2">
										Recommendations
									</h4>
									<ul className="space-y-1">
										{record.recommendations.map((rec, index) => (
											<li
												key={index}
												className="flex items-start text-sm text-gray-600"
											>
												<ChevronRightIcon className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
												{rec}
											</li>
										))}
									</ul>
								</div>
							</div>
							{record.technicianNotes && (
								<div className="mb-6">
									<h4 className="text-sm font-semibold text-gray-900 mb-2">
										Technician Notes
									</h4>
									<p className="text-sm text-gray-600">{record.technicianNotes}</p>
								</div>
							)}
							<div className="flex justify-end space-x-4">
								<button className="text-sm font-medium text-gray-600 hover:text-blue-600">
									Download PDF
								</button>
								<button className="text-sm font-medium text-blue-600 hover:text-blue-800">
									View Full Analysis
								</button>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	</div>
);

const renderRecentRecordings = (ecgRecords: ECGRecord[]) => {
	const recentRecords = ecgRecords
		.slice()
		.sort((a, b) => (a.date < b.date ? 1 : -1))
		.slice(0, 3);

	return (
		<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
			<div className="px-6 py-4 border-b border-gray-200">
				<h2 className="text-lg font-semibold text-gray-900">Recent Recordings</h2>
			</div>
			<div className="divide-y divide-gray-200">
				{recentRecords.map((record) => (
					<div
						key={record.id}
						className="p-6 hover:bg-blue-50 transition-colors duration-300"
					>
						<div className="flex items-center justify-between">
							<div>
								<h4 className="text-sm font-semibold text-gray-900">
									{record.patientName}
								</h4>
								<p className="text-sm text-gray-600">{record.date}</p>
							</div>
							<div>
								<span
									className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ${getStatusColor(
										record.status
									)}`}
								>
									{record.status.charAt(0).toUpperCase() + record.status.slice(1)}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const renderPatientInfo = (selectedPatient: Patient | null, ecgRecords: ECGRecord[]) => {
	if (!selectedPatient) return null;

	const patientRecords = ecgRecords.filter((ecg) => ecg.patientId === selectedPatient.id);
	const latestRecord = patientRecords[0];

	// Calculate age from dateOfBirth
	const calculateAge = (dob: string) => {
		const birthDate = new Date(dob);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">🧑 Patient Bio</h3>
			<div className="flex items-center space-x-6">
				{selectedPatient.profileImage ? (
					<img
						src={selectedPatient.profileImage}
						alt={`${selectedPatient.name} profile`}
						className="w-24 h-24 rounded-full object-cover border border-gray-300"
					/>
				) : (
					<div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-semibold border border-gray-300">
						{selectedPatient.name
							.split(" ")
							.map((n) => n[0])
							.join("")
							.toUpperCase()}
					</div>
				)}
				<div>
					<p>
						<strong>Name:</strong> {selectedPatient.name}
					</p>
					<p>
						<strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)}
					</p>
					<p>
						<strong>Sex:</strong> {selectedPatient.sex ?? "N/A"}
					</p>
				</div>
			</div>

			<div>
				<h4 className="font-semibold text-gray-900 mb-1">Conditions</h4>
				{selectedPatient.medicalHistory && selectedPatient.medicalHistory.length > 0 ? (
					<ul className="list-disc list-inside text-gray-700">
						{selectedPatient.medicalHistory.map((condition, idx) => (
							<li key={idx}>{condition}</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No known conditions</p>
				)}
			</div>

			<div>
				<h4 className="font-semibold text-gray-900 mb-1">Allergies</h4>
				{selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
					<ul className="list-disc list-inside text-gray-700">
						{selectedPatient.allergies.map((allergy, idx) => (
							<li key={idx}>{allergy}</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No known allergies</p>
				)}
			</div>

			<div>
				<h4 className="font-semibold text-gray-900 mb-1">📋 Vitals Timeline</h4>
				<div className="grid grid-cols-2 gap-4 text-gray-700">
					<div>
						<strong>BP:</strong> {selectedPatient.vitals?.bloodPressure ?? "N/A"}
					</div>
					<div>
						<strong>Temp:</strong> {selectedPatient.vitals?.temperature ?? "N/A"}
					</div>
					<div>
						<strong>O2 Sat:</strong> {selectedPatient.vitals?.oxygenSaturation ?? "N/A"}
					</div>
					<div>
						<strong>HR:</strong> {selectedPatient.vitals?.heartRate ?? "N/A"}
					</div>
				</div>
			</div>

			<div>
				<h4 className="font-semibold text-gray-900 mb-1">🗓️ Upcoming Appointments</h4>
				{selectedPatient.upcomingAppointments && selectedPatient.upcomingAppointments.length > 0 ? (
					<ul className="list-disc list-inside text-gray-700">
						{selectedPatient.upcomingAppointments.map((appt, idx) => (
							<li key={idx}>
								{appt.title} — {appt.date}
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No upcoming appointments</p>
				)}
			</div>

			<div>
				<h4 className="font-semibold text-gray-900 mb-1">🔗 Quick Actions</h4>
				<div className="flex space-x-4 flex-wrap">
					<button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2">
						📞 Call Patient
					</button>
					<button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2">
						📧 Message
					</button>
					<button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center gap-2">
						📝 Create Prescription
					</button>
					<button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-300 flex items-center gap-2">
						📅 Schedule Follow-Up
					</button>
					<button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300 flex items-center gap-2">
						🧪 Run Quality Check
					</button>
					<button className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-300 flex items-center gap-2">
						🧠 Refer to Cardiologist
					</button>
				</div>
			</div>

			{latestRecord && (
				<div className="mt-4">
					<strong>Latest ECG Status:</strong>{" "}
					{latestRecord.status.charAt(0).toUpperCase() + latestRecord.status.slice(1)}
				</div>
			)}
		</div>
	);
};

// Main ECGAnalysis Component
const ECGAnalysis: React.FC = () => {
	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
	const [ecgRecords, setEcgRecords] = useState<ECGRecord[]>(mockECGs);
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedRecords, setExpandedRecords] = useState<string[]>([]);
	const [modalState, setModalState] = useState<{
		isOpen: boolean;
		data: {
			images: File[];
			leadType: string;
			voltage: string;
			speed: string;
			reason: string;
			otherReason: string;
			diagnosis?: string;
			message?: string;
			accuracyRating?: string;
			reviewed?: boolean;
		};
	}>({
		isOpen: false,
		data: {
			images: [],
			leadType: "",
			voltage: "",
			speed: "",
			reason: "",
			otherReason: "",
			reviewed: false,
		},
	});
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [patientSearchTerm, setPatientSearchTerm] = useState("");
	const openCameraRef = useRef<{ openCamera: () => void }>(null);

	const toggleRecordExpansion = (id: string) => {
		setExpandedRecords((prev) =>
			prev.includes(id) ? prev.filter((recordId) => recordId !== id) : [...prev, id]
		);
	};

	const handleProcessEcg = (data: {
		images: File[];
		leadType: string;
		voltage: string;
		speed: string;
		reason: string;
		otherReason: string;
	}) => {
		if (!selectedPatient) return;
		// Simulate processing based on image name
		const hasMIImage = data.images.some((file) => file.name.startsWith("MI"));
		const hasHBImage = data.images.some((file) => file.name.startsWith("HB"));
		let newRecord: ECGRecord;

		if (hasMIImage) {
			newRecord = {
				id: Date.now().toString(),
				patientId: selectedPatient.id,
				patientName: selectedPatient.name,
				date: new Date().toISOString().split("T")[0],
				status: "critical",
				heartRate: 0,
				rhythm: "Acute Myocardial Infarction Detected",
				prInterval: 0,
				qrsInterval: 0,
				qtInterval: 0,
				findings: [data.reason === "other" ? data.otherReason : data.reason],
				recommendations: ["Seek immediate medical attention"],
				priority: "stat",
				technicianNotes: "Automated detection of MI patterns.",
			};
			setModalState({
				isOpen: true,
				data: {
					...data,
					diagnosis: "Acute Myocardial Infarction Detected",
					message:
						"Warning: Possible signs of an active or recent heart attack detected. Seek immediate medical attention.",
					accuracyRating: "98.7%",
					reviewed: false,
				},
			});
		} else if (hasHBImage) {
			newRecord = {
				id: Date.now().toString(),
				patientId: selectedPatient.id,
				patientName: selectedPatient.name,
				date: new Date().toISOString().split("T")[0],
				status: "abnormal",
				heartRate: 0,
				rhythm: "Abnormal Heartbeat Detected",
				prInterval: 0,
				qrsInterval: 0,
				qtInterval: 0,
				findings: [data.reason === "other" ? data.otherReason : data.reason],
				recommendations: ["Further evaluation recommended"],
				priority: "urgent",
				technicianNotes: "Automated detection of irregular rhythm.",
			};
			setModalState({
				isOpen: true,
				data: {
					...data,
					diagnosis: "Abnormal Heartbeat Detected",
					message:
						"Irregular heartbeat detected. Further evaluation may be necessary to determine the cause.",
					accuracyRating: "95.3%",
					reviewed: false,
				},
			});
		} else {
			newRecord = {
				id: Date.now().toString(),
				patientId: selectedPatient.id,
				patientName: selectedPatient.name,
				date: new Date().toISOString().split("T")[0],
				status: "pending",
				heartRate: 0,
				rhythm: "Pending Analysis",
				prInterval: 0,
				qrsInterval: 0,
				qtInterval: 0,
				findings: [data.reason === "other" ? data.otherReason : data.reason],
				recommendations: ["Awaiting results"],
				priority: "routine",
				technicianNotes: "Pending automated analysis.",
			};
			setModalState({
				isOpen: true,
				data: {
					...data,
					accuracyRating: "N/A",
					reviewed: false,
				},
			});
		}

		setEcgRecords([newRecord, ...ecgRecords]);
		setShowUploadModal(false);
	};

	const filteredECGs = ecgRecords.filter((ecg) => {
		if (!selectedPatient) return false;
		const matchesPatient = ecg.patientId === selectedPatient.id;
		const matchesSearch = ecg.patientName
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return matchesPatient && matchesSearch;
	});

	return (
		<div className="p-6 bg-gray-50 min-h-screen font-sans">
			{!selectedPatient ? (
				<div className="space-y-6">
					{renderDashboardCards(selectedPatient, ecgRecords)}
					{renderRecentRecordings(ecgRecords)}
					{renderPatientList(patientSearchTerm, setPatientSearchTerm, setSelectedPatient)}
				</div>
			) : (
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-gray-900">
							ECG Analysis for {selectedPatient.name}
						</h1>
						<button
							onClick={() => setSelectedPatient(null)}
							className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
						>
							<XIcon className="h-5 w-5 mr-1" />
							Back to Patient List
						</button>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="grid grid-cols-2 grid-rows-2 gap-6">
							<div className="col-span-2">{renderPatientInfo(selectedPatient, ecgRecords)}</div>
						</div>
					<div className="grid grid-cols-2 gap-6">
						<div>{renderAnalysisTools()}</div>
					</div>
					<div className="mt-6">
					<ECGTimelineView selectedPatient={selectedPatient} patientECGData={filteredECGs} />
					</div>
					<div className="mt-6">
						{renderUploadSection(setShowUploadModal)}
					</div>
					{/* Hide the existing detailed ECG records list when showing ECGTimelineView */}
					{/* <div className="col-span-2">
						{renderECGRecords(filteredECGs, expandedRecords, toggleRecordExpansion)}
					</div> */}
					</div>
				</div>
			)}
			{showUploadModal && (
				<div
					className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in"
					role="dialog"
					aria-modal="true"
					aria-labelledby="upload-ecg-modal-title"
				>
					<div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl animate-scale-in">
						<button
							onClick={() => setShowUploadModal(false)}
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
							aria-label="Close modal"
						>
							<XIcon className="w-6 h-6" />
						</button>
						<h2
							id="upload-ecg-modal-title"
							className="text-2xl font-semibold text-gray-900 mb-6"
						>
							Upload New ECG for {selectedPatient?.name}
						</h2>
						<EcgForm onProcess={handleProcessEcg} openCameraRef={openCameraRef} />
					</div>
				</div>
			)}
			<ProcessingModal
				isOpen={modalState.isOpen}
				onClose={() => setModalState({ ...modalState, isOpen: false })}
				data={modalState.data}
			/>
		</div>
	);
};

export default ECGAnalysis;

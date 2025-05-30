import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Homepage/Navbar";
import {
	MailIcon,
	PhoneIcon,
	MapPinIcon,
	CheckCircleIcon,
	AlertCircleIcon,
	ChevronDownIcon,
	HeartPulseIcon,
	LinkedinIcon,
	XIcon,
} from "lucide-react";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const ContactPage: React.FC = () => {
	const [formStatus, setFormStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
	const [showModal, setShowModal] = useState(false);

	const validateForm = (): boolean => {
		const errors: Partial<FormData> = {};
		if (!formData.name.trim()) errors.name = "Name is required";
		if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
			errors.email = "Valid email is required";
		if (!formData.subject.trim()) errors.subject = "Subject is required";
		if (!formData.message.trim()) errors.message = "Message is required";
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setFormStatus("submitting");
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setFormStatus("success");
			setFormData({ name: "", email: "", subject: "", message: "" });
			setFormErrors({});
			setShowModal(true);
		} catch {
			setFormStatus("error");
			setShowModal(true);
		}
	};

	const toggleFaq = (index: number) => {
		setActiveFaqIndex(activeFaqIndex === index ? null : index);
	};

	const closeModal = () => {
		setShowModal(false);
		setFormStatus("idle");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-dot::after {
          content: '';
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
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
      `}</style>

			<Navbar />

			<main className="pt-16">
				{/* Hero Section */}
				<section className="relative bg-gradient-to-br from-red-100 to-white py-20 overflow-hidden">
					<div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center opacity-10" />
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<div className="mb-8 animate-fade-in">
							<HeartPulseIcon className="h-16 w-16 text-red-600 mx-auto mb-6" />
						</div>
						<h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
							Connect with CardiacTEK
						</h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
							Your partner in advanced cardiac care. Our clinical support team
							is available 24/7 to assist you.
						</p>
					</div>
				</section>

				{/* Team Profiles */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
						Meet Our Clinical Support Team
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								name: "Dr. Emily Chen",
								role: "Chief Cardiologist",
								image:
									"https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
								linkedin: "https://linkedin.com/in/emilychen",
							},
							{
								name: "Dr. Michael Patel",
								role: "AI Research Lead",
								image:
									"https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
								linkedin: "https://linkedin.com/in/michaelpatel",
							},
							{
								name: "Sarah Johnson",
								role: "Clinical Support Manager",
								image:
									"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
								linkedin: "https://linkedin.com/in/sarahjohnson",
							},
							{
								name: "Dr. James Lee",
								role: "EHR Integration Specialist",
								image:
									"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
								linkedin: "https://linkedin.com/in/jameslee",
							},
						].map((member, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
								<img
									src={member.image}
									alt={member.name}
									className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
								/>
								<h3 className="text-lg font-semibold text-gray-900 text-center">
									{member.name}
								</h3>
								<p className="text-sm text-gray-600 text-center mb-4">
									{member.role}
								</p>
								<a
									href={member.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center text-red-600 hover:text-red-800"
									aria-label={`Connect with ${member.name} on LinkedIn`}>
									<LinkedinIcon className="w-6 h-6" />
								</a>
							</div>
						))}
					</div>
				</section>

				{/* Contact Information */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
						Contact Options
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
						{[
							{
								icon: (
									<MailIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
								),
								title: "Clinical Support",
								details: [
									"Care Team: care@cardiactek.com",
									"Emergency: emergency@cardiactek.com",
								],
							},
							{
								icon: (
									<PhoneIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
								),
								title: "Emergency Contact",
								details: [
									"Clinical Support: 1-800-HEART-911",
									"Technical Support: 1-800-CARD-TEK",
								],
							},
							{
								icon: (
									<MapPinIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
								),
								title: "HQ Location",
								details: [
									"123 Cardiac Way Suite 200",
									"San Francisco, CA 94107",
								],
							},
						].map((item, index) => (
							<div
								key={index}
								className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
								{item.icon}
								<h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
									{item.title}
								</h3>
								<div className="space-y-2 text-center">
									{item.details.map((detail, i) => (
										<p key={i} className="text-gray-600 text-sm">
											{detail}
										</p>
									))}
								</div>
							</div>
						))}
					</div>

					{/* Embedded Map */}
					<div className="rounded-2xl overflow-hidden shadow-lg mb-16">
						<iframe
							title="CardiacTEK Headquarters"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.635834241066!2d-122.406744584683!3d37.78377997975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f4b81e3cd%3A0xe3a3f6907f2a525!2s123%20Cardiac%20Way%2C%20San%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1629781000000!5m2!1sen!2sus"
							width="100%"
							height="400"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
						/>
					</div>
				</section>

				{/* Contact Form */}
				<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="bg-blue-100 rounded-2xl shadow-xl">
						<div className="p-8 sm:p-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
								Clinical Inquiry Form
							</h2>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Full Name
										</label>
										<input
											type="text"
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											className={`w-full px-4 py-3 rounded-lg border ${
												formErrors.name ? "border-red-500" : "border-gray-300"
											} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
											required
											aria-invalid={!!formErrors.name}
											aria-describedby={
												formErrors.name ? "name-error" : undefined
											}
										/>
										{formErrors.name && (
											<p id="name-error" className="text-red-500 text-xs mt-1">
												{formErrors.name}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Institution Email
										</label>
										<input
											type="email"
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											className={`w-full px-4 py-3 rounded-lg border ${
												formErrors.email ? "border-red-500" : "border-gray-300"
											} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
											required
											aria-invalid={!!formErrors.email}
											aria-describedby={
												formErrors.email ? "email-error" : undefined
											}
										/>
										{formErrors.email && (
											<p id="email-error" className="text-red-500 text-xs mt-1">
												{formErrors.email}
											</p>
										)}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Subject
									</label>
									<input
										type="text"
										value={formData.subject}
										onChange={(e) =>
											setFormData({ ...formData, subject: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-lg border ${
											formErrors.subject ? "border-red-500" : "border-gray-300"
										} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
										required
										aria-invalid={!!formErrors.subject}
										aria-describedby={
											formErrors.subject ? "subject-error" : undefined
										}
									/>
									{formErrors.subject && (
										<p id="subject-error" className="text-red-500 text-xs mt-1">
											{formErrors.subject}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Clinical Details
									</label>
									<textarea
										rows={5}
										value={formData.message}
										onChange={(e) =>
											setFormData({ ...formData, message: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-lg border ${
											formErrors.message ? "border-red-500" : "border-gray-300"
										} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
										placeholder="Include patient ID, symptoms, and relevant medical history"
										required
										aria-invalid={!!formErrors.message}
										aria-describedby={
											formErrors.message ? "message-error" : undefined
										}
									/>
									{formErrors.message && (
										<p id="message-error" className="text-red-500 text-xs mt-1">
											{formErrors.message}
										</p>
									)}
								</div>

								<button
									type="submit"
									disabled={formStatus === "submitting"}
									className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
										formStatus === "submitting"
											? "bg-red-400 cursor-not-allowed"
											: "bg-red-600 hover:bg-red-700 text-white"
									}`}>
									{formStatus === "submitting" ? (
										<>
											<svg
												className="animate-spin h-5 w-5 mr-2 text-white"
												viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												/>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
												/>
											</svg>
											Submitting...
										</>
									) : (
										<>
											Send Priority Message
											<MailIcon className="h-5 w-5 ml-2" />
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
						Clinical Support FAQ
					</h2>
					<div className="space-y-4">
						{[
							{
								question: "What constitutes a cardiac emergency?",
								answer:
									"Immediately contact emergency services for chest pain lasting more than 5 minutes, sudden shortness of breath, or loss of consciousness. Our system will automatically notify your local EMS when critical rhythms are detected.",
							},
							{
								question: "How do you handle HIPAA compliance?",
								answer:
									"All data is encrypted end-to-end with AES-256 encryption. We maintain strict access controls and audit logs to ensure compliance with healthcare privacy regulations.",
							},
							{
								question: "What clinical integrations do you support?",
								answer:
									"Our system integrates with EPIC, Cerner, and HL7-compliant EHR systems. We support automated report generation and real-time monitoring alerts.",
							},
						].map((faq, index) => (
							<div
								key={index}
								className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
								role="region"
								aria-labelledby={`faq-question-${index}`}>
								<button
									onClick={() => toggleFaq(index)}
									className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
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
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12 px-4">
				<div className="container mx-auto max-w-7xl">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						<div>
							<h3 className="font-bold text-lg mb-4">CardiacTEK</h3>
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
										Treatment Protocols
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
										Clinical Guidelines
									</Link>
								</li>
								<li>
									<Link
										to="/research-library"
										className="hover:text-white transition-colors">
										Research Portal
									</Link>
								</li>
								<li>
									<Link
										to="/training"
										className="hover:text-white transition-colors">
										Physician Training
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
										GDPR Compliance
									</Link>
								</li>
								<li>
									<Link
										to="/quality"
										className="hover:text-white transition-colors">
										Quality Assurance
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
						<p>
							© {new Date().getFullYear()} CardiacTEK. For clinical use only.
						</p>
						<div className="mt-2 flex gap-4 justify-center">
							<Link
								to="/privacy"
								className="hover:text-white transition-colors">
								Privacy Policy
							</Link>
							<Link to="/terms" className="hover:text-white transition-colors">
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</footer>

			{/* Submission Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 relative">
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
							aria-label="Close modal">
							<XIcon className="w-6 h-6" />
						</button>
						<div className="flex items-center mb-4">
							{formStatus === "success" ? (
								<CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
							) : (
								<AlertCircleIcon className="h-8 w-8 text-red-600 mr-3" />
							)}
							<h3 className="text-xl font-bold text-gray-900">
								{formStatus === "success"
									? "Message Sent!"
									: "Submission Failed"}
							</h3>
						</div>
						<p className="text-gray-600">
							{formStatus === "success"
								? "Your message has been received. Our clinical team will respond within 2 hours."
								: "There was an error submitting your form. Please contact emergency support at emergency@cardiactek.com."}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactPage;

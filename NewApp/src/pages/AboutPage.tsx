import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
	HeartPulseIcon,
	UsersIcon,
	ActivityIcon,
	BrainIcon,
	ShieldIcon,
	ClockIcon,
	LineChartIcon,
	ZapIcon,
} from "lucide-react";

const AboutPage = () => {
	return (
		<div className="min-h-screen bg-white">
			<style>{`
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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

			<main className="pt-16">
				{/* Hero Section */}
				<section
					className="bg-gradient-to-br from-red-50 via-white to-red-100 py-20 px-4"
					aria-labelledby="hero-heading">
					<div className="max-w-7xl mx-auto text-center">
						<div className="animate-pulse-slow">
							<HeartPulseIcon className="h-20 w-20 text-red-600 mx-auto mb-6" />
						</div>
						<h1
							id="hero-heading"
							className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
							Pioneering <span className="text-red-600">Cardiac Care</span> with
							AI
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in">
							Transforming cardiovascular health with cutting-edge AI and
							clinical expertise.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
							<Link
								to="/demo"
								className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300 focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
								Schedule Demo
							</Link>
							<Link
								to="/contact"
								className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors duration-300 focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
								Contact Us
							</Link>
						</div>
					</div>
				</section>

				{/* Mission Statement */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="relative bg-white/10 rounded-2xl shadow-xl p-8 sm:p-12 border border-red-100 backdrop-blur-sm animate-fade-in">
							<div className="text-center max-w-3xl mx-auto">
								<h2 className="text-3xl font-bold text-gray-900 mb-6">
									Our Mission
								</h2>
								<p className="text-lg text-gray-600 mb-8">
									To empower healthcare providers and patients with AI-driven
									tools that enhance diagnostic accuracy, improve outcomes, and
									make cardiac care accessible to all.
								</p>
								<div className="grid md:grid-cols-3 gap-6 mt-12">
									<MissionPoint
										icon={<BrainIcon className="h-6 w-6 text-red-600" />}
										title="AI Innovation"
										text="Deep learning models trained on millions of cardiac data points."
									/>
									<MissionPoint
										icon={<ShieldIcon className="h-6 w-6 text-red-600" />}
										title="Security First"
										text="HIPAA-compliant platform with military-grade encryption."
									/>
									<MissionPoint
										icon={<UsersIcon className="h-6 w-6 text-red-600" />}
										title="Patient-Centric"
										text="Tools designed for clinicians and patients alike."
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Key Features */}
				<section className="py-20 bg-red-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
								Why Choose CardiacTek?
							</h2>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
								Leading the way in AI-driven cardiac care solutions.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[
								{
									icon: <LineChartIcon className="h-8 w-8 text-red-600" />,
									title: "98.7% Diagnostic Accuracy",
									description:
										"Clinically validated AI models for precise analysis.",
								},
								{
									icon: <ClockIcon className="h-8 w-8 text-red-600" />,
									title: "Real-Time Processing",
									description:
										"Instant results with cloud-powered computation.",
								},
								{
									icon: <ZapIcon className="h-8 w-8 text-red-600" />,
									title: "Seamless Integration",
									description:
										"Easily integrates with existing clinical workflows.",
								},
							].map((feature, index) => (
								<div
									key={index}
									className="animate-slide-up"
									style={{ animationDelay: `${index * 0.1}s` }}>
									<FeatureCard {...feature} />
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
							{[
								{
									icon: <UsersIcon className="h-8 w-8" />,
									value: "250K+",
									label: "Patients Empowered",
								},
								{
									icon: <HeartPulseIcon className="h-8 w-8" />,
									value: "5M+",
									label: "ECGs Analyzed",
								},
								{
									icon: <LineChartIcon className="h-8 w-8" />,
									value: "99.9%",
									label: "Accuracy Rate",
								},
								{
									icon: <ClockIcon className="h-8 w-8" />,
									value: "24/7",
									label: "Monitoring",
								},
							].map((stat, index) => (
								<div
									key={index}
									className="animate-slide-up"
									style={{ animationDelay: `${index * 0.1}s` }}>
									<StatItem {...stat} />
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-gray-900 text-white py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm animate-fade-in">
							<h2 className="text-3xl font-bold mb-6">
								Join the Cardiac Care Revolution
							</h2>
							<p className="text-xl mb-8 max-w-2xl mx-auto">
								Discover how CardiacTek is transforming cardiovascular health.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link
									to="/demo"
									className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300 focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
									Schedule Demo
								</Link>
								<Link
									to="/contact"
									className="border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-300 focus:ring-2 focus:ring-white focus:ring-offset-2">
									Contact Us
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-8 px-4">
				<div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
					<div className="flex items-center gap-2 mb-4 sm:mb-0">
						<HeartPulseIcon className="w-6 h-6 text-red-600" />
						<span className="text-sm font-medium">
							CardiacTek © {new Date().getFullYear()}
						</span>
					</div>
					<nav className="flex gap-4 text-sm text-gray-400">
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
			</footer>
		</div>
	);
};

// Reusable Components
const MissionPoint = ({ icon, title, text }) => (
	<div className="p-6 bg-white/10 rounded-xl border border-red-100 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
		<div className="flex items-center mb-3">
			<div className="bg-white p-2 rounded-lg mr-3 shadow-sm">{icon}</div>
			<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
		</div>
		<p className="text-gray-600">{text}</p>
	</div>
);

const FeatureCard = ({ icon, title, description }) => (
	<div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
		<div className="bg-red-100 w-max p-3 rounded-lg mb-4">{icon}</div>
		<h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
		<p className="text-gray-600">{description}</p>
	</div>
);

const StatItem = ({ icon, value, label }) => (
	<div className="text-center">
		<div className="bg-white/10 w-max mx-auto p-3 rounded-full mb-4">
			{icon}
		</div>
		<p className="text-4xl font-bold mb-2">{value}</p>
		<p className="text-lg">{label}</p>
	</div>
);

export default AboutPage;

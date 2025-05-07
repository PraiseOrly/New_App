import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-900 text-white py-12 px-6">
			<div className="container mx-auto max-w-7xl">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
					<div>
						<img src="/real_logo.png" alt="CardiacTek Logo" className="w-20 h-auto mb-4 rounded" />
						<p className="text-gray-400 text-sm max-w-xs">
							Empowering clinicians and patients with AI-driven cardiac care.
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-4 text-base border-b border-red-600 pb-2">
							Clinical Tools
						</h4>
						<ul className="space-y-3 text-sm text-gray-400">
							<li>
								<Link
									to="/ecg-analysis"
									className="hover:text-red-600 transition-colors font-medium">
									ECG Analysis
								</Link>
							</li>
							<li>
								<Link
									to="/risk-assessment"
									className="hover:text-red-600 transition-colors font-medium">
									Risk Assessment
								</Link>
							</li>
							<li>
								<Link
									to="/treatment-guidelines"
									className="hover:text-red-600 transition-colors font-medium">
									Treatment Guidelines
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4 text-base border-b border-red-600 pb-2">
							Resources
						</h4>
						<ul className="space-y-3 text-sm text-gray-400">
							<li>
								<Link
									to="/clinical-guidance"
									className="hover:text-red-600 transition-colors font-medium">
									Clinical Guidance
								</Link>
							</li>
							<li>
								<Link
									to="/research-library"
									className="hover:text-red-600 transition-colors font-medium">
									Research Library
								</Link>
							</li>
							<li>
								<Link
									to="/training"
									className="hover:text-red-600 transition-colors font-medium">
									Clinician Training
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4 text-base border-b border-red-600 pb-2">
							Compliance
						</h4>
						<ul className="space-y-3 text-sm text-gray-400">
							<li>
								<Link
									to="/hipaa"
									className="hover:text-red-600 transition-colors font-medium">
									HIPAA Compliance
								</Link>
							</li>
							<li>
								<Link
									to="/gdpr"
									className="hover:text-red-600 transition-colors font-medium">
									GDPR
								</Link>
							</li>
							<li>
								<Link
									to="/quality"
									className="hover:text-red-600 transition-colors font-medium">
									Quality Management
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-red-600 pt-6 text-center text-sm text-gray-400">
					<p>
						© {new Date().getFullYear()} CardiacTek. For professional use only.
					</p>
					<div className="mt-3 flex gap-6 justify-center">
						<Link
							to="/privacy"
							className="hover:text-red-600 transition-colors font-medium">
							Privacy Policy
						</Link>
						<Link
							to="/terms"
							className="hover:text-red-600 transition-colors font-medium">
							Terms of Use
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

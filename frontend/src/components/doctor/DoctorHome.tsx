import React from "react";
import {
	UsersIcon,
	CalendarIcon,
	HeartPulseIcon,
	ClipboardListIcon,
	VideoIcon,
	AlertCircleIcon,
	ClockIcon,
	FileTextIcon,
	StethoscopeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorHome: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
			<style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        .animate-pulse-critical {
          animation: pulse 2s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        .progress-ring {
          transform: rotate(-90deg);
        }
        .progress-ring circle {
          transition: stroke-dashoffset 0.3s;
        }
        .progress-bar {
          transition: width 0.3s ease-in-out;
        }
      `}</style>
			<div className="max-w-7xl mx-auto">
				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column: Quick Actions, Performance Metrics, Upcoming Appointments */}
					<div className="lg:col-span-2 space-y-10">
						{/* Quick Actions */}
						<section
							className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in"
							role="region"
							aria-label="Quick Actions">
							<div className="flex items-center mb-4">
								<StethoscopeIcon
									className="h-6 w-6 text-red-600 mr-2"
									aria-hidden="true"
								/>
								<h2 className="text-2xl font-extrabold text-gray-900">
									Quick Actions
								</h2>
							</div>
							<nav aria-label="Quick actions navigation">
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{[
										{
											to: "/doctor-dashboard/telemedicine",
											icon: VideoIcon,
											text: "Start Telemedicine",
											title: "Start a telemedicine session",
										},
										{
											to: "/doctor-dashboard/prescriptions",
											icon: ClipboardListIcon,
											text: "New Prescription",
											title: "Create a new prescription",
										},
										{
											to: "/doctor-dashboard/appointments",
											icon: CalendarIcon,
											text: "Schedule Appointment",
											title: "Schedule a patient appointment",
										},
										{
											to: "/doctor-dashboard/ecg",
											icon: HeartPulseIcon,
											text: "Review ECG",
											title: "Review ECG analysis",
										},
									].map((action, index) => (
										<Link
											key={index}
											to={action.to}
											className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 animate-slide-up"
											title={action.title}
											aria-label={action.title}>
											<action.icon
												className="h-6 w-6 mr-2"
												aria-hidden="true"
											/>
											<span className="text-base font-medium">
												{action.text}
											</span>
										</Link>
									))}
								</div>
							</nav>
						</section>
						{/* Performance Metrics */}
						<section
							className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in"
							role="region"
							aria-label="Performance Metrics">
							<div className="flex items-center mb-4">
								<UsersIcon
									className="h-6 w-6 text-red-600 mr-2"
									aria-hidden="true"
								/>
								<h2 className="text-2xl font-extrabold text-gray-900">
									Performance Metrics
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
								{[
									{
										icon: UsersIcon,
										title: "Today's Patients",
										value: "12",
										subtext: "↑ 10% from yesterday",
										color: "text-red-600",
										id: "patients-metric",
										progress: 0,
									},
									{
										icon: HeartPulseIcon,
										title: "Critical Cases",
										value: "3",
										subtext: "Requires immediate attention",
										color: "text-red-600",
										id: "critical-metric",
										progress: 75,
									},
									{
										icon: ClockIcon,
										title: "Avg. Wait Time",
										value: "15 min",
										subtext: "↓ 5min from last week",
										color: "text-red-600",
										id: "wait-time-metric",
										progress: 0,
									},
									{
										icon: HeartPulseIcon,
										title: "ECG Analysis",
										value: "8",
										subtext: "Pending review",
										color: "text-red-600",
										id: "ecg-metric",
										progress: 60,
									},
								].map((metric, index) => (
									<div
										key={index}
										className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow animate-slide-up"
										aria-describedby={metric.id}>
										<div className="flex items-center">
											<div className="relative">
												{metric.progress ? (
													<svg
														className="progress-ring h-12 w-12"
														viewBox="0 0 36 36">
														<circle
															className="text-gray-200"
															strokeWidth="4"
															fill="transparent"
															r="16"
															cx="18"
															cy="18"
														/>
														<circle
															className="text-red-600"
															strokeWidth="4"
															fill="transparent"
															r="16"
															cx="18"
															cy="18"
															strokeDasharray="100"
															strokeDashoffset={100 - metric.progress}
														/>
														<metric.icon
															className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 ${metric.color}`}
														/>
													</svg>
												) : (
													<metric.icon
														className={`h-12 w-12 ${metric.color} hover:scale-110 transition-transform`}
													/>
												)}
											</div>
											<div className="ml-4 flex-1">
												<p className="text-base font-medium text-gray-700">
													{metric.title}
												</p>
												<p className="text-3xl font-semibold text-gray-900">
													{metric.value}
												</p>
												<p
													className={`text-sm ${
														metric.subtext.includes("Requires")
															? "text-red-600"
															: "text-gray-500"
													}`}>
													{metric.subtext}
												</p>
												{metric.progress > 0 && (
													<div className="mt-2">
														<div className="bg-gray-200 rounded-full h-2">
															<div
																className={`bg-red-600 h-2 rounded-full progress-bar`}
																style={{ width: `${metric.progress}%` }}></div>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
							{/* Patient Trends Chart */}
							<figure className="mt-4" aria-describedby="chart-description">
								<div className="flex items-center mb-2">
									<CalendarIcon
										className="h-6 w-6 text-red-600 mr-2"
										aria-hidden="true"
									/>
									<h3 className="text-lg font-semibold text-gray-900">
										Patient Trends (7 Days)
									</h3>
								</div>
								<svg
									className="w-full h-40"
									viewBox="0 0 400 100"
									preserveAspectRatio="none"
									aria-hidden="true">
									<path
										d="M0 80 L50 70 L100 50 L150 60 L200 30 L250 50 L300 40 L350 60 L400 50"
										fill="none"
										stroke="rgb(239, 68, 68)"
										strokeWidth="2"
									/>
									<path
										d="M0 80 L50 70 L100 50 L150 60 L200 30 L250 50 L300 40 L350 60 L400 50 L400 100 L0 100 Z"
										fill="rgba(239, 68, 68, 0.1)"
									/>
								</svg>
								<figcaption id="chart-description" className="sr-only">
									Line chart showing patient visits over the last 7 days, with a
									peak on day 5.
								</figcaption>
							</figure>
						</section>
						{/* Upcoming Appointments */}
						<section
							className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in"
							role="region"
							aria-label="Upcoming Appointments">
							<div className="flex items-center mb-4">
								<CalendarIcon
									className="h-6 w-6 text-red-600 mr-2"
									aria-hidden="true"
								/>
								<h2 className="text-2xl font-extrabold text-gray-900">
									Upcoming Appointments
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{[
									{
										patient: "Michael Brown",
										time: "10:00 AM",
										type: "Telemedicine",
										id: "mbrown",
									},
									{
										patient: "Emma Wilson",
										time: "11:30 AM",
										type: "In-Person",
										id: "ewilson",
									},
									{
										patient: "David Lee",
										time: "2:00 PM",
										type: "Follow-up",
										id: "dlee",
									},
								].map((appt, index) => {
									const initials = appt.patient
										.split(" ")
										.map((word) => word.charAt(0))
										.join("")
										.slice(0, 2)
										.toUpperCase();
									return (
										<div
											key={index}
											className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow animate-slide-up"
											aria-labelledby={`appt-${appt.id}`}>
											<div className="flex items-center">
												<div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-base font-semibold mr-3">
													{initials}
												</div>
												<div className="flex-1">
													<p
														id={`appt-${appt.id}`}
														className="text-base font-medium text-gray-900">
														{appt.patient}
													</p>
													<p className="text-sm text-gray-700">
														{appt.time} • {appt.type}
													</p>
												</div>
												<div className="flex space-x-2">
													<button
														onClick={() =>
															console.log(
																`Join ${appt.type} for ${appt.patient}`
															)
														}
														className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
														aria-label={`Join ${appt.type} appointment for ${appt.patient}`}
														title={`Join ${appt.type} appointment`}>
														Join
													</button>
													<button
														onClick={() =>
															console.log(
																`Reschedule appointment for ${appt.patient}`
															)
														}
														className="px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
														aria-label={`Reschedule appointment for ${appt.patient}`}
														title="Reschedule appointment">
														Reschedule
													</button>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</section>
					</div>
					{/* Right Column: Priority Alerts, Patient Snapshot, Recent Activity */}
					<div className="space-y-10 lg:sticky lg:top-8">
						{/* Priority Alerts */}
						<section
							className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in"
							role="region"
							aria-label="Priority Alerts">
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center">
									<AlertCircleIcon
										className="h-6 w-6 text-red-600 mr-2"
										aria-hidden="true"
									/>
									<h2 className="text-2xl font-extrabold text-gray-900">
										Priority Alerts
									</h2>
								</div>
								<Link
									to="/doctor-dashboard/alerts"
									className="text-base font-medium text-red-600 hover:text-white border border-red-600 px-4 py-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
									aria-label="View all priority alerts">
									View All
								</Link>
							</div>
							<ul className="space-y-4">
								{[
									{
										type: "Critical",
										title: "Critical: Jane Smith",
										patientId: "jsmith",
										description: "Troponin Elevated - 0.5 ng/mL",
										color: "bg-red-100 text-red-900 animate-pulse-critical",
										buttonColor: "text-red-600 hover:text-white",
										ariaLabel: "View alert details for Jane Smith",
									},
									{
										type: "Overdue",
										title: "Overdue Follow-up",
										patientId: null,
										description: "3 Patients Pending Review",
										color: "bg-yellow-100 text-yellow-900",
										buttonColor: "text-yellow-600 hover:text-white",
										ariaLabel: "View overdue follow-up list",
									},
								].map((alert, index) => (
									<li
										key={index}
										className={`flex items-center justify-between ${alert.color} p-4 rounded-md hover:shadow-sm transition-shadow animate-slide-up`}>
										<div className="flex items-center">
											<AlertCircleIcon
												className={`h-6 w-6 ${
													alert.buttonColor.split(" ")[0]
												} mr-3`}
												aria-hidden="true"
											/>
											<div>
												{alert.patientId ? (
													<Link
														to={`/doctor-dashboard/patient/${alert.patientId}`}
														className="text-base font-medium hover:underline"
														aria-label={alert.ariaLabel}
														title="View patient profile">
														{alert.title}
													</Link>
												) : (
													<p className="text-base font-medium">{alert.title}</p>
												)}
												<p className="text-sm text-opacity-80">
													{alert.description}
												</p>
												{alert.type === "Critical" && (
													<span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-red-600 text-white rounded-full">
														Urgent
													</span>
												)}
											</div>
										</div>
										<button
											onClick={() => console.log(`View ${alert.type} Alert`)}
											className={`text-base font-medium ${
												alert.buttonColor
											} border ${
												alert.buttonColor.split(" ")[0]
											} px-4 py-2 rounded-md hover:bg-${
												alert.buttonColor.split(" ")[0].split("-")[1]
											}-600 transition-colors focus:outline-none focus:ring-2 focus:ring-${
												alert.buttonColor.split(" ")[0].split("-")[1]
											}-600`}
											aria-label={alert.ariaLabel}>
											{alert.type === "Critical" ? "View Details" : "View List"}
										</button>
									</li>
								))}
							</ul>
						</section>
						{/* Patient Snapshot */}
						<section
							className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in"
							role="region"
							aria-label="Patient Snapshot">
							<div className="flex items-center mb-4">
								<UsersIcon
									className="h-6 w-6 text-red-600 mr-2"
									aria-hidden="true"
								/>
								<h2 className="text-2xl font-extrabold text-gray-900">
									Patient Snapshot
								</h2>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								{[
									{
										label: "Total Patients",
										value: "150",
										id: "total-patients",
									},
									{ label: "New Patients", value: "5", id: "new-patients" },
									{ label: "Follow-ups", value: "10", id: "follow-ups" },
								].map((stat, index) => (
									<div
										key={index}
										className="text-center animate-slide-up"
										aria-describedby={stat.id}>
										<p className="text-2xl font-semibold text-gray-900">
											{stat.value}
										</p>
										<p className="text-sm text-gray-700">{stat.label}</p>
									</div>
								))}
							</div>
						</section>
						{/* Recent Activity */}
						<section
							className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in"
							role="region"
							aria-label="Recent Activity">
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center">
									<FileTextIcon
										className="h-6 w-6 text-red-600 mr-2"
										aria-hidden="true"
									/>
									<h2 className="text-2xl font-extrabold text-gray-900">
										Recent Activity
									</h2>
								</div>
								<Link
									to="/doctor-dashboard/activity"
									className="text-base font-medium text-red-600 hover:text-white border border-red-600 px-4 py-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
									aria-label="View all recent activities">
									View All
								</Link>
							</div>
							<ul className="space-y-4">
								{[
									{
										icon: FileTextIcon,
										title: "Medical Report Updated",
										description: "Cardiac evaluation for John Doe completed",
										time: "10 minutes ago",
									},
									{
										icon: HeartPulseIcon,
										title: "ECG Analysis",
										description: "New ECG reading uploaded for review",
										time: "1 hour ago",
									},
									{
										icon: CalendarIcon,
										title: "Appointment Scheduled",
										description: "Follow-up with Sarah Johnson",
										time: "2 hours ago",
									},
								].map((activity, index) => (
									<li
										key={index}
										className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-md transition-colors animate-slide-up">
										<div className="flex items-center">
											<activity.icon
												className="h-6 w-6 text-red-600 hover:scale-110 transition-transform"
												aria-hidden="true"
											/>
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900">
													{activity.title}
												</p>
												<p className="text-sm text-gray-700">
													{activity.description}
												</p>
											</div>
										</div>
										<span className="text-sm text-gray-500">
											{activity.time}
										</span>
									</li>
								))}
							</ul>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorHome;

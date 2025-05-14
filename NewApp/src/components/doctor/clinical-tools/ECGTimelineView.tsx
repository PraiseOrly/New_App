import React, { useState } from "react";
import {
	ActivityIcon,
	AlertCircleIcon,
	CheckCircleIcon,
	CameraIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	HeartPulseIcon,
	TimerIcon,
	XIcon,
} from "lucide-react";

interface ECGType {
	id: string;
	type: "resting" | "holter" | "stress";
	name: string;
	icon: React.ElementType;
}

const ecgTypes: ECGType[] = [
	{
		id: "resting",
		type: "resting",
		name: "Resting ECG",
		icon: HeartPulseIcon,
	},
	{
		id: "holter",
		type: "holter",
		name: "Holter Monitor",
		icon: ActivityIcon,
	},
	{
		id: "stress",
		type: "stress",
		name: "Stress ECG",
		icon: TimerIcon,
	},
];

interface ECGRecord {
	id: string;
	date: string;
	type: "resting" | "holter" | "stress";
	aiSummary: string;
	status: "normal" | "abnormal" | "critical" | "pending";
	reviewed: boolean;
	downloadable: boolean;
}

const mockECGRecords: ECGRecord[] = [
	{
		id: "1",
		date: "2023-12-15",
		type: "resting",
		aiSummary: "Normal sinus rhythm",
		status: "normal",
		reviewed: true,
		downloadable: true,
	},
	{
		id: "2",
		date: "2023-12-14",
		type: "holter",
		aiSummary: "Atrial fibrillation detected",
		status: "abnormal",
		reviewed: false,
		downloadable: true,
	},
	{
		id: "3",
		date: "2023-12-13",
		type: "stress",
		aiSummary: "ST-segment elevation",
		status: "critical",
		reviewed: false,
		downloadable: false,
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "normal":
			return "bg-green-100 text-green-800 ring-green-200";
		case "abnormal":
			return "bg-yellow-100 text-yellow-800 ring-yellow-200";
		case "critical":
			return "bg-red-100 text-red-800 ring-red-200";
		case "pending":
			return "bg-gray-100 text-gray-800 ring-gray-200";
		default:
			return "bg-gray-100 text-gray-800 ring-gray-200";
	}
};

// Mock time-series data for ECG parameters
const mockTimeSeriesData = [
	{ date: "2023-12-10", HR: 70, QT: 380, PR: 160, QRS: 90 },
	{ date: "2023-12-11", HR: 72, QT: 385, PR: 162, QRS: 92 },
	{ date: "2023-12-12", HR: 68, QT: 375, PR: 158, QRS: 88 },
	{ date: "2023-12-13", HR: 75, QT: 390, PR: 165, QRS: 95 },
	{ date: "2023-12-14", HR: 73, QT: 382, PR: 161, QRS: 91 },
	{ date: "2023-12-15", HR: 70, QT: 378, PR: 159, QRS: 89 },
];

// Simple SVG chart component for line and scatter plots
interface ChartProps {
	data: typeof mockTimeSeriesData;
	viewType: "line" | "scatter";
	width: number;
	height: number;
}

const Chart: React.FC<ChartProps> = ({ data, viewType, width, height }) => {
	const padding = 40;
	const chartWidth = width - padding * 2;
	const chartHeight = height - padding * 2;

	// Extract dates and values for each parameter
	const dates = data.map((d) => d.date);
	const HRValues = data.map((d) => d.HR);
	const QTValues = data.map((d) => d.QT);
	const PRValues = data.map((d) => d.PR);
	const QRSValues = data.map((d) => d.QRS);

	// X scale: map dates to x coordinates
	const xScale = (index: number) =>
		padding + (index / (data.length - 1)) * chartWidth;

	// Y scale: map values to y coordinates (inverted y-axis)
	const yScale = (value: number, min: number, max: number) =>
		padding + chartHeight - ((value - min) / (max - min)) * chartHeight;

	// Get min and max for each parameter
	const minHR = Math.min(...HRValues);
	const maxHR = Math.max(...HRValues);
	const minQT = Math.min(...QTValues);
	const maxQT = Math.max(...QTValues);
	const minPR = Math.min(...PRValues);
	const maxPR = Math.max(...PRValues);
	const minQRS = Math.min(...QRSValues);
	const maxQRS = Math.max(...QRSValues);

	// Generate path for line chart
	const generatePath = (values: number[], min: number, max: number) => {
		return values
			.map((val, i) => `${i === 0 ? "M" : "L"}${xScale(i)} ${yScale(val, min, max)}`)
			.join(" ");
	};

	// Colors for each parameter
	const colors = {
		HR: "red",
		QT: "blue",
		PR: "green",
		QRS: "orange",
	};

	return (
		<svg
			width={width}
			height={height}
			role="img"
			aria-label="ECG Trend Graphs"
			style={{ border: "2px solid red" }}
		>
			{/* Axes */}
			<line
				x1={padding}
				y1={padding + chartHeight}
				x2={padding + chartWidth}
				y2={padding + chartHeight}
				stroke="black"
			/>
			<line x1={padding} y1={padding} x2={padding} y2={padding + chartHeight} stroke="black" />

			{/* Labels for dates */}
			{dates.map((date, i) => (
				<text
					key={date}
					x={xScale(i)}
					y={padding + chartHeight + 15}
					fontSize={10}
					textAnchor="middle"
				>
					{date.slice(5)}
				</text>
			))}

			{/* Lines or scatter points for each parameter */}
			{viewType === "line" ? (
				<>
					<path
						d={generatePath(HRValues, minHR, maxHR)}
						fill="none"
						stroke={colors.HR}
						strokeWidth={2}
					/>
					<path
						d={generatePath(QTValues, minQT, maxQT)}
						fill="none"
						stroke={colors.QT}
						strokeWidth={2}
					/>
					<path
						d={generatePath(PRValues, minPR, maxPR)}
						fill="none"
						stroke={colors.PR}
						strokeWidth={2}
					/>
					<path
						d={generatePath(QRSValues, minQRS, maxQRS)}
						fill="none"
						stroke={colors.QRS}
						strokeWidth={2}
					/>
				</>
			) : (
				<>
					{HRValues.map((val, i) => (
						<circle
							key={`HR-${i}`}
							cx={xScale(i)}
							cy={yScale(val, minHR, maxHR)}
							r={4}
							fill={colors.HR}
						/>
					))}
					{QTValues.map((val, i) => (
						<circle
							key={`QT-${i}`}
							cx={xScale(i)}
							cy={yScale(val, minQT, maxQT)}
							r={4}
							fill={colors.QT}
						/>
					))}
					{PRValues.map((val, i) => (
						<circle
							key={`PR-${i}`}
							cx={xScale(i)}
							cy={yScale(val, minPR, maxPR)}
							r={4}
							fill={colors.PR}
						/>
					))}
					{QRSValues.map((val, i) => (
						<circle
							key={`QRS-${i}`}
							cx={xScale(i)}
							cy={yScale(val, minQRS, maxQRS)}
							r={4}
							fill={colors.QRS}
						/>
					))}
				</>
			)}

			{/* Legend */}
			<rect x={width - 120} y={padding} width={110} height={70} fill="white" stroke="black" />
			<circle cx={width - 110} cy={padding + 15} r={6} fill={colors.HR} />
			<text x={width - 95} y={padding + 20} fontSize={12}>
				HR
			</text>
			<circle cx={width - 110} cy={padding + 35} r={6} fill={colors.QT} />
			<text x={width - 95} y={padding + 40} fontSize={12}>
				QT
			</text>
			<circle cx={width - 110} cy={padding + 55} r={6} fill={colors.PR} />
			<text x={width - 95} y={padding + 60} fontSize={12}>
				PR
			</text>
			<circle cx={width - 110} cy={padding + 75} r={6} fill={colors.QRS} />
			<text x={width - 95} y={padding + 80} fontSize={12}>
				QRS
			</text>
		</svg>
	);

};

const ECGTimelineView: React.FC = () => {
	const [filters, setFilters] = useState<{
		dateFrom: string;
		dateTo: string;
		type: string;
		flagged: string;
		reviewed: string;
		downloadable: string;
	}>({
		dateFrom: "",
		dateTo: "",
		type: "all",
		flagged: "all",
		reviewed: "all",
		downloadable: "all",
	});

	const [viewType, setViewType] = useState<"line" | "scatter">("line");

	const handleFilterChange = (field: keyof typeof filters, value: string) => {
		setFilters((prev) => ({ ...prev, [field]: value }));
	};

	const filteredECGs = mockECGRecords
		.filter((ecg) => {
			// Filter by date range
			if (filters.dateFrom && ecg.date < filters.dateFrom) return false;
			if (filters.dateTo && ecg.date > filters.dateTo) return false;

			// Filter by type
			if (filters.type !== "all" && ecg.type !== filters.type) return false;

			// Filter by flagged (status)
			if (filters.flagged !== "all" && ecg.status !== filters.flagged) return false;

			// Filter by reviewed
			if (filters.reviewed !== "all") {
				const isReviewed = ecg.reviewed;
				if (
					(filters.reviewed === "reviewed" && !isReviewed) ||
					(filters.reviewed === "not_reviewed" && isReviewed)
				)
					return false;
			}

			// Filter by downloadable
			if (filters.downloadable !== "all") {
				const isDownloadable = ecg.downloadable;
				if (
					(filters.downloadable === "yes" && !isDownloadable) ||
					(filters.downloadable === "no" && isDownloadable)
				)
					return false;
			}

			return true;
		})
		.sort((a, b) => (a.date < b.date ? 1 : -1)); // Descending order

	const renderFilter = (
		label: string,
		field: keyof typeof filters,
		options: { value: string; label: string }[]
	) => (
		<div>
			<label
				htmlFor={field}
				className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<select
				id={field}
				value={filters[field]}
				onChange={(e) => handleFilterChange(field, e.target.value)}
				className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full">
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);

	const renderECGCard = (record: ECGRecord) => {
		const ecgType = ecgTypes.find((type) => type.type === record.type);
		const Icon = ecgType?.icon || ActivityIcon;

		return (
			<div
				key={record.id}
				className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-blue-50 cursor-pointer"
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						alert(`View ECG ${record.id}`);
					}
				}}
				onClick={() => alert(`View ECG ${record.id}`)}
			>
				<div className="flex items-center space-x-4 min-w-0">
					<div className="flex flex-col text-sm text-gray-600 min-w-[100px]">
						<span className="font-semibold text-gray-900">{record.date}</span>
					</div>
					<div className="flex items-center space-x-2 min-w-[120px]">
						<Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
						<span className="text-sm font-medium text-gray-900">{ecgType?.name}</span>
					</div>
					<div className="flex-1 text-sm text-gray-700 truncate">{record.aiSummary}</div>
					<div>
						<span
							className={`px-2 py-1 rounded-full text-xs font-semibold ring-1 ${getStatusColor(
								record.status
							)}`}
						>
							{record.status.charAt(0).toUpperCase() + record.status.slice(1)}
						</span>
					</div>
				</div>
				<div className="flex items-center space-x-4">
					<button
						onClick={(e) => {
							e.stopPropagation();
							alert(`View ECG ${record.id}`);
						}}
						className="text-blue-600 hover:text-blue-800 text-sm font-medium"
						aria-label={`View ECG ${record.id}`}
					>
						View
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							alert(`Compare ECG ${record.id}`);
						}}
						className="text-blue-600 hover:text-blue-800 text-sm font-medium"
						aria-label={`Compare ECG ${record.id}`}
					>
						Compare
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							alert(`Annotate ECG ${record.id}`);
						}}
						className="text-blue-600 hover:text-blue-800 text-sm font-medium"
						aria-label={`Annotate ECG ${record.id}`}
					>
						Annotate
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 max-w-4xl mx-auto">
			<h2 className="text-lg font-semibold text-gray-900 mb-4">ECG Timeline View</h2>
			<div className="mb-4 flex items-center justify-between">
				<div className="flex space-x-4">
					<button
						onClick={() => setViewType("line")}
						className={`px-4 py-2 rounded-md font-semibold ${
							viewType === "line"
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-700"
						}`}
					>
						Line View
					</button>
					<button
						onClick={() => setViewType("scatter")}
						className={`px-4 py-2 rounded-md font-semibold ${
							viewType === "scatter"
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-700"
						}`}
					>
						Scatter View
					</button>
				</div>
			</div>
			<div className="mb-6">
				<Chart data={mockTimeSeriesData} viewType={viewType} width={700} height={250} />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
				{renderFilter("Date From", "dateFrom", [
					{ value: "", label: "All" },
					// Date inputs handled separately
				])}
				{renderFilter("Date To", "dateTo", [
					{ value: "", label: "All" },
					// Date inputs handled separately
				])}
				{renderFilter("Type", "type", [
					{ value: "all", label: "All" },
					{ value: "resting", label: "Resting" },
					{ value: "holter", label: "Holter" },
					{ value: "stress", label: "Stress" },
				])}
				{renderFilter("Flagged", "flagged", [
					{ value: "all", label: "All" },
					{ value: "normal", label: "Normal" },
					{ value: "abnormal", label: "Abnormal" },
					{ value: "critical", label: "Critical" },
					{ value: "pending", label: "Pending" },
				])}
				{renderFilter("Reviewed", "reviewed", [
					{ value: "all", label: "All" },
					{ value: "reviewed", label: "Reviewed" },
					{ value: "not_reviewed", label: "Not Reviewed" },
				])}
				{renderFilter("Downloadable", "downloadable", [
					{ value: "all", label: "All" },
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				])}
			</div>
			<div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
				{filteredECGs.length === 0 ? (
					<p className="text-gray-600 text-center py-10">No ECG records found.</p>
				) : (
					filteredECGs.map(renderECGCard)
				)}
			</div>
		</div>
	);
};


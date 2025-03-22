import React, { useState } from 'react';
import { ActivityIcon, AlertCircleIcon, CheckCircleIcon, BrainIcon, UploadIcon, ZoomInIcon, ZoomOutIcon, RotateCcwIcon, ChevronRightIcon, ClockIcon, FilterIcon, SearchIcon, CalendarIcon, UserIcon, HeartPulseIcon, FileIcon, TimerIcon, LineChartIcon } from 'lucide-react';
interface ECGType {
  id: string;
  type: 'resting' | 'holter' | 'stress';
  name: string;
  description: string;
  icon: React.ElementType;
}
const ecgTypes: ECGType[] = [{
  id: 'resting',
  type: 'resting',
  name: 'Resting ECG',
  description: 'Standard 12-lead ECG recording',
  icon: HeartPulseIcon
}, {
  id: 'holter',
  type: 'holter',
  name: 'Holter Monitor',
  description: '24-48 hour continuous recording',
  icon: ActivityIcon
}, {
  id: 'stress',
  type: 'stress',
  name: 'Stress ECG',
  description: 'Exercise stress test recording',
  icon: TimerIcon
}];
interface ECGRecord {
  id: string;
  patientName: string;
  date: string;
  status: 'normal' | 'abnormal' | 'critical' | 'pending';
  heartRate: number;
  rhythm: string;
  prInterval: number;
  qrsInterval: number;
  qtInterval: number;
  findings: string[];
  recommendations: string[];
  priority: 'routine' | 'urgent' | 'stat';
}
const mockECGs: ECGRecord[] = [{
  id: '1',
  patientName: 'John Doe',
  date: '2023-12-15',
  status: 'normal',
  heartRate: 72,
  rhythm: 'Normal Sinus Rhythm',
  prInterval: 160,
  qrsInterval: 90,
  qtInterval: 380,
  findings: ['Normal sinus rhythm', 'No ST-segment abnormalities', 'Regular R-R intervals'],
  recommendations: ['Continue current monitoring', 'Follow-up in 3 months', 'No immediate intervention required'],
  priority: 'routine'
}, {
  id: '2',
  patientName: 'Jane Smith',
  date: '2023-12-14',
  status: 'abnormal',
  heartRate: 88,
  rhythm: 'Atrial Fibrillation',
  prInterval: 180,
  qrsInterval: 110,
  qtInterval: 410,
  findings: ['Atrial fibrillation', 'Irregular R-R intervals', 'No acute ST changes'],
  recommendations: ['Cardiology consultation', 'Rate control medication adjustment', 'Weekly monitoring'],
  priority: 'urgent'
}, {
  id: '3',
  patientName: 'Robert Brown',
  date: '2023-12-13',
  status: 'critical',
  heartRate: 115,
  rhythm: 'ST-Elevation',
  prInterval: 200,
  qrsInterval: 120,
  qtInterval: 450,
  findings: ['ST-segment elevation in V1-V4', 'Possible anterior STEMI', 'T-wave inversions'],
  recommendations: ['Immediate cardiology consultation', 'Consider emergency intervention', 'Continuous monitoring'],
  priority: 'stat'
}];
const ECGAnalysis = () => {
  const [selectedECGType, setSelectedECGType] = useState<string>('resting');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedRecords, setExpandedRecords] = useState<string[]>([]);
  const toggleRecordExpansion = (recordId: string) => {
    setExpandedRecords(current => current.includes(recordId) ? current.filter(id => id !== recordId) : [...current, recordId]);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'stat':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" title="STAT" />;
      case 'urgent':
        return <AlertCircleIcon className="h-5 w-5 text-yellow-500" title="Urgent" />;
      case 'routine':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" title="Routine" />;
      default:
        return null;
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };
  const renderECGTypeSelector = () => <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {ecgTypes.map(type => <button key={type.id} onClick={() => setSelectedECGType(type.id)} className={`p-4 rounded-lg border ${selectedECGType === type.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-500'}`}>
          <div className="flex items-center">
            <type.icon className={`h-6 w-6 ${selectedECGType === type.id ? 'text-red-500' : 'text-gray-400'}`} />
            <div className="ml-3 text-left">
              <h3 className="text-sm font-medium text-gray-900">{type.name}</h3>
              <p className="text-xs text-gray-500">{type.description}</p>
            </div>
          </div>
        </button>)}
    </div>;
  const renderUploadSection = () => <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Upload ECG</h3>
        <button onClick={() => setShowUploadModal(true)} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          <UploadIcon className="h-5 w-5 mr-2" />
          Upload New ECG
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Supported Formats
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <FileIcon className="h-4 w-4 mr-2" />
              PDF (12-lead ECG reports)
            </li>
            <li className="flex items-center">
              <FileIcon className="h-4 w-4 mr-2" />
              DICOM (Standard medical format)
            </li>
            <li className="flex items-center">
              <FileIcon className="h-4 w-4 mr-2" />
              CSV (Raw data format)
            </li>
          </ul>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Upload Guidelines
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Ensure correct patient identification</li>
            <li>• Verify lead placement accuracy</li>
            <li>• Include relevant clinical context</li>
            <li>• Check file quality before upload</li>
          </ul>
        </div>
      </div>
    </div>;
  const renderAnalysisTools = () => <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Analysis Tools</h3>
        <div className="flex space-x-2">
          <button onClick={() => setIsComparing(!isComparing)} className={`flex items-center px-3 py-1 rounded-md ${isComparing ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
            <div className="h-4 w-4 mr-1" />
            Compare Mode
          </button>
          <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
            <BrainIcon className="h-4 w-4 mr-1" />
            AI Analysis
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Measurement Tools
          </h4>
          <div className="space-y-2">
            <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Interval Measurement
            </button>
            <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <ActivityIcon className="h-4 w-4 mr-2" />
              Amplitude Measurement
            </button>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            View Controls
          </h4>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <ZoomInIcon className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <ZoomOutIcon className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <RotateCcwIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            AI Annotations
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
              Normal Sinus Rhythm
            </div>
            <div className="flex items-center">
              <AlertCircleIcon className="h-4 w-4 text-yellow-500 mr-2" />
              Possible Arrhythmia
            </div>
          </div>
        </div>
      </div>
    </div>;
  const filteredECGs = mockECGs.filter(ecg => {
    const matchesSearch = ecg.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ecg.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  return <div className="space-y-6">
      {renderECGTypeSelector()}
      {renderUploadSection()}
      {renderAnalysisTools()}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Normal</h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              5
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Abnormal</h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              3
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Critical</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              1
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Pending</h3>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              2
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search by patient name..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
            <option value="critical">Critical</option>
            <option value="pending">Pending</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
            More Filters
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">ECG Records</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredECGs.map(record => <div key={record.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getPriorityIcon(record.priority)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {record.patientName}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {record.date}
                      <HeartPulseIcon className="h-4 w-4 ml-4 mr-1" />
                      {record.rhythm}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  <button onClick={() => toggleRecordExpansion(record.id)} className="text-gray-500 hover:text-gray-700">
                    {expandedRecords.includes(record.id) ? <ChevronRightIcon className="h-5 w-5 transform rotate-90" /> : <ChevronRightIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {expandedRecords.includes(record.id) && <div className="mt-4 pl-12">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        ECG Recording
                      </h3>
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <ZoomInIcon className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <ZoomOutIcon className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <RotateCcwIcon className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                      <ActivityIcon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Heart Rate</p>
                      <p className="text-lg font-semibold">
                        {record.heartRate} <span className="text-sm">bpm</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">PR Interval</p>
                      <p className="text-lg font-semibold">
                        {record.prInterval} <span className="text-sm">ms</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">QRS Interval</p>
                      <p className="text-lg font-semibold">
                        {record.qrsInterval} <span className="text-sm">ms</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">QT Interval</p>
                      <p className="text-lg font-semibold">
                        {record.qtInterval} <span className="text-sm">ms</span>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Findings
                      </h4>
                      <ul className="space-y-1">
                        {record.findings.map((finding, index) => <li key={index} className="flex items-start text-sm text-gray-600">
                            <ChevronRightIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                            {finding}
                          </li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Recommendations
                      </h4>
                      <ul className="space-y-1">
                        {record.recommendations.map((rec, index) => <li key={index} className="flex items-start text-sm text-gray-600">
                            <ChevronRightIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                            {rec}
                          </li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                      Download PDF
                    </button>
                    <button className="text-sm font-medium text-red-600 hover:text-red-900">
                      View Full Analysis
                    </button>
                  </div>
                </div>}
            </div>)}
        </div>
      </div>
    </div>;
};
export default ECGAnalysis;
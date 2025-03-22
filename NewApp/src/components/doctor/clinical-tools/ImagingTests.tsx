import React, { useState } from 'react';
import { ImageIcon, SearchIcon, FilterIcon, ChevronDownIcon, ChevronUpIcon, CalendarIcon, UserIcon, AlertCircleIcon, CheckCircleIcon, ZoomInIcon, ZoomOutIcon, RotateCcwIcon, UploadIcon } from 'lucide-react';
interface ImagingTest {
  id: string;
  type: 'echo' | 'mri' | 'ct' | 'nuclear' | 'xray' | 'vascular';
  subtype: string;
  patientName: string;
  date: string;
  status: 'completed' | 'scheduled' | 'in-progress';
  parameters: string[];
  results?: string;
  clinicalUse: string;
  priority: 'routine' | 'urgent' | 'stat';
}
const mockTests: ImagingTest[] = [{
  id: '1',
  type: 'echo',
  subtype: 'Transthoracic (TTE)',
  patientName: 'John Doe',
  date: '2023-12-15',
  status: 'completed',
  parameters: ['Ejection Fraction: 55%', 'Normal valve gradients', 'No wall motion abnormalities'],
  results: 'Normal systolic function, no significant valvular disease',
  clinicalUse: 'Assess heart failure and valvular disease',
  priority: 'routine'
}, {
  id: '2',
  type: 'mri',
  subtype: 'Cardiac MRI with LGE',
  patientName: 'Jane Smith',
  date: '2023-12-16',
  status: 'in-progress',
  parameters: ['T1/T2 mapping', 'Late Gadolinium Enhancement', 'Tissue characterization'],
  clinicalUse: 'Evaluate for myocarditis and fibrosis',
  priority: 'urgent'
}, {
  id: '3',
  type: 'ct',
  subtype: 'Coronary CTA',
  patientName: 'Robert Brown',
  date: '2023-12-17',
  status: 'scheduled',
  parameters: ['Calcium scoring', 'Coronary angiography', 'Plaque characterization'],
  clinicalUse: 'Assess coronary artery disease',
  priority: 'stat'
}];
const testTypeLabels = {
  echo: 'Echocardiogram',
  mri: 'Cardiac MRI',
  ct: 'CT Scan',
  nuclear: 'Nuclear Imaging',
  xray: 'X-Ray',
  vascular: 'Vascular Ultrasound'
};
const ImagingTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedTests, setExpandedTests] = useState<string[]>([]);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const toggleTestExpansion = (testId: string) => {
    setExpandedTests(current => current.includes(testId) ? current.filter(id => id !== testId) : [...current, testId]);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
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
      default:
        return <CheckCircleIcon className="h-5 w-5 text-green-500" title="Routine" />;
    }
  };
  const filteredTests = mockTests.filter(test => {
    const matchesSearch = test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || testTypeLabels[test.type].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || test.type === selectedType;
    return matchesSearch && matchesType;
  });
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search by patient name or test type..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="echo">Echocardiogram</option>
            <option value="mri">Cardiac MRI</option>
            <option value="ct">CT Scan</option>
            <option value="nuclear">Nuclear Imaging</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            <UploadIcon className="h-5 w-5 mr-2" />
            Upload Image
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Imaging Tests</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTests.map(test => <div key={test.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getPriorityIcon(test.priority)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {testTypeLabels[test.type]} - {test.subtype}
                    </h4>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {test.patientName}
                      <CalendarIcon className="h-4 w-4 ml-4 mr-1" />
                      {test.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                    {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                  </span>
                  <button onClick={() => toggleTestExpansion(test.id)} className="text-gray-500 hover:text-gray-700">
                    {expandedTests.includes(test.id) ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {expandedTests.includes(test.id) && <div className="mt-4 pl-12 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Parameters
                    </p>
                    <ul className="mt-1 text-sm text-gray-900 list-disc pl-5">
                      {test.parameters.map((param, index) => <li key={index}>{param}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Clinical Use
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {test.clinicalUse}
                    </p>
                  </div>
                  {test.results && <div>
                      <p className="text-sm font-medium text-gray-500">
                        Results
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {test.results}
                      </p>
                    </div>}
                  <div className="flex justify-end space-x-4">
                    <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                      View Full Report
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                      Download Images
                    </button>
                  </div>
                </div>}
            </div>)}
        </div>
      </div>
      {showImageViewer && selectedImage && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Image Viewer</h3>
              <button onClick={() => setShowImageViewer(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="relative h-96">
              <img src={selectedImage} alt="Medical scan" className="w-full h-full object-contain" />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                  <ZoomInIcon className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                  <ZoomOutIcon className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                  <RotateCcwIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default ImagingTests;
import React, { useState, Component } from 'react';
import { Droplet, SearchIcon, FilterIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
interface BloodTest {
  id: string;
  category: 'routine' | 'cardiovascular' | 'genetic' | 'specialized';
  type: string;
  components: string[];
  result?: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'pending';
  date: string;
  patientName: string;
  clinicalUse: string;
  specimenType: string;
  turnaroundTime: string;
}
const mockTests: BloodTest[] = [{
  id: '1',
  category: 'routine',
  type: 'Complete Blood Count (CBC)',
  components: ['Hemoglobin', 'WBC', 'Platelets'],
  result: 'Hemoglobin: 14.2 g/dL',
  referenceRange: '13.5-17.5 g/dL',
  status: 'normal',
  date: '2023-12-15',
  patientName: 'John Doe',
  clinicalUse: 'Detect anemia, infection, or clotting disorders',
  specimenType: 'EDTA Whole Blood',
  turnaroundTime: '1 hour'
}, {
  id: '2',
  category: 'cardiovascular',
  type: 'Lipid Panel',
  components: ['LDL', 'HDL', 'Triglycerides', 'Total Cholesterol'],
  result: 'LDL: 130 mg/dL',
  referenceRange: '<100 mg/dL',
  status: 'abnormal',
  date: '2023-12-14',
  patientName: 'Jane Smith',
  clinicalUse: 'Assess cardiovascular risk',
  specimenType: 'Fasting Serum',
  turnaroundTime: '24 hours'
}, {
  id: '3',
  category: 'genetic',
  type: 'FH Genetic Panel',
  components: ['LDLR', 'APOB', 'PCSK9'],
  status: 'pending',
  date: '2023-12-13',
  patientName: 'Robert Brown',
  clinicalUse: 'Detect familial hypercholesterolemia mutations',
  specimenType: 'EDTA Whole Blood',
  turnaroundTime: '2 weeks',
  referenceRange: 'N/A'
}, {
  id: '4',
  category: 'specialized',
  type: 'HIV Test',
  components: ['p24 Antigen', 'p24 Antibody', 'HIV RNA'],
  result: 'p24 Antigen: 1000 IU/mL',
  referenceRange: '<100 IU/mL',
  status: 'normal',
  date: '2023-12-12',
  patientName: 'Emily Johnson',
  clinicalUse: 'Detect HIV infection',
  specimenType: 'Whole Blood',
  turnaroundTime: '24 hours'
}];
const BloodBiomarkers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTests, setExpandedTests] = useState<string[]>([]);
  const toggleTestExpansion = (testId: string) => {
    setExpandedTests(current => current.includes(testId) ? current.filter(id => id !== testId) : [...current, testId]);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const filteredTests = mockTests.filter(test => {
    const matchesSearch = test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || test.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search by patient name or test type..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <select className="border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="routine">Routine Tests</option>
          <option value="cardiovascular">Cardiovascular Tests</option>
          <option value="genetic">Genetic Tests</option>
          <option value="specialized">Specialized Tests</option>
        </select>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Blood Tests</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTests.map(test => <div key={test.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplet className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {test.type}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Patient: {test.patientName}
                    </p>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Components
                      </p>
                      <ul className="mt-1 text-sm text-gray-900">
                        {test.components.map((component, index) => <li key={index}>{component}</li>)}
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Specimen Type
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {test.specimenType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Turnaround Time
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {test.turnaroundTime}
                      </p>
                    </div>
                  </div>
                  {test.result && <div>
                      <p className="text-sm font-medium text-gray-500">
                        Result
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {test.result}
                        <span className="text-gray-500 ml-2">
                          (Reference: {test.referenceRange})
                        </span>
                      </p>
                    </div>}
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Test Date: {test.date}
                  </div>
                </div>}
            </div>)}
        </div>
      </div>
    </div>;
};
export default BloodBiomarkers;
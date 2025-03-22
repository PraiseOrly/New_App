import React from 'react';
import { ActivityIcon, HeartPulseIcon, SearchIcon } from 'lucide-react';
interface FunctionalTest {
  id: string;
  type: string;
  protocol?: string;
  parameters: string[];
  clinicalUse: string;
  status: 'completed' | 'scheduled' | 'in-progress';
  date: string;
  patientName: string;
  results?: string;
}
const mockTests: FunctionalTest[] = [{
  id: '1',
  type: 'Treadmill Stress Test',
  protocol: 'Bruce Protocol',
  parameters: ['METs achieved', 'Heart rate recovery', 'ST-segment changes'],
  clinicalUse: 'Assess exercise capacity and coronary artery disease',
  status: 'completed',
  date: '2023-12-15',
  patientName: 'John Doe',
  results: 'Normal stress test, achieved 12 METs'
}, {
  id: '2',
  type: 'Cardiac Stress Test',
  protocol: 'Bruce Protocol',
  parameters: ['METs achieved', 'Heart rate recovery', 'ST-segment changes'],
  clinicalUse: 'Assess exercise capacity and coronary artery disease',
  status: 'completed',
  date: '2023-12-16',
  patientName: 'Jane Smith',
  results: 'Normal stress test, achieved 10 METs'
}, {
  id: '3',
  type: 'Echocardiogram',
  protocol: 'Standard',
  parameters: ['Ejection fraction', 'Wall motion'],
  clinicalUse: 'Assess heart function',
  status: 'completed',
  date: '2023-12-17',
  patientName: 'Emily Johnson',
  results: 'Normal echocardiogram, ejection fraction 60%'
}];
const FunctionalTests = () => {
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search functional tests..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Test Results</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockTests.map((test, index) => <div key={test.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ActivityIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {test.type}
                    </h4>
                    <p className="text-sm text-gray-500">Date: {test.date}</p>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  View Results
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default FunctionalTests;
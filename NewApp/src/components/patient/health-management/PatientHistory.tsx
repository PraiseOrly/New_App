import React from 'react';
import { ClockIcon, CalendarIcon, FileTextIcon } from 'lucide-react';
const PatientHistory = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Medical History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[{
          date: '2023-10-15',
          type: 'Cardiac Checkup',
          notes: 'Regular checkup, normal heart function'
        }, {
          date: '2023-08-20',
          type: 'ECG Test',
          notes: 'Normal sinus rhythm'
        }, {
          date: '2023-06-05',
          type: 'Blood Pressure Review',
          notes: 'BP: 120/80, within normal range'
        }].map((record, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileTextIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {record.type}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {record.date}
                    </div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  View Details
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">{record.notes}</p>
            </div>)}
        </div>
      </div>
    </div>;
};
export default PatientHistory;
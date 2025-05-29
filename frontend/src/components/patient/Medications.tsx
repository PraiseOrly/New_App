import React from 'react';
import { PillIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';
const Medications = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Current Medications
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PillIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Medication {index + 1}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Take twice daily
                    </div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  Set Reminder
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default Medications;
import React from 'react';
import { ClockIcon, ActivityIcon, HeartPulseIcon } from 'lucide-react';
const HealthTimeline = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Health Timeline</h2>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {[1, 2, 3].map((_, index) => <div key={index} className="relative">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {index === 0 ? <HeartPulseIcon className="h-8 w-8 text-red-500" /> : index === 1 ? <ActivityIcon className="h-8 w-8 text-blue-500" /> : <ClockIcon className="h-8 w-8 text-green-500" />}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {index === 0 ? 'ECG Recording' : index === 1 ? 'Physical Activity' : 'Medication Update'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {`2023-12-${10 + index}`}
                    </p>
                    <p className="mt-2 text-gray-600">
                      {index === 0 ? 'Normal sinus rhythm recorded' : index === 1 ? '30 minutes of moderate exercise completed' : 'Medication dosage adjusted'}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default HealthTimeline;
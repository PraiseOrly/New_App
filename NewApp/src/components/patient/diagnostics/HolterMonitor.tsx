import React from 'react';
import { HeartPulseIcon, ClockIcon, ActivityIcon } from 'lucide-react';
const HolterMonitor = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Holter Monitor Results
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Latest Recording</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <HeartPulseIcon className="h-6 w-6 text-red-600 mr-2" />
                  <span className="text-gray-600">
                    Average Heart Rate: 75 bpm
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-gray-600">
                    Recording Duration: 24 hours
                  </span>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-gray-600">
                    Normal Sinus Rhythm Detected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HolterMonitor;
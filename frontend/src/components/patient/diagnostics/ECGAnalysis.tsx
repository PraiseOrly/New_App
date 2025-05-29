import React from 'react';
import { HeartPulseIcon, UploadIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';
const ECGAnalysis = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">ECG Analysis</h2>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Upload your ECG recording or connect your device
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Upload ECG
              </button>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Recordings
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HeartPulseIcon className="h-6 w-6 text-red-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        ECG Recording #{1234 + index}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Recorded: {`2023-12-${10 + index}`}
                      </div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    View Analysis
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default ECGAnalysis;
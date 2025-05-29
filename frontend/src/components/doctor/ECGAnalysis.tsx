import React from 'react';
import { ActivityIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
const ECGAnalysis = () => {
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Pending Analysis
            </h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              5
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Completed Today
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              12
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Requires Attention
            </h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              2
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Recent ECG Recordings
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ActivityIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Patient ECG #{1234 + index}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Recorded: 2023-12-{10 + index}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {index === 0 ? <AlertCircleIcon className="h-5 w-5 text-yellow-500" /> : <CheckCircleIcon className="h-5 w-5 text-green-500" />}
                  <button className="ml-4 text-red-600 hover:text-red-900 text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default ECGAnalysis;
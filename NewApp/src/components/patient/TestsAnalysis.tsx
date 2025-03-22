import React from 'react';
import { ActivityIcon, FileTextIcon } from 'lucide-react';
const TestsAnalysis = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Test Results</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ActivityIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      ECG Analysis #{1234 + index}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Date: 2023-12-{10 + index}
                    </p>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default TestsAnalysis;
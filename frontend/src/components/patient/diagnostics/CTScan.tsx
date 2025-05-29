import React from 'react';
import { ImageIcon, CalendarIcon, FileTextIcon } from 'lucide-react';
const CTScan = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">CT Scan Records</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Cardiac CT Scan
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {`2023-12-${10 + index}`}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {index === 0 ? 'Coronary calcium scoring' : index === 1 ? 'Cardiac structure assessment' : 'Pulmonary vein evaluation'}
                    </p>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  View Images
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default CTScan;
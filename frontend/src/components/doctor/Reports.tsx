import React from 'react';
import { BarChart2Icon, FileTextIcon, DownloadIcon } from 'lucide-react';
const Reports = () => {
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <BarChart2Icon className="h-8 w-8 text-blue-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Patient Analytics
          </h3>
          <p className="text-gray-500 text-sm">
            View detailed patient statistics and trends
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <FileTextIcon className="h-8 w-8 text-green-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Treatment Reports
          </h3>
          <p className="text-gray-500 text-sm">
            Access and generate treatment reports
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <DownloadIcon className="h-8 w-8 text-purple-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Export Data
          </h3>
          <p className="text-gray-500 text-sm">
            Download reports in various formats
          </p>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileTextIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Monthly Progress Report - December 2023
                    </h4>
                    <p className="text-sm text-gray-500">
                      Generated: 2023-12-{10 + index}
                    </p>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  Download
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default Reports;
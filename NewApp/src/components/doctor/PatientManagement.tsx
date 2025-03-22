import React from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
const PatientManagement = () => {
  return <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search patients..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
          Filter
        </button>
      </div>
      {/* Patient List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Visit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3].map((_, index) => <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=Patient+${index + 1}&background=random`} alt="" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Patient {index + 1}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: #1234{index}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2023-12-{10 + index}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900 mr-4">
                    View Details
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default PatientManagement;
import React from 'react';
import { DollarSignIcon, FileTextIcon, SearchIcon, PlusIcon } from 'lucide-react';
const BillingInsurance = () => {
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search billing records..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
        </div>
        <button className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Invoice
        </button>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileTextIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Invoice #{1234 + index}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <DollarSignIcon className="h-4 w-4 mr-1" />$
                      {150 + index * 50}
                      <span className="ml-4">Patient: John Doe</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                    Download
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default BillingInsurance;
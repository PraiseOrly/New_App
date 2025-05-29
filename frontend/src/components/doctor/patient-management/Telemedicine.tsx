import React from 'react';
import { VideoIcon, PhoneIcon, CalendarIcon } from 'lucide-react';
const Telemedicine = () => {
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Today's Sessions
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              4
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Pending Requests
            </h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              2
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Completed Today
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Upcoming Sessions
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <VideoIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Virtual Consultation
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {`2023-12-${15 + index}`} at {`${10 + index}:00 AM`}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center text-green-600 hover:text-green-900 text-sm font-medium">
                    <VideoIcon className="h-4 w-4 mr-1" />
                    Join
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium">
                    <PhoneIcon className="h-4 w-4 mr-1" />
                    Call
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default Telemedicine;
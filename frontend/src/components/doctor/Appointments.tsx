import React from 'react';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
const Appointments = () => {
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Today's Appointments
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              8
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Upcoming This Week
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              24
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Pending Requests
            </h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              5
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Today's Schedule
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Patient {index + 1}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {9 + index}:00 AM
                      <CalendarIcon className="h-4 w-4 ml-4 mr-1" />
                      Regular Checkup
                    </div>
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
export default Appointments;
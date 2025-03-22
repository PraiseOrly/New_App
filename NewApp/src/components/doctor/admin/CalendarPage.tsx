import React from 'react';
import { CalendarIcon, ClockIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const CalendarPage = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Calendar</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-gray-900 font-medium">December 2023</span>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        {/* Today's Schedule */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Today's Schedule
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Patient {index + 1}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {9 + index}:00 AM
                      <CalendarIcon className="h-4 w-4 ml-4 mr-1" />
                      Regular Checkup
                    </div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  Details
                </button>
              </div>)}
          </div>
        </div>
        {/* Upcoming Schedule */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Upcoming Schedule
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Patient {index + 4}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {`2023-12-${15 + index}`}
                      <ClockIcon className="h-4 w-4 ml-4 mr-1" />
                      {2 + index}:00 PM
                    </div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  Details
                </button>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default CalendarPage;
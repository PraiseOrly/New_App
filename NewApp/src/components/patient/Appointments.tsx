import React from 'react';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
const Appointments = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Your Appointments
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Dr. Smith
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
                  Reschedule
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default Appointments;
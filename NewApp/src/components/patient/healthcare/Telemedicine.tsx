import React from 'react';
import { VideoIcon, PhoneIcon, CalendarIcon, ClockIcon } from 'lucide-react';
const Telemedicine = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Telemedicine Sessions
          </h2>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Upcoming Sessions
            </h3>
            <div className="space-y-4">
              {[1, 2].map((_, index) => <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <VideoIcon className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Virtual Consultation with Dr. Smith
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {`2023-12-${20 + index}`}
                        <ClockIcon className="h-4 w-4 ml-4 mr-1" />
                        {`${10 + index}:00 AM`}
                      </div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    Join Session
                  </button>
                </div>)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Past Sessions
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <VideoIcon className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Follow-up Consultation
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {`2023-12-${5 + index}`}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                    View Summary
                  </button>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Telemedicine;
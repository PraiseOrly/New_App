import React from 'react';
import { HeartPulseIcon, CalendarIcon, PillIcon, ClockIcon } from 'lucide-react';
const PatientHome = () => {
  return <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <HeartPulseIcon className="h-10 w-10 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Heart Rate</p>
              <p className="text-2xl font-semibold text-gray-900">72 BPM</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <CalendarIcon className="h-10 w-10 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Next Appointment
              </p>
              <p className="text-2xl font-semibold text-gray-900">Dec 15</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <PillIcon className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Medications</p>
              <p className="text-2xl font-semibold text-gray-900">3 Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <ClockIcon className="h-10 w-10 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Checkup</p>
              <p className="text-2xl font-semibold text-gray-900">7 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                ECG Reading Recorded
              </p>
              <p className="text-sm text-gray-500">Normal heart rhythm</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Medication Reminder
              </p>
              <p className="text-sm text-gray-500">Take evening dose</p>
            </div>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
        </div>
      </div>
    </div>;
};
export default PatientHome;
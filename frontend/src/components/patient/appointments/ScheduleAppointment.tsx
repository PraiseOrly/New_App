import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, UserIcon, VideoIcon, MapPinIcon } from 'lucide-react';
const ScheduleAppointment = () => {
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'virtual'>('in-person');
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Schedule Appointment
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Appointment Type
              </label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <button onClick={() => setAppointmentType('in-person')} className={`p-4 border rounded-lg flex items-center ${appointmentType === 'in-person' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <MapPinIcon className="h-5 w-5 text-red-600 mr-2" />
                  <span>In-Person Visit</span>
                </button>
                <button onClick={() => setAppointmentType('virtual')} className={`p-4 border rounded-lg flex items-center ${appointmentType === 'virtual' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <VideoIcon className="h-5 w-5 text-red-600 mr-2" />
                  <span>Virtual Visit</span>
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900">
                Select Doctor
              </label>
              <div className="mt-2 space-y-3">
                {['Dr. Smith - Cardiologist', 'Dr. Johnson - Cardiac Surgeon', 'Dr. Williams - Interventional Cardiologist'].map((doctor, index) => <button key={index} className="w-full p-4 border rounded-lg flex items-center hover:border-red-500">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{doctor}</span>
                  </button>)}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900">
                Available Dates
              </label>
              <div className="mt-2 grid grid-cols-3 gap-4">
                {['2023-12-20', '2023-12-21', '2023-12-22', '2023-12-23', '2023-12-24', '2023-12-25'].map((date, index) => <button key={index} className="p-4 border rounded-lg hover:border-red-500">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <span className="block text-sm">{date}</span>
                  </button>)}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900">
                Available Times
              </label>
              <div className="mt-2 grid grid-cols-3 gap-4">
                {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'].map((time, index) => <button key={index} className="p-4 border rounded-lg hover:border-red-500">
                      <ClockIcon className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                      <span className="block text-sm">{time}</span>
                    </button>)}
              </div>
            </div>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default ScheduleAppointment;
import React from 'react';
import { BellIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';
const Notifications = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[{
          type: 'appointment',
          title: 'Upcoming Appointment',
          message: 'Reminder: Cardiology appointment tomorrow at 10:00 AM',
          time: '2 hours ago',
          icon: ClockIcon,
          urgent: false
        }, {
          type: 'medication',
          title: 'Medication Reminder',
          message: 'Time to take your evening medication',
          time: '1 hour ago',
          icon: AlertCircleIcon,
          urgent: true
        }, {
          type: 'result',
          title: 'Test Results Available',
          message: 'Your recent ECG results are ready for review',
          time: '3 hours ago',
          icon: CheckCircleIcon,
          urgent: false
        }].map((notification, index) => <div key={index} className="p-6">
              <div className="flex items-center">
                <notification.icon className={`h-8 w-8 ${notification.urgent ? 'text-red-500' : 'text-gray-400'}`} />
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-400 mt-1">
                    {notification.time}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Dismiss</span>×
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default Notifications;
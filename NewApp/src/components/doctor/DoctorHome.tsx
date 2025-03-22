import React from 'react';
import { UsersIcon, CalendarIcon, HeartPulseIcon, ClipboardListIcon, VideoIcon, AlertCircleIcon, ActivityIcon, ClockIcon, FileTextIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const DoctorHome = () => {
  return <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <UsersIcon className="h-10 w-10 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Today's Patients
              </p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
              <p className="text-xs text-gray-500">↑ 10% from yesterday</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <HeartPulseIcon className="h-10 w-10 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Critical Cases
              </p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
              <p className="text-xs text-red-500">
                Requires immediate attention
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <ClockIcon className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Avg. Wait Time
              </p>
              <p className="text-2xl font-semibold text-gray-900">15 min</p>
              <p className="text-xs text-green-500">↓ 5min from last week</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <ActivityIcon className="h-10 w-10 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ECG Analysis</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Pending review</p>
            </div>
          </div>
        </div>
      </div>
      {/* Patient Alerts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Priority Alerts</h2>
          <Link to="/doctor-dashboard/alerts" className="text-sm text-red-600 hover:text-red-800">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-red-50 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircleIcon className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-900">
                  Critical: Jane Smith
                </p>
                <p className="text-sm text-red-700">
                  Troponin Elevated - 0.5 ng/mL
                </p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-900 text-sm font-medium">
              View Details
            </button>
          </div>
          <div className="flex items-center justify-between bg-yellow-50 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Overdue Follow-up
                </p>
                <p className="text-sm text-yellow-700">
                  3 Patients Pending Review
                </p>
              </div>
            </div>
            <button className="text-yellow-600 hover:text-yellow-900 text-sm font-medium">
              View List
            </button>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/doctor-dashboard/telemedicine" className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <VideoIcon className="h-5 w-5 mr-2" />
            Start Telemedicine
          </Link>
          <Link to="/doctor-dashboard/prescriptions" className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <ClipboardListIcon className="h-5 w-5 mr-2" />
            New Prescription
          </Link>
          <Link to="/doctor-dashboard/appointments" className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Schedule Appointment
          </Link>
          <Link to="/doctor-dashboard/ecg" className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <HeartPulseIcon className="h-5 w-5 mr-2" />
            Review ECG
          </Link>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <Link to="/doctor-dashboard/activity" className="text-sm text-red-600 hover:text-red-800">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {[{
          icon: FileTextIcon,
          title: 'Medical Report Updated',
          description: 'Cardiac evaluation for John Doe completed',
          time: '10 minutes ago'
        }, {
          icon: HeartPulseIcon,
          title: 'ECG Analysis',
          description: 'New ECG reading uploaded for review',
          time: '1 hour ago'
        }, {
          icon: CalendarIcon,
          title: 'Appointment Scheduled',
          description: 'Follow-up with Sarah Johnson',
          time: '2 hours ago'
        }].map((activity, index) => <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <activity.icon className="h-6 w-6 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>)}
        </div>
      </div>
    </div>;
};
export default DoctorHome;
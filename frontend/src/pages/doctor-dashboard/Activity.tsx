import React from 'react';
import Navbar from '../../components/Navbar';
import { FileTextIcon, HeartPulseIcon, CalendarIcon } from 'lucide-react';

const Activity: React.FC = () => {
  const activities = [
    {
      icon: FileTextIcon,
      title: 'Medical Report Updated',
      description: 'Cardiac evaluation for John Doe completed',
      time: '10 minutes ago',
    },
    {
      icon: HeartPulseIcon,
      title: 'ECG Analysis',
      description: 'New ECG reading uploaded for review',
      time: '1 hour ago',
    },
    {
      icon: CalendarIcon,
      title: 'Appointment Scheduled',
      description: 'Follow-up with Sarah Johnson',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Recent Activity
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Review recent activities and updates related to your patients and practice.
          </p>
        </div>
      </section>

      {/* Activity List */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <activity.icon className="text-gray-500 w-8 h-8" />
                <div>
                  <p className="font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-auto">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CardiacAI. For professional use only.</p>
          <nav className="flex gap-4 text-sm text-gray-400 mt-4 sm:mt-0">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms" className="hover:text-white">Terms of Use</a>
            <a href="/contact" className="hover:text-white">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Activity;

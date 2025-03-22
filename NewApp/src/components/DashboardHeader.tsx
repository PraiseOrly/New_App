import React from 'react';
import { HeartPulseIcon, BellIcon } from 'lucide-react';
interface DashboardHeaderProps {
  role: 'patient' | 'doctor';
  userName: string;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  role,
  userName
}) => {
  return <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <HeartPulseIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <h1 className="text-lg font-semibold text-gray-900">
                {role === 'doctor' ? `Dr. ${userName}` : `Welcome, ${userName}`}
              </h1>
              <p className="text-sm text-gray-500">
                {role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>
            <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${userName}&background=random`} alt={userName} />
          </div>
        </div>
      </div>
    </header>;
};
export default DashboardHeader;
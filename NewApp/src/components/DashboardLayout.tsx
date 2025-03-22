import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardSidebar from './doctor/DoctorSidebar';
import PatientSidebar from './patient/PatientSidebar';
import DashboardHeader from './DashboardHeader';
import { BellIcon, MessageCircleIcon } from 'lucide-react';
interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'patient' | 'doctor';
  userName: string;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role,
  userName
}) => {
  const location = useLocation();
  return <div className="min-h-screen bg-gray-50 flex">
      {role === 'doctor' ? <DashboardSidebar /> : <PatientSidebar />}
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <DashboardHeader role={role} userName={userName} />
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-3 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  {location.pathname.split('/').pop()?.replace('-', ' ').charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1).replace('-', ' ') || 'Dashboard'}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <Link to={`/${role}-dashboard/notifications`} className="text-gray-400 hover:text-gray-500">
                  <BellIcon className="h-6 w-6" />
                </Link>
                <Link to={`/${role}-dashboard/chat`} className="text-gray-400 hover:text-gray-500">
                  <MessageCircleIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>;
};
export default DashboardLayout;
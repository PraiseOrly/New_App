import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardSidebar from './doctor/DoctorSidebar';
import PatientSidebar from './patient/PatientSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import { BellIcon, MessageCircleIcon } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'patient' | 'doctor';
  userName: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role,
  userName,
}) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    }
    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when sidebar open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarProps = {
    isCollapsed: !sidebarOpen,
    onToggle: toggleSidebar,
  };

  // Safely get current page title from pathname
  const currentPath = location.pathname.split('/').pop() || '';
  const formattedTitle =
    currentPath.length > 0
      ? currentPath.replace(/-/g, ' ').charAt(0).toUpperCase() + currentPath.slice(1).replace(/-/g, ' ')
      : 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:inset-auto`}
          aria-label="Sidebar"
        >
          {role === 'doctor' ? (
            <DashboardSidebar {...sidebarProps} />
          ) : (
            <PatientSidebar {...sidebarProps} />
          )}
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <DashboardHeader
              role={role}
              userName={userName}
              onToggleSidebar={toggleSidebar}
            />
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="py-3 flex items-center justify-between">
                <h2 className="text-lg font-medium leading-6 text-gray-900 truncate">
                  {formattedTitle}
                </h2>
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/${role}-dashboard/notifications`}
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Notifications"
                  >
                    <BellIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    to={`/${role}-dashboard/chat`}
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Chat"
                  >
                    <MessageCircleIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;

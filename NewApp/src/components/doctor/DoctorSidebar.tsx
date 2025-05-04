import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, UsersIcon, StethoscopeIcon, CalendarIcon, ClipboardListIcon, VideoIcon, MessageSquareIcon, UserIcon, LogOutIcon, MenuIcon, SearchIcon, HeartPulseIcon, FileTextIcon, ActivityIcon, ClockIcon, CreditCardIcon, BrainIcon, Droplet, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface SidebarItem {
  name: string;
  icon: any;
  path: string;
  items?: SidebarItem[];
}

interface DoctorSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const doctorSidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    icon: HomeIcon,
    path: '/doctor-dashboard'
  },
  {
    name: 'Profile',
    icon: UserIcon,
    path: '/doctor-dashboard/profile'
  },
  {
    name: 'Patient Management',
    icon: UsersIcon,
    path: '/doctor-dashboard/patient-management',
    items: [
      {
        name: 'Follow-up Records',
        icon: ClockIcon,
        path: '/doctor-dashboard/follow-up'
      },
      {
        name: 'Prescription Management',
        icon: ClipboardListIcon,
        path: '/doctor-dashboard/prescriptions'
      },
      {
        name: 'Referrals',
        icon: FileTextIcon,
        path: '/doctor-dashboard/referrals'
      },
      {
        name: 'Treatment Plans',
        icon: ActivityIcon,
        path: '/doctor-dashboard/treatment-plans'
      },
      {
        name: 'Telemedicine',
        icon: VideoIcon,
        path: '/doctor-dashboard/telemedicine'
      }
    ]
  },
  {
    name: 'Clinical & Diagnostic Tools',
    icon: StethoscopeIcon,
    path: '/doctor-dashboard/clinical-tools',
    items: [
      {
        name: 'Basic Screening',
        icon: ClipboardListIcon,
        path: '/doctor-dashboard/basic-screening'
      },
      {
        name: 'ECG Analysis',
        icon: HeartPulseIcon,
        path: '/doctor-dashboard/ecg'
      },
      {
        name: 'Imaging Tests',
        icon: FileTextIcon,
        path: '/doctor-dashboard/imaging'
      },
      {
        name: 'Functional Tests',
        icon: ActivityIcon,
        path: '/doctor-dashboard/functional-tests'
      },
      {
        name: 'Blood Tests',
        icon: Droplet,
        path: '/doctor-dashboard/blood-biomarkers'
      },
      {
        name: 'Genetic Tests',
        icon: FileTextIcon,
        path: '/doctor-dashboard/genetic-tests'
      }
    ]
  },
  {
    name: 'Scheduling & Admin',
    icon: CalendarIcon,
    path: '/doctor-dashboard/admin',
    items: [
      {
        name: 'Appointments',
        icon: CalendarIcon,
        path: '/doctor-dashboard/appointments'
      },
      {
        name: 'Billing',
        icon: CreditCardIcon,
        path: '/doctor-dashboard/billing'
      },
      {
        name: 'Calendar',
        icon: CalendarIcon,
        path: '/doctor-dashboard/calendar'
      }
    ]
  },
  {
    name: 'Messages',
    icon: MessageSquareIcon,
    path: '/doctor-dashboard/chat'
  }
];

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ isCollapsed, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleExpanded = (name: string) => {
    setExpandedItems(current =>
      current.includes(name) ? current.filter(item => item !== name) : [...current, name]
    );
  };

  const filterItems = (items: SidebarItem[]): SidebarItem[] => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingChildren = item.items ? filterItems(item.items).length > 0 : false;
      return matchesSearch || hasMatchingChildren;
    });
  };

  const filteredItems = searchTerm ? filterItems(doctorSidebarItems) : doctorSidebarItems;

  const handleItemClick = (item: SidebarItem) => {
    if (item.items && item.items.length > 0) {
      toggleExpanded(item.name);
    } else {
      navigate(item.path);
      if (onToggle) {
        onToggle(); // Close sidebar on navigation for mobile
      }
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        w-64 lg:relative lg:translate-x-0 bg-white border-r border-gray-200 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={onToggle} className="p-2 rounded-md hover:bg-gray-100 focus:outline-none lg:hidden">
          <MenuIcon className="h-5 w-5 text-gray-500" />
        </button>
        {!isCollapsed && (
          <div className="flex-1 ml-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {filteredItems.map(item => (
          <div key={item.path}>
            <div
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer
                ${location.pathname === item.path ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                ${item.items && item.items.length > 0 ? 'flex justify-between' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="flex-1">{item.name}</span>
              {item.items && item.items.length > 0 && (
                <button onClick={() => toggleExpanded(item.name)} className="focus:outline-none">
                  {expandedItems.includes(item.name) ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            {item.items && expandedItems.includes(item.name) && (
              <div className="ml-4 mt-1">
                {item.items.map(subItem => (
                  <div
                    key={subItem.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer
                      ${location.pathname === subItem.path ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    onClick={() => handleItemClick(subItem)}
                  >
                    <subItem.icon className="mr-3 h-5 w-5" />
                    <span className="flex-1">{subItem.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://ui-avatars.com/api/?name=Dr.+John+Smith&background=random"
            alt="Doctor Profile"
            className="h-12 w-12 rounded-full"
          />
          {!isCollapsed && (
            <div>
              <h3 className="text-sm font-medium text-gray-900">Dr. John Smith</h3>
              <p className="text-xs text-gray-500">Cardiologist</p>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            navigate('/');
          }}
          className="flex items-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
        >
          <LogOutIcon className="h-5 w-5 mr-3" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;

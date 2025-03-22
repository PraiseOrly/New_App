import React, { useState, Children } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, FolderIcon, ChevronDownIcon, ChevronUpIcon, UserIcon, HeartPulseIcon, ClipboardListIcon, CalendarIcon, VideoIcon, FileTextIcon, ActivityIcon, StethoscopeIcon, ClockIcon, MessageSquareIcon, AlertCircleIcon, LogOutIcon, MenuIcon, SearchIcon, Droplet, BrainIcon, BellIcon, SmartphoneIcon } from 'lucide-react';
interface SidebarItem {
  name: string;
  icon: any;
  path: string;
  items?: SidebarItem[];
}
const patientSidebarItems: SidebarItem[] = [{
  name: 'Dashboard',
  icon: HomeIcon,
  path: '/patient-dashboard'
}, {
  name: 'Profile',
  icon: UserIcon,
  path: '/patient-dashboard/profile'
}, {
  name: 'Personal Health Management',
  icon: UserIcon,
  path: '/patient-dashboard/health-management',
  items: [{
    name: 'Personal Information',
    icon: UserIcon,
    path: '/patient-dashboard/personal-info'
  }, {
    name: 'Patient History',
    icon: ClockIcon,
    path: '/patient-dashboard/history'
  }, {
    name: 'Physical Examination',
    icon: StethoscopeIcon,
    path: '/patient-dashboard/physical-exam'
  }]
}, {
  name: 'Diagnostic Tests & Monitoring',
  icon: StethoscopeIcon,
  path: '/patient-dashboard/diagnostics',
  items: [{
    name: 'ECG Analysis',
    icon: HeartPulseIcon,
    path: '/patient-dashboard/ecg'
  }, {
    name: 'Holter Monitor',
    icon: ActivityIcon,
    path: '/patient-dashboard/holter'
  }, {
    name: 'Blood Tests',
    icon: Droplet,
    path: '/patient-dashboard/blood-tests'
  }, {
    name: 'Cardiac MRI',
    icon: FileTextIcon,
    path: '/patient-dashboard/mri'
  }, {
    name: 'CT Scan',
    icon: FileTextIcon,
    path: '/patient-dashboard/ct-scan'
  }, {
    name: 'Symptom Checker',
    icon: BrainIcon,
    path: '/patient-dashboard/symptoms'
  }]
}, {
  name: 'Healthcare & Emergency',
  icon: AlertCircleIcon,
  path: '/patient-dashboard/healthcare',
  items: [{
    name: 'Emergency SOS',
    icon: AlertCircleIcon,
    path: '/patient-dashboard/sos'
  }, {
    name: 'Treatment Plan',
    icon: ClipboardListIcon,
    path: '/patient-dashboard/treatment'
  }, {
    name: 'Telemedicine',
    icon: VideoIcon,
    path: '/patient-dashboard/telemedicine'
  }]
}, {
  name: 'Appointments & Communication',
  icon: CalendarIcon,
  path: '/patient-dashboard/appointments',
  items: [{
    name: 'Schedule Appointment',
    icon: CalendarIcon,
    path: '/patient-dashboard/schedule'
  }, {
    name: 'Notifications',
    icon: BellIcon,
    path: '/patient-dashboard/notifications'
  }, {
    name: 'Chat Assistant',
    icon: MessageSquareIcon,
    path: '/patient-dashboard/chat'
  }]
}, {
  name: 'AI & Smart Integration',
  icon: BrainIcon,
  path: '/patient-dashboard/smart',
  items: [{
    name: 'Wearable Devices',
    icon: SmartphoneIcon,
    path: '/patient-dashboard/wearables'
  }]
}];
const PatientSidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = () => {
    navigate('/');
  };
  const filterItems = (items: SidebarItem[]): SidebarItem[] => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingChildren = item.items ? filterItems(item.items).length > 0 : false;
      return matchesSearch || hasMatchingChildren;
    });
  };
  const filteredItems = searchTerm ? filterItems(patientSidebarItems) : patientSidebarItems;
  const toggleExpanded = (name: string) => {
    setExpandedItems(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };
  const handleItemClick = (item: SidebarItem) => {
    if (item.items && item.items.length > 0) {
      toggleExpanded(item.name);
    } else {
      navigate(item.path);
    }
  };
  const renderNavItem = (item: SidebarItem, depth = 0) => {
    const isActive = location.pathname === item.path;
    const isExpanded = expandedItems.includes(item.name);
    const hasSubItems = item.items && item.items.length > 0;
    const Icon = item.icon;
    return <div key={item.path}>
        <div className={`flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer
            ${isActive ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            ${depth > 0 ? 'ml-4' : ''}`} onClick={() => handleItemClick(item)}>
          <Icon className="mr-3 h-5 w-5" />
          <span className="flex-1">{item.name}</span>
          {hasSubItems && <>
              {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
            </>}
        </div>
        {hasSubItems && isExpanded && <div className="mt-1">
            {item.items!.map(subItem => renderNavItem(subItem, depth + 1))}
          </div>}
      </div>;
  };
  return <div className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'} 
        lg:relative lg:translate-x-0
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : ''}`}>
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 focus:outline-none">
            <MenuIcon className="h-5 w-5 text-gray-500" />
          </button>
          {!isCollapsed && <div className="flex-1 ml-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1">
            <div className="flex items-center space-x-3">
              <img src="https://ui-avatars.com/api/?name=Jane+Doe&background=random" alt="Patient Profile" className="h-12 w-12 rounded-full" />
              {!isCollapsed && <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Jane Doe
                  </h3>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>}
            </div>
            {filteredItems.map(item => renderNavItem(item))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <LogOutIcon className="h-5 w-5 mr-3" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>;
};
export default PatientSidebar;
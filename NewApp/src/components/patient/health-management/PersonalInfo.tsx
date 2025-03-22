import React from 'react';
import { UserIcon, MailIcon, PhoneIcon, ShieldIcon } from 'lucide-react';
const PersonalInfo = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Personal Information
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-900">Jane Doe</h3>
              <p className="text-gray-500">Patient ID: #12345</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-500">
                  <MailIcon className="h-5 w-5 mr-2" />
                  jane.doe@example.com
                </div>
                <div className="flex items-center text-gray-500">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  +1 (555) 123-4567
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Emergency Contacts
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">John Doe (Spouse)</p>
                <p className="text-sm text-gray-600">+1 (555) 987-6543</p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Insurance Information
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">HealthCare Plus</p>
                <p className="text-sm text-gray-600">Policy #: HD123456789</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center text-gray-500 mb-4">
              <ShieldIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Privacy Settings</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">
                  Share data with healthcare providers
                </label>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-red-600" checked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">
                  Emergency contact access
                </label>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-red-600" checked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PersonalInfo;
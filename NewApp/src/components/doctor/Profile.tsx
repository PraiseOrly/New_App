import React from 'react';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
const Profile = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Doctor Profile</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-900">
                Dr. John Smith
              </h3>
              <p className="text-gray-500">Cardiologist</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-500">
                  <MailIcon className="h-5 w-5 mr-2" />
                  dr.smith@cardiactek.com
                </div>
                <div className="flex items-center text-gray-500">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  123 Medical Center, Suite 456
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Professional Information
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Specialization
              </h4>
              <p className="mt-1 text-gray-500">Interventional Cardiology</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Experience</h4>
              <p className="mt-1 text-gray-500">15+ years</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Education</h4>
              <p className="mt-1 text-gray-500">
                MD - Stanford University School of Medicine
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Certifications
              </h4>
              <p className="mt-1 text-gray-500">
                Board Certified in Cardiovascular Disease
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;
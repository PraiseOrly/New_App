import React, { useState } from 'react';
import { AlertCircleIcon, PhoneIcon, MapPinIcon, SendIcon } from 'lucide-react';
const EmergencySOS = () => {
  const [isActivated, setIsActivated] = useState(false);
  const handleEmergency = () => {
    setIsActivated(true);
    // In a real application, this would:
    // 1. Alert emergency services
    // 2. Share location
    // 3. Send medical history
    // 4. Notify emergency contacts
  };
  return <div className="space-y-6">
      <div className="bg-red-50 p-8 rounded-lg border-2 border-red-500">
        <div className="text-center space-y-4">
          <AlertCircleIcon className="h-16 w-16 text-red-600 mx-auto" />
          <h2 className="text-2xl font-bold text-red-900">Emergency SOS</h2>
          <p className="text-red-700">
            Activate Emergency SOS to alert emergency services and share your
            location and medical information
          </p>
          <button onClick={handleEmergency} disabled={isActivated} className={`w-full py-4 rounded-lg text-white font-bold text-lg ${isActivated ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}>
            {isActivated ? 'Emergency Services Notified' : 'Activate Emergency SOS'}
          </button>
        </div>
        {isActivated && <div className="mt-8 space-y-4">
            <div className="bg-white p-4 rounded-lg flex items-center">
              <PhoneIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <p className="font-medium">Contacting Emergency Services</p>
                <p className="text-sm text-gray-600">
                  Your medical history will be shared
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center">
              <MapPinIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <p className="font-medium">Location Services Active</p>
                <p className="text-sm text-gray-600">
                  Emergency responders can locate you
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center">
              <SendIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <p className="font-medium">Emergency Contacts Notified</p>
                <p className="text-sm text-gray-600">
                  Your emergency contacts will be alerted
                </p>
              </div>
            </div>
          </div>}
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Emergency Information
        </h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-sm font-medium text-gray-500">
              Emergency Contacts
            </p>
            <p className="mt-1">John Doe (Spouse) - +1 (555) 123-4567</p>
            <p className="mt-1">Mary Smith (Sister) - +1 (555) 987-6543</p>
          </div>
          <div className="border-b pb-4">
            <p className="text-sm font-medium text-gray-500">Allergies</p>
            <p className="mt-1">Penicillin, Sulfa Drugs</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Medications
            </p>
            <p className="mt-1">Lisinopril 10mg, Metoprolol 25mg</p>
          </div>
        </div>
      </div>
    </div>;
};
export default EmergencySOS;
import React, { useState, useEffect } from 'react';
import { UserIcon, MailIcon, PhoneIcon, ShieldIcon } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

const PersonalInfo = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    patientId: '#12345',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    emergencyContactName: 'John Doe (Spouse)',
    emergencyContactPhone: '+1 (555) 987-6543',
    insuranceProvider: 'HealthCare Plus',
    insurancePolicy: 'HD123456789',
    shareData: true,
    emergencyAccess: true,
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        patientId: user.patientId || prev.patientId,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        emergencyContactName: user.emergencyContactName || prev.emergencyContactName,
        emergencyContactPhone: user.emergencyContactPhone || prev.emergencyContactPhone,
        insuranceProvider: user.insuranceProvider || prev.insuranceProvider,
        insurancePolicy: user.insurancePolicy || prev.insurancePolicy,
        shareData: user.shareData !== undefined ? user.shareData : prev.shareData,
        emergencyAccess: user.emergencyAccess !== undefined ? user.emergencyAccess : prev.emergencyAccess,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Update user data in context, ensure role is preserved
    setUser({
      ...formData,
      role: user?.role || 'patient',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
          <button
            onClick={isEditing ? handleSave : toggleEdit}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 space-y-2 w-full max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-900">{formData.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient ID</label>
                <p className="text-gray-500">{formData.patientId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-500">{formData.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-500">{formData.phone}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md">
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Emergency Contacts</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{formData.emergencyContactName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{formData.emergencyContactPhone}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Insurance Information</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provider</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{formData.insuranceProvider}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Policy #</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="insurancePolicy"
                      value={formData.insurancePolicy}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{formData.insurancePolicy}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 max-w-md">
            <div className="flex items-center text-gray-500 mb-4">
              <ShieldIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Privacy Settings</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Share data with healthcare providers</label>
                <input
                  type="checkbox"
                  name="shareData"
                  className="form-checkbox h-4 w-4 text-red-600"
                  checked={formData.shareData}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Emergency contact access</label>
                <input
                  type="checkbox"
                  name="emergencyAccess"
                  className="form-checkbox h-4 w-4 text-red-600"
                  checked={formData.emergencyAccess}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

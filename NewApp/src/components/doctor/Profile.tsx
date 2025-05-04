import React, { useState } from 'react';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. John Smith',
    title: 'Cardiologist',
    email: 'dr.smith@cardiactek.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center, Suite 456',
    specialization: 'Interventional Cardiology',
    experience: '15+ years',
    education: 'MD - Stanford University School of Medicine',
    certifications: 'Board Certified in Cardiovascular Disease',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically send formData to backend API
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Doctor Profile</h2>
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
                <label className="block text-sm font-medium text-gray-700">Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-900">{formData.title}</p>
                )}
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-500">{formData.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Professional Information</h2>
        </div>
        <div className="p-6 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            {isEditing ? (
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1 text-gray-500">{formData.specialization}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            {isEditing ? (
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1 text-gray-500">{formData.experience}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Education</label>
            {isEditing ? (
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1 text-gray-500">{formData.education}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Certifications</label>
            {isEditing ? (
              <input
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1 text-gray-500">{formData.certifications}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

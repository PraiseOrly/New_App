import React from 'react';
import { SmartphoneIcon, HeartPulseIcon, ActivityIcon, BatteryIcon, WifiIcon } from 'lucide-react';
const WearableDevices = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Connected Devices
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Active Device */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <SmartphoneIcon className="h-6 w-6 text-green-500" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">CardiacTek Monitor</h3>
                    <p className="text-sm text-green-600">Connected</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <WifiIcon className="h-5 w-5 text-green-500" />
                  <BatteryIcon className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <HeartPulseIcon className="h-6 w-6 text-red-600 mb-2" />
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="text-2xl font-semibold">72 BPM</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ActivityIcon className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">Steps</p>
                  <p className="text-2xl font-semibold">8,432</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <HeartPulseIcon className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="text-2xl font-semibold">120/80</p>
                </div>
              </div>
            </div>
            {/* Device Settings */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Device Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Continuous Monitoring</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Alert Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Data Sync</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default WearableDevices;
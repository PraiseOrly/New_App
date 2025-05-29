import React from 'react';
import { ClipboardIcon, HeartPulseIcon, ActivityIcon } from 'lucide-react';
const PhysicalExam = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Physical Examination Results
          </h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-4">
                <HeartPulseIcon className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-lg font-medium">Cardiovascular</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Heart Rate: 72 bpm</li>
                <li>Blood Pressure: 120/80 mmHg</li>
                <li>Heart Sounds: Normal S1/S2</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-4">
                <ActivityIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Physical Status</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Weight: 70 kg</li>
                <li>Height: 175 cm</li>
                <li>BMI: 22.9</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PhysicalExam;
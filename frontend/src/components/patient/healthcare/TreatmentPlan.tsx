import React from 'react';
import { ClipboardListIcon, CalendarIcon, PillIcon } from 'lucide-react';
const TreatmentPlan = () => {
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Treatment Plan</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Medications</h3>
              <div className="space-y-4">
                {[{
                name: 'Lisinopril',
                dosage: '10mg',
                frequency: 'Once daily',
                purpose: 'Blood pressure control'
              }, {
                name: 'Metoprolol',
                dosage: '25mg',
                frequency: 'Twice daily',
                purpose: 'Heart rate control'
              }, {
                name: 'Aspirin',
                dosage: '81mg',
                frequency: 'Once daily',
                purpose: 'Blood thinner'
              }].map((medication, index) => <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                    <PillIcon className="h-5 w-5 text-red-600 mt-1" />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">
                        {medication.name} - {medication.dosage}
                      </p>
                      <p className="text-sm text-gray-500">
                        {medication.frequency}
                      </p>
                      <p className="text-sm text-gray-500">
                        Purpose: {medication.purpose}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Lifestyle Changes</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
                  Regular exercise: 30 minutes of moderate activity, 5 days/week
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
                  Low-sodium diet
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
                  Stress management techniques
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Follow-up Schedule</h3>
              <div className="space-y-3">
                {[{
                type: 'Cardiology Check-up',
                date: '2024-01-15',
                details: 'Regular follow-up with Dr. Smith'
              }, {
                type: 'Blood Pressure Check',
                date: '2024-01-01',
                details: 'Routine BP monitoring'
              }, {
                type: 'ECG',
                date: '2024-02-01',
                details: 'Regular heart rhythm check'
              }].map((appointment, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-red-600" />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          {appointment.type}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.details}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {appointment.date}
                    </span>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default TreatmentPlan;
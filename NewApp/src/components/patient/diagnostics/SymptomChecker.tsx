import React, { useState } from 'react';
import { AlertCircleIcon, CheckCircleIcon, HeartPulseIcon } from 'lucide-react';
const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const symptoms = ['Chest Pain', 'Shortness of Breath', 'Rapid Heartbeat', 'Dizziness', 'Fatigue', 'Swelling in Legs', 'Irregular Heartbeat', 'Nausea'];
  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(current => current.includes(symptom) ? current.filter(s => s !== symptom) : [...current, symptom]);
  };
  return <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Symptom Checker</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-gray-600">
              Select any symptoms you are experiencing:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptoms.map(symptom => <button key={symptom} onClick={() => handleSymptomToggle(symptom)} className={`p-4 rounded-lg border flex items-center justify-between ${selectedSymptoms.includes(symptom) ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-500'}`}>
                  <span className="text-gray-900">{symptom}</span>
                  {selectedSymptoms.includes(symptom) && <CheckCircleIcon className="h-5 w-5 text-red-500" />}
                </button>)}
            </div>
            {selectedSymptoms.length > 0 && <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start">
                  <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Recommendation
                    </h3>
                    <p className="mt-2 text-sm text-red-700">
                      Based on your symptoms, we recommend consulting with your
                      healthcare provider. These symptoms could indicate a
                      cardiac condition that requires medical attention.
                    </p>
                    <button className="mt-3 text-sm font-medium text-red-600 hover:text-red-500">
                      Schedule Appointment →
                    </button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default SymptomChecker;
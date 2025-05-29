import React, { useState } from 'react';
import { HeartPulseIcon, ActivityIcon, ThermometerIcon, ScaleIcon, EditIcon, HistoryIcon, SaveIcon, BrainIcon, StethoscopeIcon, PlusIcon, AlertCircleIcon } from 'lucide-react';
interface VitalSign {
  id: string;
  name: string;
  value: string;
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated?: string;
  updatedBy?: string;
  history?: {
    value: string;
    timestamp: string;
    updatedBy: string;
  }[];
}
const initialVitalSigns: VitalSign[] = [{
  id: '1',
  name: 'Blood Pressure',
  value: '120/80',
  unit: 'mmHg',
  timestamp: new Date().toISOString(),
  status: 'normal',
  history: [{
    value: '118/78',
    timestamp: '2023-12-01T10:00:00Z',
    updatedBy: 'Dr. Smith'
  }]
}, {
  id: '2',
  name: 'Heart Rate',
  value: '72',
  unit: 'bpm',
  timestamp: new Date().toISOString(),
  status: 'normal'
}, {
  id: '3',
  name: 'Temperature',
  value: '98.6',
  unit: '°F',
  timestamp: new Date().toISOString(),
  status: 'normal'
}, {
  id: '4',
  name: 'Respiratory Rate',
  value: '16',
  unit: 'breaths/min',
  timestamp: new Date().toISOString(),
  status: 'normal'
}, {
  id: '5',
  name: 'Oxygen Saturation',
  value: '98',
  unit: '%',
  timestamp: new Date().toISOString(),
  status: 'normal'
}, {
  id: '6',
  name: 'BMI',
  value: '24.5',
  unit: 'kg/m²',
  timestamp: new Date().toISOString(),
  status: 'normal'
}];
const BasicScreening = () => {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>(initialVitalSigns);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [selectedTab, setSelectedTab] = useState<'vitals' | 'physical' | 'notes'>('vitals');
  const handleEdit = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };
  const handleSave = (id: string) => {
    setVitalSigns(vitalSigns.map(sign => {
      if (sign.id === id) {
        return {
          ...sign,
          value: editValue,
          lastUpdated: new Date().toISOString(),
          updatedBy: 'Dr. Smith',
          history: [...(sign.history || []), {
            value: sign.value,
            timestamp: sign.timestamp,
            updatedBy: sign.updatedBy || 'Unknown'
          }]
        };
      }
      return sign;
    }));
    setEditingId(null);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="space-y-6">
      <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Screening
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <HistoryIcon className="h-5 w-5 mr-2" />
          View History
        </button>
      </div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[{
          id: 'vitals',
          name: 'Vital Signs',
          icon: HeartPulseIcon
        }, {
          id: 'physical',
          name: 'Physical Exam',
          icon: StethoscopeIcon
        }, {
          id: 'notes',
          name: 'Notes',
          icon: EditIcon
        }].map(tab => <button key={tab.id} onClick={() => setSelectedTab(tab.id as any)} className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${selectedTab === tab.id ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>)}
        </nav>
      </div>
      <div className="bg-white shadow-sm rounded-lg">
        {selectedTab === 'vitals' && <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vitalSigns.map(sign => <div key={sign.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {sign.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sign.status)}`}>
                        {sign.status}
                      </span>
                      <button onClick={() => handleEdit(sign.id, sign.value)} className="p-1 hover:bg-gray-100 rounded-full">
                        <EditIcon className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  {editingId === sign.id ? <div className="flex items-center space-x-2">
                      <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)} className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                      <button onClick={() => handleSave(sign.id)} className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                        <SaveIcon className="h-4 w-4" />
                      </button>
                    </div> : <div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-semibold text-gray-900">
                          {sign.value}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          {sign.unit}
                        </span>
                      </div>
                      {sign.lastUpdated && <p className="mt-1 text-xs text-gray-500">
                          Updated: {new Date(sign.lastUpdated).toLocaleString()}
                        </p>}
                    </div>}
                </div>)}
            </div>
          </div>}
        {selectedTab === 'physical' && <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  General Appearance
                </h3>
                <textarea className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Enter general appearance observations..." />
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Cardiovascular
                </h3>
                <textarea className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Enter cardiovascular examination findings..." />
              </div>
            </div>
          </div>}
        {selectedTab === 'notes' && <div className="p-6">
            <div className="space-y-4">
              <textarea className="w-full h-48 p-4 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Enter screening notes..." />
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <AlertCircleIcon className="h-4 w-4 mr-1" />
                  Notes will be saved automatically
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Save Notes
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default BasicScreening;
import React, { useState } from 'react';
import { PillIcon, PlusIcon, SearchIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, FileTextIcon, PrinterIcon } from 'lucide-react';
interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'discontinued';
  notes: string;
  interactions?: string[];
}
const mockPrescriptions: Prescription[] = [{
  id: '1',
  patientName: 'John Smith',
  medication: 'Lisinopril',
  dosage: '10mg',
  frequency: 'Once daily',
  startDate: '2023-12-01',
  endDate: '2024-03-01',
  status: 'active',
  notes: 'Monitor blood pressure weekly',
  interactions: ['Avoid potassium supplements', 'NSAIDs may reduce effectiveness']
}, {
  id: '2',
  patientName: 'Mary Johnson',
  medication: 'Metoprolol',
  dosage: '25mg',
  frequency: 'Twice daily',
  startDate: '2023-11-15',
  endDate: '2024-02-15',
  status: 'active',
  notes: 'Check heart rate at each dose'
}, {
  id: '3',
  patientName: 'Robert Davis',
  medication: 'Aspirin',
  dosage: '81mg',
  frequency: 'Once daily',
  startDate: '2023-10-01',
  endDate: '2024-01-01',
  status: 'completed',
  notes: 'Low-dose for prevention'
}];
const PrescriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search prescriptions..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <button onClick={() => setShowNewPrescription(true)} className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Prescription
        </button>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Active Prescriptions
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockPrescriptions.map(prescription => <div key={prescription.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <PillIcon className="h-8 w-8 text-gray-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {prescription.patientName}
                    </h4>
                    <p className="text-sm text-gray-900 mt-1">
                      {prescription.medication} - {prescription.dosage}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {prescription.frequency}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center">
                      <PrinterIcon className="h-4 w-4 mr-1" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Duration:</span>{' '}
                  {prescription.startDate} to {prescription.endDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notes:</span>{' '}
                  {prescription.notes}
                </p>
                {prescription.interactions && <div className="mt-2">
                    <div className="flex items-center text-yellow-700">
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Interactions:</span>
                    </div>
                    <ul className="mt-1 list-disc list-inside text-sm text-gray-600 pl-5">
                      {prescription.interactions.map((interaction, index) => <li key={index}>{interaction}</li>)}
                    </ul>
                  </div>}
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default PrescriptionManagement;
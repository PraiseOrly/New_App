import React, { useState } from 'react';
import { ClockIcon, SearchIcon, FilterIcon, AlertCircleIcon, CheckCircleIcon, CalendarIcon } from 'lucide-react';
interface FollowUpRecord {
  id: string;
  patientName: string;
  date: string;
  nextAppointment: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  diagnosis: string;
  notes: string;
}
const mockRecords: FollowUpRecord[] = [{
  id: '1',
  patientName: 'John Smith',
  date: '2023-12-01',
  nextAppointment: '2024-01-15',
  status: 'pending',
  priority: 'high',
  diagnosis: 'Hypertension',
  notes: 'Blood pressure still elevated. Adjust medication.'
}, {
  id: '2',
  patientName: 'Mary Johnson',
  date: '2023-12-05',
  nextAppointment: '2024-01-10',
  status: 'completed',
  priority: 'medium',
  diagnosis: 'Arrhythmia',
  notes: 'ECG shows improvement. Continue current treatment.'
}, {
  id: '3',
  patientName: 'Robert Davis',
  date: '2023-11-28',
  nextAppointment: '2023-12-28',
  status: 'overdue',
  priority: 'high',
  diagnosis: 'Post-MI Recovery',
  notes: 'Missed last two appointments. Needs immediate follow-up.'
}];
const FollowUpRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" title="High Priority" />;
      case 'medium':
        return <AlertCircleIcon className="h-5 w-5 text-yellow-500" title="Medium Priority" />;
      case 'low':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" title="Low Priority" />;
      default:
        return null;
    }
  };
  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search patients..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500" value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
            More Filters
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Follow-up Records
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredRecords.map(record => <div key={record.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getPriorityIcon(record.priority)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {record.patientName}
                    </h4>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Last Visit: {record.date}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Next Appointment: {record.nextAppointment}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Diagnosis:</span>{' '}
                  {record.diagnosis}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Notes:</span> {record.notes}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default FollowUpRecords;
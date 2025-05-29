import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import PatientHome from '../components/patient/PatientHome';
import PersonalInfo from '../components/patient/health-management/PersonalInfo';
import PatientHistory from '../components/patient/health-management/PatientHistory';
import PhysicalExam from '../components/patient/health-management/PhysicalExam';
import ECGAnalysis from '../components/patient/diagnostics/ECGAnalysis';
import HolterMonitor from '../components/patient/diagnostics/HolterMonitor';
import BloodTests from '../components/patient/diagnostics/BloodTests';
import CardiacMRI from '../components/patient/diagnostics/CardiacMRI';
import CTScan from '../components/patient/diagnostics/CTScan';
import SymptomChecker from '../components/patient/diagnostics/SymptomChecker';
import EmergencySOS from '../components/patient/healthcare/EmergencySOS';
import TreatmentPlan from '../components/patient/healthcare/TreatmentPlan';
import Telemedicine from '../components/patient/healthcare/Telemedicine';
import ScheduleAppointment from '../components/patient/appointments/ScheduleAppointment';
import Notifications from '../components/patient/appointments/Notifications';
import ChatAssistant from '../components/patient/appointments/ChatAssistant';
import WearableDevices from '../components/patient/smart/WearableDevices';
import ChatRoom from '../components/shared/ChatRoom';
const PatientDashboard = () => {
  const patientName = 'Jane Doe';
  return <DashboardLayout role="patient" userName={patientName}>
      <Routes>
        <Route path="/" element={<PatientHome />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/history" element={<PatientHistory />} />
        <Route path="/physical-exam" element={<PhysicalExam />} />
        <Route path="/ecg" element={<ECGAnalysis />} />
        <Route path="/holter" element={<HolterMonitor />} />
        <Route path="/blood-tests" element={<BloodTests />} />
        <Route path="/mri" element={<CardiacMRI />} />
        <Route path="/ct-scan" element={<CTScan />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/sos" element={<EmergencySOS />} />
        <Route path="/treatment" element={<TreatmentPlan />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/wearables" element={<WearableDevices />} />
      </Routes>
    </DashboardLayout>;
};
export default PatientDashboard;
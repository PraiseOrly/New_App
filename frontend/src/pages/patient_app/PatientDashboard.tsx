import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientDashboardLayout from '../../components/patient/PatientDashboardLayout';
import { PatientHome, Profile } from '../../components/patient';
import { PatientHistory, PersonalInfo, PhysicalExam } from '../../components/patient/health-management';
import { BloodTests, CardiacMRI, CTScan, ECGAnalysis, HolterMonitor, SymptomChecker } from '../../components/patient/diagnostics';
import { EmergencySOS, Telemedicine, TreatmentPlan } from '../../components/patient/healthcare';
import ChatAssistant from '../../components/patient/Appointments';
import ScheduleAppointment from '../../components/patient/Appointments';
import Notifications from '../../components/patient/Appointments';
import { WearableDevices } from '../../components/patient/smart';
import ChatRoom from '../../components/shared/ChatRoom';

const PatientDashboard = () => {
  const patientName = 'Jane Doe';
  return <PatientDashboardLayout userName={patientName}>
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
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/sos" element={<EmergencySOS />} />
        <Route path="/treatment" element={<TreatmentPlan />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/wearables" element={<WearableDevices />} />
      </Routes>
    </PatientDashboardLayout>;
};
export default PatientDashboard;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/doctor/DoctorDashboardLayout';
import DoctorHome from '../../components/doctor/DoctorHome';
import Profile from '../../components/doctor/Profile';
import FollowUpRecords from '../../components/doctor/patient-management/FollowUpRecords';
import PrescriptionManagement from '../../components/doctor/patient-management/PrescriptionManagement';
import Referrals from '../../components/doctor/patient-management/Referrals';
import Telemedicine from '../../components/doctor/patient-management/Telemedicine';
import TreatmentPlans from '../../components/doctor/patient-management/TreatmentPlans';
import BasicScreening from '../../components/doctor/clinical-tools/BasicScreening';
import ECGAnalysis from '../../components/doctor/clinical-tools/ECGAnalysis';
import ImagingTests from '../../components/doctor/clinical-tools/ImagingTests';
import FunctionalTests from '../../components/doctor/clinical-tools/FunctionalTests';
import InvasiveTests from '../../components/doctor/clinical-tools/InvasiveTests';
import BloodBiomarkers from '../../components/doctor/clinical-tools/BloodBiomarkers';
import GeneticTests from '../../components/doctor/clinical-tools/GeneticTests';
import AppointmentManagement from '../../components/doctor/admin/AppointmentManagement';
import BillingInsurance from '../../components/doctor/admin/BillingInsurance';
import CalendarPage from '../../components/doctor/admin/CalendarPage';
import ChatRoom from '../../components/shared/ChatRoom';

const DoctorDashboard = () => {
  const doctorName = 'John Smith';
  return <DashboardLayout userName={doctorName}>
      <Routes>
        <Route path="/" element={<DoctorHome />} />
        <Route path="/follow-up" element={<FollowUpRecords />} />
        <Route path="/prescriptions" element={<PrescriptionManagement />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/treatment-plans" element={<TreatmentPlans />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/basic-screening" element={<BasicScreening />} />
        <Route path="/ecg" element={<ECGAnalysis />} />
        <Route path="/imaging" element={<ImagingTests />} />
        <Route path="/functional-tests" element={<FunctionalTests />} />
        <Route path="/invasive-tests" element={<InvasiveTests />} />
        <Route path="/blood-biomarkers" element={<BloodBiomarkers />} />
        <Route path="/genetic-tests" element={<GeneticTests />} />
        <Route path="/appointments" element={<AppointmentManagement />} />
        <Route path="/billing" element={<BillingInsurance />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/chat" element={<ChatRoom role="doctor" />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>;
};
export default DoctorDashboard;

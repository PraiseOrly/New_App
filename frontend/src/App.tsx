import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import AuthPage from './pages/shared/AuthPage';
import DoctorDashboard from './pages/doctor_app/DoctorDashboard';
import PatientDashboard from './pages/patient_app/PatientDashboard';
import AboutPage from './pages/homepage/AboutPage';
import ContactPage from './pages/homepage/ContactPage';
import DoctorBenefits from './pages/homepage/DoctorBenefits';
import PatientBenefits from './pages/homepage/PatientBenefits';
import ErrorPage from './pages/shared/ErrorPage';
import NotFoundPage from './pages/shared/NotFoundPage';

import Research from './pages/homepage/Research';
import ArrhythmiaDetection from './pages/homepage/ArrhythmiaDetection';
import EcgAnalysis from './pages/shared/EcgAnalysis';
import Certifications from './pages/homepage/Certifications';
import RiskAssessment from './pages/shared/RiskAssessment';
import LongitudinalTracking from './pages/shared/LongitudinalTracking';
import EhrIntegration from './pages/homepage/EhrIntegration';
import TreatmentGuidelines from './pages/homepage/TreatmentGuidelines';
import LiveAssistant from './pages/shared/LiveAssistant';
import LiveMessageAssistant from './components/shared/LiveMessageAssistant';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { UserProvider } from './context/UserContext';

export function App() {
  return <ErrorBoundary>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/doctor-dashboard/*" element={<DoctorDashboard />} />
          <Route path="/patient-dashboard/*" element={<PatientDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/for-doctors" element={<DoctorBenefits />} />
          <Route path="/for-patients" element={<PatientBenefits />} />
          <Route path="/error" element={<ErrorPage />} />

          <Route path="/research" element={<Research />} />
          <Route path="/arrhythmia-detection" element={<ArrhythmiaDetection />} />
          <Route path="/ecg-analysis" element={<EcgAnalysis />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/longitudinal-tracking" element={<LongitudinalTracking />} />
          <Route path="/ehr-integration" element={<EhrIntegration />} />
          <Route path="/treatment-guidelines" element={<TreatmentGuidelines />} />
          <Route path="/live-assistant" element={<LiveAssistant />} />
        </Routes>
        <LiveMessageAssistant />
      </Router>
    </UserProvider>
  </ErrorBoundary>;
}

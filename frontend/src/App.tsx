import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import AuthPage from './pages/AuthPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DoctorBenefits from './pages/DoctorBenefits';
import PatientBenefits from './pages/PatientBenefits';
import ErrorPage from './pages/shared/ErrorPage';
import NotFoundPage from './pages/shared/NotFoundPage';

import Research from './pages/Research';
import ArrhythmiaDetection from './pages/ArrhythmiaDetection';
import EcgAnalysis from './pages/shared/EcgAnalysis';
import Certifications from './pages/Certifications';
import RiskAssessment from './pages/shared/RiskAssessment';
import LongitudinalTracking from './pages/LongitudinalTracking';
import EhrIntegration from './pages/EhrIntegration';
import TreatmentGuidelines from './pages/TreatmentGuidelines';
import ClinicalGuidance from './pages/ClinicalGuidance';
import ResearchLibrary from './pages/ResearchLibrary';
import Training from './pages/Training';
import Hipaa from './pages/Hipaa';
import Gdpr from './pages/Gdpr';
import Quality from './pages/Quality';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import LiveAssistant from './pages/shared/LiveAssistant';
import LiveMessageAssistant from './components/LiveMessageAssistant';
import ErrorBoundary from './components/ErrorBoundary';
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
          <Route path="/clinical-guidance" element={<ClinicalGuidance />} />
          <Route path="/research-library" element={<ResearchLibrary />} />
          <Route path="/training" element={<Training />} />
          <Route path="/hipaa" element={<Hipaa />} />
          <Route path="/gdpr" element={<Gdpr />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/live-assistant" element={<LiveAssistant />} />
        </Routes>
        <LiveMessageAssistant />
      </Router>
    </UserProvider>
  </ErrorBoundary>;
}

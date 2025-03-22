import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  StethoscopeIcon,
  BrainIcon,
  BellIcon,
  ClipboardListIcon,
  HeartPulseIcon,
  ActivityIcon,
  UserIcon,
  CalendarIcon,
  ShieldCheckIcon,
  WatchIcon,
  ScanIcon,
  VideoIcon,
  LineChartIcon,
  BadgeCheckIcon
} from 'lucide-react';

const DoctorBenefits = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-50 to-red-100 py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <StethoscopeIcon className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advanced Cardiac Care Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for modern cardiologists - AI-enhanced diagnostics, patient management, 
              and collaborative care solutions
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto space-y-20">
            
            {/* Dashboard & Patient Management */}
            <div className="space-y-10">
              <div className="text-center mb-12">
                <ClipboardListIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Patient Management Suite
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                  icon={<ActivityIcon className="h-8 w-8 text-red-600" />}
                  title="Real-time Dashboard"
                  description="Live overview of patient statistics and practice metrics"
                  features={['Case load monitoring', 'Performance analytics', 'Revenue tracking']}
                />
                <FeatureCard
                  icon={<BellIcon className="h-8 w-8 text-red-600" />}
                  title="Critical Alerts"
                  description="Instant notifications for emergency cases"
                  features={['SMS/Email alerts', 'Priority triaging', 'Team notifications']}
                />
                <FeatureCard
                  icon={<UserIcon className="h-8 w-8 text-red-600" />}
                  title="Patient Records"
                  description="Centralized health records management"
                  features={['Medical history', 'Treatment plans', 'Progress tracking']}
                />
                <FeatureCard
                  icon={<ScanIcon className="h-8 w-8 text-red-600" />}
                  title="Report Center"
                  description="Manage all diagnostic reports"
                  features={['ECG results', 'Blood tests', 'Imaging studies']}
                />
              </div>
            </div>

            {/* Clinical Tools */}
            <div className="space-y-10">
              <div className="text-center mb-12">
                <HeartPulseIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Advanced Diagnostic Tools
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                  icon={<LineChartIcon className="h-8 w-8 text-red-600" />}
                  title="AI-ECG Analysis"
                  description="Instant 12-lead interpretation"
                  features={['98.7% accuracy', 'Arrhythmia detection', 'Automated reporting']}
                />
                <FeatureCard
                  icon={<WatchIcon className="h-8 w-8 text-red-600" />}
                  title="Holter Monitoring"
                  description="Long-term rhythm analysis"
                  features={['24/7 tracking', 'Event correlation', 'Trend analysis']}
                />
                <FeatureCard
                  icon={<BadgeCheckIcon className="h-8 w-8 text-red-600" />}
                  title="Risk Stratification"
                  description="ASCVD risk prediction"
                  features={['10-year risk score', 'Prevention plans', 'Guideline-based']}
                />
                <FeatureCard
                  icon={<BrainIcon className="h-8 w-8 text-red-600" />}
                  title="Symptom Checker"
                  description="AI differential diagnosis"
                  features={['Symptom analysis', 'Guidance recommendations', 'Decision support']}
                />
              </div>
            </div>

            {/* Patient Care */}
            <div className="space-y-10">
              <div className="text-center mb-12">
                <VideoIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Care Coordination
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                  icon={<CalendarIcon className="h-8 w-8 text-red-600" />}
                  title="Treatment Plans"
                  description="Customizable care pathways"
                  features={['Medication schedules', 'Rehab plans', 'Progress tracking']}
                />
                <FeatureCard
                  icon={<ShieldCheckIcon className="h-8 w-8 text-red-600" />}
                  title="Secure Messaging"
                  description="HIPAA-compliant communication"
                  features={['Patient portal', 'Team collaboration', 'File sharing']}
                />
                <FeatureCard
                  icon={<WatchIcon className="h-8 w-8 text-red-600" />}
                  title="Device Integration"
                  description="Wearable data integration"
                  features={['Apple Watch', 'KardiaMobile', 'Pacemakers']}
                />
                <FeatureCard
                  icon={<HeartPulseIcon className="h-8 w-8 text-red-600" />}
                  title="Telemedicine"
                  description="Virtual consultations"
                  features={['Video calls', 'Screen sharing', 'E-prescriptions']}
                />
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-red-600 text-white rounded-xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
              <p className="text-xl mb-8 max-w-xl mx-auto">
                Join hundreds of cardiologists using CardiacTek
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Schedule Demo
                </Link>
                <Link
                  to="/signup"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CardiacTek</h3>
              <p className="text-gray-400 text-sm">
                Medical device CE Marked • FDA 510(k) Cleared
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Clinical Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/ecg" className="hover:text-white transition-colors">ECG Analysis</Link></li>
                <li><Link to="/imaging" className="hover:text-white transition-colors">Cardiac Imaging</Link></li>
                <li><Link to="/reports" className="hover:text-white transition-colors">Report Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/training" className="hover:text-white transition-colors">Training</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link to="/research" className="hover:text-white transition-colors">Research</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Compliance</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/hipaa" className="hover:text-white transition-colors">HIPAA</Link></li>
                <li><Link to="/gdpr" className="hover:text-white transition-colors">GDPR</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} CardiacTek. All rights reserved.</p>
            <div className="mt-2 flex gap-4 justify-center">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  features 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
}) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-red-100 hover:shadow-lg transition-all">
    <div className="flex items-center mb-4">
      <div className="bg-red-100 p-2 rounded-lg mr-3">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    {features && (
      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-500">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    )}
  </div>
);

export default DoctorBenefits;
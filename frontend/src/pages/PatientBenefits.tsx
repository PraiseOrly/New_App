import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  UserIcon,
  HeartPulseIcon,
  PhoneIcon,
  ShieldIcon,
  ActivityIcon,
  HistoryIcon,
  ClipboardListIcon,
  CalendarIcon,
  MessageCircleIcon,
  WatchIcon,
  AlertCircleIcon
} from 'lucide-react';

const PatientBenefits = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-50 to-red-100 py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <UserIcon className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Heart Health, <span className="text-red-600">Empowered</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take control of your cardiovascular health with smart monitoring and AI-driven insights
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto space-y-20">
            
            {/* Monitoring & Diagnostics */}
            <div className="space-y-10">
              <div className="text-center mb-12">
                <HeartPulseIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Smart Health Monitoring
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<ActivityIcon className="h-8 w-8 text-red-600" />}
                  title="ECG Analysis"
                  description="Instant analysis of your heart rhythm anytime, anywhere"
                  features={['At-home testing', 'AI interpretation', 'Doctor sharing']}
                />
                <FeatureCard
                  icon={<HistoryIcon className="h-8 w-8 text-red-600" />}
                  title="Holter Reports"
                  description="24/7 heart monitoring made simple"
                  features={['Long-term tracking', 'Symptom correlation', 'PDF reports']}
                />
                <FeatureCard
                  icon={<WatchIcon className="h-8 w-8 text-red-600" />}
                  title="Wearable Sync"
                  description="Connect your smart devices for continuous tracking"
                  features={['Apple Watch', 'Fitbit', 'KardiaMobile']}
                />
              </div>
            </div>

            {/* Care Management */}
            <div className="space-y-10">
              <div className="text-center mb-12">
                <ClipboardListIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Personalized Care
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<CalendarIcon className="h-8 w-8 text-red-600" />}
                  title="Treatment Plans"
                  description="Customized health plans that work for you"
                  features={['Medication tracking', 'Progress alerts', 'Goal setting']}
                />
                <FeatureCard
                  icon={<MessageCircleIcon className="h-8 w-8 text-red-600" />}
                  title="Virtual Visits"
                  description="Connect with your cardiologist from home"
                  features={['Video consultations', 'Secure messaging', 'E-prescriptions']}
                />
                <FeatureCard
                  icon={<AlertCircleIcon className="h-8 w-8 text-red-600" />}
                  title="Symptom Checker"
                  description="AI-powered health guidance"
                  features={['Risk assessment', 'First aid tips', 'Doctor alerts']}
                />
              </div>
            </div>

            {/* Security & Support */}
            <div className="space-y-10">
              <div className="text-center mb-12">
                <ShieldIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Safety & Support
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<PhoneIcon className="h-8 w-8 text-red-600" />}
                  title="Emergency Response"
                  description="Immediate help when you need it most"
                  features={['One-touch SOS', 'Location sharing', '911 integration']}
                />
                <FeatureCard
                  icon={<ShieldIcon className="h-8 w-8 text-red-600" />}
                  title="Data Security"
                  description="Military-grade protection for your health data"
                  features={['HIPAA compliance', 'Encrypted storage', 'Access controls']}
                />
                <FeatureCard
                  icon={<HeartPulseIcon className="h-8 w-8 text-red-600" />}
                  title="Health Trends"
                  description="Understand your heart health patterns"
                  features={['Interactive charts', 'Progress reports', 'Risk alerts']}
                />
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-red-600 text-white rounded-xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Heart Health Journey</h2>
              <p className="text-xl mb-8 max-w-xl mx-auto">
                Join thousands of patients taking control of their cardiovascular health
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/demo"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Reusable Feature Card Component
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
  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-red-100 hover:shadow-lg transition-all h-full">
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

export default PatientBenefits;

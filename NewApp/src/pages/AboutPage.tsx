import React from 'react';
import Navbar from '../components/Navbar';
import { 
  HeartPulseIcon, 
  AwardIcon, 
  UsersIcon, 
  ActivityIcon, 
  BrainIcon, 
  ShieldIcon,
  StarIcon,
  BadgeCheckIcon,
  ClockIcon,
  LineChartIcon
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-50 to-red-100 py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse-slow">
              <HeartPulseIcon className="h-20 w-20 text-red-600 mx-auto mb-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pioneering <span className="text-red-600">Cardiac Care</span> Through Innovation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Merging cutting-edge AI with clinical expertise to redefine cardiovascular health management
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="relative py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-red-100">
              <div className="text-center max-w-3xl mx-auto">
                <div className="bg-red-100 w-max mx-auto p-3 rounded-full mb-6">
                  <StarIcon className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  To empower healthcare providers and patients with AI-driven tools that enhance diagnostic accuracy, 
                  improve treatment outcomes, and make advanced cardiac care accessible to all.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <MissionPoint 
                    icon={<BrainIcon className="h-6 w-6 text-red-600" />}
                    title="AI Innovation"
                    text="Deep learning models trained on millions of cardiac data points"
                  />
                  <MissionPoint 
                    icon={<ShieldIcon className="h-6 w-6 text-red-600" />}
                    title="Security First"
                    text="HIPAA-compliant platform with military-grade encryption"
                  />
                  <MissionPoint 
                    icon={<UsersIcon className="h-6 w-6 text-red-600" />}
                    title="Patient-Centric"
                    text="Tools designed with both clinicians and patients in mind"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why CardiacTek?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transforming cardiac care through technology and expertise
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<LineChartIcon className="h-8 w-8 text-red-600" />}
                title="98.7% Diagnostic Accuracy"
                description="Clinically validated AI models for precise analysis"
              />
              <FeatureCard 
                icon={<ClockIcon className="h-8 w-8 text-red-600" />}
                title="Real-time Processing"
                description="Instant results with cloud-powered computation"
              />
              <FeatureCard 
                icon={<BadgeCheckIcon className="h-8 w-8 text-red-600" />}
                title="FDA-Cleared Technology"
                description="Meeting the highest medical device standards"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Combining medical excellence with technological innovation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatItem 
                icon={<UsersIcon className="h-8 w-8" />}
                value="250K+"
                label="Patients Empowered"
              />
              <StatItem 
                icon={<HeartPulseIcon className="h-8 w-8" />}
                value="5M+"
                label="ECGs Analyzed"
              />
              <StatItem 
                icon={<AwardIcon className="h-8 w-8" />}
                value="99.9%"
                label="Accuracy Rate"
              />
              <StatItem 
                icon={<ClockIcon className="h-8 w-8" />}
                value="24/7"
                label="Monitoring"
              />
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recognition & Awards
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Celebrated for innovation in healthcare technology
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {awards.map((award, index) => (
                <AwardCard key={index} {...award} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Cardiac Care Revolution</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover how CardiacTek is transforming cardiovascular health management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/demo" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Schedule Demo
              </a>
              <a href="/contact" className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Reusable Components
const MissionPoint = ({ icon, title, text }) => (
  <div className="p-6 bg-red-50 rounded-xl">
    <div className="flex items-center mb-3">
      <div className="bg-white p-2 rounded-lg mr-3 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{text}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all">
    <div className="bg-red-100 w-max p-3 rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamMemberCard = ({ name, role, image }) => (
  <div className="text-center group">
    <img 
      src={image} 
      alt={name} 
      className="w-48 h-48 rounded-full mx-auto mb-6 object-cover 
               border-4 border-red-100 group-hover:border-red-200 transition-colors"
    />
    <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
    <p className="text-red-600 font-medium">{role}</p>
  </div>
);

const StatItem = ({ icon, value, label }) => (
  <div className="text-center">
    <div className="bg-white/10 w-max mx-auto p-3 rounded-full mb-4">
      {icon}
    </div>
    <p className="text-4xl font-bold mb-2">{value}</p>
    <p className="text-lg">{label}</p>
  </div>
);

const AwardCard = ({ title, year }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-red-100 transition-colors">
    <AwardIcon className="h-8 w-8 text-red-600 mb-3" />
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-600">{year}</p>
  </div>
);

// Data
const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Dr. Emily Williams',
    role: 'Head of Research',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

const awards = [
  { title: 'Healthcare Innovation Award', year: '2023' },
  { title: 'Best AI Medical Solution', year: '2022' },
  { title: 'Digital Health Pioneer', year: '2021' },
  { title: 'Patient Safety Excellence', year: '2020' }
];

export default AboutPage;
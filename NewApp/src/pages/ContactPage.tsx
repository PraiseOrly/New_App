import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  ChevronDownIcon,
  HeartPulseIcon
} from 'lucide-react';

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-red-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <HeartPulseIcon className="h-16 w-16 text-red-600 mx-auto mb-6" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Connect with CardiacTEK
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your cardiac care partner. Reach out anytime - our clinical support team is here to help 24/7.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <MailIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />,
                title: "Clinical Support",
                details: [
                  "Care Team: care@cardiactek.com",
                  "Emergency: emergency@cardiactek.com"
                ]
              },
              {
                icon: <PhoneIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />,
                title: "Emergency Contact",
                details: [
                  "Clinical Support: 1-800-HEART-911",
                  "Technical Support: 1-800-CARD-TEK"
                ]
              },
              {
                icon: <MapPinIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />,
                title: "HQ Location",
                details: [
                  "123 Cardiac Way Suite 200",
                  "San Francisco, CA 94107"
                ]
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {item.title}
                </h3>
                <div className="space-y-2 text-center">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Embedded Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-16">
            <iframe
              title="CardiacAI Headquarters"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.635834241066!2d-122.406744584683!3d37.78377997975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f4b81e3cd%3A0xe3a3f6907f2a525!2s123%20Cardiac%20Way%2C%20San%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1629781000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        {/* Contact Form */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-xl">
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Clinical Inquiry Form
              </h2>
              
              {formStatus === 'success' && (
                <div className="mb-8 p-4 bg-green-50 rounded-lg flex items-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-green-800 font-medium">
                    Message received. Our clinical team will respond within 2 hours.
                  </span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-8 p-4 bg-red-50 rounded-lg flex items-center">
                  <AlertCircleIcon className="h-6 w-6 text-red-600 mr-3" />
                  <span className="text-red-800 font-medium">
                    Error submitting form. Please contact emergency support.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinical Details
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Include patient ID, symptoms, and relevant medical history"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
                >
                  Send Priority Message
                  <MailIcon className="h-5 w-5 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Clinical Support FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'What constitutes a cardiac emergency?',
                answer: 'Immediately contact emergency services for chest pain lasting more than 5 minutes, sudden shortness of breath, or loss of consciousness. Our system will automatically notify your local EMS when critical rhythms are detected.'
              },
              {
                question: 'How do you handle HIPAA compliance?',
                answer: 'All data is encrypted end-to-end with AES-256 encryption. We maintain strict access controls and audit logs to ensure compliance with healthcare privacy regulations.'
              },
              {
                question: 'What clinical integrations do you support?',
                answer: 'Our system integrates with EPIC, Cerner, and HL7-compliant EHR systems. We support automated report generation and real-time monitoring alerts.'
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon 
                    className={`h-6 w-6 text-red-600 transform transition-transform ${
                      activeFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaqIndex === index && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CardiacAI</h3>
              <p className="text-gray-400 text-sm">
                Medical device CE Marked • FDA 510(k) Cleared
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Clinical Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/ecg-analysis"
                    className="hover:text-white transition-colors">
                    ECG Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    to="/risk-assessment"
                    className="hover:text-white transition-colors">
                    Risk Assessment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/treatment-guidelines"
                    className="hover:text-white transition-colors">
                    Treatment Protocols
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/clinical-guidance"
                    className="hover:text-white transition-colors">
                    Clinical Guidelines
                  </Link>
                </li>
                <li>
                  <Link
                    to="/research-library"
                    className="hover:text-white transition-colors">
                    Research Portal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training"
                    className="hover:text-white transition-colors">
                    Physician Training
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Compliance</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/hipaa"
                    className="hover:text-white transition-colors">
                    HIPAA Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gdpr"
                    className="hover:text-white transition-colors">
                    GDPR Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quality"
                    className="hover:text-white transition-colors">
                    Quality Assurance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} CardiacAI. For clinical use only.
            </p>
            <div className="mt-2 flex gap-4 justify-center">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
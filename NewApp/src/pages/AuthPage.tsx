import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulseIcon, UserIcon, StethoscopeIcon, LoaderIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Extract form values
    const form = e.target as HTMLFormElement;
    const fullNameInput = form.querySelector<HTMLInputElement>('#fullName');
    const emailInput = form.querySelector<HTMLInputElement>('#email');
    const specialtySelect = form.querySelector<HTMLSelectElement>('#specialty');

    const fullName = fullNameInput ? fullNameInput.value : '';
    const email = emailInput ? emailInput.value : '';
    const specialty = specialtySelect ? specialtySelect.value : '';

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);

      // Set user data in context
      const userData: any = {
        role,
        name: fullName,
        email,
      };
      if (role === 'doctor') {
        userData.specialty = specialty;
      }
      setUser(userData);

      // Redirect based on role
      if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row bg-white pt-16">
        {/* Left Panel - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-red-500 to-red-700 p-8 text-white flex-col justify-between">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <HeartPulseIcon className="h-8 w-8" />
              <span className="font-bold text-xl">CardiacTek</span>
            </Link>
          </div>
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-6">
              Transform Your Cardiovascular Care
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of healthcare professionals and patients who trust
              CardiacTek for advanced cardiac monitoring and care.
            </p>
            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="italic mb-2">
                  "CardiacTek has revolutionized how I monitor my patients with
                  heart conditions. The AI analysis has helped me identify issues
                  I might have missed."
                </p>
                <p className="font-semibold">Dr. Sarah Johnson, Cardiologist</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="italic mb-2">
                  "Since using CardiacTek, I feel more confident managing my heart
                  condition. The emergency SOS feature gives me peace of mind."
                </p>
                <p className="font-semibold">Michael Chen, Patient</p>
              </div>
            </div>
          </div>
          <div className="text-sm opacity-75">
            © {new Date().getFullYear()} CardiacTek. All rights reserved.
          </div>
        </div>
        {/* Right Panel - Auth Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <HeartPulseIcon className="h-12 w-12 text-red-600 mx-auto mb-4 md:hidden" />
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLogin ? 'Log in to access your CardiacTek dashboard' : 'Join CardiacTek to revolutionize cardiovascular care'}
              </p>
            </div>
            {/* Role Toggle */}
            <div className="flex rounded-md overflow-hidden mb-6 border border-gray-300">
              <button
                className={`flex-1 py-3 flex justify-center items-center space-x-2 transition-colors ${
                  role === 'patient' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('patient')}
              >
                <UserIcon size={18} />
                <span>Patient</span>
              </button>
              <button
                className={`flex-1 py-3 flex justify-center items-center space-x-2 transition-colors ${
                  role === 'doctor' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('doctor')}
              >
                <StethoscopeIcon size={18} />
                <span>Doctor</span>
              </button>
            </div>
            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your password"
                />
              </div>
              {!isLogin && role === 'doctor' && (
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Specialty
                  </label>
                  <select
                    id="specialty"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select your specialty</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="internal">Internal Medicine</option>
                    <option value="family">Family Medicine</option>
                    <option value="emergency">Emergency Medicine</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <LoaderIcon className="animate-spin h-5 w-5 mr-2" />
                    <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Log In' : 'Create Account'}</span>
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => setIsLogin(!isLogin)} className="text-red-600 hover:text-red-800 font-medium">
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;

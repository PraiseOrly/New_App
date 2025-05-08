import React, { useState } from "react";

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestDemoModal: React.FC<RequestDemoModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the data. In real app, send to backend or API.
    console.log({ name, email, institution });
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Close modal"
        >
          ✕
        </button>
        {!submitted ? (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request a Demo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label htmlFor="institution" className="block text-gray-700 font-medium mb-1">
                  Institution
                </label>
                <input
                  id="institution"
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank you!</h3>
            <p className="text-gray-700 mb-4">Your demo request has been submitted.</p>
            <button
              onClick={onClose}
              className="bg-red-600 text-white font-medium py-2 px-6 rounded-md hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDemoModal;

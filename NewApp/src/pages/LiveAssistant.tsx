import React from "react";
import Navbar from "../components/Navbar";

const LiveAssistant: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto max-w-4xl p-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">CardiaTeck AI Live Assistant</h1>
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Support & Guidance</h2>
          <p className="mb-4">
            Welcome to the CardiaTeck AI Live Assistant. Here you can get real-time support and guidance on using our platform.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ask questions about CardiacAI features and usage.</li>
            <li>Get help with data interpretation and analysis.</li>
            <li>Learn more about AI-driven cardiac diagnostics.</li>
            <li>Access tutorials and documentation.</li>
          </ul>
        </section>
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Learn More</h2>
          <p>
            Explore detailed resources and FAQs to deepen your understanding of CardiaTeck AI capabilities.
          </p>
          <a
            href="/research-library"
            className="inline-block mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Go to Research Library
          </a>
        </section>
      </main>
    </div>
  );
};

export default LiveAssistant;

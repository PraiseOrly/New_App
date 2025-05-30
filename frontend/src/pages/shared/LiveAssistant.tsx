import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Homepage/Navbar";

import {
  MessageCircleIcon,
  ChevronDownIcon,
  XIcon,
  DownloadIcon,
  HelpCircleIcon,
  BarChartIcon,
  BookOpenIcon,
  VideoIcon,
  UserIcon,
  SendIcon,
} from "lucide-react";

// Lazy-loaded image component
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  eager?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  eager = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (eager) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = imgRef.current.dataset.src!;
            imgRef.current.removeAttribute("data-src");
            observer.unobserve(imgRef.current);
          }
        });
      },
      { rootMargin: "100px 0px", threshold: 0.01 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [eager]);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
    />
  );
};

// Slideshow for Hero Section
interface Slide {
  src: string;
  alt: string;
  caption: string;
}

const Slideshow: React.FC = () => {
  const slides: Slide[] = [
    {
      src: "https://images.pexels.com/photos/7088531/pexels-photo-7088531.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "AI assistant interface",
      caption: "Your 24/7 Cardiac Support",
    },
    {
      src: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Medical professional using AI",
      caption: "Empowering Healthcare",
    },
    {
      src: "https://images.pexels.com/photos/4164760/pexels-photo-4164760.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Clinical dashboard",
      caption: "Real-Time Insights",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <LazyImage
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            width={1200}
            height={400}
            eager={index === 0}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
            <h3 className="text-white text-lg sm:text-2xl font-bold">{slide.caption}</h3>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            } hover:bg-white/80 transition-colors duration-300`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Resource Modal for Downloading Guide
interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Close modal"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Download Assistant Guide</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Get our comprehensive guide to maximize your experience with the CardiaTeck AI Live Assistant.
        </p>
        <a
          href="/resources/assistant-guide.pdf"
          download
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
        >
          Download Now
          <DownloadIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

// AI Chatbot Component
const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const responses = {
    "how to use": "To use the CardiaTeck AI Live Assistant, simply type your question here! I can guide you through platform features, data analysis, and more.",
    "data interpretation": "I can help interpret cardiac data! For example, upload an ECG file, and I'll provide insights on key metrics like heart rate variability.",
    "tutorials": "Check out our video tutorials in the Training section or download the Assistant Guide for step-by-step instructions!",
    default: "I'm here to help! Could you clarify your question, or would you like to explore our features?",
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        responses[
          (Object.keys(responses).find((key) => input.toLowerCase().includes(key)) as keyof typeof responses) || "default"
        ];
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-6 h-96 flex flex-col animate-slide-up">
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-white rounded-lg"
      >
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Start by asking a question!</p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
                msg.isUser ? "bg-red-600 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 p-3 rounded-lg">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything about CardiaTeck AI..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Chat input"
        />
        <button
          onClick={handleSend}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
          aria-label="Send message"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// FAQ Accordion Component
const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What can the Live Assistant do?",
      answer:
        "The CardiaTeck AI Live Assistant provides real-time support, answering questions about platform features, data interpretation, and AI diagnostics. It also offers access to tutorials and resources.",
    },
    {
      question: "Is the assistant available 24/7?",
      answer:
        "Yes! Our AI-powered assistant is available around the clock to assist with your queries, ensuring you have support whenever you need it.",
    },
    {
      question: "Can I personalize the assistant?",
      answer:
        "With a user profile, the assistant can tailor responses based on your preferences and past interactions. Sign in to enable this feature!",
    },
    {
      question: "How do I access tutorials?",
      answer:
        "Tutorials are available in the Training section, or you can ask the assistant for direct links to video guides and documentation.",
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md animate-fade-in"
        >
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-600"
            aria-expanded={activeIndex === index}
            aria-controls={`faq-${index}`}
          >
            <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
            <ChevronDownIcon
              className={`h-6 w-6 text-red-600 transform transition-transform duration-300 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            id={`faq-${index}`}
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-4 pt-2 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main LiveAssistant Component
const LiveAssistant: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Dr. Guest",
    role: "Cardiologist",
    preferences: { theme: "light", notifications: true },
  });

  // Simulated user profile fetch
  useEffect(() => {
    // Placeholder for API call to fetch user profile
    setUserProfile({
      name: "Dr. Guest",
      role: "Cardiologist",
      preferences: { theme: "light", notifications: true },
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        .animate-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .animate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in">
                Welcome, {userProfile.name}! Meet Your CardiaTeck AI Live Assistant
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in">
                Get instant support, personalized guidance, and AI-driven insights to elevate your cardiac care practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Guide
                </button>
                <Link
                  to="/demo"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 animate-fade-in"
                >
                  <VideoIcon className="w-5 h-5" />
                  Request Demo
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Chat with Your AI Assistant
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
            Ask questions, get real-time insights, and explore CardiaTeck AI's powerful features with our intelligent assistant.
          </p>
          <AIChatbot />
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Why Choose Our Live Assistant?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: HelpCircleIcon,
                title: "Instant Support",
                description: "Get answers to your questions in real-time, 24/7.",
              },
              {
                icon: BarChartIcon,
                title: "Data Insights",
                description: "Receive guidance on interpreting cardiac data and analytics.",
              },
              {
                icon: BookOpenIcon,
                title: "Learning Resources",
                description: "Access tutorials, guides, and documentation effortlessly.",
              },
              {
                icon: UserIcon,
                title: "Personalized Experience",
                description: "Tailored responses based on your profile and preferences.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md animate-card animate-slide-up"
              >
                <feature.icon className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            See the Assistant in Action
          </h2>
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg animate-slide-up">
            <div className="font-mono text-sm">
              <p className="text-green-400">// Sample interaction with CardiaTeck AI Assistant</p>
              <p>
                <span className="text-blue-400">User:</span> How do I interpret an ECG report?
              </p>
              <p>
                <span className="text-blue-400">Assistant:</span> I can guide you! Upload the ECG file, and I'll highlight key metrics like QRS duration and ST elevation. Want a step-by-step tutorial?
              </p>
              <p className="mt-4">
                <span className="text-blue-400">User:</span> Show me a tutorial.
              </p>
              <p>
                <span className="text-blue-400">Assistant:</span> Here's a link to our ECG Analysis Tutorial: <Link to="/training" className="text-blue-300 underline">View Tutorial</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-base sm:text-lg mb-6">
              Explore our research library or schedule a demo to see the Live Assistant in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/research-library"
                className="bg-white text-red-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <BookOpenIcon className="w-5 h-5" />
                Research Library
              </Link>
              <Link
                to="/demo"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <VideoIcon className="w-5 h-5" />
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <MessageCircleIcon className="w-6 h-6 text-red-600" />
            <span className="text-sm font-medium">CardiaTeck AI © {new Date().getFullYear()}</span>
          </div>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>

      {/* Resource Modal */}
      <ResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LiveAssistant;
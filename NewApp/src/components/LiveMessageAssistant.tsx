import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  SendIcon,
  MessageCircleIcon,
  XIcon,
  TrashIcon,
  HelpCircleIcon,
  PhoneIcon,
} from "lucide-react";

// Simulated user profile type
interface UserProfile {
  name: string;
  role: string;
  preferences: { theme: "light" | "dark"; notifications: boolean };
}

// Message type
interface Message {
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  isQuickReply?: boolean;
}

// Quick reply option type
interface QuickReply {
  text: string;
  action: () => void;
}

const LiveMessageAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hello! I'm your CardiaTeck AI Assistant. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction for audio
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulated user profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Dr. Guest",
    role: "Cardiologist",
    preferences: { theme: "light", notifications: true },
  });

  // Load messages from localStorage (simulated persistence)
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.log("Failed to load chat messages:", error);
      }
    }
  }, []);

  // Save messages to localStorage and scroll to latest message
  useEffect(() => {
    try {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (error) {
      console.log("Failed to save chat messages:", error);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true); // Mark interaction for audio playback
    if (!isOpen && userProfile.preferences.notifications) {
      playAudio();
    }
  };

  const playAudio = () => {
    if (!hasInteracted) return; // Only play after user interaction
    try {
      const audio = new Audio("https://freesound.org/data/previews/614/614099_7037602-lq.mp3");
      audio.play().catch((error) => console.log("Audio playback failed:", error.message));
    } catch (error) {
      console.log("Audio playback initialization failed:", error);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setQuickReplies([]);
    setIsTyping(true);
    setHasInteracted(true);

    // Simulate assistant response with 3-second delay
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: response.text, timestamp: new Date().toLocaleTimeString() },
      ]);
      setQuickReplies(response.quickReplies || []);
      setIsTyping(false);
      if (userProfile.preferences.notifications) {
        playAudio();
      }
    }, 3000); // 3-second delay
  };

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      sender: "user",
      text: reply.text,
      timestamp: new Date().toLocaleTimeString(),
      isQuickReply: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setQuickReplies([]);
    setIsTyping(true);
    setHasInteracted(true);

    setTimeout(() => {
      reply.action();
      setIsTyping(false);
    }, 3000); // 3-second delay
  };

  const clearHistory = () => {
    setMessages([
      {
        sender: "assistant",
        text: `Hi ${userProfile.name}! Chat history cleared. How can I help you now?`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    try {
      localStorage.removeItem("chatMessages");
    } catch (error) {
      console.log("Failed to clear chat messages:", error);
    }
    setQuickReplies([]);
  };

  const generateResponse = (userInput: string): { text: string; quickReplies?: QuickReply[] } => {
    const inputLower = userInput.toLowerCase();

    // Expanded keyword checks and detailed replies
    if (inputLower.includes("help")) {
      return {
        text: "I'm here to assist! What specifically do you need help with? For example, you can ask about platform features, data analysis, tutorials, account management, or troubleshooting.",
        quickReplies: [
          { text: "Platform Features", action: () => handleFeatureRequest() },
          { text: "Data Analysis", action: () => handleDataAnalysisRequest() },
          { text: "Tutorials", action: () => handleTutorialRequest() },
          { text: "Account Management", action: () => handleAccountManagementRequest() },
          { text: "Troubleshooting", action: () => handleTroubleshootingRequest() },
        ],
      };
    }
    if (inputLower.includes("learn") || inputLower.includes("library") || inputLower.includes("research")) {
      return {
        text: "Our Research Library is packed with insights! Visit it to explore studies, publications, and latest cardiac research.",
        quickReplies: [
          {
            text: "Go to Research Library",
            action: () =>
              setMessages((prev) => [
                ...prev,
                {
                  sender: "assistant",
                  text: '<a href="/research-library" class="text-blue-600 underline">Click here to visit the Research Library</a>',
                  timestamp: new Date().toLocaleTimeString(),
                },
              ]),
          },
        ],
      };
    }
    if (inputLower.includes("contact") || inputLower.includes("support")) {
      return {
        text: "You can reach our support team via the Contact page, email support@cardiateck.com, or call us at +1-800-CARDIAI.",
        quickReplies: [
          {
            text: "Visit Contact Page",
            action: () =>
              setMessages((prev) => [
                ...prev,
                {
                  sender: "assistant",
                  text: '<a href="/contact" class="text-blue-600 underline">Click here to visit the Contact page</a>',
                  timestamp: new Date().toLocaleTimeString(),
                },
              ]),
          },
        ],
      };
    }
    if (inputLower.includes("features") || inputLower.includes("capabilities") || inputLower.includes("functions")) {
      return handleFeatureRequest();
    }
    if (inputLower.includes("data") || inputLower.includes("analysis") || inputLower.includes("interpretation")) {
      return handleDataAnalysisRequest();
    }
    if (inputLower.includes("tutorial") || inputLower.includes("guide") || inputLower.includes("video")) {
      return handleTutorialRequest();
    }
    if (inputLower.includes("account") || inputLower.includes("profile") || inputLower.includes("settings")) {
      return handleAccountManagementRequest();
    }
    if (inputLower.includes("troubleshoot") || inputLower.includes("issue") || inputLower.includes("problem")) {
      return handleTroubleshootingRequest();
    }
    if (inputLower.includes("privacy") || inputLower.includes("gdpr") || inputLower.includes("data protection")) {
      return {
        text: "We take your privacy seriously. You can read our Privacy Policy on the Privacy page for details on data protection and GDPR compliance.",
        quickReplies: [
          {
            text: "View Privacy Policy",
            action: () =>
              setMessages((prev) => [
                ...prev,
                {
                  sender: "assistant",
                  text: '<a href="/privacy" class="text-blue-600 underline">Click here to view the Privacy Policy</a>',
                  timestamp: new Date().toLocaleTimeString(),
                },
              ]),
          },
        ],
      };
    }
    if (inputLower.includes("terms") || inputLower.includes("conditions") || inputLower.includes("agreement")) {
      return {
        text: "Our Terms of Use outline the rules and guidelines for using CardiaTeck AI. You can review them on the Terms page.",
        quickReplies: [
          {
            text: "View Terms of Use",
            action: () =>
              setMessages((prev) => [
                ...prev,
                {
                  sender: "assistant",
                  text: '<a href="/terms" class="text-blue-600 underline">Click here to view the Terms of Use</a>',
                  timestamp: new Date().toLocaleTimeString(),
                },
              ]),
          },
        ],
      };
    }
    return {
      text: `Thanks for reaching out, ${userProfile.name}! I'm not sure I caught that. Could you clarify, or try asking about features, data analysis, tutorials, account management, or troubleshooting?`,
      quickReplies: [
        { text: "Platform Features", action: () => handleFeatureRequest() },
        { text: "Data Analysis", action: () => handleDataAnalysisRequest() },
        { text: "Tutorials", action: () => handleTutorialRequest() },
        { text: "Account Management", action: () => handleAccountManagementRequest() },
        { text: "Troubleshooting", action: () => handleTroubleshootingRequest() },
      ],
    };
  };

  // New handler functions for added topics
  const handleAccountManagementRequest = () => ({
    text: "You can update your profile, change your password, and manage notification preferences in the Account Settings page.",
    quickReplies: [
      {
        text: "Go to Account Settings",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: '<a href="/account-settings" class="text-blue-600 underline">Click here to visit Account Settings</a>',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
    ],
  });

  const handleTroubleshootingRequest = () => ({
    text: "If you encounter issues, try restarting the app, clearing your cache, or contacting support for assistance.",
    quickReplies: [
      {
        text: "Contact Support",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: '<a href="/contact" class="text-blue-600 underline">Click here to contact Support</a>',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
      {
        text: "View Troubleshooting Guide",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: '<a href="/resources/troubleshooting-guide.pdf" class="text-blue-600 underline" download>Download Troubleshooting Guide</a>',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
    ],
  });

  const handleFeatureRequest = () => ({
    text: "CardiaTeck AI offers ECG analysis, ASCVD risk assessment, treatment guidelines, and more. Want details on any of these?",
    quickReplies: [
      {
        text: "ECG Analysis",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: "Our ECG Analysis tool provides real-time insights into heart rate, arrhythmias, and more. Visit the Live Assistant page for a demo!",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
      {
        text: "Risk Assessment",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: "Calculate 10-year ASCVD risk with our AI-powered tool. Check out the Risk Assessment page!",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
    ],
  });

  const handleDataAnalysisRequest = () => ({
    text: "I can help interpret cardiac data! For example, upload an ECG file, and I'll highlight key metrics like QRS duration. Want to try?",
    quickReplies: [
      {
        text: "Learn More",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: '<a href="/live-assistant" class="text-blue-600 underline">Visit the Live Assistant page for data analysis tools</a>',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
    ],
  });

  const handleTutorialRequest = () => ({
    text: "Tutorials are available in the Training section, or I can share a quick guide here!",
    quickReplies: [
      {
        text: "View Tutorials",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: '<a href="/training" class="text-blue-600 underline">Click here for video tutorials</a>',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
      {
        text: "Download Guide",
        action: () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: '<a href="/resources/assistant-guide.pdf" class="text-blue-600 underline" download>Download the Assistant Guide</a>',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]),
      },
    ],
  });

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .animate-typing {
          animation: typing 1.5s infinite;
        }
        .animate-dots {
          display: inline-flex;
          gap: 4px;
        }
        .animate-dots span {
          animation: dotPulse 1.5s infinite;
          animation-delay: calc(0.2s * var(--i));
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #b91c1c;
          border-radius: 50%;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes typing {
          0% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>

      {isOpen ? (
        <div
          ref={chatContainerRef}
          className="w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
          aria-label="CardiaTeck AI Live Message Assistant"
        >
          {/* Header */}
          <header className="bg-red-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="w-6 h-6" />
              <span className="text-lg font-bold">CardiaTeck AI Assistant</span>
            </div>
            <button
              onClick={toggleOpen}
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
              aria-label="Close chat"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </header>

          {/* Chat Area */}
          <main className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } items-end gap-2 animate-fade-in`}
              >
                {msg.sender === "assistant" && (
                  <img
                    src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Assistant avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                {msg.sender === "assistant" ? (
                  <div
                    className="max-w-[75%] p-3 rounded-2xl shadow-sm bg-white text-gray-900"
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                ) : (
                  <div className="max-w-[75%] p-3 rounded-2xl shadow-sm bg-red-600 text-white">
                    {msg.text}
                  </div>
                )}
                {msg.sender === "user" && (
                  <img
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <time
                  className={`text-xs ${
                    msg.sender === "user" ? "text-gray-400" : "text-gray-500"
                  } mt-1`}
                  dateTime={new Date().toISOString()}
                >
                  {msg.timestamp}
                </time>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-end gap-2 animate-typing">
                <img
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Assistant avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-white p-3 rounded-2xl shadow-sm animate-dots">
                  <span style={{ "--i": 1 } as React.CSSProperties} />
                  <span style={{ "--i": 2 } as React.CSSProperties} />
                  <span style={{ "--i": 3 } as React.CSSProperties} />
                </div>
              </div>
            )}
            {quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </main>

          {/* Footer */}
          <footer className="p-4 bg-white border-t border-gray-200 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                aria-label="Type your message"
              />
              <button
                onClick={handleSend}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full flex items-center justify-center"
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-between items-center text-sm">
              <button
                onClick={clearHistory}
                className="text-gray-600 hover:text-red-600 flex items-center gap-1"
                aria-label="Clear chat history"
              >
                <TrashIcon className="w-4 h-4" />
                Clear History
              </button>
              <div className="flex gap-2">
                <Link
                  to="/live-assistant"
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <HelpCircleIcon className="w-4 h-4" />
                  Live Assistant
                </Link>
                <Link
                  to="/contact"
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <PhoneIcon className="w-4 h-4" />
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          className="bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce"
          aria-label="Open CardiaTeck AI Assistant"
          title="CardiaTeck AI Assistant"
        >
          <MessageCircleIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default LiveMessageAssistant;
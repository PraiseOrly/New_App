import React, { useState } from "react";

const LiveMessageAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "assistant", text: "Hello! I'm CardiaTeck AI Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // For now, echo user message as assistant reply (placeholder)
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { sender: "assistant", text: "Thank you for your message. For detailed support, please visit the Live Assistant page." }]);
    }, 1000);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {isOpen ? (
        <div style={{ width: 300, height: 400, backgroundColor: "white", boxShadow: "0 0 10px rgba(0,0,0,0.3)", borderRadius: 8, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 10, backgroundColor: "#b91c1c", color: "white", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            CardiaTeck AI Assistant
            <button onClick={toggleOpen} style={{ background: "none", border: "none", color: "white", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>
          <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 8, textAlign: msg.sender === "user" ? "right" : "left" }}>
                <div style={{ display: "inline-block", backgroundColor: msg.sender === "user" ? "#f87171" : "#efefef", color: msg.sender === "user" ? "white" : "black", padding: "6px 12px", borderRadius: 16, maxWidth: "80%" }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: 10, borderTop: "1px solid #ddd", display: "flex", gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
            <button onClick={handleSend} style={{ backgroundColor: "#b91c1c", color: "white", border: "none", borderRadius: 4, padding: "8px 12px", cursor: "pointer" }}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          style={{
            backgroundColor: "#b91c1c",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 56,
            height: 56,
            fontSize: 24,
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
          aria-label="Open CardiaTeck AI Assistant"
          title="CardiaTeck AI Assistant"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default LiveMessageAssistant;

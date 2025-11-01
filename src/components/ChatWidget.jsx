import { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

function ChatWidget({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // API endpoint - UPDATE THIS after deploying your Cloudflare Worker
  const API_ENDPOINT = 'https://merica-chatbot.boneyardtees.workers.dev';

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Yo. I'm Merica. Need custom tees or you just browsing?",
          timestamp: new Date(),
        }
      ]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call backend API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add Merica's response to chat
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: data.message,
            timestamp: new Date(),
          }
        ]);
      } else {
        // Handle error
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: "Damn, something broke. Try again in a sec.",
            timestamp: new Date(),
            isError: true,
          }
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Can't reach the server. Check your connection.",
          timestamp: new Date(),
          isError: true,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <img
                src="/Images/Merica/Merica Idle.png"
                alt="Merica"
                className="header-avatar"
              />
              <div className="header-text">
                <h3>Chatting with Merica</h3>
                <p>BoneYard Tees Mascot</p>
              </div>
            </div>
            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role} ${msg.isError ? 'error' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <img
                    src="/Images/Merica/Merica Idle.png"
                    alt="Merica"
                    className="message-avatar"
                  />
                )}
                <div className="message-content">
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="message assistant">
                <img
                  src="/Images/Merica/Merica Idle.png"
                  alt="Merica"
                  className="message-avatar"
                />
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask Merica about custom tees..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;

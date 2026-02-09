import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import './ChatWidget.css';
import botIcon from '../../assets/images/chat-bot.png';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('chat_init');
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [tempMessage, setTempMessage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('chat_session_v15'); 
    const savedName = localStorage.getItem('chat_user_name_v15');

    if (savedSession) {
      setStep('chat_active');
      fetchHistory(savedSession, savedName);
    } else {
      setTimeout(() => {
        setMessages([
          { 
            sender: 'ai', 
            text: 'Do you need help?' 
          },
          {
            sender: 'ai',
            text: 'Welcome to our website. I am here to help you. Do you need any help with following?'
          }
        ]);
      }, 500);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step, loading]);

  const fetchHistory = async (sessionId, name) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/history/${sessionId}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setMessages(data.map(m => ({ 
            sender: m.sender === 'admin' ? 'admin' : m.sender, 
            text: m.message, 
            options: [] 
        })));
        
        setMessages(prev => [...prev, { 
            sender: 'ai', 
            text: `Welcome back ${name || ''}! How can I help?`,
            options: ["Life Insurance", "Health Insurance", "Car Insurance", "Talk to Agent"]
        }]);
      } else {
        setMessages([{ sender: 'ai', text: `Welcome back ${name || ''}! How can I help?`, options: [] }]);
      }
    } catch {
      setMessages([{ sender: 'ai', text: `Welcome back ${name || ''}! How can I help?`, options: [] }]);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFirstInteraction = text => {
    setMessages(prev => [...prev, { sender: 'user', text, options: [] }]);
    setTempMessage(text);
    setInput('');
    setStep('form');
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('chat_session_v15', sessionId);
    localStorage.setItem('chat_user_name_v15', formData.name);

    await fetch('http://localhost:5000/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, sessionId })
    });

    setStep('chat_active');
    sendMessage(tempMessage, sessionId);
  };

  const handleSendClick = () => {
    if (!input.trim()) return;
    const sessionId = localStorage.getItem('chat_session_v15');

    if (step === 'chat_init') {
      handleFirstInteraction(input);
    } else {
      setMessages(prev => [...prev, { sender: 'user', text: input, options: [] }]);
      sendMessage(input, sessionId);
      setInput('');
    }
  };

  const handleOptionClick = (optionText) => {
    setMessages(prev => [...prev, { sender: 'user', text: optionText, options: [] }]);
    sendMessage(optionText, localStorage.getItem('chat_session_v15'));
  };

  const sendMessage = async (text, sessionId) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId })
      });

      const data = await res.json();
      
      setMessages(prev => [...prev, { 
          sender: 'ai', 
          text: data.reply, 
          options: data.options || [] 
      }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Server error. Please try again.', options: [] }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-widget-container">
      {!isOpen && (
        <div className="launcher-wrapper" onClick={toggleChat}>
          <div className="help-bubble animate-bounce">
            Do you need help?
          </div>
          <div className="chat-launcher">
            <img src={botIcon} alt="Chat Bot" />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="chat-window animate-pop-in">
          <div className="chat-header">
            <div className="header-title">
               <img src={botIcon} alt="Bot" className="header-bot-icon" /> 
               <span>PolicyXpert Assistant</span>
            </div>
            <button onClick={toggleChat}><FaTimes /></button>
          </div>

          <div className="chat-body">
            <div className="chat-messages-area">
              {messages.map((m, i) => (
                <div key={i} className={`message-group ${m.sender} animate-slide-up`}>
                  <div className={`message ${m.sender}`}>
                     {(m.sender === 'ai' || m.sender === 'admin') && (
                       <img src={botIcon} alt="AI" className="message-avatar-img" />
                     )}
                    <div className="msg-bubble">
                        {m.sender === 'admin' && <strong style={{display:'block', fontSize:'11px', color:'#4685C4', marginBottom:'4px'}}>Agent</strong>}
                        {m.text}
                    </div>
                  </div>
                  
                  {m.sender === 'ai' && m.options && m.options.length > 0 && (
                      <div className="options-container">
                          {m.options.map((opt, idx) => (
                              <button key={idx} className="option-btn" onClick={() => handleOptionClick(opt)}>
                                  <span className="option-dot"></span>
                                  {opt}
                              </button>
                          ))}
                      </div>
                  )}
                </div>
              ))}
              
              {loading && <div className="message ai animate-fade">
                  <img src={botIcon} alt="AI" className="message-avatar-img" />
                  <div className="msg-bubble">Typing...</div>
              </div>}

              {step === 'form' && (
                <div className="message ai form-wrapper animate-slide-up">
                  <form onSubmit={handleFormSubmit} className="chat-lead-form">
                    <p>Please connect with an expert:</p>
                    <input name="name" required placeholder="Name" onChange={handleInputChange} />
                    <input name="email" required placeholder="Email" onChange={handleInputChange} />
                    <input name="mobile" required placeholder="Mobile" onChange={handleInputChange} />
                    <button type="submit">Start Chat</button>
                  </form>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {step !== 'form' && (
            <div className="chat-footer">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendClick()}
                placeholder="Ask about Life, Health, Car Insurance..."
              />
              <button onClick={handleSendClick}><FaPaperPlane /></button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
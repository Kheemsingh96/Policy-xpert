import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaTimes, FaPaperclip, FaSmile, FaHeadset, FaUserTie } from "react-icons/fa";
import './chatbot.css';
import botIcon from '../../assets/images/chat-bot.png';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDetails, setHasDetails] = useState(false);
  const [isLiveAgent, setIsLiveAgent] = useState(false);
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [pendingMessage, setPendingMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [leadId, setLeadId] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ["👍", "👋", "😊", "😂", "❤️", "🤔", "✅", "🙏", "🆗", "📧"];

  const FLOWS = {
    welcome: {
      text: "Welcome to PolicyXpert 👋\n\nI'm here to help you find the right insurance quickly and easily.\n\nWhat would you like help with today?",
      options: ["Life Insurance", "Health Insurance", "Car Insurance", "Compare Plans", "Talk to Advisor"]
    },
    life_main: {
      text: "Great choice 👍 Life insurance protects your family's future financially.\n\nWhat would you like to do?",
      options: ["Get Quote", "Benefits", "How it Works", "Talk to Expert"]
    },
    life_quote_age: {
      text: "To calculate the best plan, I need a few quick details.\n\nSelect your Age Group:",
      options: ["Age 18–30", "Age 31–45", "Age 46+"]
    },
    life_quote_coverage: {
      text: "What coverage amount are you looking for?",
      options: ["25–50 Lakhs", "50L–1 Cr", "1 Cr+"]
    },
    life_quote_final: {
      text: "Thanks! Based on your inputs, we'll show you the best plans instantly.\n\nWould you like to compare top policies now?",
      options: ["Yes Show Plans", "Talk to Advisor"]
    },
    health_main: {
      text: "Health insurance keeps you financially safe during medical emergencies.\n\nWhat would you like help with?",
      options: ["Get Premium", "Coverage Details", "Family Plan", "Individual Plan"]
    },
    health_premium_who: {
      text: "Who do you want to insure?",
      options: ["Self", "Self + Family", "Parents"]
    },
    health_premium_coverage: {
      text: "Preferred coverage amount?",
      options: ["5 Lakhs", "10 Lakhs", "20 Lakhs+"]
    },
    health_premium_final: {
      text: "Perfect 👍 I found plans matching your needs.\n\nWould you like to compare them now?",
      options: ["Compare Plans", "Talk to Advisor"]
    },
    car_main: {
      text: "I can help you renew or buy car insurance in minutes 🚘\n\nWhat do you need?",
      options: ["Renew Policy", "New Insurance", "Check Price", "IDV Calculation"]
    },
    car_renew_state: {
      text: "Enter your car registration state.",
      options: ["Delhi", "Maharashtra", "Other State"]
    },
    car_renew_coverage: {
      text: "What type of coverage do you want?",
      options: ["Third Party", "Comprehensive", "Not Sure"]
    },
    car_renew_final: {
      text: "Got it 👍 I'll show you the best quotes available.\n\nWould you like to see lowest price or best coverage?",
      options: ["Lowest Price", "Best Coverage"]
    },
    compare_main: {
      text: "I can compare multiple insurance plans for you instantly.\n\nWhich insurance do you want to compare?",
      options: ["Life", "Health", "Car"]
    },
    compare_priority: {
      text: "What matters most to you?",
      options: ["Lowest Price", "Maximum Benefits", "Best Claim Ratio"]
    },
    advisor_contact: {
      text: "Sure 👍 A certified insurance advisor can guide you personally.\n\nHow would you like us to contact you?",
      options: ["Call Me", "WhatsApp", "Email", "Live Chat"]
    },
    advisor_time: {
      text: "What is your preferred time?",
      options: ["Morning", "Afternoon", "Evening"]
    },
    advisor_final: {
      text: "Thank you! Our advisor will contact you shortly.\n\nYou're in safe hands 🤝",
      options: []
    },
    end_message: {
      text: "Our expert will contact you soon. Is there anything else I can help you with?",
      options: ["Life Insurance", "Health Insurance", "Car Insurance", "Compare Plans"]
    }
  };

  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: FLOWS.welcome.text,
        options: FLOWS.welcome.options
      }
    ]);
  }, []);

  useEffect(() => {
    if (!leadId) return;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get-chat/${leadId}`);
        if (response.ok) {
          const data = await response.json();
          const adminMessages = data.filter(msg => msg.sender === 'admin');
          setMessages(prev => {
            const currentAdminCount = prev.filter(m => m.sender === 'admin').length;
            if (adminMessages.length > currentAdminCount) {
              const newAdminMsgs = adminMessages.slice(currentAdminCount);
              const formattedNewMsgs = newAdminMsgs.map(m => ({
                sender: 'admin',
                text: m.message
              }));
              if (!isLiveAgent) {
                setIsLiveAgent(true);
                setIsWaitingForAgent(false);
              }
              return [...prev, ...formattedNewMsgs];
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [leadId, isLiveAgent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSendClick = () => {
    if (!input.trim()) return;
    processUserMessage(input);
    setInput('');
    setShowEmojiPicker(false);
  };

  const handleOptionClick = (option) => {
    processUserMessage(option);
  };

  const handleEmojiClick = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      try {
        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formDataObj
        });
        const data = await response.json();
        processUserMessage(data.filePath);
      } catch (error) {
        console.error("File upload failed", error);
      }
    }
  };

  const saveMessageToDB = async (id, sender, msg) => {
    try {
      await fetch('http://localhost:5000/api/save-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: id, sender: sender, message: msg })
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const processUserMessage = (text) => {
    const userMsg = { sender: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);

    if (leadId) {
      saveMessageToDB(leadId, 'user', text);
    }

    if (!hasDetails) {
      setPendingMessage(text);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', type: 'form' }]);
      }, 500);
      return;
    }

    if (isLiveAgent) return;

    if (!text.startsWith('/uploads/')) {
      generateBotResponse(text);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setHasDetails(true);

    try {
      const response = await fetch('http://localhost:5000/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          chatHistory: messages
        })
      });
      if (response.ok) {
        const data = await response.json();
        setLeadId(data.leadId);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }

    setMessages(prev => {
      const newMsgs = prev.filter(m => m.type !== 'form');
      return [...newMsgs, {
        sender: 'ai',
        text: `Thanks ${formData.name}! Connecting you now...`
      }];
    });

    setTimeout(() => {
      generateBotResponse(pendingMessage || "Menu");
    }, 800);
  };

  const addBotMessage = (flow, leadIdVal) => {
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: flow.text,
        options: flow.options
      }]);
      if (leadIdVal) {
        saveMessageToDB(leadIdVal, 'bot', flow.text);
      }
      setLoading(false);
    }, 1000);
  };

  const generateBotResponse = (text) => {
    setLoading(true);
    const lower = text.toLowerCase();

    if (lower.includes("life insurance") || lower === "life") {
      addBotMessage(FLOWS.life_main, leadId);
    }
    else if (lower.includes("get quote") || lower.includes("benefits") || lower.includes("how it works") || lower.includes("talk to expert")) {
      if (lower.includes("get quote")) {
        addBotMessage(FLOWS.life_quote_age, leadId);
      } else if (lower.includes("benefits")) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            sender: 'ai',
            text: "Life insurance offers tax benefits, financial security for your family, and long-term savings.\n\nWould you like to explore further?",
            options: ["Get Quote", "Talk to Expert", "Back to Main Menu"]
          }]);
          setLoading(false);
        }, 1000);
      } else if (lower.includes("how it works")) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            sender: 'ai',
            text: "You pay a regular premium, and in return, your family receives a lump sum amount in case of an unfortunate event.\n\nWant to get started?",
            options: ["Get Quote", "Talk to Expert", "Back to Main Menu"]
          }]);
          setLoading(false);
        }, 1000);
      } else {
        addBotMessage(FLOWS.advisor_contact, leadId);
      }
    }
    else if (lower.includes("age 18") || lower.includes("age 31") || lower.includes("age 46")) {
      addBotMessage(FLOWS.life_quote_coverage, leadId);
    }
    else if (lower.includes("lakh") || lower.includes("cr")) {
      addBotMessage(FLOWS.life_quote_final, leadId);
    }
    else if (lower.includes("yes show plans")) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: "Here are your top matched plans! Our expert will reach out to help you finalize the best one for you.",
          options: ["Talk to Advisor", "Back to Main Menu"]
        }]);
        setLoading(false);
      }, 1000);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: FLOWS.end_message.text,
          options: FLOWS.end_message.options
        }]);
      }, 2500);
    }
    else if (lower.includes("health insurance")) {
      addBotMessage(FLOWS.health_main, leadId);
    }
    else if (lower.includes("get premium")) {
      addBotMessage(FLOWS.health_premium_who, leadId);
    }
    else if (lower === "self" || lower === "self + family" || lower === "parents") {
      addBotMessage(FLOWS.health_premium_coverage, leadId);
    }
    else if (lower.includes("5 lakhs") || lower.includes("10 lakhs") || lower.includes("20 lakhs")) {
      addBotMessage(FLOWS.health_premium_final, leadId);
    }
    else if (lower.includes("coverage details")) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: "Our health plans cover hospitalization, daycare procedures, pre & post hospitalization, and more.\n\nWould you like a personalized quote?",
          options: ["Get Premium", "Family Plan", "Individual Plan", "Talk to Advisor"]
        }]);
        setLoading(false);
      }, 1000);
    }
    else if (lower.includes("family plan")) {
      addBotMessage(FLOWS.health_premium_who, leadId);
    }
    else if (lower.includes("individual plan")) {
      addBotMessage(FLOWS.health_premium_coverage, leadId);
    }
    else if (lower.includes("car insurance")) {
      addBotMessage(FLOWS.car_main, leadId);
    }
    else if (lower.includes("renew policy") || lower.includes("new insurance") || lower.includes("check price") || lower.includes("idv calculation")) {
      if (lower.includes("idv")) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            sender: 'ai',
            text: "IDV (Insured Declared Value) is the current market value of your car. Let me help you calculate it.\n\nEnter your car registration state:",
            options: ["Delhi", "Maharashtra", "Other State"]
          }]);
          setLoading(false);
        }, 1000);
      } else {
        addBotMessage(FLOWS.car_renew_state, leadId);
      }
    }
    else if (lower === "delhi" || lower === "maharashtra" || lower === "other state") {
      addBotMessage(FLOWS.car_renew_coverage, leadId);
    }
    else if (lower.includes("third party") || lower.includes("comprehensive") || lower.includes("not sure")) {
      addBotMessage(FLOWS.car_renew_final, leadId);
    }
    else if (lower.includes("lowest price") || lower.includes("best coverage")) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: "Here are your best matched car insurance quotes! Our expert will get in touch to help you choose.",
          options: ["Talk to Advisor", "Back to Main Menu"]
        }]);
        setLoading(false);
      }, 1000);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: FLOWS.end_message.text,
          options: FLOWS.end_message.options
        }]);
      }, 2500);
    }
    else if (lower.includes("compare plans") || lower === "compare") {
      addBotMessage(FLOWS.compare_main, leadId);
    }
    else if (lower === "life" || lower === "health" || lower === "car") {
      addBotMessage(FLOWS.compare_priority, leadId);
    }
    else if (lower.includes("maximum benefits") || lower.includes("best claim ratio")) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: "Perfect! We've shortlisted the best plans based on your preference. Our expert will connect with you to finalize the right plan.",
          options: ["Talk to Advisor", "Back to Main Menu"]
        }]);
        setLoading(false);
      }, 1000);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: FLOWS.end_message.text,
          options: FLOWS.end_message.options
        }]);
      }, 2500);
    }
    else if (lower.includes("talk to advisor") || lower.includes("talk to expert") || lower.includes("advisor") || lower.includes("expert") || lower.includes("talk")) {
      addBotMessage(FLOWS.advisor_contact, leadId);
    }
    else if (lower.includes("call me") || lower.includes("whatsapp") || lower.includes("email") || lower.includes("live chat")) {
      if (lower.includes("live chat")) {
        setIsWaitingForAgent(true);
        fetch('http://localhost:5000/api/request-live-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            leadId: leadId
          })
        }).catch(error => console.error("Live chat email error:", error));

        setTimeout(() => {
          setMessages(prev => [...prev, {
            sender: 'ai',
            text: "Request sent to our experts! Please stay online, someone will join shortly.",
            options: []
          }]);
          setLoading(false);
        }, 1000);

      } else {
        addBotMessage(FLOWS.advisor_time, leadId);
      }
    }
    else if (lower === "morning" || lower === "afternoon" || lower === "evening") {
      addBotMessage(FLOWS.advisor_final, leadId);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: FLOWS.end_message.text,
          options: FLOWS.end_message.options
        }]);
      }, 2500);
    }
    else if (lower.includes("back to main menu")) {
      addBotMessage(FLOWS.welcome, leadId);
    }
    else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: "I can assist with Life, Health, and Car insurance. Please choose an option below.",
          options: ["Life Insurance", "Health Insurance", "Car Insurance", "Compare Plans", "Talk to Advisor"]
        }]);
        setLoading(false);
      }, 1000);
    }
  };

  const renderMessageContent = (msg) => {
    if (msg.startsWith('/uploads/')) {
      return <img src={`http://localhost:5000${msg}`} alt="uploaded" className="chat-image" />;
    }
    return msg.split('\n').map((line, i) => (
      <span key={i}>{line}{i < msg.split('\n').length - 1 && <br />}</span>
    ));
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chatbot-launcher-wrapper" onClick={toggleChat}>
          <div className="chatbot-help-bubble chatbot-animate-bounce">
            Do you need help?
          </div>
          <div className="chatbot-launcher">
            <img src={botIcon} alt="Bot" />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="chatbot-window chatbot-animate-pop-in">
          <div className={`chatbot-header ${isLiveAgent ? 'live-mode' : ''}`}>
            <div className="chatbot-header-title">
              {isLiveAgent ? (
                <FaHeadset className="chatbot-header-icon" />
              ) : (
                <img src={botIcon} alt="Bot" className="chatbot-header-icon" />
              )}
              <div className="chatbot-title-text">
                <span>{isLiveAgent ? 'Expert Advisor' : 'PolicyXpert Assistant'}</span>
                {isLiveAgent && <span className="live-badge">● Live</span>}
                {isWaitingForAgent && !isLiveAgent && (
                  <span className="waiting-badge">● Connecting...</span>
                )}
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat}><FaTimes /></button>
          </div>

          <div className="chatbot-body">
            <div className="chatbot-messages-area">
              {messages.map((m, i) => (
                <div key={i} className={`chatbot-msg-group ${m.sender} chatbot-animate-slide-up`}>
                  {m.type === 'form' ? (
                    <div className="chatbot-form-wrapper">
                      <div className="chatbot-bubble form-bubble">
                        <p>Please share your details to proceed:</p>
                        <form onSubmit={handleFormSubmit}>
                          <input name="name" required placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
                          <input name="email" required type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
                          <input name="mobile" required type="tel" placeholder="Mobile Number" value={formData.mobile} onChange={handleInputChange} />
                          <button type="submit" className="chatbot-submit-btn">Continue</button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={`chatbot-msg-row ${m.sender}`}>
                        {m.sender === 'ai' && (
                          <img src={botIcon} alt="AI" className="chatbot-avatar" />
                        )}
                        {m.sender === 'admin' && (
                          <div className="admin-avatar-placeholder"><FaUserTie /></div>
                        )}
                        <div className="chatbot-bubble">
                          {renderMessageContent(m.text)}
                        </div>
                      </div>

                      {m.sender === 'ai' && m.options && m.options.length > 0 && (
                        <div className="chatbot-options-wrapper">
                          {m.options.map((opt, idx) => (
                            <button key={idx} className="chatbot-option-item" onClick={() => handleOptionClick(opt)}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {loading && (
                <div className="chatbot-msg-row ai chatbot-animate-fade">
                  <img src={botIcon} alt="AI" className="chatbot-avatar" />
                  <div className="chatbot-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chatbot-footer">
            <div className="chatbot-actions-left">
              <div className="emoji-picker-container">
                <button className="chatbot-action-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <FaSmile />
                </button>
                {showEmojiPicker && (
                  <div className="emoji-picker-popup">
                    {emojis.map(emoji => (
                      <span key={emoji} onClick={() => handleEmojiClick(emoji)}>{emoji}</span>
                    ))}
                  </div>
                )}
              </div>
              <button className="chatbot-action-icon" onClick={handleFileClick}>
                <FaPaperclip />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <input
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendClick()}
              placeholder={isLiveAgent ? "Type to advisor..." : "Type a message..."}
            />
            <button className="chatbot-send-btn" onClick={handleSendClick}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
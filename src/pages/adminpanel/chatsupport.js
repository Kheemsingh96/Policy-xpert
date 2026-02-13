import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaPaperPlane, FaSearch, FaUser, FaCircle, FaPhoneAlt, FaEnvelope, FaTimes } from "react-icons/fa";
import './chatsupport.css';

const ChatLeads = () => {
  const [activeTab, setActiveTab] = useState('leads'); 
  const [leads, setLeads] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/get-leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChatHistory = async (leadId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/get-chat/${leadId}`);
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleViewChat = (lead) => {
    setSelectedChat(lead);
    fetchChatHistory(lead.id);
    setShowHistoryModal(true);
  };

  const handleLiveChatSelect = (lead) => {
    setSelectedChat(lead);
    fetchChatHistory(lead.id);
    setShowHistoryModal(false);
  };

  const sendMessage = async () => {
    if (!replyText.trim() || !selectedChat) return;
    
    const newMessage = { 
      leadId: selectedChat.id, 
      sender: 'admin', 
      message: replyText 
    };

    try {
      await fetch('http://localhost:5000/api/save-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      
      setChatHistory(prev => [...prev, { sender: 'admin', message: replyText }]);
      setReplyText('');
    } catch (error) {
      console.error(error);
    }
  };

  const renderMessageContent = (msg) => {
    if (msg && msg.startsWith('/uploads/')) {
        return <img src={`http://localhost:5000${msg}`} alt="user attachment" style={{ maxWidth: '200px', borderRadius: '8px' }} />;
    }
    return msg;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="chat-support-container">
      
      <div className="cs-header">
        <div className="cs-tabs">
          <button 
            className={`cs-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            All Leads Data
          </button>
          <button 
            className={`cs-tab-btn ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => { setActiveTab('live'); setSelectedChat(null); }}
          >
            Expert Support (Live) <span className="live-dot"></span>
          </button>
        </div>
      </div>

      <div className="cs-content">
        {activeTab === 'leads' && (
          <div className="leads-table-wrapper">
            <table className="cs-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Details</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>#{lead.id}</td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{lead.name ? lead.name.charAt(0).toUpperCase() : 'U'}</div>
                        <div className="user-meta">
                          <span className="u-name">{lead.name}</span>
                          <span className="u-contact">{lead.mobile}</span>
                          <span className="u-email">{lead.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(lead.created_at)}</td>
                    <td>
                      <button className="view-chat-btn" onClick={() => handleViewChat(lead)}>
                        <FaEye /> View Chat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="live-chat-interface">
            <div className="chat-sidebar-list">
              <div className="sidebar-header">Recent Users</div>
              {leads.map(lead => (
                <div 
                  key={lead.id} 
                  className={`sidebar-item ${selectedChat?.id === lead.id ? 'active' : ''}`}
                  onClick={() => handleLiveChatSelect(lead)}
                >
                  <div className="s-avatar">{lead.name ? lead.name.charAt(0).toUpperCase() : 'U'}</div>
                  <div className="s-info">
                    <h4>{lead.name}</h4>
                    <p>{lead.mobile}</p>
                  </div>
                  <FaCircle className="online-status online" />
                </div>
              ))}
            </div>

            <div className="main-chat-window">
              {selectedChat ? (
                <>
                  <div className="chat-window-header">
                    <div className="cw-user-info">
                      <h3>{selectedChat.name}</h3>
                      <span>{selectedChat.mobile} | {selectedChat.email}</span>
                    </div>
                  </div>

                  <div className="chat-messages-area">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`msg-row ${msg.sender}`}>
                        <div className="msg-bubble">
                          {renderMessageContent(msg.message)}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="chat-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button className="cw-send-btn" onClick={sendMessage}>
                      <FaPaperPlane />
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-chat-selected">
                  <FaEnvelope size={40} color="#cbd5e1" />
                  <p>Select a user from the left to start live support.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showHistoryModal && selectedChat && (
        <div className="modal-overlay">
          <div className="history-modal">
            <div className="hm-header">
              <h3>Chat History - {selectedChat.name}</h3>
              <button onClick={() => setShowHistoryModal(false)}><FaTimes /></button>
            </div>
            <div className="hm-body">
              {loading ? <p>Loading chat...</p> : (
                chatHistory.map((msg, idx) => (
                  <div key={idx} className={`msg-row ${msg.sender}`}>
                    <div className="msg-bubble">
                      {renderMessageContent(msg.message)}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="hm-footer">
              <button className="switch-live-btn" onClick={() => {
                setShowHistoryModal(false);
                setActiveTab('live');
              }}>
                Open in Live Support
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChatLeads;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './managefaqs.css';

const ManageFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    status: 1
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/faqs');
      setFaqs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/faqs/${editingId}`, formData);
        setMessage('FAQ Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/faqs', formData);
        setMessage('FAQ Added Successfully');
      }
      setFormData({ question: '', answer: '', status: 1 });
      setEditingId(null);
      fetchFaqs();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('Operation Failed');
    }
  };

  const handleEdit = (faq) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      status: faq.status
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/faqs/${id}`);
        setMessage('FAQ Deleted Successfully');
        fetchFaqs();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="faq-main-wrapper">
      <div className="faq-content-container">
        <div className="header-section">
          <h2 className="faq-title">Manage FAQs</h2>
          <p className="faq-subtitle">Add, edit, or remove frequently asked questions.</p>
        </div>

        {message && <div className={`alert-box ${message.includes('Failed') ? 'error' : 'success'}`}>{message}</div>}

        <div className="faq-card">
          <div className="card-header">
            <h3>{editingId ? 'Edit FAQ' : 'Add New FAQ'}</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="faq-form">
              <div className="form-group">
                <label>Question</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  placeholder="Enter the question..."
                />
              </div>

              <div className="form-group">
                <label>Answer</label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                  placeholder="Enter the answer..."
                  rows="5"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update FAQ' : 'Save FAQ'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ question: '', answer: '', status: 1 });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="faq-list-section">
          <div className="card-header">
            <h3>FAQ List</h3>
          </div>
          <div className="faq-table-wrapper">
            <table className="faq-table">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '30%' }}>Question</th>
                  <th style={{ width: '45%' }}>Answer</th>
                  <th style={{ width: '20%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, index) => (
                  <tr key={faq.id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{faq.question}</td>
                    <td className="text-muted">{faq.answer}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon edit"
                          onClick={() => handleEdit(faq)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(faq.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {faqs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">No FAQs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFaqs;
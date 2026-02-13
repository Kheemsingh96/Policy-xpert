import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './managetestimonials.css';

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [view, setView] = useState('list');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ name: '', text: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/testimonials');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', text: '' });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setView('list');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('text', formData.text);
    if (imageFile) data.append('image', imageFile);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/testimonials/${editingId}`, data);
        setMessage('Testimonial Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/testimonials', data);
        setMessage('Testimonial Created Successfully');
      }
      resetForm();
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Operation Failed');
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, text: item.text });
    setImagePreview(item.image);
    setEditingId(item.id);
    setView('form');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="testimonial-admin-wrapper">
      <div className="testimonial-admin-header">
        <h2>Testimonial Manager</h2>
        <button className="btn-toggle-view" onClick={() => view === 'list' ? setView('form') : resetForm()}>
          {view === 'list' ? '+ Add Testimonial' : 'Back to List'}
        </button>
      </div>

      {message && <div className="alert-msg success">{message}</div>}

      {view === 'list' ? (
        <div className="testimonial-list-container">
          <table className="testimonial-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Name</th>
                <th>Testimonial Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><img src={item.image} className="table-thumb" alt="" /></td>
                  <td className="fw-bold">{item.name}</td>
                  <td className="text-muted">{item.text.substring(0, 50)}...</td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon edit" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn-icon delete" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="testimonial-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Customer Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Review Content</label>
              <textarea rows="5" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} required></textarea>
            </div>
            <div className="form-group">
              <label>Customer Photo</label>
              <input type="file" onChange={handleFileChange} accept="image/*" />
              {imagePreview && <img src={imagePreview} className="img-preview" alt="" />}
            </div>
            <div className="form-actions-bottom">
              <button type="submit" className="btn-save">Save Testimonial</button>
              <button type="button" className="btn-cancel" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;
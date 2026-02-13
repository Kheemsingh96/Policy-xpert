import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './manageblogs.css';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [view, setView] = useState('list');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    title: '',
    excerpt: '',
    category: '',
    author: 'Team PolicyXpert',
    publish_date: new Date().toISOString().split('T')[0],
    content: [''],
    takeaways: [''],
    toc: ['']
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('excerpt', formData.excerpt);
    data.append('category', formData.category);
    data.append('author', formData.author);
    data.append('publish_date', formData.publish_date);
    data.append('content', JSON.stringify(formData.content));
    data.append('takeaways', JSON.stringify(formData.takeaways));
    data.append('toc', JSON.stringify(formData.toc));

    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/blogs/${editingId}`, data);
        setMessage('Blog Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/blogs', data);
        setMessage('Blog Created Successfully');
      }
      resetForm();
      fetchBlogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Operation Failed');
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      const blog = res.data;
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        author: blog.author,
        publish_date: blog.date,
        content: blog.content || [''],
        takeaways: blog.takeaways || [''],
        toc: blog.toc || ['']
      });
      setImagePreview(blog.imageUrl);
      setEditingId(id);
      setView('form');
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        setMessage('Blog Deleted Successfully');
        fetchBlogs();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setView('list');
  };

  return (
    <div className="blog-admin-wrapper">
      <div className="blog-admin-header">
        <h2>Blog Manager</h2>
        <button 
          className="btn-toggle-view" 
          onClick={() => view === 'list' ? setView('form') : resetForm()}
        >
          {view === 'list' ? '+ Create New Blog' : '← Back to List'}
        </button>
      </div>

      {message && <div className={`alert-msg ${message.includes('Failed') ? 'error' : 'success'}`}>{message}</div>}

      {view === 'list' ? (
        <div className="blog-list-container">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    {blog.imageUrl && <img src={blog.imageUrl} alt="blog" className="table-thumb" />}
                  </td>
                  <td className="blog-title-cell">{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.date}</td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon edit" onClick={() => handleEdit(blog.id)}>Edit</button>
                      <button className="btn-icon delete" onClick={() => handleDelete(blog.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="blog-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group half">
                <label>Blog Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group half">
                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required placeholder="e.g. Health Insurance" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
              </div>
              <div className="form-group half">
                <label>Publish Date</label>
                <input type="date" name="publish_date" value={formData.publish_date} onChange={handleInputChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <input type="file" onChange={handleFileChange} accept="image/*" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="img-preview" />}
            </div>

            <div className="form-group">
              <label>Short Excerpt (Displayed on Card)</label>
              <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows="3" required></textarea>
            </div>

            <div className="dynamic-section">
              <label>Table of Contents (TOC)</label>
              {formData.toc.map((item, index) => (
                <div key={index} className="dynamic-row">
                  <input 
                    type="text" 
                    value={item} 
                    onChange={(e) => handleArrayChange(e, index, 'toc')} 
                    placeholder={`Section ${index + 1}`}
                  />
                  <button type="button" className="btn-remove" onClick={() => removeArrayItem(index, 'toc')}>×</button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={() => addArrayItem('toc')}>+ Add Section</button>
            </div>

            <div className="dynamic-section">
              <label>Key Takeaways</label>
              {formData.takeaways.map((item, index) => (
                <div key={index} className="dynamic-row">
                  <input 
                    type="text" 
                    value={item} 
                    onChange={(e) => handleArrayChange(e, index, 'takeaways')} 
                    placeholder={`Point ${index + 1}`}
                  />
                  <button type="button" className="btn-remove" onClick={() => removeArrayItem(index, 'takeaways')}>×</button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={() => addArrayItem('takeaways')}>+ Add Point</button>
            </div>

            <div className="dynamic-section">
              <label>Main Content (Paragraphs)</label>
              {formData.content.map((para, index) => (
                <div key={index} className="dynamic-row vertical">
                  <textarea 
                    value={para} 
                    onChange={(e) => handleArrayChange(e, index, 'content')} 
                    rows="4"
                    placeholder={`Paragraph ${index + 1}`}
                  ></textarea>
                  <button type="button" className="btn-remove-text" onClick={() => removeArrayItem(index, 'content')}>Remove Paragraph</button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={() => addArrayItem('content')}>+ Add Paragraph</button>
            </div>

            <div className="form-actions-bottom">
              <button type="submit" className="btn-save">{editingId ? 'Update Blog' : 'Publish Blog'}</button>
              <button type="button" className="btn-cancel" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
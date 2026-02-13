import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './blog.css';

const Blog = () => {
  const [heroData] = useState({
    title: "Expert Insights & Policy Updates",
    subtitle: "Stay informed with the latest trends in insurance and policy management."
  });

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>{heroData.title}</h1>
        <p>{heroData.subtitle}</p>
      </header>

      <div className="blog-grid">
        {currentPosts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
            <div className="card-image-wrapper">
              <img src={post.imageUrl} alt={post.title} />
            </div>
            <div className="card-content">
              <span className="card-date">{post.date}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`} 
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <span className="page-info">{currentPage} / {totalPages}</span>

          <button 
            className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`} 
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
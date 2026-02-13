import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './blog2.css';
import callIcon from "../../assets/images/call.png"; 
import whatsappIcon from "../../assets/images/whatsapp.png";
import logo from "../../assets/images/small logo.jpg";

const Blog2 = ({ openForm }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const postRes = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setPost(postRes.data);

        const allRes = await axios.get('http://localhost:5000/api/blogs');
        const others = allRes.data.filter(p => p.id !== parseInt(id)).slice(0, 3);
        setRelatedPosts(others);
      } catch (err) {
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleWhatsApp = () => {
    window.open("https://wa.me/918080854433", "_blank");
  };

  if (loading) return <div className="blog-wrapper"><p>Loading article...</p></div>;

  if (!post) {
    return (
      <div className="blog-wrapper">
        <div className="error-view">
          <h2>Article not found</h2>
          <Link to="/blog" className="back-link">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-wrapper">
      <div className="blog-container-split">
        <div className="blog-left-column">
          <div className="blog-main-content">
            <div className="breadcrumb">
              <Link to="/blog">Blog</Link> / {post.category}
            </div>
            
            <h1 className="article-title">{post.title}</h1>
            
            <div className="author-block">
              <div className="author-avatar">
                <img src={logo} alt="PolicyXpert" />
              </div>
              <div className="author-info">
                <span className="by-text">{post.author}</span>
                <span className="date-text">{post.date}</span>
              </div>
            </div>

            <div className="article-hero-image">
              <img src={post.imageUrl} alt={post.title} />
            </div>

            {post.takeaways?.length > 0 && (
              <div className="key-takeaways-box">
                <h3>Key Takeaways</h3>
                <ul>
                  {post.takeaways.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {post.toc?.length > 0 && (
              <div className="whats-inside-box">
                <h3>Table of Contents</h3>
                <ul>
                  {post.toc.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="article-body">
              {post.content?.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          <div className="related-articles-section">
            <h3>Related Articles</h3>
            <div className="related-grid">
              {relatedPosts.map((related) => (
                <Link to={`/blog/${related.id}`} key={related.id} className="related-card">
                  <div className="related-img">
                    <img src={related.imageUrl} alt={related.title} />
                  </div>
                  <div className="related-content">
                    <h4>{related.title}</h4>
                    <span>Read Now →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="blog-sidebar">
          <div className="expert-form-card">
            <h3 className="form-heading">India’s Top Experts help customers decide on the best plan</h3>
            <div className="testimonial-text">
              <span className="quote-mark">“</span>
              I cannot thank <span className="highlight-text">@PolicyXpert</span> enough for their support...
            </div>
            <div className="cta-divider"></div>
            <h4 className="cta-subheading">Consult & Buy from India’s Top 5% Experts!</h4>
            <div className="expert-actions">
              <button className="btn-expert-call" onClick={openForm}>
                <img src={callIcon} alt="Call" /> Book Call
              </button>
              <button className="btn-expert-whatsapp" onClick={handleWhatsApp}>
                <img src={whatsappIcon} alt="WA" /> Chat with Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog2;
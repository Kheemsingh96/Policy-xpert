import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

const Blog = () => {
  const [heroData, setHeroData] = useState({
    title: "Expert Insights & Policy Updates",
    subtitle: "Stay informed with the latest trends in insurance and policy management."
  });

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const mockDatabaseResponse = [
      {
        id: 1,
        title: "Understanding Term Insurance Benefits",
        date: "October 10, 2023",
        excerpt: "Learn why term insurance is a crucial part of financial planning and how it protects your family's future.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        title: "Top 5 Health Insurance Mistakes",
        date: "October 15, 2023",
        excerpt: "Avoid these common pitfalls when choosing a health insurance plan to ensure maximum coverage.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        title: "Car Insurance Claims Simplified",
        date: "October 20, 2023",
        excerpt: "A step-by-step guide to filing car insurance claims smoothly and getting approved faster.",
        imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        title: "Why You Need Travel Insurance",
        date: "November 05, 2023",
        excerpt: "Planning a vacation? Discover how travel insurance covers lost luggage, medical emergencies, and cancellations.",
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 5,
        title: "Retirement Planning 101",
        date: "November 12, 2023",
        excerpt: "It is never too early to start planning. Here are the best pension plans to secure your golden years.",
        imageUrl: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 6,
        title: "Home Insurance: Is it Worth It?",
        date: "November 25, 2023",
        excerpt: "Protect your most valuable asset. We break down what standard home insurance policies actually cover.",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 7,
        title: "The Future of Digital Insurance",
        date: "December 01, 2023",
        excerpt: "How AI and digital platforms are making policy management faster, cheaper, and more transparent.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 8,
        title: "Tax Benefits of Life Insurance",
        date: "December 10, 2023",
        excerpt: "Did you know you can save tax under Section 80C? Read our guide on tax-saving investment instruments.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-97377139a863?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 9,
        title: "Family Floater vs Individual Plans",
        date: "December 15, 2023",
        excerpt: "Confused between family floater and individual health plans? We help you decide what's best for you.",
        imageUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80"
      }
    ];
    setPosts(mockDatabaseResponse);
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
          
          <span className="page-info">
            {currentPage} / {totalPages}
          </span>

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
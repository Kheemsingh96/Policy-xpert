import React, { useEffect, useState, useRef, memo } from 'react';
import './aboutus.css';

const pageContent = {
  hero: {
    title: "We Don't Just Sell Policies.\nWe Build Safety Nets.",
    subtitle: "REDEFINING INSURANCE",
    desc: "PolicyXpert is India's most trusted insurance advisory, blending human expertise with digital simplicity to secure your future.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=60" 
  },
  story: {
    title: "From a Small Office to \nProtecting Thousands",
    subtitle: "OUR STORY",
    para1: "It started with a simple observation: Buying insurance was complicated, and claiming it was even harder. We wanted to change that narrative.",
    para2: "What began as a small team of three certified experts has now grown into a family of dedicated professionals. We realized that people didn't need more policies; they needed better advice.",
    features: ["IRDAI Certified Experts", "24/7 Claim Assistance"],
    experienceYears: "12+",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=60"
  },
  values: [
    { title: "Integrity First", desc: "We believe in 100% transparency. No hidden clauses, no jargon, just honest advice." },
    { title: "Customer Obsession", desc: "Your claim settlement is our personal battle. We stand by you when it matters most." },
    { title: "Innovation Driven", desc: "Leveraging AI and data to find the perfect policy match for your unique lifestyle." },
  ],
  stats: [
    { number: "50K+", label: "Lives Secured" },
    { number: "99%", label: "Client Retention" },
    { number: "25+", label: "Insurance Partners" },
    { number: "12+", label: "Years of Trust" },
  ],
  process: [
    { step: "01", title: "Analyze", desc: "We start by understanding your lifestyle, medical history, and specific financial goals." },
    { step: "02", title: "Compare", desc: "Our advanced algorithm scans 50+ policies from top insurers to find the best fit." },
    { step: "03", title: "Customize", desc: "We tweak the policy riders and terms to ensure maximum coverage for your premium." },
    { step: "04", title: "Support", desc: "From purchase to lifetime claims, our dedicated manager is always just a call away." },
  ],
  vision: {
    title: "A Future Where Every Indian is Financially Secure",
    subtitle: "OUR VISION",
    desc: "We envision a world where insurance is not seen as an expense, but as an essential pillar of financial freedom. Our goal is to empower every individual with the knowledge and the right tools.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=60"
  },
  cta: {
    title: "Stop Guessing. Start Securing.",
    desc: "Get a free, no-obligation consultation with India's top insurance experts."
  }
};

const Counter = memo(({ end, duration = 2000 }) => {
  const [count, setCount] = useState("0");
  const nodeRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp = null;
        const numericEnd = parseInt(end.replace(/\D/g, '')) || 0;
        const suffix = end.replace(/[0-9]/g, '');

        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * numericEnd) + suffix);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={nodeRef}>{count}</span>;
});

const AboutUs = ({ openForm }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero-modern">
        <div className="hero-bg-wrapper">
            <img 
              src={pageContent.hero.image} 
              alt="Insurance Background" 
              className="hero-bg-img" 
              fetchPriority="high"
              width="1200"
              height="800"
              decoding="async"
            />
            <div className="hero-overlay"></div>
        </div>
        <div className="hero-content-modern reveal-on-scroll fade-up">
          <span className="hero-badge">{pageContent.hero.subtitle}</span>
          <h1>{pageContent.hero.title}</h1>
          <p>{pageContent.hero.desc}</p>
        </div>
      </section>

      <section className="our-story-section">
        <div className="container-max">
          <div className="story-grid">
            <div className="story-image reveal-on-scroll slide-right">
              <div className="img-frame">
                <img 
                  src={pageContent.story.image} 
                  alt="Our Journey" 
                  loading="lazy" 
                  decoding="async"
                  width="600"
                  height="400"
                />
                <div className="experience-badge">
                  <span className="years">{pageContent.story.experienceYears}</span>
                  <span className="text">Years of<br/>Excellence</span>
                </div>
              </div>
            </div>
            <div className="story-content reveal-on-scroll slide-left">
              <h4 className="section-subtitle">{pageContent.story.subtitle}</h4>
              <h2>{pageContent.story.title}</h2>
              <p>{pageContent.story.para1}</p>
              <p>{pageContent.story.para2}</p>
              
              <div className="story-features">
                {pageContent.story.features.map((feature, i) => (
                  <div className="s-feature" key={i}>
                    <div className="check-icon">✓</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="core-values-section">
        <div className="container-max">
          <div className="values-header reveal-on-scroll fade-up">
            <h4 className="section-subtitle">OUR CORE VALUES</h4>
            <h2>The Principles That Drive Us</h2>
          </div>
          <div className="values-grid">
            {pageContent.values.map((val, index) => (
              <div className="value-card reveal-on-scroll fade-up" key={index} style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="value-number">0{index + 1}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-modern-section reveal-on-scroll">
        <div className="container-max stats-inner">
          {pageContent.stats.map((stat, index) => (
            <div className="stat-modern-item" key={index}>
              <h3 className="stat-number"><Counter end={stat.number} /></h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vision-section">
        <div className="container-max vision-grid">
          <div className="vision-text reveal-on-scroll slide-right">
            <h4 className="section-subtitle">{pageContent.vision.subtitle}</h4>
            <h2>{pageContent.vision.title}</h2>
            <p>{pageContent.vision.desc}</p>
            <button className="btn-secondary" onClick={openForm}>Our Services &rarr;</button>
          </div>
          <div className="vision-img-wrapper reveal-on-scroll slide-left">
            <div className="img-frame">
              <img 
                src={pageContent.vision.image} 
                alt="Our Vision" 
                loading="lazy" 
                decoding="async"
                width="600"
                height="400"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container-max">
          <div className="process-header reveal-on-scroll fade-up">
            <h4 className="section-subtitle">OUR PROCESS</h4>
            <h2>How We Secure Your Future</h2>
            <p>A simple, transparent journey to financial peace of mind.</p>
          </div>
          <div className="process-grid">
            {pageContent.process.map((item, index) => (
              <div className="process-card reveal-on-scroll fade-up" key={index} style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="step-circle">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-modern reveal-on-scroll">
        <div className="cta-modern-content">
          <h2>{pageContent.cta.title}</h2>
          <p>{pageContent.cta.desc}</p>
          <button className="btn-primary-glow" onClick={openForm}>
            Book Free Consultation
          </button>
        </div>
      </section>

    </div>
  );
};

export default memo(AboutUs);
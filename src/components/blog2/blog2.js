import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './blog2.css';
import callIcon from "../../assets/images/call.png"; 
import whatsappIcon from "../../assets/images/whatsapp.png";
import logo from "../../assets/images/small logo.jpg";

const Blog2 = ({ openForm }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const allPosts = [
      {
        id: 1,
        title: "Can Moratorium Period Clause Really Save You From 'Genuine Miss'?",
        date: "19 Dec, 2025",
        author: "Team PolicyXpert",
        category: "Health Insurance",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "The moratorium period begins after eight continuous years of health insurance coverage.",
          "Fraud refers to deliberate deception, not honest mistakes.",
          "Even after the moratorium period, insurers can reject claims if they prove fraud.",
          "Mistakes in hospital records can still lead to claim rejections.",
          "Keep copies of every submission to strengthen your case."
        ],
        toc: [
          "Introduction",
          "What is this Moratorium Period?",
          "The Moratorium Period Clause - Promise or Illusion?",
          "A Real Case from the Community",
          "Summing It Up"
        ],
        content: [
          `Ravi never imagined that a routine hospital visit would spiral into one of the most anxious experiences of his life. His father was admitted unexpectedly, and the expenses mounted quickly. Despite the rising costs, Ravi felt reassured. He had maintained his health insurance faithfully for over five years.`,
          `With confidence, Ravi submitted his claim, relieved that his diligence would finally pay off. The paperwork was in order, and he looked forward to the support his insurance promised. But, just a week later, an unexpected email arrived.`,
          `Subject: Claim Rejected on the grounds of Misrepresentation.`,
          `Ravi was shocked. How does misrepresentation come into the picture? He distinctly remembered reviewing the proposal form, even double-checking old medical records to avoid any omissions. Wasn't the moratorium period supposed to shield him from accidental errors?`,
          `But now Ravi faced rejection, grappling with uncertainty and huge bills to settle. What if someone forgets to mention a minor surgery from years past? Or a trivial oversight occurs during hospital registration? Will the insurer offer support, or deliver a harsh refusal just like Ravi received?`
        ]
      },
      {
        id: 2,
        title: "Top 5 Health Insurance Mistakes You Must Avoid",
        date: "15 Oct, 2025",
        author: "Dr. Sharma",
        category: "Health Tips",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "Cheaper premiums often mean compromised coverage limits.",
          "Hiding pre-existing diseases leads to 100% claim rejection.",
          "A 5 Lakh cover is insufficient for metro cities today.",
          "Corporate covers cease to exist the moment you leave your job.",
          "Always read the co-payment clauses carefully."
        ],
        toc: [
          "The Premium Trap",
          "Disclosure Norms",
          "Coverage Adequacy",
          "Corporate vs Personal",
          "Conclusion"
        ],
        content: [
          `Choosing the right health insurance is critical. Many people focus solely on the premium amount, ignoring the fine print that actually matters during a claim.`,
          `One of the biggest mistakes is hiding pre-existing diseases. You might save a few thousand rupees on the premium today, but you risk losing lakhs during a medical emergency because your claim will be rejected for non-disclosure.`,
          `Another common error is relying only on your employer's health insurance. What happens if you lose your job or retire? You will be left without cover when you need it the most.`,
          `Always buy a separate personal health insurance policy and ensure the sum insured is adequate to cover modern medical treatments.`
        ]
      },
      {
        id: 3,
        title: "Car Insurance Claims Simplified: A Step-by-Step Guide",
        date: "20 Oct, 2025",
        author: "Auto Expert",
        category: "Motor Insurance",
        imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "Inform the insurer immediately after an accident.",
          "Take photos and videos of the damage instantly.",
          "File an FIR for theft or major third-party damages.",
          "Submit all documents including RC and Driving License.",
          "Opt for cashless garages to avoid upfront payments."
        ],
        toc: [
          "Immediate Actions",
          "Documentation",
          "The Survey Process",
          "Cashless vs Reimbursement",
          "Final Tips"
        ],
        content: [
          `Filing a car insurance claim doesn't have to be a headache. The key is acting fast and documenting everything.`,
          `First, ensure everyone is safe. Then, immediately call your insurer. Most companies have an app to upload photos of the accident spot. This is crucial evidence.`,
          `If there is third-party damage or theft, filing an FIR is mandatory. Without it, your claim cannot be processed.`,
          `Once the surveyor inspects the vehicle, the repair work begins. Using a network garage is always recommended as it saves you from paying cash upfront.`
        ]
      },
      {
        id: 4,
        title: "Why You Need Travel Insurance",
        date: "05 Nov, 2023",
        author: "Travel Desk",
        category: "Travel Insurance",
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "Medical emergencies abroad can cost a fortune without insurance.",
          "Trip cancellations due to unforeseen reasons are covered.",
          "Lost luggage and passport loss assistance is vital.",
          "Flight delays and missed connections are often compensated.",
          "Adventure sports require specific add-on covers."
        ],
        toc: [
          "Medical Coverage Abroad",
          "Trip Cancellation Benefits",
          "Baggage & Passport Loss",
          "Flight Delays",
          "Conclusion"
        ],
        content: [
          `Planning a vacation is exciting, but unforeseen events can ruin your trip and your finances. Travel insurance is your safety net against the unexpected.`,
          `One of the most critical aspects is medical coverage. Healthcare costs in countries like the USA or Europe are astronomical. A simple hospitalization can cost lakhs of rupees. Travel insurance ensures you get quality treatment without breaking the bank.`,
          `Lost luggage or a stolen passport can turn a holiday into a nightmare. Insurance provides financial assistance and guidance to sort these issues out quickly.`,
          `Always check the policy wording for exclusions, especially if you plan on doing adventure sports like skiing or scuba diving.`
        ]
      },
      {
        id: 5,
        title: "Retirement Planning 101",
        date: "12 Nov, 2023",
        author: "Finance Guru",
        category: "Retirement Planning",
        imageUrl: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "Start early to benefit from the power of compounding.",
          "Inflation is the biggest enemy of retirement savings.",
          "Diversify your portfolio across equity and debt.",
          "Health insurance is a crucial part of retirement planning.",
          "Review your plan annually to stay on track."
        ],
        toc: [
          "Power of Compounding",
          "Beating Inflation",
          "Asset Allocation",
          "Healthcare Costs",
          "Action Plan"
        ],
        content: [
          `Retirement might seem far away, but the earlier you start, the more comfortable your golden years will be. The magic of compounding works best when you give it time.`,
          `Inflation eats into your savings. A corpus that looks huge today might be insufficient 20 years from now. Therefore, investing in instruments that beat inflation is non-negotiable.`,
          `Don't rely solely on fixed deposits. A mix of equity for growth and debt for stability is usually recommended.`,
          `Healthcare costs rise with age. Ensure you have a comprehensive senior citizen health insurance plan separate from your investment corpus.`
        ]
      },
      {
        id: 6,
        title: "Home Insurance: Is it Worth It?",
        date: "25 Nov, 2023",
        author: "Property Expert",
        category: "Home Insurance",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "Covers structure against natural and man-made calamities.",
          "Content insurance protects electronics and jewelry.",
          "Burglary and theft coverage provides peace of mind.",
          "Liability coverage protects against third-party claims.",
          "Premiums are surprisingly affordable compared to property value."
        ],
        toc: [
          "Structure Protection",
          "Content Coverage",
          "Theft and Burglary",
          "Liability Insurance",
          "Cost vs Benefit"
        ],
        content: [
          `Your home is likely your most valuable asset, yet less than 1% of Indians insure it. Home insurance is not just about fire protection; it covers much more.`,
          `A standard policy covers the structure against floods, earthquakes, and fire. But what about what's inside? Content insurance covers your expensive electronics, furniture, and jewelry against theft and damage.`,
          `Imagine a pipe bursting and damaging your neighbor's flat. Public liability coverage in your home insurance can handle the legal and repair costs.`,
          `Considering the low premium cost relative to the coverage provided, home insurance is definitely worth the investment.`
        ]
      },
      {
        id: 7,
        title: "The Future of Digital Insurance",
        date: "01 Dec, 2023",
        author: "Tech Insider",
        category: "InsurTech",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "AI is making claim settlements instant.",
          "Paperless onboarding reduces processing time.",
          "Telematics allows for personalized car insurance premiums.",
          "Wearables data can lower health insurance costs.",
          "Blockchain ensures transparency and fraud prevention."
        ],
        toc: [
          "Instant Claims",
          "Paperless Experience",
          "Usage-Based Insurance",
          "Wearable Tech",
          "The Road Ahead"
        ],
        content: [
          `The insurance industry is undergoing a massive digital transformation. Gone are the days of endless paperwork and weeks of waiting for claim approval.`,
          `Artificial Intelligence is now assessing damage from photos and settling claims in minutes. This speed is revolutionary for customer satisfaction.`,
          `Telematics devices in cars track driving behavior. Safe drivers are now rewarded with lower premiums, moving away from standard pricing models.`,
          `Similarly, health insurers are using data from fitness trackers to incentivize healthy lifestyles with premium discounts.`
        ]
      },
      {
        id: 8,
        title: "Tax Benefits of Life Insurance",
        date: "10 Dec, 2023",
        author: "Tax Advisor",
        category: "Tax Planning",
        imageUrl: "https://images.unsplash.com/photo-1554224155-97377139a863?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "Premiums up to 1.5 Lakh are deductible under Section 80C.",
          "Maturity proceeds are tax-free under Section 10(10D).",
          "Health riders offer additional benefits under Section 80D.",
          "Pension plans provide benefits under Section 80CCC.",
          "Always check the premium-to-sum-assured ratio for eligibility."
        ],
        toc: [
          "Section 80C Explained",
          "Tax-Free Maturity",
          "Health Riders & 80D",
          "Pension Plans",
          "Key Conditions"
        ],
        content: [
          `Life insurance is a dual-purpose tool: it provides financial protection and helps save taxes. Understanding the specific sections of the Income Tax Act can help you maximize your savings.`,
          `Under Section 80C, you can claim a deduction of up to ₹1.5 Lakh for premiums paid. However, ensure the premium is less than 10% of the Sum Assured to claim the full benefit.`,
          `The maturity amount, including bonuses, is completely tax-free under Section 10(10D), subject to certain conditions. This makes it an attractive long-term investment.`,
          `Don't forget the riders. If you opt for a critical illness or health rider, that portion of the premium can be claimed under Section 80D.`
        ]
      },
      {
        id: 9,
        title: "Family Floater vs Individual Plans",
        date: "15 Dec, 2023",
        author: "Team PolicyXpert",
        category: "Health Insurance",
        imageUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80",
        takeaways: [
          "Family floaters are cost-effective for young families.",
          "Individual plans are better for older members with health issues.",
          "No Claim Bonus is shared in floaters, individual in separate plans.",
          "One large claim in a floater can exhaust the cover for everyone.",
          "Consider a mix of both for balanced coverage."
        ],
        toc: [
          "Cost Comparison",
          "Coverage Risks",
          "Age Factors",
          "No Claim Bonus Impact",
          "The Verdict"
        ],
        content: [
          `Choosing between a Family Floater and Individual plans is a common dilemma. A floater plan covers the entire family under one sum insured, making it cheaper and easier to manage.`,
          `However, it comes with risks. If one family member falls seriously ill and exhausts the limit, the others are left without coverage for the rest of the year.`,
          `For older parents or members with pre-existing diseases, individual plans are strictly recommended. This ensures their claims don't impact the coverage of other healthy family members.`,
          `A smart strategy often involves a base floater plan for the family and a separate individual plan for senior citizens.`
        ]
      }
    ];

    const currentId = parseInt(id);
    const foundPost = allPosts.find((p) => p.id === currentId);
    setPost(foundPost);

    // Show 3 related posts, excluding the current one
    const others = allPosts.filter(p => p.id !== currentId).slice(0, 3);
    setRelatedPosts(others);

  }, [id]);

  const handleWhatsApp = () => {
    window.open("https://wa.me/919876543210", "_blank");
  };

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

            <div className="key-takeaways-box">
              <h3>Key Takeaways</h3>
              <ul>
                {post.takeaways.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="whats-inside-box">
              <h3>Table of Contents</h3>
              <ul>
                {post.toc.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="article-body">
              {post.content.map((para, index) => (
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
            
            <h3 className="form-heading">
              India’s Top Experts help customers decide on the best plan
            </h3>

            <div className="testimonial-text">
              <span className="quote-mark">“</span>
              I cannot thank <span className="highlight-text">@PolicyXpert</span> enough for their incredible support in helping me secure a health insurance plan after I had almost given up hope. Due to my age and pre-existing conditions, I was repeatedly rejected by multiple providers...
            </div>

            <div className="cta-divider"></div>

            <h4 className="cta-subheading">Consult & Buy from India’s Top 5% Experts!</h4>

            <div className="expert-actions">
              <button 
                className="btn-expert-call" 
                onClick={openForm}
              >
                <img src={callIcon} alt="Call" />
                Book Call with Expert
              </button>

              <button 
                className="btn-expert-whatsapp"
                onClick={handleWhatsApp}
              >
                <img src={whatsappIcon} alt="WA" />
                Chat with Us
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Blog2;
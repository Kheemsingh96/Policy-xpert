import "./hero.css";

import heroMan from "../../assets/images/hero-image.png";
import reviewBadge from "../../assets/images/customer-review.png";
import expertSupport from "../../assets/images/expert.png";
import decorBlue from "../../assets/images/decorative.png";
import decorMail from "../../assets/images/decorative2.png";
import whyChooseIcon from "../../assets/images/tick.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            Find the Right <span>Insurance</span><br />
            <span className="highlight">Coverage</span> Fast Simple<br />
            and Reliable
          </h1>

          <p>
            Compare trusted insurance plans instantly, customize coverage
            easily, and secure reliable protection for life, health, auto,
            and travel needs.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">
              Claim Your Free Consultation
            </button>

            <div className="why-choose">
              <img src={whyChooseIcon} alt="Why choose us" />
              <span>Why Choose Us?</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img className="hero-man" src={heroMan} alt="Insurance Expert" />
          <img className="review-badge" src={reviewBadge} alt="Reviews" />
          <img className="expert-support" src={expertSupport} alt="Support" />
          <img className="decor-blue" src={decorBlue} alt="" />
          <img className="decor-mail" src={decorMail} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

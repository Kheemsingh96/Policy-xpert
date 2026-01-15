import "./hero.css";

import heroMan from "../../assets/images/hero-image.png";
import reviewBadge from "../../assets/images/customer-review.png";
import expertSupport from "../../assets/images/expert.png";
import decorBlue from "../../assets/images/decorative.png";
import decorMail from "../../assets/images/decorative2.png";
import whyChooseIcon from "../../assets/images/tick.png";

function Hero({ openForm }) {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            Welcome to <sup>&reg;</sup> <span className="highlight">PolicyXpert</span><br />
            India’s <span className="highlight">Insurance</span> Advisory Platform<br />
            
          </h1>

          <p>
            Unbiased insurance guidance to help you understand your options
            and make confident decisions — without pressure to buy.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={openForm}>
              Talk to an Insurance Advisor
            </button>

            <div className="why-choose">
              <img src={whyChooseIcon} alt="Check icon" />
              <span>Understand My Options</span>
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
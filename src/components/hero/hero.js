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
            Welcome to <span className="highlight-red">Policy</span><span className="highlight-blue">Xpert</span> <sup>&reg;</sup><br />
            <span className="hero-subtitle">
              India’s <span className="highlight-red">Insurance</span> Advisory <br />
              Platform
            </span>
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
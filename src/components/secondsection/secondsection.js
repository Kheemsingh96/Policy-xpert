import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./secondsection.css";

import lifeIcon from "../../assets/images/life.png";
import healthIcon from "../../assets/images/health.png";
import autoIcon from "../../assets/images/auto.png";
import travelIcon from "../../assets/images/travel.png";
import tickIcon from "../../assets/images/tick2.png";

function Counter({ end, suffix, start }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!start) return;
    const duration = 2000; 
    const startTime = performance.now();
    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * end);
      if (ref.current) ref.current.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [end, suffix, start]);

  return <h3 ref={ref}>0{suffix}</h3>;
}

function Secondsection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="plans js-animate" ref={sectionRef}>
      <div className="plans-container">
        <div className="plans-left">
          
          <Link to="/life" className="plan-card card-blue">
            <div className="icon-circle blue">
              <img src={lifeIcon} alt="" />
            </div>
            <h4 className="ss-fade ss-delay-1">Life insurance</h4>
            <p className="ss-fade ss-delay-2">
             Financial protection for your family’s long-term future
            </p>
          </Link>

          <Link to="/health" className="plan-card card-red">
            <div className="icon-circle red">
              <img src={healthIcon} alt="" />
            </div>
            <h4 className="ss-fade ss-delay-1">Health insurance</h4>
            <p className="ss-fade ss-delay-2">
                Coverage for hospitalization and medical emergencies
            </p>
          </Link>

          <Link to="/auto" className="plan-card card-red">
            <div className="icon-circle red">
              <img src={autoIcon} alt="" />
            </div>
            <h4 className="ss-fade ss-delay-1">Car insurance</h4>
            <p className="ss-fade ss-delay-2">
              Protection against accidents, theft, and damage
            </p>
          </Link>

          <a href="/travel-insurance.html" className="plan-card card-blue">
            <div className="icon-circle blue">
              <img src={travelIcon} alt="" />
            </div>
            <h4 className="ss-fade ss-delay-1">Travel insurance</h4>
            <p className="ss-fade ss-delay-2">
              Coverage for medical emergencies while traveling
            </p>
          </a>
        </div>

        <div className="plans-right">
          <h2 className="ss-fade ss-delay-1">
  Find the <span>Insurance</span> Plan That Truly <br />
  <span className="highlight">Fits</span> Your Life
</h2>

          <p className="ss-fade ss-delay-2">
            Everyone’s needs are different, and the right insurance should match them.
            Compare health, life, auto, and travel plans in one place...
          </p>
          <ul className="ss-fade ss-delay-3">
            <li><img src={tickIcon} alt="" /> Compare health, life, auto, and travel insurance in one place</li>
            <li><img src={tickIcon} alt="" /> Get plans tailored to your lifestyle and budget</li>
            <li><img src={tickIcon} alt="" /> Make informed decisions with simple, transparent options</li>
            <li><img src={tickIcon} alt="" /> Choose coverage confidently without confusion or delays</li>
          </ul>
        </div>
      </div>

      <div className="plans-stats ss-fade ss-delay-3">
        <div>
          <Counter end={220} suffix="%" start={isVisible} />
          <span>Growth Every Years</span>
        </div>
        <div>
          <Counter end={50} suffix="+" start={isVisible} />
          <span>Expert Support</span>
        </div>
        <div>
          <Counter end={500} suffix="+" start={isVisible} />
          <span>Monthly Customer</span>
        </div>
        <div>
          <Counter end={20} suffix="+" start={isVisible} />
          <span>Years Of Experience</span>
        </div>
      </div>
    </section>
  );
}

export default Secondsection;
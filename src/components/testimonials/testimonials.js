import React, { useState, useEffect, useRef } from "react";
import "./testimonials.css";

import StarIcon from "../../assets/images/star.png";
import LeftArrow from "../../assets/images/left.png";
import RightArrow from "../../assets/images/right.png";

import User1 from "../../assets/images/1.png";
import User2 from "../../assets/images/2.png";
import User3 from "../../assets/images/24px.png";

const testimonials = [
  {
    name: "Jordan Smith",
    text: "Our expert movers delivered excellent service. Their experience and professionalism stood out. He wasn’t pushy at all and finished everything quickly and properly.",
    image: User1,
  },
  {
    name: "Liam Johnson",
    text: "From beginning to end, the movers were incredibly professional and efficient. They handled all items with care, stayed on schedule, and made the entire process smooth and stress-free.",
    image: User2,
  },
  {
    name: "Emma Carter",
    text: "Our expert movers delivered excellent service. Their experience and professionalism stood out. He wasn’t pushy at all and finished everything quickly and properly.",
    image: User3,
  },
];

const Testimonials = () => {
  const [centerIndex, setCenterIndex] = useState(1);
  const sectionRef = useRef(null);
  const total = testimonials.length;

  const prev = () => {
    setCenterIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setCenterIndex((prev) => (prev + 1) % total);
  };

  const leftIndex = (centerIndex - 1 + total) % total;
  const rightIndex = (centerIndex + 1) % total;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        {/* Added ss-fade classes for animation */}
        <span className="subtitle ss-fade ss-delay-1">Client Testimonials</span>
        <h2 className="title ss-fade ss-delay-2">We Value What Our Customers Have to Say</h2>

        <div className="slider ss-fade ss-delay-3">
          <button className="nav left" onClick={prev}>
            <img src={LeftArrow} alt="Previous" />
          </button>

          <div className="cards">
            {testimonials.map((item, index) => {
              let position = "";
              if (index === leftIndex) position = "left";
              else if (index === centerIndex) position = "center";
              else if (index === rightIndex) position = "right";
              else return null;

              return (
                <div
                  key={index}
                  className={`testimonial-card ${position}`}
                >
                  <img className="avatar" src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>

                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={StarIcon} alt="star" />
                    ))}
                  </div>

                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>

          <button className="nav right" onClick={next}>
            <img src={RightArrow} alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
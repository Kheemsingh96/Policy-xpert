import React, { useState, useEffect } from "react";
import axios from "axios";
import "./testimonials.css";

import StarIcon from "../../assets/images/star.png";
import LeftArrow from "../../assets/images/left.png";
import RightArrow from "../../assets/images/right.png";

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials");
        if (res.data && res.data.length > 0) {
          setItems(res.data);
          setCenterIndex(0);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const total = items.length;

  const prev = () => {
    if (total > 1) setCenterIndex((p) => (p - 1 + total) % total);
  };

  const next = () => {
    if (total > 1) setCenterIndex((p) => (p + 1) % total);
  };

  if (total === 0) return null;

  const leftIndex = (centerIndex - 1 + total) % total;
  const rightIndex = (centerIndex + 1) % total;

  const displayItems = [
    { ...items[leftIndex], pos: "left" },
    { ...items[centerIndex], pos: "center" },
    { ...items[rightIndex], pos: "right" }
  ];

  return (
    <section className="testimonials is-visible">
      <div className="testimonials-container">
        <span className="subtitle ss-fade ss-delay-1">Client Testimonials</span>
        <h2 className="title ss-fade ss-delay-2">We Value What Our Customers Have to Say</h2>

        <div className="slider ss-fade ss-delay-3">
          <button className="nav left" onClick={prev}>
            <img src={LeftArrow} alt="Previous" />
          </button>

          <div className="cards">
            {displayItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className={`testimonial-card ${item.pos}`}>
                <img className="avatar" src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={StarIcon} alt="star" />
                  ))}
                </div>
                <p>{item.text}</p>
              </div>
            ))}
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
import React, { useEffect, useState } from "react";

import "./Card.css";

const Card = ({ title }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(Math.floor(Math.random() * 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`card card--${title.toLowerCase()}`}>
      <h3 className="card__header">{title}</h3>
      <h2 className="card__amount">{number}</h2>
      <a href={`/${title.toLowerCase()}`} className="card__link">
        <p>View List &gt;&gt;</p>
      </a>
    </div>
  );
};

export default Card;

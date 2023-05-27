import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Card.css";
import { API_URL } from "../constants";

const Card = ({ title }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "GET",
        url: API_URL + title.toLowerCase(),
      })
        .then((res) => {
          setNumber(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
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

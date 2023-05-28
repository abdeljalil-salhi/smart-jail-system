import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Card.css";
import { API_URL } from "../constants";
import Modal from "./Modal";

const Card = ({ title }) => {
  const [number, setNumber] = useState(0);
  const [first, setFirst] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "GET",
        url: API_URL + title.toLowerCase(),
      })
        .then((res) => {
          if (title.toLowerCase() === "alarms") {
            if (res.data.length > 0) setShowModal(true);
            else setShowModal(false);
          }
          setElements(res.data);
          setNumber(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
      if (first) setFirst(false);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`card card--${title.toLowerCase()}`}>
      <h3 className="card__header">{title}</h3>
      <h2 className="card__amount">{!first ? number : "-"}</h2>
      <a href={`/${title.toLowerCase()}`} className="card__link">
        <p>View List &gt;&gt;</p>
      </a>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        elements={elements}
      />
    </div>
  );
};

export default Card;

import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../constants";

const Prisoners = () => {
  const [prisoners, setPrisoners] = useState([]);

  useEffect(() => {
    document.title = "Smart Jail System 1.0.0 - Prisoners";
    const fetchPrisoners = async () => {
      await axios({
        method: "GET",
        url: `${API_URL}prisoners/`,
      })
        .then((res) => {
          setPrisoners(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPrisoners();
    const interval = setInterval(() => {
      fetchPrisoners();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>Smart Jail System 1.0.0 - Prisoners</h1>
      <div className="flex">
        <div className="elements">
          {prisoners.map((prisoner, index) => (
            <div className="element" key={index}>
              <h3>{prisoner.prisonerID}</h3>
              <p>
                {prisoner.name} - {prisoner.age}
              </p>
              <p>Cell ID: {prisoner.cellID}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Prisoners;

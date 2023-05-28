import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL, REFRESH_INTERVAL } from "../constants";

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
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>Smart Jail System 1.0.0 - Prisoners</h1>
      <div className="flex">
        <div className="elements">
          {prisoners.map((prisoner, index) => (
            <div className="element" key={index}>
              <p>
                <b>Prisoner ID:</b> {prisoner.prisonerID}
              </p>
              <p>
                <b>Name/Age:</b> {prisoner.name} - {prisoner.age}
              </p>
              <p>
                <b>Time:</b> {new Date(prisoner.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Cell ID:</b> {prisoner.cellID}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Prisoners;

import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL, REFRESH_INTERVAL } from "../constants";

const Prisoners = () => {
  const [prisoners, setPrisoners] = useState([]);
  const [doorsClosed, setDoorsClosed] = useState(true);

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
    const fetchDoors = async () => {
      await axios({
        method: "GET",
        url: `${API_URL}doors/`,
      })
        .then((res) => {
          setDoorsClosed(res.data[0].isClosed);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPrisoners();
    fetchDoors();
    const interval = setInterval(() => {
      fetchPrisoners();
      fetchDoors();
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const logout = (e) => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div className="flex__space">
        <a href="/">
          <h1>Smart Jail System 1.0.0 - Prisoners</h1>
        </a>
        <div className="infos">
          {doorsClosed ? (
            <p className="info--closed">
              <b>Doors</b> <i className="fa-solid fa-circle"></i>
            </p>
          ) : (
            <p className="info--open">
              <b>Doors:</b> <i className="fa-solid fa-circle"></i>
            </p>
          )}
          <p className="logout" onClick={logout}>
            Log Out
          </p>
        </div>
      </div>
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

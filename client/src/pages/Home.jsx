import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card";
import { API_URL, REFRESH_INTERVAL } from "../constants";

const Home = () => {
  const [doorsClosed, setDoorsClosed] = useState(true);

  useEffect(() => {
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
    fetchDoors();
    const interval = setInterval(() => {
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
          <h1>Smart Jail System 1.0.0</h1>
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
      <section className="cards">
        <Card title="Alarms" />
        <Card title="Prisoners" />
      </section>
    </>
  );
};

export default Home;

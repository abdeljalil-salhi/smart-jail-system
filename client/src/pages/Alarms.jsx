import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../constants";

const Alarms = () => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    document.title = "Smart Jail System 1.0.0 - Alarms";
    const fetchAlarms = async () => {
      await axios({
        method: "GET",
        url: `${API_URL}alarms/`,
      })
        .then((res) => {
          setAlarms(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAlarms();
    const interval = setInterval(() => {
      fetchAlarms();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>Smart Jail System 1.0.0 - Alarms</h1>
      <p>Alarms</p>
      {alarms.map((alarm, index) => (
        <div key={index}>
          <h3>{alarm.prisonerID}</h3>
          <p>{alarm.alarmType}</p>
          <p>{alarm.text}</p>
        </div>
      ))}
    </>
  );
};

export default Alarms;

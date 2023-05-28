import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL, REFRESH_INTERVAL } from "../constants";

const Alarms = () => {
  const [alarms, setAlarms] = useState([]);
  const [doorsClosed, setDoorsClosed] = useState(true);

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
    fetchAlarms();
    fetchDoors();
    const interval = setInterval(() => {
      fetchAlarms();
      fetchDoors();
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex__space">
        <h1>Smart Jail System 1.0.0 - Alarms</h1>
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
        </div>
      </div>
      <div className="flex">
        <div className="elements">
          {alarms.map((alarm, index) => (
            <div className="element" key={index}>
              <small>#{alarm._id}</small>
              <p>
                <b>Prisoner ID:</b> {alarm.prisonerID}
              </p>
              <p>
                <b>Type:</b> {alarm.alarmType}
              </p>
              <p>
                <b>Time:</b> {new Date(alarm.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Note:</b> {alarm.text}
              </p>
              <button
                onClick={async () =>
                  await axios({
                    method: "DELETE",
                    url: `${API_URL}alarms/${alarm._id}`,
                  })
                    .then((res) => {})
                    .catch((err) => {
                      console.log(err);
                    })
                }
              >
                Mark as read
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Alarms;

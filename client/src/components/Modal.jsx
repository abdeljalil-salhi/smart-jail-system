import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

import { API_URL } from "../constants";
import "./Modal.css";

const Modal = ({ showModal, setShowModal, elements }) => {
  const [alarm, setAlarm] = useState({});

  useEffect(() => {
    if (elements.length > 0) setAlarm(elements[0]);
  }, [elements]);

  const deleteAlarm = async () => {
    await axios({
      method: "DELETE",
      url: `${API_URL}alarms/${alarm._id}`,
    })
      .then((res) => {
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAlarms = async () => {
    await axios({
      method: "DELETE",
      url: `${API_URL}alarms`,
    })
      .then((res) => {
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!showModal) return null;

  return createPortal(
    <div className="backdrop">
      <div className="modal">
        <div className="modal__content">
          <div className="modal__content__header">
            <span>
              <span>Alarm</span>
              <small>#{alarm._id}</small>
            </span>
            <span className="modal__content__header__goto">
              <a href="/alarms">Go to alarms &gt;&gt;</a>
            </span>
          </div>
          <div className="modal__content__body">
            {alarm && (
              <>
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
              </>
            )}
          </div>
          <div className="modal__content__footer">
            <button className="modal__button" onClick={deleteAlarm}>
              Mark as read
            </button>
            <button className="modal__button__all" onClick={deleteAlarms}>
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

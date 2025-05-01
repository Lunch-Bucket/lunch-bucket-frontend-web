import React from 'react';
import './ConfirmPopup.css'; 

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popupConfirm-overlay">
      <div className="popupConfirm-box">
        <p>{message}</p>
        <div className="popupConfirm-buttons">
          <button className="btnConfirm confirm" onClick={onConfirm}>Yes</button>
          <button className="btnConfirm cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;

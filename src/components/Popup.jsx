import React, {useEffect} from 'react';
import './PopupStyles.css';

const Popup = ({ type, message, onClose }) => {
  const popupClassName = type === 'error' ? 'popup-error' : 'popup-success';

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      // window.location.reload(); 
    }, 7000); 

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`popup ${popupClassName}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;


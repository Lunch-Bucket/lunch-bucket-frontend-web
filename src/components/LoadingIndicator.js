import React from "react";
import './LoadingStyles.css';


export default function LoadingIndicator({showText}) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{showText}</p>
      </div>
    );
  }
  
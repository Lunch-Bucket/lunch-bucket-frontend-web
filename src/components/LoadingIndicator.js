import React from "react";
import './LoadingStyles.css';


export default function LoadingIndicator() {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
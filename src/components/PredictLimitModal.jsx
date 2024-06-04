import React, { useState } from 'react';
import { predictLimits, predictMenu } from '../services/settingservice';
import './PredictLimitModalStyles.css'



function PredictLimitModal({ onClose, type }) {

  const [formData, setFormData] = useState({
    day:'',
    holiday: 'Yes',
    weather: 'Cloudy',
    temperature: 0,
    meal: 'Lunch',
  });
  const weatherOptions = ['Partly Cloudy', 'Scattered Showers', 'Scattered Thunderstorms', 'Mostly Sunny', 'Other'];
  const mealOptions = ['Lunch', 'Dinner', 'Other'];
  const dayOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'limits') {
        const response = await predictLimits(formData);
        console.log('Prediction response:', response);}
      else if (type === 'menu') {
          const response = await predictMenu(formData);
          console.log('Prediction response (menu):', response);
      }
      onClose(); 
    } catch (error) {
      console.error("Error predicting :", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Predict Limit</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Day:
            <select name="Day" value={formData.day} onChange={handleChange} required>
            {dayOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label><br/>
          <label>
            Holiday:
            <select name="holiday" value={formData.holiday} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label><br/>
          <label>
            Weather:
            <select name="weather" value={formData.weather} onChange={handleChange} required>
              {weatherOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label><br/>
            Temperature:
            <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required />
          </label><br/>
          <label>
            Meal:
            <select name="meal" value={formData.meal} onChange={handleChange} required>
            {mealOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label><br/><br/>
          <button type="submit">Predict</button>
        </form>
      </div>
    </div>
  );
}

export default PredictLimitModal;

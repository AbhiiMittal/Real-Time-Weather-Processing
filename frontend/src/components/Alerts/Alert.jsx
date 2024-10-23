import React, { useState, useEffect } from 'react';
import './Alert.css';
import { useSelector } from 'react-redux';

export default function Alert() {
  
  const {currentUser} = useSelector((state) => state.user);


  const [alertType, setAlertType] = useState('temperature');
  const [temperatureThreshold, setTemperatureThreshold] = useState('');
  const [days, setDays] = useState('');
  const [temperatureCondition, setTemperatureCondition] = useState('above');
  const [weatherCondition, setWeatherCondition] = useState('rain');
  const [alerts, setAlerts] = useState([]);
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    let alertData;
    if (alertType === 'temperature') {
      alertData = {
        city : selectedCity,
        userId : currentUser[0],
        alertId : Math.floor(Math.random() * 1000),
        type: 'temperature',
        condition: temperatureCondition,
        threshold: parseFloat(temperatureThreshold),
        days: parseInt(days)
      };
    } else {
      alertData = {
        city : selectedCity,
        userId : currentUser[0],
        alertId : Math.floor(Math.random() * 1000),
        type: 'weather',
        condition: weatherCondition
      };
    }
    // console.log(alertData)
    const res = await fetch('http://localhost:3000/api/setAlert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({alertData : alertData})
    })
    const data = await res.json();
    console.log(data);
    setAlerts([data]);
    // console.log(alerts);


    // Reset form
    setAlertType('temperature');
    setTemperatureThreshold('');
    setDays('');
    setTemperatureCondition('above');
    setWeatherCondition('rain');
  };
  useEffect(()=>{
    handleGetCities();
  },[]);

  const handleGetCities = async()=>{
    try{
      const res = await fetch(`http://localhost:3000/api/cities/${currentUser[0]}`);
      const data = await res.json();
      const cityNames = data.map((element) => element.name);
      setCities(cityNames);
      setSelectedCity(cityNames[0]);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    handleGetAlerts();
  }, [alerts.length]);  // Use alerts.length as a dependency to track the number of alerts
  
  const handleGetAlerts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/getAlert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser[0] }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch alerts");
      }
  
      const data = await res.json();
      setAlerts((prevAlerts) => {
        // Only update alerts if the new data is different (to avoid unnecessary re-renders)
        if (JSON.stringify(prevAlerts) !== JSON.stringify(data)) {
          return data;  // Update alerts
        }
        return prevAlerts;  // Do nothing if alerts are the same
      });
    } catch (error) {
      console.error(error);
    }
  };
  


  const handleDelete = async(id) => {
    const res = await fetch(`http://localhost:3000/api/deleteAlert/${id}/${currentUser[0]}`,{
      method : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json();
    alert(`${data.message}`);
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="alert-container">
      <h2 className="alert-title">Weather Alerts</h2>
      <div className="alert-content">
        <div className="alert-form-container">
          <h3 className="alert-subtitle">{'Create New Alert'}</h3>
          <form onSubmit={handleSubmit} className="alert-form">
            <div className="form-group">
              <label htmlFor="alertType">Alert Type</label>
              <select
                id="alertType"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
              >
                <option value="temperature">Temperature</option>
                <option value="weather">Weather Condition</option>
              </select>
            </div>

            {alertType === 'temperature' ? (
              <>
                <div className="form-group">
                  <label htmlFor="temperatureCondition">Condition</label>
                  <select
                    id="temperatureCondition"
                    value={temperatureCondition}
                    onChange={(e) => setTemperatureCondition(e.target.value)}
                  >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="temperatureThreshold">Temperature (°C)</label>
                  <input
                    type="number"
                    id="temperatureThreshold"
                    value={temperatureThreshold}
                    onChange={(e) => setTemperatureThreshold(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="days">Consecutive Days</label>
                  <input
                    type="number"
                    id="days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="weatherCondition">Weather Condition</label>
                <select
                  id="weatherCondition"
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                >
                  <option value="rain">Rain</option>
                  <option value="thunderstorm">Thunderstorm</option>
                  <option value="snow">Snow</option>
                  <option value="fog">Fog</option>
                </select>
              </div>
              
            )}
            <div className="form-group">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  required
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
             <button type="submit" className="btn-primary">Set Alert</button>
          </form>
        </div>

        <div className="alert-list-container">
          <h3 className="alert-subtitle">Active Alerts</h3>
          {alerts.length === 0 ? (
            <p className="no-alerts">No active alerts. Create one to get started!</p>
          ) : (
            <ul className="alert-list">
              {alerts.map(alert => (
                <li key={alert.id} className="alert-item">
                  <div className="alert-info">
                    {alert.type === 'temperature' ? (
                      <span>
                        Temperature {alert.condition} {alert.threshold}°C for {alert.consecutiveDays} days in {alert.city}
                      </span>
                    ) : (
                      <span>Weather condition: {alert.condition} in {alert.city}</span>
                    )}
                  </div>
                  <div className="alert-actions">
                    <button onClick={() => handleDelete(alert.id)} className="btn btn-delete">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
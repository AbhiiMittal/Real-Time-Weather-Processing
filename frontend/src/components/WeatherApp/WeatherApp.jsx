import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import HistoricalTrend from '../historicalTrend';
import CurrentWeather from '../CurrentWeather';
import DailySummary from '../DailySummary';
import { useSelector } from 'react-redux';
import WeatherAlertCard from '../Alerts/AlertCard';
import WeatherChart from '../visualize';
import Forecast from '../Forecast';

export default function WeatherApp() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); // Track whether the temperature is in Celsius

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius); // Toggle between Celsius and Kelvin
  };

  const fetchCities = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/cities/${currentUser[0]}`);
      const data = await res.json();
      const cityNames = data.map((element) => element.name);
      setCities(cityNames);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeCity = async (deleteCity) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cities/${deleteCity}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser[0] }),
      });
      if (res.status === 200) {
        setCities((prevCities) => prevCities.filter((city) => city !== deleteCity));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [city, setCity] = useState('');
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: city, userId: currentUser[0] }),
      });
      if (res.status === 200) {
        setCities((prevCities) => [...prevCities, city]);
        setCity('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch cities when the component mounts
  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      setSelectedCity(cities[0]); // Set the first city as the default selected city
    }
  }, [cities]);

  const { currentUser } = useSelector((state) => state.user);

  if (!selectedCity) return <div>Loading...</div>;

  return (
    <div className="weather-app">
      <header className="header">
        <h1>Weather Processing App</h1>
        <div className="user-info">
          <button className="logout-button">Logout</button>

          <div className="temp-toggle">
            <p>Current Temperature Unit: {isCelsius ? 'Celsius' : 'Kelvin'}</p>
            <button onClick={toggleTemperatureUnit}>
              Toggle to {isCelsius ? 'Kelvin' : 'Celsius'}
            </button>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="add-city-form">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <button type="submit">Add City</button>
      </form>

      <div className="city-selector">
        {cities.map((city, index) => (
          <div key={index} className="city-button-container">
            <button
              className={city === selectedCity ? 'active' : ''}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
            <button className="remove-city" onClick={() => removeCity(city)}>
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Pass the isCelsius and toggleTemperatureUnit to the components */}
      <CurrentWeather selectedCity={selectedCity} isCelsius={isCelsius} />
      <DailySummary selectedCity={selectedCity} isCelsius={isCelsius} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
        <WeatherAlertCard />
      </div>
      <WeatherChart selectedCity={selectedCity} isCelsius={isCelsius} />
      <Forecast selectedCity={selectedCity} isCelsius={isCelsius} />
    </div>
  );
}

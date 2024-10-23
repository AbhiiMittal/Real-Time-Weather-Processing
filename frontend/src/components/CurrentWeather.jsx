import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CurrentWeather(props) {
  useEffect(() => {
    handleGetData();
  });
  const { isCelsius, selectedCity } = props;
  const [weather, setWeather] = useState('');
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [temp,setTemp] = useState('');
  const [feels_like, setFeels_like] = useState();
  const [dt, setDt] = useState();
  const [humidity, setHumidity] = useState();
  const [windSpeed, setWindSpeed] = useState();
  
  // console.log(selectedCity + "selectedCity"); 
  const handleGetData = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/currentData/${selectedCity}`,{
        method : 'GET',
      })
      if(res.status!==200) alert("error");
      const data = await res.json();
      console.log(data)
      setWeather(data.weather);
      setTemp(data.temp);
      setHumidity(data.humidity);
      setWindSpeed(data.wind_speed);
      setFeels_like(data.feels_like);
      setSunrise(data.sunrise);
      setSunset(data.sunset);
      setDt(data.dt);
    }catch(err){
      console.log(err);
    }
  };
  return (
    <div className="weather-display">
      <h2>{selectedCity} Weather</h2>
      <div className="weather-info" style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Left Column: Condition, Temp, Feels Like, Wind Speed */}
        <div className="left-column" style={{ width: '48%' }}>
          <p>Condition: {weather}</p>
          {!isCelsius ? (
            <p>Temperature: {temp}°K</p>
          ) : (
            <p>Temperature: {(temp - 273.15).toFixed(2)}°C</p>
          )}
          {!isCelsius ? (
            <p>Feels Like: {feels_like}°K</p>
          ) : (
            <p>Feels Like: {(feels_like - 273.15).toFixed(2)}°C</p>
          )}
          <p>Wind Speed: {windSpeed} m/s</p>
        </div>
        
        {/* Right Column: Humidity, Sunrise, Sunset, Last Updated */}
        <div className="right-column" style={{ width: '48%' }}>
          <p>Humidity: {humidity}%</p>
          <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString()}</p>
          <p>
            Last Updated: {new Date(dt * 1000).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );  
}

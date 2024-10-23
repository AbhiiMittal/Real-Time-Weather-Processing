import { useEffect, useState } from "react";

export default function DailySummary(props) {
  const { isCelsius, selectedCity } = props;

  const [avgTemp, setAvgTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [dominantCondition, setDominantCondition] = useState('');

  useEffect(() => {
    handleGetData();
  }, [selectedCity]); // Re-fetch data when the selectedCity changes

  const handleGetData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/summary/${selectedCity}`, {
        method: 'GET',
      });
      const data = await res.json();
      setAvgTemp(data.avg_temp);
      setMaxTemp(data.max_temp);
      setMinTemp(data.min_temp);
      setDominantCondition(data.dominant_weather);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div className="daily-summary">
      <h2>Daily Weather Summary</h2>
      {!isCelsius ? (
        <p>Average Temperature: {parseFloat(avgTemp).toFixed(2)}°K</p>
      ) : (
        <p>Average Temperature: {(avgTemp - 273.15).toFixed(2)}°C</p>
      )}
      {!isCelsius ? (
        <p>Maximum Temperature: {parseFloat(maxTemp).toFixed(2)}°K</p>
      ) : (
        <p>Maximum Temperature: {(maxTemp - 273.15).toFixed(2)}°C</p>
      )}
      {!isCelsius ? (
        <p>Minimum Temperature: {parseFloat(minTemp).toFixed(2)}°K</p>
      ) : (
        <p>Minimum Temperature: {(minTemp - 273.15).toFixed(2)}°C</p>
      )}
      <p>Dominant Weather Condition: {dominantCondition}</p>
    </div>
  );
}

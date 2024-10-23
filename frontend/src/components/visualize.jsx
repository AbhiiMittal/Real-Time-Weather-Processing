'use client'

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function WeatherChart(props) {
  const { selectedCity, isCelsius } = props;  // isCelsius passed from the main component
  const [chartData, setChartData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/sevenDay/${selectedCity}/`);
        const res2 = await fetch(`http://localhost:3000/api/getAllData/${selectedCity}/`);
        if (!res.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await res.json();
        const data2 = await res2.json();
        
        const formattedData = data.data.map(item => ({
          date: item.date,
          avgTemp: parseFloat((item.avgTemp - (isCelsius ? 273.15 : 0)).toFixed(2)),
          maxTemp: parseFloat((item.maxTemp - (isCelsius ? 273.15 : 0)).toFixed(2)),
          minTemp: parseFloat((item.minTemp - (isCelsius ? 273.15 : 0)).toFixed(2)),
        }));
        setChartData(formattedData);

        const formattedData2 = data2.map(item => ({
          date: new Date(item.dt * 1000).toISOString().split('T')[0],
          temp: parseFloat((item.temp - (isCelsius ? 273.15 : 0)).toFixed(2)),
        }));
        setTemp(formattedData2);

        const formattedData3 = data2.map(item => ({
          date: new Date(item.dt * 1000).toISOString().split('T')[0],
          humidity: item.humidity,
        }));
        setHumidity(formattedData3);

        const formattedData4 = data2.map(item => ({
          date: new Date(item.dt * 1000).toISOString().split('T')[0],
          windSpeed: item.wind_speed,
        }));
        setWindSpeed(formattedData4);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching weather data', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity, isCelsius]);  // Re-fetch data if the city or temperature unit changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const temperatureLabel = isCelsius ? 'Temperature (°C)' : 'Temperature (K)';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Weather Condition for {selectedCity}</h2>
      <p className="text-gray-600 mb-4">Temperature data for available dates</p>
      
      {/* First Row: Temperature Charts */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        {/* First Chart: Average, Max, and Min Temperature */}
        <div style={{ width: '48%' }}>
          <h3 className="text-xl font-bold mb-2">Chart 1: Average, Max, and Min Temperature</h3>
          <LineChart data={chartData} width={525} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              label={{ value: temperatureLabel, angle: -90, position: 'insideLeft' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgTemp" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              name="Average Temperature" 
            />
            <Line 
              type="monotone" 
              dataKey="maxTemp" 
              stroke="#82ca9d" 
              name="Max Temperature" 
            />
            <Line 
              type="monotone" 
              dataKey="minTemp" 
              stroke="#ff7300" 
              name="Min Temperature" 
            />
          </LineChart>
        </div>
  
        {/* Second Chart: Day-Wise Temperature Only */}
        <div style={{ width: '48%' }}>
          <h3 className="text-xl font-bold mb-2">Chart 2: Day-Wise Temperature Only</h3>
          <LineChart data={temp} width={525} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              label={{ value: temperatureLabel, angle: -90, position: 'insideLeft' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              name="Temperature" 
            />
          </LineChart>
        </div>
      </div>
  
      {/* Second Row: Humidity and Wind Speed Charts */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Third Chart: Humidity */}
        <div style={{ width: '48%' }}>
          <h3 className="text-xl font-bold mb-2">Chart 3: Humidity</h3>
          <LineChart data={humidity} width={525} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="humidity" 
              stroke="#00c49f" 
              name="Humidity" 
            />
          </LineChart>
        </div>
  
        {/* Fourth Chart: Wind Speed */}
        <div style={{ width: '48%' }}>
          <h3 className="text-xl font-bold mb-2">Chart 4: Wind Speed</h3>
          <LineChart data={windSpeed} width={525} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              label={{ value: 'Wind Speed (m/s)', angle: -90, position: 'insideLeft' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="windSpeed" 
              stroke="#ffbb28" 
              name="Wind Speed" 
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

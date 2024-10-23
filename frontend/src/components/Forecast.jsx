'use client'

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Forecast(props) {
  const { selectedCity, isCelsius } = props;  // isCelsius is now passed as a prop from the main component
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/forecast/${selectedCity}/`);
        if (!res.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await res.json();
        const formattedData = data.map(item => ({
          date: new Date(item.dt * 1000).toISOString().split('T')[0],
          tempC: parseFloat((item.temp - 273.15).toFixed(2)),   // Temp in Celsius
          maxTempC: parseFloat((item.max_temp - 273.15).toFixed(2)),
          minTempC: parseFloat((item.min_temp - 273.15).toFixed(2)),
          tempK: parseFloat(item.temp.toFixed(2)),              // Temp in Kelvin
          maxTempK: parseFloat(item.max_temp.toFixed(2)),
          minTempK: parseFloat(item.min_temp.toFixed(2)),
        }));

        setChartData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching weather data', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const tempUnit = isCelsius ? 'C' : 'K';  // Determine the temperature unit dynamically

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Weather Forecast for {selectedCity}</h2>
      <p className="text-gray-600 mb-4">Temperature data for available dates</p>

      {/* First Row: Temperature Charts */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        {/* First Chart: Average, Max, and Min Temperature */}
        <div style={{ width: '100%' }}>
          <h3 className="text-xl font-bold mb-2">Chart: Temperature, Max, and Min Temperature</h3>
          <LineChart data={chartData} width={1200} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              label={{ value: `Temperature (°${tempUnit})`, angle: -90, position: 'insideLeft' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={isCelsius ? 'tempC' : 'tempK'}  // Dynamically switch based on isCelsius
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={`Temperature (°${tempUnit})`}
            />
            <Line
              type="monotone"
              dataKey={isCelsius ? 'maxTempC' : 'maxTempK'}
              stroke="#82ca9d"
              name={`Max Temperature (°${tempUnit})`}
            />
            <Line
              type="monotone"
              dataKey={isCelsius ? 'minTempC' : 'minTempK'}
              stroke="#ff7300"
              name={`Min Temperature (°${tempUnit})`}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

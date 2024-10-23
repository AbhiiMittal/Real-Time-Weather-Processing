import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function HistoricalTrend(props) {
    return(
        <div className="visualizations">
        <h2>Historical Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgTemp" stroke="#8884d8" name="Avg Temp" />
            <Line type="monotone" dataKey="maxTemp" stroke="#82ca9d" name="Max Temp" />
            <Line type="monotone" dataKey="minTemp" stroke="#ffc658" name="Min Temp" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
}
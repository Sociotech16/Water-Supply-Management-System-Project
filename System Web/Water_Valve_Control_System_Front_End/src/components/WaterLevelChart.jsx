import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";

const waterLevelData = [
  { time: '06:00', level: 45 },
  { time: '09:00', level: 55 },
  { time: '12:00', level: 60 },
  { time: '15:00', level: 52 },
  { time: '18:00', level: 48 },
];

export default function WaterLevelChart() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2">Water Level Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={waterLevelData}>
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="level" stroke="#0077ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

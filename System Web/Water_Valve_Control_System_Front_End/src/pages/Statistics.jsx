import { Card, CardContent } from "../components/Card";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const waterLevelData = [
  { time: '06:00', level: 45 },
  { time: '09:00', level: 55 },
  { time: '12:00', level: 60 },
  { time: '15:00', level: 52 },
  { time: '18:00', level: 48 },
];

export default function Statistics() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Water System Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Total Valves</p>
            <h2 className="text-xl font-semibold">4</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Total Valve Open Time Today</p>
            <h2 className="text-xl font-semibold">3h 45m</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Average Water Level</p>
            <h2 className="text-xl font-semibold">58%</h2>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
}

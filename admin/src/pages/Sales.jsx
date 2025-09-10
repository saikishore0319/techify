import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, Calendar, CalendarDays, CalendarCheck } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AdminDashboard({ token }) {
  const [stats, setStats] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL + "/api/order/sales";

  useEffect(() => {
    axios
      .post(url, {}, { headers: { token } })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Axios error:", err));
  }, []);

  if (!stats) return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  const cards = [
    { label: "Daily Sales", value: stats.daily, icon: <CalendarCheck className="text-blue-500" /> },
    { label: "Weekly Sales", value: stats.weekly, icon: <CalendarDays className="text-green-500" /> },
    { label: "Monthly Sales", value: stats.monthly, icon: <Calendar className="text-purple-500" /> },
    { label: "Overall Sales", value: stats.overall, icon: <TrendingUp className="text-pink-500" /> },
  ];

  // Prepare data for charts
  const chartData = [
    { name: "Daily", sales: stats.daily },
    { name: "Weekly", sales: stats.weekly },
    { name: "Monthly", sales: stats.monthly },
    { name: "Overall", sales: stats.overall },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Sales Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-3 text-3xl">{card.icon}</div>
            <p className="text-gray-500 font-medium">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹{card.value}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">📈 Sales Trend (Line)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">📊 Sales Breakdown (Bar)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, Calendar, CalendarDays, CalendarCheck } from "lucide-react";

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Sales Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  );
}

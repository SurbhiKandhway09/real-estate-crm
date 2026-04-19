import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const token = localStorage.getItem("token");

  const fetchLeads = async () => {
    const res = await axios.get(
      "https://real-estate-crm-backend-1onm.onrender.com/api/leads",
      { headers: { Authorization: token } }
    );
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 🎯 counts
  const total = leads.length;
  const newCount = leads.filter(l => l.status === "New").length;
  const contactedCount = leads.filter(l => l.status === "Contacted").length;
  const closedCount = leads.filter(l => l.status === "Closed").length;

  // 📊 chart data
  const data = [
    { name: "New", value: newCount },
    { name: "Contacted", value: contactedCount },
    { name: "Closed", value: closedCount }
  ];

  return (
    <div>
      <h2 className="mb-4">📊 Dashboard</h2>

      {/* Cards */}
      <div className="row mb-4">
        <div className="col">
          <div className="card p-3 text-center">Total: {total}</div>
        </div>
        <div className="col">
          <div className="card p-3 text-center">New: {newCount}</div>
        </div>
        <div className="col">
          <div className="card p-3 text-center">Contacted: {contactedCount}</div>
        </div>
        <div className="col">
          <div className="card p-3 text-center">Closed: {closedCount}</div>
        </div>
      </div>

      {/* 📊 Responsive Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" minPointSize={5} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
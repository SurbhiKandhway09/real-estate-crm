
import { useEffect, useState } from "react";
import api from "./api"; // 🔥 axios की जगह api use
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

  const fetchLeads = async () => {
    try {
      const res = await api.get("/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load data ❌");
    }
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

      {/* 🔢 Cards */}
      <div className="row mb-4">
        <div className="col">
          <div className="card p-3 text-center">
            <b>Total:</b> {total}
          </div>
        </div>

        <div className="col">
          <div className="card p-3 text-center">
            <b>New:</b> {newCount}
          </div>
        </div>

        <div className="col">
          <div className="card p-3 text-center">
            <b>Contacted:</b> {contactedCount}
          </div>
        </div>

        <div className="col">
          <div className="card p-3 text-center">
            <b>Closed:</b> {closedCount}
          </div>
        </div>
      </div>

      {/* 📊 Responsive Chart */}
      <div className="card p-3">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" minPointSize={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;


import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const [leads, setLeads] = useState([]);

  const token = localStorage.getItem("token");

  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/api/leads", {
      headers: { Authorization: token }
    });
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 📊 Stats
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const contacted = leads.filter(l => l.status === "Contacted").length;
  const closed = leads.filter(l => l.status === "Closed").length;

  const data = {
    labels: ["New", "Contacted", "Closed"],
    datasets: [
      {
        label: "Leads",
        data: [newLeads, contacted, closed]
      }
    ]
  };

  return (
    <div className="container mt-4">
      <h2>📊 Dashboard</h2>

      <div className="row mb-4">
        <div className="col">
          <div className="card p-3">Total Leads: {total}</div>
        </div>
        <div className="col">
          <div className="card p-3">New: {newLeads}</div>
        </div>
        <div className="col">
          <div className="card p-3">Contacted: {contacted}</div>
        </div>
        <div className="col">
          <div className="card p-3">Closed: {closed}</div>
        </div>
      </div>

      <Bar data={data} />
    </div>
  );
}

export default Dashboard;
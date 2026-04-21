import { useEffect, useState } from "react";
import api from "./api";

function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/api/leads");
      setLeads(res.data);
    } catch {
      console.log("Error fetching data");
    }
  };

  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const closed = leads.filter(l => l.status === "Closed").length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Leads</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-blue-500 text-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p>New Leads</p>
          <h2 className="text-2xl font-bold">{newLeads}</h2>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p>Closed Deals</p>
          <h2 className="text-2xl font-bold">{closed}</h2>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
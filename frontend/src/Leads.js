import { useState, useEffect } from "react";
import api from "./api";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [editLead, setEditLead] = useState(null);
  const [page, setPage] = useState(1);

  const isAdmin = localStorage.getItem("role") === "admin";
  const perPage = 5;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    preference: "",
    source: "",
    status: "New"
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/api/leads");
      setLeads(res.data);
    } catch {
      toast.error("Session expired ❌");
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      toast.error("Name & Phone required ❌");
      return;
    }

    try {
      await api.post("/api/leads/add", form);
      toast.success("Lead Added ✅");
      fetchLeads();

      setForm({
        name: "",
        phone: "",
        email: "",
        budget: "",
        preference: "",
        source: "",
        status: "New"
      });

    } catch {
      toast.error("Error adding lead ❌");
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await api.delete(`/api/leads/${id}`);
      toast.success("Deleted 🗑️");
      fetchLeads();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const updateLead = async () => {
    try {
      await api.put(`/api/leads/${editLead.id}`, editLead);
      toast.success("Updated ✏️");
      setEditLead(null);
      fetchLeads();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const filtered = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const chartData = [
    { name: "New", value: leads.filter(l => l.status === "New").length },
    { name: "Contacted", value: leads.filter(l => l.status === "Contacted").length },
    { name: "Closed", value: leads.filter(l => l.status === "Closed").length },
  ];

  const COLORS = ["#3b82f6", "#facc15", "#22c55e"];

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(leads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "Leads.xlsx");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* 🔍 SEARCH + EXPORT */}
      <div className="flex justify-between flex-wrap gap-3">
        <input
          placeholder="🔍 Search lead..."
          className="p-2 border rounded w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={exportExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Export Excel
        </button>
      </div>

      {/* 📊 CHART */}
      <div className="bg-white p-5 rounded-xl shadow flex justify-center items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={100}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ➕ FORM */}
      {isAdmin && (
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-4">Add Lead</h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
            {["name","phone","email","budget","preference"].map((f) => (
              <input
                key={f}
                name={f}
                value={form[f]}
                placeholder={f}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            ))}

            <select name="source" value={form.source} onChange={handleChange} className="p-2 border rounded">
              <option value="">Source</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Website</option>
            </select>

            <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
              <option>New</option>
              <option>Contacted</option>
              <option>Closed</option>
            </select>

            <button className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
              Add Lead
            </button>
          </form>
        </div>
      )}

      {/* 📋 TABLE */}
      <div className="bg-white p-5 rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full table-auto text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 w-1/4">Name</th>
              <th className="p-3 w-1/4">Phone</th>
              <th className="p-3 w-1/4">Status</th>
              <th className="p-3 w-1/4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((l) => (
              <tr key={l.id} className="border-b hover:bg-gray-50 transition">

                <td className="p-3">{l.name}</td>

                <td className="p-3 font-medium text-gray-700">
                  {l.phone}
                </td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-white text-xs
                    ${l.status === "New" && "bg-blue-500"}
                    ${l.status === "Contacted" && "bg-yellow-500"}
                    ${l.status === "Closed" && "bg-green-500"}
                  `}>
                    {l.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">
                  {isAdmin ? (
                    <>
                      <button
                        onClick={() => setEditLead(l)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteLead(l.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-xs">View only</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>

      {/* EDIT MODAL */}
      {editLead && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-80 space-y-3">

            <h2 className="font-bold">Edit Lead</h2>

            <input
              value={editLead.name}
              onChange={(e)=>setEditLead({...editLead,name:e.target.value})}
              className="p-2 border w-full"
            />

            <input
              value={editLead.phone}
              onChange={(e)=>setEditLead({...editLead,phone:e.target.value})}
              className="p-2 border w-full"
            />

            <select
              value={editLead.status}
              onChange={(e)=>setEditLead({...editLead,status:e.target.value})}
              className="p-2 border w-full"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Closed</option>
            </select>

            <div className="flex justify-between">
              <button onClick={updateLead} className="bg-green-500 text-white px-3 py-1 rounded">
                Save
              </button>

              <button onClick={()=>setEditLead(null)} className="bg-gray-400 px-3 py-1 rounded">
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Leads;
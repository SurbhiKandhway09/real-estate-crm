
import { useState, useEffect } from "react";
import api from "./api";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Layout from "./Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [showDashboard, setShowDashboard] = useState(false);

  const [lead, setLead] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    preference: "",
    source: "",
    status: "New"
  });

  const [leads, setLeads] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const fetchLeads = async () => {
    try {
      const res = await api.get("/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchLeads();
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lead.name || !lead.phone || !lead.source) {
      alert("Please fill all required fields ❗");
      return;
    }

    try {
      if (editId) {
        await api.put(`/api/leads/update/${editId}`, lead);
        alert("Lead updated ✅");
        setEditId(null);
      } else {
        await api.post(`/api/leads/add`, lead);
        alert("Lead added ✅");
      }

      setLead({
        name: "",
        phone: "",
        email: "",
        budget: "",
        preference: "",
        source: "",
        status: "New"
      });

      fetchLeads();
    } catch (err) {
      alert("Error ❌");
    }
  };

  const handleEdit = (l) => {
    setLead(l);
    setEditId(l.id);
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await api.delete(`/api/leads/delete/${id}`);
    fetchLeads();
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <Layout setShowDashboard={setShowDashboard}>

      {showDashboard ? (
        <Dashboard />
      ) : (
        <>
          {/* FORM */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-semibold mb-3">
              {editId ? "Edit Lead" : "Add Lead"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input className="w-full p-2 border rounded" name="name" value={lead.name} placeholder="Name" onChange={handleChange} />
              <input className="w-full p-2 border rounded" name="phone" value={lead.phone} placeholder="Phone" onChange={handleChange} />
              <input className="w-full p-2 border rounded" name="email" value={lead.email} placeholder="Email" onChange={handleChange} />
              <input className="w-full p-2 border rounded" name="budget" value={lead.budget} placeholder="Budget" onChange={handleChange} />
              <input className="w-full p-2 border rounded" name="preference" value={lead.preference} placeholder="Preference" onChange={handleChange} />

              <select className="w-full p-2 border rounded" name="source" value={lead.source} onChange={handleChange}>
                <option value="">Select Source</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
              </select>

              <select className="w-full p-2 border rounded" name="status" value={lead.status} onChange={handleChange}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Closed">Closed</option>
              </select>

              <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                {editId ? "Update Lead" : "Add Lead"}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Source</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="text-center border-t">
                  <td className="p-2">{l.name}</td>
                  <td className="p-2">{l.phone}</td>
                  <td className="p-2">{l.source}</td>
                  <td className="p-2">{l.status}</td>
                  <td className="p-2 space-x-2">
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded"
                      onClick={() => handleEdit(l)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteLead(l.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    </Layout>
  );
}

export default App;


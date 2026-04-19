import { useState, useEffect } from "react";
import api from "./api";   // 🔥 axios हटाकर api use
import Login from "./Login";
import Dashboard from "./Dashboard";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await api.get(`/api/leads`);
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (leadData) => {
    setLead(leadData);
    setEditId(leadData.id);
  };

  const deleteLead = async (id) => {
    await api.delete(`/api/leads/delete/${id}`);
    fetchLeads();
  };

  useEffect(() => {
    if (isLoggedIn) fetchLeads();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="container mt-4">
      
      {/* Buttons */}
      <button
        className="btn btn-danger mb-3"
        onClick={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      >
        Logout
      </button>

      <button
        className="btn btn-info mb-3 ms-2"
        onClick={() => setShowDashboard(!showDashboard)}
      >
        {showDashboard ? "Show CRM" : "Show Dashboard"}
      </button>

      {showDashboard ? (
        <Dashboard />
      ) : (
        <>
          <h2 className="text-center mb-4">🏡 Real Estate CRM</h2>

          <div className="card p-3 mb-4">
            <h4>{editId ? "Edit Lead" : "Add Lead"}</h4>

            <form onSubmit={handleSubmit} className="row g-2">
              <input className="form-control" name="name" value={lead.name} placeholder="Name" onChange={handleChange} />
              <input className="form-control" name="phone" value={lead.phone} placeholder="Phone" onChange={handleChange} />
              <input className="form-control" name="email" value={lead.email} placeholder="Email" onChange={handleChange} />
              <input className="form-control" name="budget" value={lead.budget} placeholder="Budget" onChange={handleChange} />
              <input className="form-control" name="preference" value={lead.preference} placeholder="Preference" onChange={handleChange} />

              <select className="form-select" name="source" value={lead.source} onChange={handleChange}>
                <option value="">Select Source</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
              </select>

              <select className="form-select" name="status" value={lead.status} onChange={handleChange}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Closed">Closed</option>
              </select>

              <button className="btn btn-primary mt-2">
                {editId ? "Update Lead" : "Add Lead"}
              </button>
            </form>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{l.phone}</td>
                  <td>{l.source}</td>
                  <td>{l.status}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(l)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteLead(l.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
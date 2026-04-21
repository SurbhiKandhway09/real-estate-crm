import { useEffect, useState } from "react";
import API from "./api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    preference: "",
    source: "Website",
    status: "New"
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ FETCH
  const fetchLeads = async () => {
    try {
      const res = await API.get("/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // ✅ ADD
  const handleAdd = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    try {
      await API.post("/api/leads", form);
      await fetchLeads(); // ensure updated data

      setForm({
        name: "",
        email: "",
        phone: "",
        budget: "",
        preference: "",
        source: "Website",
        status: "New"
      });
    } catch (err) {
      console.log("Add error:", err);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/leads/${id}`);
      await fetchLeads();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ✅ EDIT
  const handleEdit = (lead) => {
    setForm(lead);
    setEditId(lead.id);
  };

  // ✅ UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault(); // 🔥 IMPORTANT

    try {
      await API.put(`/api/leads/${editId}`, form);
      await fetchLeads();
      setEditId(null);

      setForm({
        name: "",
        email: "",
        phone: "",
        budget: "",
        preference: "",
        source: "Website",
        status: "New"
      });
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <div className="p-6">

      {/* FORM */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-4">
          {editId ? "Edit Lead" : "Add Lead"}
        </h2>

        <form
          onSubmit={editId ? handleUpdate : handleAdd}
          className="grid grid-cols-2 gap-4"
        >
          <input placeholder="Name" className="border p-2 rounded"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input placeholder="Phone" className="border p-2 rounded"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
          />

          <input placeholder="Email" className="border p-2 rounded"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input placeholder="Budget" className="border p-2 rounded"
            value={form.budget}
            onChange={(e)=>setForm({...form,budget:e.target.value})}
          />

          <input placeholder="Preference" className="border p-2 rounded"
            value={form.preference}
            onChange={(e)=>setForm({...form,preference:e.target.value})}
          />

          <select className="border p-2 rounded"
            value={form.source}
            onChange={(e)=>setForm({...form,source:e.target.value})}
          >
            <option>Website</option>
            <option>Facebook</option>
            <option>Call</option>
            <option>Referral</option>
          </select>

          <select className="border p-2 rounded"
            value={form.status}
            onChange={(e)=>setForm({...form,status:e.target.value})}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Closed</option>
          </select>

          <button className="col-span-2 bg-indigo-600 text-white py-2 rounded">
            {editId ? "Update Lead" : "Add Lead"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b font-bold">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b">
                <td>{l.name}</td>
                <td>{l.email}</td>
                <td>{l.phone}</td>
                <td>{l.budget}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-white text-sm ${
                    l.status==="New" ? "bg-blue-500"
                    : l.status==="Contacted" ? "bg-yellow-500"
                    : "bg-green-500"
                  }`}>
                    {l.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button onClick={()=>handleEdit(l)} className="text-blue-600">
                    Edit
                  </button>
                  <button onClick={()=>handleDelete(l.id)} className="text-red-600">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Leads;
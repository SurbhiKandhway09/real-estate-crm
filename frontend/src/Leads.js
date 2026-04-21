import { useEffect, useState } from "react";
import API from "./api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    status: "New"
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/api/leads");
      setLeads(res.data);
    } catch {
      // fallback dummy data
      setLeads([
        { id: 1, name: "Aman", phone: "9999999999", status: "New" },
        { id: 2, name: "Surbhi", phone: "6206697396", status: "New" },
        { id: 3, name: "Shikha", phone: "9123485595", status: "Closed" },
        { id: 4, name: "Sujeet", phone: "1144778855", status: "Contacted" }
      ]);
    }
  };

  // ✅ ADD
  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) return;

    const newLead = {
      id: Date.now(),
      ...form
    };

    setLeads([...leads, newLead]);
    setForm({ name: "", phone: "", status: "New" });
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  // ✅ EDIT
  const handleEdit = (lead) => {
    setForm({
      name: lead.name,
      phone: lead.phone,
      status: lead.status
    });
    setEditId(lead.id);
  };

  // ✅ UPDATE
  const handleUpdate = (e) => {
    e.preventDefault();

    const updated = leads.map((l) =>
      l.id === editId ? { ...l, ...form } : l
    );

    setLeads(updated);
    setEditId(null);
    setForm({ name: "", phone: "", status: "New" });
  };

  return (
    <div className="p-6">

      {/* 🔥 ADD / EDIT FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-3">
          {editId ? "Edit Lead" : "Add Lead"}
        </h2>

        <form
          onSubmit={editId ? handleUpdate : handleAdd}
          className="grid grid-cols-3 gap-3"
        >
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Closed</option>
          </select>

          <button className="col-span-3 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            {editId ? "Update Lead" : "Add Lead"}
          </button>
        </form>
      </div>

      {/* 📊 TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b font-bold">
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b">
                <td>{l.name}</td>
                <td>{l.phone}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      l.status === "New"
                        ? "bg-blue-500"
                        : l.status === "Contacted"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {l.status}
                  </span>
                </td>

                {/* 🔥 ACTIONS FIXED */}
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(l)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(l.id)}
                    className="text-red-600"
                  >
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
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const role = localStorage.getItem("role");

  return (
    <div className="flex min-h-screen">

      <div className="w-64 bg-indigo-600 text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-5">CRM</h1>

          <Link to="/dashboard" className="block mb-2">Dashboard</Link>
          <Link to="/leads" className="block mb-2">Leads</Link>

          {role === "admin" && (
            <Link to="/admin" className="block">Admin Panel</Link>
          )}
        </div>

        <button onClick={logout} className="bg-red-500 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="flex-1 p-6 bg-gray-100">{children}</div>
    </div>
  );
}

export default Layout;
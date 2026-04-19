
function Layout({ children, setShowDashboard }) {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white p-5">
        <h2 className="text-xl font-bold mb-6">🏡 CRM</h2>

        <ul className="space-y-3">
          <li
            className="cursor-pointer hover:bg-indigo-500 p-2 rounded"
            onClick={() => setShowDashboard(false)}
          >
            📋 Leads
          </li>

          <li
            className="cursor-pointer hover:bg-indigo-500 p-2 rounded"
            onClick={() => setShowDashboard(true)}
          >
            📊 Dashboard
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">

        {/* Top Header */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Real Estate CRM</h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Layout;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Leads from "./Leads";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import AdminPanel from "./AdminPanel";

const isAuth = () => localStorage.getItem("token");

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          isAuth() ? <Layout><Dashboard /></Layout> : <Navigate to="/" />
        } />

        <Route path="/leads" element={
          isAuth() ? <Layout><Leads /></Layout> : <Navigate to="/" />
        } />

        <Route path="/admin" element={
          isAuth() && localStorage.getItem("role")==="admin"
            ? <Layout><AdminPanel /></Layout>
            : <Navigate to="/dashboard" />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
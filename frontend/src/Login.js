import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");

    } catch {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-600">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-3">Login</h2>

        <input placeholder="Email" className="p-2 border w-full mb-2"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input type="password" placeholder="Password" className="p-2 border w-full mb-2"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button className="bg-indigo-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
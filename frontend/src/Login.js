
import { useState } from "react";
import api from "./api";

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Fill all fields ❗");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch {
      alert("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">🏡 Real Estate CRM</h1>
        <p className="text-lg opacity-80 text-center">
          Manage your leads smarter, faster, and better.
        </p>
      </div>

      {/* RIGHT SIDE (Login Card) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">

          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2 cursor-pointer"
              >
                👁️
              </span>
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Extra */}
          <p className="text-sm text-center mt-4 text-gray-500">
            Forgot password? <span className="text-indigo-600 cursor-pointer">Reset</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;


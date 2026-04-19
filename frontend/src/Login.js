import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://real-estate-crm-backend-1onm.onrender.com/api/auth/login",
        form
      );

      // token store
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");
      setIsLoggedIn(true);
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
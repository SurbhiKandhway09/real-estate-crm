import axios from "axios";

const API = axios.create({
  baseURL: "https://real-estate-crm-backend-1onm.onrender.com",
});

// ✅ token attach properly
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // 🔥 important
  }

  return req;
});

export default API;
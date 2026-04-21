import axios from "axios";

const API = axios.create({
  baseURL: "https://real-estate-crm-backend-1onm.onrender.com"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;
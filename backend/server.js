const express = require("express");
const cors = require("cors");
const db = require("./config/db");

// Routes
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// 🔥 MIDDLEWARE (always first)
app.use(cors());
app.use(express.json());

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("CRM API Running 🚀");
});

// 🔥 SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
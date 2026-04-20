const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 IMPORTANT: require AFTER app init
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

// 🔥 mount routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
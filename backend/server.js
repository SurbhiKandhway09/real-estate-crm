const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS FIX (production + local)
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// ✅ IMPORTANT: Render port fix
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// 🔐 LOGIN (NO DATABASE - TEMP FIX)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // ✅ DEMO LOGIN
  if (email === "test@gmail.com" && password === "123456") {
    const token = jwt.sign(
      { id: 1, role: "admin" },
      "secret123",
      { expiresIn: "1d" }
    );

    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials ❌" });
});

module.exports = router;
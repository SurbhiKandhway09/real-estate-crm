const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// 🔐 LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length > 0) {
        const token = jwt.sign(
          { id: result[0].id },
          "secret123",
          { expiresIn: "1d" }
        );

        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials ❌" });
      }
    }
  );
});

module.exports = router; // 👈 ये लाइन जरूरी है
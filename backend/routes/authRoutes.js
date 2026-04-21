const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        const user = result[0];

        const token = jwt.sign(
          { id: user.id, role: user.role },
          "secret123",
          { expiresIn: "1d" }
        );

        res.json({ token, role: user.role });
      } else {
        res.status(401).json({ message: "Invalid credentials ❌" });
      }
    }
  );
});

module.exports = router;
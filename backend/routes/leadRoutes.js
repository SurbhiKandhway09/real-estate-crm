const express = require("express");
const router = express.Router();

// ❌ REMOVE THIS LINE
// const verifyToken = require("../middleware/auth");

// ✅ TEMP: NO AUTH (FOR DEMO)
router.get("/", (req, res) => {
  const dummyLeads = [
    { id: 1, name: "Aman", phone: "9999999999", status: "New" },
    { id: 2, name: "Surbhi", phone: "6206697396", status: "New" },
    { id: 3, name: "Shikha", phone: "9123485595", status: "Closed" },
    { id: 4, name: "Sujeet", phone: "1144778855", status: "Contacted" }
  ];

  res.json(dummyLeads);
});

module.exports = router;
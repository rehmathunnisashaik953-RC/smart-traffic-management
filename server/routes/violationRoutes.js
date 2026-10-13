const express = require("express");
const router = express.Router();
const Violation = require("../models/Violation");

// Add violation
router.post("/", async (req, res) => {
  try {
    const violation = new Violation(req.body);
    await violation.save();

    res.status(201).json({
      message: "Violation added successfully",
      violation
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all violations
router.get("/", async (req, res) => {
  try {
    const violations = await Violation.find().sort({ date: -1 });
    res.json(violations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
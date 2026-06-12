const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const TermController = require("../../controller/term/termController");

// Create
router.post("/create-term", protectAdmin, TermController.createTerm);

// Get All
router.get("/all-terms", protectAdmin, TermController.getAllTerms);

// Get Single
router.get("/term/:id", protectAdmin, TermController.getTermById);

// Update
router.put("/update-term/:id", protectAdmin, TermController.updateTerm);

// Delete
router.delete("/delete-term/:id", protectAdmin, TermController.deleteTerm);

module.exports = router;

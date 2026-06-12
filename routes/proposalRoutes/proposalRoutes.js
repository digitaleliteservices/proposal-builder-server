const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const ProposalController = require("../../controller/proposal/proposalController");

// Create
router.post(
  "/create-proposal",
  protectAdmin,
  ProposalController.createProposal,
);

// All
router.get("/all-proposals", protectAdmin, ProposalController.getAllProposals);

// Single
router.get("/proposal/:id", protectAdmin, ProposalController.getProposalById);

// Update
router.put(
  "/update-proposal/:id",
  protectAdmin,
  ProposalController.updateProposal,
);

// Status
router.put(
  "/update-status/:id",
  protectAdmin,
  ProposalController.updateProposalStatus,
);

// Delete
router.delete(
  "/delete-proposal/:id",
  protectAdmin,
  ProposalController.deleteProposal,
);

module.exports = router;

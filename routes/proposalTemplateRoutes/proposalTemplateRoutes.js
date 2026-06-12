const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const ProposalTemplateController = require("../../controller/proposalTemplateController/proposalTemplateController");

// Create
router.post(
  "/create-template",
  protectAdmin,
  ProposalTemplateController.createTemplate,
);

// Get All
router.get(
  "/all-templates",
  protectAdmin,
  ProposalTemplateController.getAllTemplates,
);

// Get By Id
router.get(
  "/template/:id",
  protectAdmin,
  ProposalTemplateController.getTemplateById,
);

// Update
router.put(
  "/update-template/:id",
  protectAdmin,
  ProposalTemplateController.updateTemplate,
);

// Delete
router.delete(
  "/delete-template/:id",
  protectAdmin,
  ProposalTemplateController.deleteTemplate,
);

module.exports = router;

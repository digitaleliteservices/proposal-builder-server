const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const SettingsController = require("../../controller/setting/settingsController");

// Create Settings
router.post(
  "/create-settings",
  protectAdmin,
  SettingsController.createSettings,
);

// Get Settings
router.get("/get-settings", protectAdmin, SettingsController.getSettings);

// Update Settings
router.put("/update-settings", protectAdmin, SettingsController.updateSettings);

module.exports = router;

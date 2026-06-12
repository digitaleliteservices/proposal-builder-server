const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const DashboardController = require("../../controller/dashboard/dashboardController");

router.get(
  "/dashboard-stats",
  protectAdmin,
  DashboardController.dashboardStats,
);

module.exports = router;

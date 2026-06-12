const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const ServiceController = require("../../controller/service/serviceController");

router.post("/create-service", protectAdmin, ServiceController.createService);

router.get("/all-services", protectAdmin, ServiceController.getAllServices);

router.get("/service/:id", protectAdmin, ServiceController.getServiceById);

router.put(
  "/update-service/:id",
  protectAdmin,
  ServiceController.updateService,
);

router.delete(
  "/delete-service/:id",
  protectAdmin,
  ServiceController.deleteService,
);

module.exports = router;

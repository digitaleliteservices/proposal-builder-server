const express = require("express");
const router = express.Router();

const protectAdmin = require("../../middleware/authMiddleware");

const PricingController = require("../../controller/pricing/pricingController");

router.post("/create-pricing", protectAdmin, PricingController.createPricing);

router.get("/all-pricing", protectAdmin, PricingController.getAllPricing);

router.get("/pricing/:id", protectAdmin, PricingController.getPricingById);

router.put(
  "/update-pricing/:id",
  protectAdmin,
  PricingController.updatePricing,
);

router.delete(
  "/delete-pricing/:id",
  protectAdmin,
  PricingController.deletePricing,
);
router.get(
  "/service/:serviceId",
  protectAdmin,
  PricingController.getPricingByServiceId,
);

module.exports = router;

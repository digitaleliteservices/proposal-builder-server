const Pricing = require("../../models/Pricing");
const Service = require("../../models/Service");

// Create Pricing
const createPricing = async (req, res) => {
  try {
    const {
      serviceId,
      basicPrice,
      growthPrice,
      premiumPrice,
      enterprisePrice,
      discountAllowed,
    } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service is required",
      });
    }

    const serviceExists = await Service.findById(serviceId);

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const existingPricing = await Pricing.findOne({ serviceId });

    if (existingPricing) {
      return res.status(400).json({
        success: false,
        message: "Pricing already exists for this service",
      });
    }

    const pricing = await Pricing.create({
      serviceId,
      basicPrice,
      growthPrice,
      premiumPrice,
      enterprisePrice,
      discountAllowed,
    });

    return res.status(201).json({
      success: true,
      message: "Pricing created successfully",
      pricing,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Pricing
const getAllPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find()
      .populate({
        path: "serviceId",
        select: "serviceName priceType",
        populate: {
          path: "categoryId",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      pricing,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Pricing By Id
const getPricingById = async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id).populate({
      path: "serviceId",
      select: "serviceName priceType",
      populate: {
        path: "categoryId",
        select: "name",
      },
    });

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing not found",
      });
    }

    return res.status(200).json({
      success: true,
      pricing,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Pricing
const updatePricing = async (req, res) => {
  try {
    const {
      basicPrice,
      growthPrice,
      premiumPrice,
      enterprisePrice,
      discountAllowed,
    } = req.body;

    const pricing = await Pricing.findById(req.params.id);

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing not found",
      });
    }

    pricing.basicPrice = basicPrice ?? pricing.basicPrice;
    pricing.growthPrice = growthPrice ?? pricing.growthPrice;
    pricing.premiumPrice = premiumPrice ?? pricing.premiumPrice;
    pricing.enterprisePrice = enterprisePrice ?? pricing.enterprisePrice;

    pricing.discountAllowed = discountAllowed ?? pricing.discountAllowed;

    await pricing.save();

    return res.status(200).json({
      success: true,
      message: "Pricing updated successfully",
      pricing,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Pricing
const deletePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing not found",
      });
    }

    await Pricing.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Pricing deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPricingByServiceId = async (req, res) => {
  try {
    const pricing = await Pricing.findOne({
      serviceId: req.params.serviceId,
    });

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing not found",
      });
    }

    return res.status(200).json({
      success: true,
      pricing,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createPricing,
  getAllPricing,
  getPricingById,
  updatePricing,
  deletePricing,
  getPricingByServiceId,
};

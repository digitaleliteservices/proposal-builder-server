const Service = require("../../models/Service");

// Create Service
const createService = async (req, res) => {
  try {
    const {
      categoryId,
      serviceName,
      description,
      inputType,
      options,
      priceType,
      active,
    } = req.body;

    if (!categoryId || !serviceName || !inputType) {
      return res.status(400).json({
        success: false,
        message: "Category, Service Name and Input Type are required",
      });
    }

    const existingService = await Service.findOne({
      serviceName: serviceName.trim(),
      categoryId,
    });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "Service already exists in this category",
      });
    }

    const service = await Service.create({
      categoryId,
      serviceName,
      description,
      inputType,
      options,
      priceType,
      active,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      services,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Service By ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "categoryId",
      "name",
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Service
const updateService = async (req, res) => {
  try {
    const {
      categoryId,
      serviceName,
      description,
      inputType,
      options,
      priceType,
      active,
    } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    service.categoryId = categoryId || service.categoryId;

    service.serviceName = serviceName || service.serviceName;

    service.description = description ?? service.description;

    service.inputType = inputType || service.inputType;

    service.priceType = priceType || service.priceType;
    service.options = options ?? service.options;

    service.active = active ?? service.active;
    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
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
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};

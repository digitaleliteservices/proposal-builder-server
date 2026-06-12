const ProposalTemplate = require("../../models/ProposalTemplate");

// Create Template
const createTemplate = async (req, res) => {
  try {
    const {
      templateName,
      coverTitle,
      coverSubtitle,
      aboutCompany,
      timelineContent,
      includeServices,
      includePricing,
      includeTimeline,
      includeTerms,
      selectedTerms,
      active,
    } = req.body;

    if (!templateName) {
      return res.status(400).json({
        success: false,
        message: "Template name is required",
      });
    }

    const existingTemplate = await ProposalTemplate.findOne({
      templateName: templateName.trim(),
    });

    if (existingTemplate) {
      return res.status(400).json({
        success: false,
        message: "Template already exists",
      });
    }

    const template = await ProposalTemplate.create({
      templateName,
      coverTitle,
      coverSubtitle,
      aboutCompany,
      timelineContent,
      includeServices,
      includePricing,
      includeTimeline,
      includeTerms,
      selectedTerms,
      active,
    });

    return res.status(201).json({
      success: true,
      message: "Template created successfully",
      template,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Templates
const getAllTemplates = async (req, res) => {
  try {
    const templates = await ProposalTemplate.find()
      //   .populate("selectedTerms", "title")
      .populate("selectedTerms")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      templates,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Template By ID
const getTemplateById = async (req, res) => {
  try {
    const template = await ProposalTemplate.findById(req.params.id).populate(
      "selectedTerms",
      "title content",
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      template,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Template
const updateTemplate = async (req, res) => {
  try {
    const {
      templateName,
      coverTitle,
      coverSubtitle,
      aboutCompany,
      timelineContent,
      includeServices,
      includePricing,
      includeTimeline,
      includeTerms,
      selectedTerms,
      active,
    } = req.body;

    const template = await ProposalTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    template.templateName = templateName || template.templateName;

    template.coverTitle = coverTitle ?? template.coverTitle;

    template.coverSubtitle = coverSubtitle ?? template.coverSubtitle;
    template.timelineContent = timelineContent ?? template.timelineContent;

    template.aboutCompany = aboutCompany ?? template.aboutCompany;

    template.includeServices = includeServices ?? template.includeServices;

    template.includePricing = includePricing ?? template.includePricing;

    template.includeTimeline = includeTimeline ?? template.includeTimeline;

    template.includeTerms = includeTerms ?? template.includeTerms;

    template.selectedTerms = selectedTerms ?? template.selectedTerms;

    template.active = active ?? template.active;

    await template.save();

    return res.status(200).json({
      success: true,
      message: "Template updated successfully",
      template,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Template
const deleteTemplate = async (req, res) => {
  try {
    const template = await ProposalTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    await ProposalTemplate.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Template deleted successfully",
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
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};

const Setting = require("../../models/Setting");

// Create Settings
const createSettings = async (req, res) => {
  try {
    const existingSettings = await Setting.findOne();

    if (existingSettings) {
      return res.status(400).json({
        success: false,
        message: "Settings already exist. Please update instead.",
      });
    }

    const settings = await Setting.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Settings created successfully",
      settings,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Settings
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne();

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Settings
const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Settings created successfully",
        settings,
      });
    }

    Object.assign(settings, req.body);

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
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
  createSettings,
  getSettings,
  updateSettings,
};

const Term = require("../../models/Term");

// Create Term
const createTerm = async (req, res) => {
  try {
    const { title, content, active } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const existingTerm = await Term.findOne({
      title: title.trim(),
    });

    if (existingTerm) {
      return res.status(400).json({
        success: false,
        message: "Term already exists",
      });
    }

    const term = await Term.create({
      title,
      content,
      active,
    });

    return res.status(201).json({
      success: true,
      message: "Term created successfully",
      term,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Terms
const getAllTerms = async (req, res) => {
  try {
    const terms = await Term.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      terms,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Term By ID
const getTermById = async (req, res) => {
  try {
    const term = await Term.findById(req.params.id);

    if (!term) {
      return res.status(404).json({
        success: false,
        message: "Term not found",
      });
    }

    return res.status(200).json({
      success: true,
      term,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Term
const updateTerm = async (req, res) => {
  try {
    const { title, content, active } = req.body;

    const term = await Term.findById(req.params.id);

    if (!term) {
      return res.status(404).json({
        success: false,
        message: "Term not found",
      });
    }

    term.title = title || term.title;
    term.content = content || term.content;
    term.active = active ?? term.active;

    await term.save();

    return res.status(200).json({
      success: true,
      message: "Term updated successfully",
      term,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Term
const deleteTerm = async (req, res) => {
  try {
    const term = await Term.findById(req.params.id);

    if (!term) {
      return res.status(404).json({
        success: false,
        message: "Term not found",
      });
    }

    await Term.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Term deleted successfully",
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
  createTerm,
  getAllTerms,
  getTermById,
  updateTerm,
  deleteTerm,
};

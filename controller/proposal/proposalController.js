const Proposal = require("../../models/Proposal");

const createProposal = async (req, res) => {
  try {
    const proposalCount = await Proposal.countDocuments();

    const proposalNumber = `DES-${new Date().getFullYear()}-${String(
      proposalCount + 1,
    ).padStart(4, "0")}`;

    const proposal = await Proposal.create({
      ...req.body,
      proposalNumber,
    });
    return res.status(201).json({
      success: true,
      message: "Proposal created successfully",
      proposal,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate("selectedTemplate", "templateName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      proposals,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate({
        path: "selectedTemplate",
        populate: {
          path: "selectedTerms",
        },
      })
      .populate("selectedServices.serviceId");
    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }
    console.log("proposal", proposal);

    return res.status(200).json({
      success: true,
      proposal,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    Object.assign(proposal, req.body);

    await proposal.save();

    return res.status(200).json({
      success: true,
      message: "Proposal updated successfully",
      proposal,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    proposal.status = status;

    await proposal.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      proposal,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    await Proposal.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Proposal deleted successfully",
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
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
  updateProposalStatus,
  deleteProposal,
};

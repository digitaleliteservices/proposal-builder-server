const Proposal = require("../../models/Proposal");

const dashboardStats = async (req, res) => {
  try {
    const totalProposals = await Proposal.countDocuments();

    const approvedProposals = await Proposal.countDocuments({
      status: "approved",
    });

    const pendingProposals = await Proposal.countDocuments({
      status: {
        $in: ["draft", "sent"],
      },
    });

    const recentProposals = await Proposal.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "proposalNumber clientName clientCompany finalAmount status createdAt",
      );

    const totalValue = await Proposal.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$finalAmount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalProposals,
      approvedProposals,
      pendingProposals,
      recentProposals,
      totalValue: totalValue[0]?.total || 0,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  dashboardStats,
};

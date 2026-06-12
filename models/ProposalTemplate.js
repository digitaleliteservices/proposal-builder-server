const mongoose = require("mongoose");

const proposalTemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
      trim: true,
    },

    coverTitle: {
      type: String,
      default: "",
    },

    coverSubtitle: {
      type: String,
      default: "",
    },

    aboutCompany: {
      type: String,
      default: "",
    },

    includeServices: {
      type: Boolean,
      default: true,
    },

    includePricing: {
      type: Boolean,
      default: true,
    },

    includeTimeline: {
      type: Boolean,
      default: true,
    },

    includeTerms: {
      type: Boolean,
      default: true,
    },

    selectedTerms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Term",
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },
    timelineContent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ProposalTemplate", proposalTemplateSchema);

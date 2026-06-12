const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    proposalNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // Client Details
    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    clientCompany: {
      type: String,
      default: "",
    },

    clientEmail: {
      type: String,
      default: "",
    },

    clientPhone: {
      type: String,
      default: "",
    },

    // Step 1
    industry: {
      type: String,
      required: true,
    },

    objectives: [
      {
        type: String,
      },
    ],

    businessStage: {
      type: String,
      enum: [
        "New Business",
        "Growing Business",
        "Established Business",
        "Corporate / Enterprise",
      ],
    },

    budgetLevel: {
      type: String,
      enum: ["Basic", "Growth", "Premium", "Enterprise"],
    },

    proposalType: {
      type: String,
      enum: [
        "Monthly Retainer",
        "One-Time Project",
        "Setup + Monthly",
        "Quarterly Campaign",
        "Annual Plan",
      ],
    },

    notes: {
      type: String,
      default: "",
    },

    // Template
    selectedTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProposalTemplate",
    },

    // Services
    selectedServices: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },

        serviceName: String,

        quantity: {
          type: Number,
          default: 1,
        },

        amount: {
          type: Number,
          default: 0,
        },

        inputValue: {
          type: String,
          default: "",
        },
      },
    ],

    // Pricing
    subtotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    gst: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      default: 0,
    },

    // Status
    status: {
      type: String,
      enum: ["draft", "sent", "approved", "rejected", "expired"],
      default: "draft",
    },

    proposalPdf: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Proposal", proposalSchema);

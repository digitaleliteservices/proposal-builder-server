const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    agencyName: String,

    logo: String,

    gstNumber: String,

    contactEmail: String,

    contactPhone: String,

    whatsappNumber: String,

    bankName: String,

    accountNumber: String,

    ifscCode: String,

    branchName: String,

    primaryColor: {
      type: String,
      default: "#22D3EE",
    },

    secondaryColor: {
      type: String,
      default: "#F97316",
    },
    address: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    emailSignature: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Setting", settingSchema);

const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
    },

    coverPage: {
      type: String,
      default: "",
    },

    aboutCompany: {
      type: String,
      default: "",
    },

    timeline: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Template", templateSchema);

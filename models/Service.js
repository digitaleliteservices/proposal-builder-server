const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    inputType: {
      type: String,
      enum: ["checkbox", "counter", "option-selector", "text-input"],
      required: true,
    },
    options: [
      {
        type: String,
        trim: true,
      },
    ],

    priceType: {
      type: String,
      enum: ["one-time", "monthly", "quarterly", "annual"],
      default: "one-time",
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

module.exports = mongoose.model("Service", serviceSchema);

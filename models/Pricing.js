const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      unique: true,
    },

    basicPrice: {
      type: Number,
      default: 0,
    },

    growthPrice: {
      type: Number,
      default: 0,
    },

    premiumPrice: {
      type: Number,
      default: 0,
    },

    enterprisePrice: {
      type: Number,
      default: 0,
    },

    discountAllowed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Pricing", pricingSchema);

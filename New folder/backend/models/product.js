const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
      unique: true,
    },
    libelle: {
      type: String,
      required: true,
      trim: true,
    },
    prix_ttc: {
      type: Number,
      required: false,
      unique: true,
    },
    en_stock: {
      type: Boolean,
      required: false,
      default: true,
    },
    is_gift: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

// models/Business.js
const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: String,
  location: String,
  loyaltyProgram: {
    points: { type: Number, default: 0 },
    offers: [{ type: String }],
  },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  category: String,
  industry: String,
});

module.exports = mongoose.model("Business", businessSchema);

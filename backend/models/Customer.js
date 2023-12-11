// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  points: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('Customer', customerSchema);

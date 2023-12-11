// controllers/businessController.js
const Business = require('../models/Business');
const Customer = require('../models/Customer');

exports.createBusiness = async (req, res) => {
  try {
    const admin = req.user._id;
    const { name, location, category, industry } = req.body;
    const newBusiness = await Business.create({ name, location ,admin, category, industry});
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new business' });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.recordTransaction = async (req, res) => {
  try {
    const { businessId, customerId, amount } = req.body;
    const business = await Business.findById(businessId);
    const customer = await Customer.findById(customerId);

    if (!business || !customer) {
      return res.status(404).json({ error: 'Business or customer not found' });
    }

    // Record transaction
    business.loyaltyProgram.points += amount;
    customer.points += amount;

    await business.save();
    await customer.save();

    res.status(200).json({ message: 'Transaction recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record the transaction' });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const { businessId, offer } = req.body;
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    // Add offer
    business.loyaltyProgram.offers.push(offer);

    await business.save();

    res.status(201).json({ message: 'Offer created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the offer' });
  }
};

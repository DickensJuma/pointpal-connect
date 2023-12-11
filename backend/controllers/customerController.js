// controllers/customerController.js
const Customer = require('../models/Customer');
const Business = require('../models/Business');

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newCustomer = await Customer.create({ name, email, password });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new customer' });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.recordTransaction = async (req, res) => {
  try {
    const { customerId, businessId, amount } = req.body;
    const customer = await Customer.findById(customerId);
    const business = await Business.findById(businessId);

    if (!customer || !business) {
      return res.status(404).json({ error: 'Customer or business not found' });
    }

    // Record transaction
    customer.points += amount;
    business.loyaltyProgram.points += amount;

    await customer.save();
    await business.save();

    res.status(200).json({ message: 'Transaction recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record the transaction' });
  }
};

exports.redeemOffer = async (req, res) => {
  try {
    const { customerId, offerId } = req.body;
    const customer = await Customer.findById(customerId);
    const business = await Business.findOne({ 'loyaltyProgram.offers': offerId });

    if (!customer || !business) {
      return res.status(404).json({ error: 'Customer or business not found' });
    }

    const offer = business.loyaltyProgram.offers.find((o) => o === offerId);

    // Check if customer has enough points
    if (customer.points < offer.points) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Redeem offer
    customer.points -= offer.points;

    // Apply offer logic (e.g., discount)
    // ...

    await customer.save();

    res.status(200).json({ message: 'Offer redeemed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

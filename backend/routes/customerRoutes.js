// routes/customerRoutes.js
const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

// Route to create a new customer
router.post('/', customerController.createCustomer);
// Route to get details of a specific customer
router.get('/:id', customerController.getCustomer);
// Route to record a transaction for a customer
router.post('/transaction', customerController.recordTransaction);
// Route to redeem an offer for a customer
router.post('/redeem', customerController.redeemOffer);

module.exports = router;

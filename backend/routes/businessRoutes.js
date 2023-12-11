// routes/businessRoutes.js
const express = require('express');
const businessController = require('../controllers/businessController');

const router = express.Router();

// Route to create a new business
router.post('/', businessController.createBusiness);
// Route to get details of a specific business
router.get('/:id', businessController.getBusiness);
// Route to record a transaction for a business
router.post('/transaction', businessController.recordTransaction);
// Route to create a new offer for a business
router.post('/offers', businessController.createOffer);

module.exports = router;

// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const dotenv = require('dotenv');
dotenv.config();


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user (replace with your actual authentication logic)
    const user = await Customer.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};


exports.signup = async (req, res) => {
    try {
        console.log("signup");
        const { email, password, name } = req.body;
    
        // Create a new user
        const newUser = await Customer.create({ email, password, name });
    
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new user' });
    }
    }


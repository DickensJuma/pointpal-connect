const { Router } = require('express');
const businessRoutes = require('./businessRoutes');
const customerRoutes = require('./customerRoutes');
const authRoutes = require('./authRoutes');


const router = Router();

router.use('/business', businessRoutes);
router.use('/customer', customerRoutes);
router.use('/auth', authRoutes);


module.exports = router;

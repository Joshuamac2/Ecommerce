const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

router.post('/', checkoutController.createCheckoutSession);

module.exports = router;

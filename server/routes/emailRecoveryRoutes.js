const express = require('express');
const router = express.Router();
const emailRecoveryController = require('../controllers/emailRecoveryController');

router.post('/send-recovery-email', emailRecoveryController.sendEmail);

module.exports = router;
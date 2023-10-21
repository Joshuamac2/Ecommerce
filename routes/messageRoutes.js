const express = require('express');
const messagesController = require('../controllers/messagesController');
const router = express.Router();

router.post('/', messagesController.sendMessage);

module.exports = router;

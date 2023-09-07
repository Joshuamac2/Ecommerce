require('dotenv').config();

const express = require('express')
var cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Import and use route modules
const checkoutRoutes = require('./routes/checkoutRoutes');
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/checkout', checkoutRoutes);
app.use('/api/send-message', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
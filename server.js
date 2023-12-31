require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const productsRoutes = require('./routes/productsRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/api', productsRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/send-message', messageRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
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
const registerUserRoutes = require('./routes/registerUserRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const jwtAuthRoutes = require("./routes/jwtAuthRoutes")
const adminDashboard = require("./routes/dashboardRoutes")
const emailRecoveryRoutes = require('./routes/emailRecoveryRoutes');

app.use('/api', productsRoutes);
app.use('/api', registerUserRoutes);
app.use('/api', adminUserRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/send-message', messageRoutes);
app.use("/api/auth", jwtAuthRoutes);
app.use("/api/admindashboard", adminDashboard);
app.use('/api', emailRecoveryRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

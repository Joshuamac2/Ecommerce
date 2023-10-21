const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(req, res) {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.send(JSON.stringify({
      url: session.url,
    }));
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createCheckoutSession,
};

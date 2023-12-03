const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(req, res) {
  const items = req.body.items;

  console.log('Received items:', items); 

  try {
    const lineItems = items.map((item) => ({
      price: item.api_key,
      quantity: item.quantity,
    }));

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
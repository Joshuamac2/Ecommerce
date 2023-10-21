const Sib = require('sib-api-v3-sdk');
const { TransactionalEmailsApi } = require('sib-api-v3-sdk');

// Initialize the TransactionalEmailApi instance
const tranEmailAPI = new TransactionalEmailsApi();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

async function sendMessage(req, res) {
  const { name, email, subject, message } = req.body;

  const sender = {
    email: 'joshuamacleod@live.com',
  };

  const receivers = [
    {
      email: email,
      name: name,
    },
  ];

  try {
    const response = await tranEmailAPI.sendTransacEmail({
      sender,
      to: receivers,
      subject: subject,
      textContent: message,
    });

    console.log('Email sent:', response);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  sendMessage,
};

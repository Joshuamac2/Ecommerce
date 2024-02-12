const Sib = require('sib-api-v3-sdk');
const { TransactionalEmailsApi } = require('sib-api-v3-sdk');
const tranEmailAPI = new TransactionalEmailsApi();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

async function sendEmail(req, res) {

  const { OTP, email } = req.body;

  const sender = {
    email: 'joshuamacleod@live.com',
  };

  const receiver = {
    email: email, 
  };

  const subject = 'Password Recovery';
  const textContent = `Your OTP is: ${OTP}`;

  try {
    const response = await tranEmailAPI.sendTransacEmail({
      sender,
      to: [receiver], 
      subject: subject,
      textContent: textContent,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  sendEmail,
};

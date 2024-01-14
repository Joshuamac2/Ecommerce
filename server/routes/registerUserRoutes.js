const router = require('express').Router();
const pool = require('../database/dbConfig');
const { getRegisteredUserDataById, moveUserToUsers, removeUserFromStaging } = require('../controllers/registerUserController');


router.get('/getRegisteredUserData', async (req, res) => {

  try {
    
    const userData = await pool.query('SELECT * FROM stagingtable');
    
    res.json(userData.rows);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/confirmRegisteredUser', async (req, res) => {

  const userId = req.body.id;

  try {

    const userData = await getRegisteredUserDataById(userId);

    await moveUserToUsers(userData);
    res.json({ success: true, message: 'User confirmed successfully.' });
  } catch (error) {
    console.error('Error confirming user:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/rejectRegisteredUser', async (req, res) => {

  const userId = req.body.id;

  try {

    const userData = await getRegisteredUserDataById(userId);

    await removeUserFromStaging(userId);
    res.json({ success: true, message: 'User confirmed successfully.' });
  } catch (error) {
    console.error('Error confirming user:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
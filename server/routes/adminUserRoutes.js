const router = require('express').Router();
const pool = require('../database/dbConfig');
const { getAdminUserDataById, removeAdminUserFromUsers } = require('../controllers/adminUserController');


router.get('/getAdminUserData', async (req, res) => {

  try {
    
    const userData = await pool.query('SELECT * FROM users');

    res.json(userData.rows);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/deleteAdminUser', async (req, res) => {
  
  const userId = req.body.admin_id;

  try {

    const userData = await getAdminUserDataById(userId);

    await removeAdminUserFromUsers(userId);
    res.json({ success: true, message: 'User confirmed successfully.' });
  } catch (error) {
    console.error('Error confirming user:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;

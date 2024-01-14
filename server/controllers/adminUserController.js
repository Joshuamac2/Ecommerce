const pool = require('../database/dbConfig');

const getAdminUserDataById = async (userId) => {
  try {

    const userData = await pool.query('SELECT * FROM users WHERE admin_id = $1', [userId]);

    return userData.rows[0];
  } catch (error) {
    console.error('Error fetching user data by ID:', error.message);
    throw new Error('Internal Server Error');
  }
};

const removeAdminUserFromUsers = async (userId) => {
  try {

    await pool.query('DELETE FROM users WHERE admin_id = $1', [userId]);
    
  } catch (error) {
    console.error('Error removing user from stagingtable:', error.message);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  getAdminUserDataById,
  removeAdminUserFromUsers,
};

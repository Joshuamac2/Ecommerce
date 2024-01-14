const pool = require('../database/dbConfig');

const getRegisteredUserDataById = async (userId) => {

  try {

    const userData = await pool.query('SELECT * FROM stagingtable WHERE id = $1', [userId]);

    return userData.rows[0];
  } catch (error) {
    console.error('Error fetching user data by ID:', error.message);
    throw new Error('Internal Server Error');
  }
};

const moveUserToUsers = async (userData) => {

  try {

    const { id, reg_email, reg_password, reg_username, registration_date } = userData;

    // I need to add sequence to the admin_id or when transfering from stagingtable -> users table 
    // There will be a conflic in postgres recognising the id.
    const result = await pool.query('SELECT nextval(\'users_admin_id_seq\') AS new_id');
    const newId = result.rows[0].new_id;

    await pool.query(
      'INSERT INTO users (admin_id, admin_email, admin_password, admin_registration_date, admin_status, admin_username) VALUES ($1, $2, $3, $4, $5, $6)',
      [newId, reg_email, reg_password, registration_date, 'Active', reg_username]
    );

    removeUserFromStaging(id);
  } catch (error) {
    console.error('Error moving user from stagingtable', error.message);
    throw new Error('Internal Server Error');
  }
};

const removeUserFromStaging = async (userId) => {

  try {
    
    await pool.query('DELETE FROM stagingtable WHERE id = $1', [userId]);
  } catch (error) {
    console.error('Error removing user from stagingtable:', error.message);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  getRegisteredUserDataById,
  moveUserToUsers,
  removeUserFromStaging,
};

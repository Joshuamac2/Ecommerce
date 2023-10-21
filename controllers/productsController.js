const pool = require('../database/dbConfig.js'); 

const getProducts = async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM products');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  } finally {
    client.release(); 
  }
};

module.exports = {
  getProducts,
};

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

const createProduct = async (req, res) => {
  const { title, description, price, image_url, available_quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (title, description, price, image_url, available_quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, price, image_url, available_quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
};

module.exports = {
  getProducts,
  createProduct,
};

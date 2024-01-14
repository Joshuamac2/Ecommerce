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

  const { title, description, price, image_url, available_quantity, api_key } = req.body;

  try {

    const result = await pool.query(
      'INSERT INTO products (title, description, price, image_url, available_quantity, api_key) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, price, image_url, available_quantity, api_key]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
};

const editProduct = async (req, res) => {

  const { product_id } = req.params; 
  const { title, description, price, image_url, available_quantity, api_key } = req.body;

  try {

    const result = await pool.query(
      'UPDATE products SET title = $1, description = $2, price = $3, image_url = $4, available_quantity = $5, api_key = $6 WHERE product_id = $7 RETURNING *',
      [title, description, price, image_url, available_quantity, api_key, product_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while updating the product.' });
  }
};

const updateProductQuantity = async (product_id, quantity) => {

  try {

    const result = await pool.query(
      'UPDATE products SET available_quantity = available_quantity - $1 WHERE product_id = $2 RETURNING *',
      [quantity, product_id]
    );

    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating product quantity:', error);
    throw new Error('An error occurred while updating product quantity');
  }
};

const deleteProduct = async (req, res) => {

  const { product_id } = req.params;

  try {

    const result = await pool.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [product_id]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error removing product:', error);
    res.status(500).json({ error: 'An error occurred while removing the product.' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  editProduct,
  updateProductQuantity,
  deleteProduct, 
};
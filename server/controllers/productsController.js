const pool = require("../database/dbConfig.js");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, po.pricing_option_id, po.name AS option_name, po.price AS option_price, po.api_key AS api_key, po.available_quantity AS available_quantity
      FROM products p
      LEFT JOIN pricing_options po ON p.product_id = po.product_id
    `);

    const products = result.rows.reduce((acc, row) => {
      const productId = row.product_id;
      if (!acc[productId]) {
        acc[productId] = {
          product_id: row.product_id,
          title: row.title,
          description: row.description,
          product_details: row.product_details,
          image_url: row.image_url,
          product_type: row.product_type,
          product_location: row.product_location,
          pricingOptions: [],
        };
      }
      if (
        row.option_name &&
        row.option_price &&
        row.api_key &&
        row.available_quantity
      ) {
        acc[productId].pricingOptions.push({
          pricing_option_id: row.pricing_option_id,
          name: row.option_name,
          price: row.option_price,
          api_key: row.api_key,
          available_quantity: row.available_quantity,
        });
      }
      return acc;
    }, {});

    const productList = Object.values(products);

    res.json(productList);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

const createProduct = async (req, res) => {
  const {
    title,
    description,
    product_details,
    image_url,
    product_type,
    product_location,
    pricingOptions,
  } = req.body;

  try {
    const imageUrlString = JSON.stringify(image_url);

    const productResult = await pool.query(
      "INSERT INTO products (title, description, product_details, image_url, product_type, product_location) VALUES ($1, $2, $3, $4, $5 6$) RETURNING product_id",
      [title, description, product_details, imageUrlString, product_type, product_location]
    );

    const productId = productResult.rows[0].product_id;

    for (const option of pricingOptions) {
      await pool.query(
        "INSERT INTO pricing_options (product_id, name, price, api_key, available_quantity) VALUES ($1, $2, $3, $4, $5)",
        [
          productId,
          option.name,
          option.price,
          option.api_key,
          option.available_quantity,
        ]
      );
    }

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });
  }
};

const editProduct = async (req, res) => {
  const { product_id } = req.params;
  const {
    title,
    description,
    product_details,
    image_url,
    product_type,
    product_location,
    pricingOptions,
  } = req.body;

  try {
    const result = await pool.query(
      "UPDATE products SET title = $1, description = $2, product_details = $3, image_url = $4, product_type = $5, product_location = $6 WHERE product_id = $7 RETURNING *",
      [
        title,
        description,
        product_details,
        image_url,
        product_type,
        product_location,
        product_id,
      ]
    );

    const existingOptions = await pool.query(
      "SELECT name FROM pricing_options WHERE product_id = $1",
      [product_id]
    );

    const existingOptionNames = existingOptions.rows.map((row) => row.name);
    const incomingOptionNames = pricingOptions.map((option) => option.name);

    const optionsToRemove = existingOptionNames.filter(
      (name) => !incomingOptionNames.includes(name)
    );

    for (const name of optionsToRemove) {
      await pool.query(
        "DELETE FROM pricing_options WHERE product_id = $1 AND name = $2",
        [product_id, name]
      );
    }

    if (pricingOptions && pricingOptions.length > 0) {
      for (const option of pricingOptions) {
        const price = parseFloat(option.price);
        const availableQuantity = parseInt(option.available_quantity);
        if (!isNaN(price)) {
          const existingOption = await pool.query(
            "SELECT * FROM pricing_options WHERE product_id = $1 AND name = $2",
            [product_id, option.name]
          );

          if (existingOption.rows.length > 0) {
            await pool.query(
              "UPDATE pricing_options SET price = $1, api_key = $2, available_quantity = $3 WHERE product_id = $4 AND name = $5",
              [
                price,
                option.api_key,
                availableQuantity,
                product_id,
                option.name,
              ]
            );
          } else {
            await pool.query(
              "INSERT INTO pricing_options (product_id, name, price, api_key, available_quantity) VALUES ($1, $2, $3, $4, $5)",
              [
                product_id,
                option.name,
                price,
                option.api_key,
                availableQuantity,
              ]
            );
          }
        } else {
          console.error("Invalid price value:", option.price);
        }
      }
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
};

const deleteProduct = async (req, res) => {
  const { product_id } = req.params;

  try {
    await pool.query("DELETE FROM pricing_options WHERE product_id = $1", [
      product_id,
    ]);

    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [product_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error removing product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the product." });
  }
};

module.exports = {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
};

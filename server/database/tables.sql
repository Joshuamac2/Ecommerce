-- create_tables.sql

-- Table one: products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    price NUMERIC(10, 2),
    image_url TEXT,
    available_quantity INTEGER,
    api_key VARCHAR(255),
    product_type VARCHAR(100)
);

-- Table two: stagingtable
CREATE TABLE stagingtable (
    id SERIAL PRIMARY KEY,
    reg_username VARCHAR(100),
    reg_email VARCHAR(255),
    reg_password VARCHAR(255),
    registration_date TIMESTAMP,
    reg_status VARCHAR(50)
);

-- Table three: users
CREATE TABLE users (
    admin_id SERIAL PRIMARY KEY,
    admin_email VARCHAR(255),
    admin_password VARCHAR(255),
    admin_registration_date TIMESTAMP,
    admin_status VARCHAR(50),
    admin_username VARCHAR(100)
);

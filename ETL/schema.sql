CREATE DATABASE productstest;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_id int,
  product_name VARCHAR(255),
  product_slogan VARCHAR(255),
  product_description VARCHAR(255),
  product_category VARCHAR(255),
  product_price int,
)
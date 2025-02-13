DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

\copy products;

DROP SCHEMA IF EXISTS productsdata;
CREATE SCHEMA productsdata;

DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price VARCHAR NOT NULL
);

DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name TEXT NOT NULL,
  sale_price VARCHAR NOT NULL,
  original_price VARCHAR NOT NULL,
  default_style BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL
);

DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  size TEXT NOT NULL,
  quantity INT NOT NULL
);

COPY product (id, name, slogan, description, category, default_price)
FROM 'C:\Users\Public\csv\product.csv'
DELIMITER ','
CSV HEADER;

COPY styles (id, product_id, name, sale_price, original_price, default_style)
FROM 'C:\Users\Public\csv\styles.csv'
DELIMITER ','
CSV HEADER;

COPY related (id, current_product_id, related_product_id)
FROM 'C:\Users\Public\csv\related.csv'
DELIMITER ','
CSV HEADER;

COPY features (id, product_id, feature, value)
FROM 'C:\Users\Public\csv\features.csv'
DELIMITER ','
CSV HEADER;

COPY photos (id, styleId, url, thumbnail_url)
FROM 'C:\Users\Public\csv\photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus (id, styleId, size, quantity)
FROM 'C:\Users\Public\csv\skus.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX productIdx ON product (id);

CREATE INDEX stylesIdx ON styles (product_id);

CREATE INDEX featuresIdx ON features (product_id);

CREATE INDEX relatedIdx ON related (current_product_id);

CREATE INDEX photosIdx ON photos (styleId);

CREATE INDEX skusIdx ON skus (styleId);
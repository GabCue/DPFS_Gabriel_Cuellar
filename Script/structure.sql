-- Crear base de datos
CREATE DATABASE IF NOT EXISTS boxshop_db;
USE boxshop_db;

-- Tabla: users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  ip_address VARCHAR(255),
  password VARCHAR(100),
  avatar VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: product_types
CREATE TABLE product_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Tabla: products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INT NOT NULL,
  available BOOLEAN NOT NULL,
  image VARCHAR(255),
  product_type_id INT NOT NULL,
  deletedAt DATETIME DEFAULT NULL, 
  FOREIGN KEY (product_type_id) REFERENCES product_types(id)
);

-- Tabla: categories
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Tabla: product_category (tabla intermedia)
CREATE TABLE productcategory (
  productId INT,
  categoryId INT,
  PRIMARY KEY (productId, categoryId),
  FOREIGN KEY (productId) REFERENCES products(id),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

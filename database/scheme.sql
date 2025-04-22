CREATE DATABASE devbook;
use devbook;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'regular') NOT NULL DEFAULT 'regular'
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    auteur VARCHAR(255) NOT NULL,
    category_id INT,
    read_status ENUM('à lire', 'en cours', 'lu') NOT NULL DEFAULT 'à lire',
    dispo_status ENUM('disponible', 'emprunté') DEFAULT 'disponible',
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE emprunts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    date_emprunt TIMESTAMP NOT NULL,
    date_retour DATE,
    date_limit DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
)

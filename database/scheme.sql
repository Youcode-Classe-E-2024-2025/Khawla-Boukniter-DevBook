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


INSERT INTO categories (name, description) VALUES
('Programmation', 'description de programmation'),
('Design', 'description de design'),
('machine learning', 'description de machine learning');

INSERT INTO users (username, email, password, role) VALUES
('khawla', 'khawla@example.com', 'password123', 'admin'),
('chaimaa', 'chaimaa@example.com', 'password123', 'regular'),
('user', 'user@example.com', 'password123', 'regular');

INSERT INTO books (titre, description, auteur, category_id, read_status, dispo_status) VALUES
('JavaScript', 'livre simple sur JS', 'auteurJS', 1, 'à lire', 'disponible'),
('UX UI', 'le design expliqué simple', 'auteurUXUI', 2, 'en cours', 'disponible'),
('ML pour débutants', 'très basique', 'auteurML', 3, 'lu', 'emprunté');

INSERT INTO emprunts (user_id, book_id, date_emprunt, date_limit, date_retour) VALUES
(2, 3, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), NULL),
(3, 1, NOW(), DATE_ADD(NOW(), INTEVRVAL 15 DAY), '2024-03-15');
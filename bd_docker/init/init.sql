CREATE DATABASE IF NOT EXISTS blog_api;

CREATE TABLE user_role (
    user BINARY(16),
    role INT,
    PRIMARY KEY (user, role),
    FOREIGN KEY (user) REFERENCES user(user_id),
    FOREIGN KEY (role) REFERENCES role(role_id)
);
CREATE TABLE comment (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_by_user_name VARCHAR(255),
    content VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post_post_id INT,
    user_user_id BINARY(16),
    FOREIGN KEY (post_post_id) REFERENCES post(post_id),
    FOREIGN KEY (user_user_id) REFERENCES user(user_id),
    FOREIGN KEY (comment_by_user_name) REFERENCES user(name)
);
CREATE TABLE post (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    content_line1 VARCHAR(255) NOT NULL,
    content_line2 VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    title VARCHAR(255) NOT NULL UNIQUE,
    category_category_id INT,
    user_user_id BINARY(16),
    FOREIGN KEY (category_category_id) REFERENCES category(category_id),
    FOREIGN KEY (user_user_id) REFERENCES user(user_id)
);
CREATE TABLE user (
    user_id BINARY(16) PRIMARY KEY,
    about VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    requiere_cambio_contrasena BOOLEAN DEFAULT FALSE
);
CREATE TABLE category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_description VARCHAR(255),
    category_title VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL
);
CREATE DATABASE IF NOT EXISTS blog_api;

-- Usar la base de datos
USE blog_api;

-- Tabla: user
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    about VARCHAR(255)
);

-- Tabla: role
CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

-- Tabla: user_role (relación muchos a muchos)
CREATE TABLE user_role (
    user INT,
    role INT,
    PRIMARY KEY (user, role),
    FOREIGN KEY (user) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role) REFERENCES role(role_id) ON DELETE CASCADE
);

-- Tabla: category
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_title VARCHAR(255) NOT NULL,
    category_description VARCHAR(255)
);

-- Tabla: post
CREATE TABLE post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content_line1 VARCHAR(255),
    content_line2 VARCHAR(255),
    image VARCHAR(255),
    date DATE DEFAULT CURRENT_DATE,
    category_category_id INT,
    user_user_id INT,
    FOREIGN KEY (category_category_id) REFERENCES category(category_id) ON DELETE SET NULL,
    FOREIGN KEY (user_user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Tabla: comment
CREATE TABLE comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    comment_by_user_id INT,
    comment_by_user_name VARCHAR(255),
    content VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    post_post_id INT,
    user_user_id INT,
    FOREIGN KEY (post_post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

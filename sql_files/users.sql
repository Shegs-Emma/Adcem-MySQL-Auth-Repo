USE adcemdb;

CREATE TABLE users
(
	id INT AUTO_INCREMENT PRIMARY KEY,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255) NOT NULL,
	userName VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	isAdmin BOOLEAN NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);
-- SLIDE-1
CREATE DATABASE purwadhika_student;
CREATE DATABASE purwadhika_branch;
CREATE DATABASE purwadhika_schedule;

SHOW DATABASES LIKE "%purwadhika%";

USE purwadhika_student;
CREATE TABLE students(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL
);

ALTER TABLE students ADD email VARCHAR(20) NOT NULL;
SELECT * FROM students;

ALTER TABLE students ADD COLUMN batch_code VARCHAR(45), ADD COLUMN phone_number INT, ADD COLUMN alternative_phone_number INT;

ALTER TABLE students CHANGE alternative_phone_number description VARCHAR(100);

ALTER TABLE students DROP COLUMN gender;

-- SLIDE-2
USE purwadhika_branch;
CREATE TABLE branch(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    branch_name VARCHAR(5) NOT NULL, 
    pic VARCHAR(20) NOT NULL, 
    address VARCHAR(255) NOT NULL,
    city VARCHAR(20) NOT NULL,
    province VARCHAR(20) NOT NULL
);

INSERT INTO branch (branch_name, pic, address, city, province) VALUES ("BSD", "Thomas", "GOP", "BSD", "Tangerang"), 
("JKT", "Budi", "MSIG", "Jaksel", "Jakarta");
SELECT * FROM branch;

UPDATE branch SET pic="Dono" WHERE id=1;

INSERT INTO branch (branch_name, pic, address, city, province) VALUES ("BALI", "Bli Tono", "Gianyar", "Gianyar", "Bali");

-- SLIDE-3
USE sakila;

SELECT actor_id, first_name, last_name FROM actor WHERE first_name LIKE "%Joe%";

SELECT address, district, city_id from address WHERE district IN ("California", "Alberta", "Mekka");

SELECT last_name, COUNT(*) as total FROM actor WHERE last_name LIKE "%Wood%";

SELECT customer_id, SUM(amount) as total_amount FROM payment GROUP BY customer_id HAVING total_amount > 20;

SELECT customer_id, SUM(amount) as total_amount FROM payment GROUP BY customer_id ORDER BY total_amount DESC LIMIT 3;

-- SLIDE-5
USE world;

SELECT * FROM country;
SELECT * FROM country ORDER BY population DESC LIMIT 1;

SELECT * FROM country ORDER BY population DESC LIMIT 1 OFFSET 0;

SELECT * FROM country ORDER BY population LIMIT 1;

SELECT * FROM country ORDER BY population ASC ;

SELECT continent, SUM(surfaceArea) as totalSurfaceArea, AVG(lifeExpectancy) as averageLife 
FROM country GROUP BY continent HAVING averageLife > 75;
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department VARCHAR(30) NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10) NULL,
  department_id INT,
  FOREIGN KEY (department_id) references department (id)
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) references role (id)
);

SELECT * from department;
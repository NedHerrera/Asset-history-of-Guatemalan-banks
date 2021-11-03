create database Bases2_ProyectoClase;
use Bases2_ProyectoClase;

CREATE TABLE IF NOT EXISTS banks (
    bank_id INT AUTO_INCREMENT PRIMARY KEY,
    bank_name VARCHAR(1000) NOT NULL
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS actives (
    active_id INT AUTO_INCREMENT PRIMARY KEY,
    active_month int NOT NULL,
    active_count int null,
    bank_id int,
    register_year int,
    FOREIGN KEY (bank_id) REFERENCES banks (bank_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS pasives (
    pasive_id INT AUTO_INCREMENT PRIMARY KEY,
    pasive_month int NOT NULL,
    pasive_count int null,
    bank_id int,
    register_year int,
    FOREIGN KEY (bank_id) REFERENCES banks (bank_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS patrimonios (
    patrimonio_id INT AUTO_INCREMENT PRIMARY KEY,
    patrimonio_month int NOT NULL,
    patrimonio_count int null,
    bank_id int,
    register_year int,
    FOREIGN KEY (bank_id) REFERENCES banks (bank_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(1000) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    firstname VARCHAR(1000) NOT NULL,
    lastname VARCHAR(1000) NOT NULL
)  ENGINE=INNODB;
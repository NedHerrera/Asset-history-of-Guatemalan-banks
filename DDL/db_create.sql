-- database create Bases2_ProyectoClase;
use Bases2_ProyectoClase;

CREATE TABLE IF NOT EXISTS bank (
    bank_id INT AUTO_INCREMENT PRIMARY KEY,
    bank_name VARCHAR(1000) NOT NULL
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS active (
    active_id INT AUTO_INCREMENT PRIMARY KEY,
    active_month int NOT NULL,
    active_count int null,
    bank_id int,
    FOREIGN KEY (bank_id) REFERENCES bank (bank_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS pasive (
    pasive_id INT AUTO_INCREMENT PRIMARY KEY,
    pasive_month int NOT NULL,
    pasive_count int null,
    bank_id int,
    FOREIGN KEY (bank_id) REFERENCES bank (bank_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS patrimonio (
    patrimonio_id INT AUTO_INCREMENT PRIMARY KEY,
    patrimonio_month int NOT NULL,
    patrimonio_count int null,
    bank_id int,
    FOREIGN KEY (bank_id) REFERENCES bank (bank_id)
)  ENGINE=INNODB;
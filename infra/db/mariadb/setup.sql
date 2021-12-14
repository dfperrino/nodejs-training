CREATE TABLE test.USER (
	ID INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	NAME varchar(100) NOT NULL,
	SURNAME varchar(100) NOT NULL,
	HEIGHT INTEGER,
	WEIGHT INTEGER,
	EMAIL varchar(100) NOT NULL,
	PRIMARY KEY (ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

INSERT INTO USER (NAME, SURNAME, EMAIL) values ('Ricardo', 'Vega', 'rvalonso@minsait.com');
INSERT INTO USER (NAME, SURNAME, EMAIL) values ('David', 'Fernández', 'dfperrino@minsait.com');
INSERT INTO USER (NAME, SURNAME, EMAIL) values ('Blanca', 'Lendoiro', 'blendoiro@minsait.com');
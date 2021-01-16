### Schema

CREATE DATABASE streaming;
USE streaming;

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE watchlist
(
	id int NOT NULL AUTO_INCREMENT,
	movie_title varchar(255) NOT NULL,
	platform varchar(255) NOT NULL

);



DROP DATABASE IF EXISTS signet;
CREATE DATABASE signet;

DROP TABLE IF EXISTS user_profile CASCADE;
DROP TABLE IF EXISTS book         CASCADE;
DROP TABLE IF EXISTS user_book    CASCADE;
DROP TABLE IF EXISTS author       CASCADE;
DROP TABLE IF EXISTS book_author  CASCADE;

TRUNCATE TABLE IF EXISTS user_profile, book, user_book, author, book_author RESTART IDENTITY;

CREATE TABLE user_profile (
  id                SERIAL,
  email             VARCHAR(64)     NOT NULL UNIQUE,
  username          VARCHAR(64),
  firstname         VARCHAR(64),
  lastname          VARCHAR(64),
  picture           VARCHAR(64),
  password          TEXT            NOT NULL,
  PRIMARY KEY       (id)
);

CREATE TABLE book (
  id                SERIAL,
  isbn              VARCHAR(64),
  title             VARCHAR(256)    NOT NULL,
  number_of_pages   INT             NOT NULL,
  publish_date      DATE,
  cover             VARCHAR(256),
  PRIMARY KEY       (id)
);

CREATE TABLE user_book (
    id              SERIAL,
    user_id         INT             NOT NULL,
    book_id         INT             NOT NULL,
    date_added      DATE            NOT NULL,
    user_status     INT             NOT NULL,
    user_position   INT,
    PRIMARY KEY     (id),
    FOREIGN KEY     (user_id)       REFERENCES user_profile(id),
    FOREIGN KEY     (book_id)       REFERENCES book(id)
);

CREATE TABLE author (
    id              SERIAL,
    name            VARCHAR(64),
    PRIMARY KEY     (id)
);

CREATE TABLE book_author (
    id              SERIAL,
    book_id         INT             NOT NULL,
    author_id       INT             NOT NULL,
    PRIMARY KEY     (id),
    FOREIGN KEY     (book_id)       REFERENCES book(id),
    FOREIGN KEY     (author_id)     REFERENCES author(id)
);
-- DROP DATABASE IF EXISTS bookr;
-- CREATE DATABASE bookr;

DROP TABLE IF EXISTS user_profile CASCADE;
DROP TABLE IF EXISTS book         CASCADE;
DROP TABLE IF EXISTS user_book    CASCADE;
DROP TABLE IF EXISTS author       CASCADE;
DROP TABLE IF EXISTS user_relationship CASCADE;
-- DROP TABLE IF EXISTS book_author  CASCADE;

TRUNCATE TABLE user_profile, book, user_book, author, user_relationship RESTART IDENTITY;

CREATE TABLE user_profile (
  id                SERIAL,
  email             VARCHAR(64)     NOT NULL UNIQUE,
  username          VARCHAR(64)     NOT NULL UNIQUE,
  firstname         VARCHAR(64)     NOT NULL,
  lastname          VARCHAR(64)     NOT NULL,
  picture           VARCHAR(64),
  password          TEXT            NOT NULL,
  PRIMARY KEY       (id)
);

CREATE TABLE author (
    id              SERIAL,
    name            VARCHAR(64)     NOT NULL,
    PRIMARY KEY     (id)
);

CREATE TABLE book (
  id                SERIAL,
  isbn              VARCHAR(64),
  title             VARCHAR(256)    NOT NULL,
  number_of_pages   INT             NOT NULL,
  publish_date      DATE,
  cover             VARCHAR(256),
  author_id         INT             NOT NULL,
  PRIMARY KEY       (id),
  FOREIGN KEY       (author_id)     REFERENCES author(id)
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

CREATE TABLE user_relationship (
    id                SERIAL,
    user_1_id         INT             NOT NULL,
    user_2_id         INT             NOT NULL,
    friend_type       INT             NOT NULL,
    action_user_id    INT             NOT NULL,
    PRIMARY KEY     (id),
    FOREIGN KEY     (user_1_id)       REFERENCES user_profile(id),
    FOREIGN KEY     (user_2_id)       REFERENCES user_profile(id),
    FOREIGN KEY     (action_user_id)  REFERENCES user_profile(id)
)

-- pending_first_second
-- pending_second_first
-- friends
-- block_first_second
-- block_second_first
-- block_both

INSERT INTO user_profile VALUES
    (DEFAULT, 'test1@test.com', 'test1', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test2@test.com', 'test2', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test3@test.com', 'test3', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test4@test.com', 'test4', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test5@test.com', 'test5', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test6@test.com', 'test6', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test7@test.com', 'test7', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test8@test.com', 'test8', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test9@test.com', 'test9', 'test_first', 'test_last', 'pic'),
    (DEFAULT, 'test0@test.com', 'test10', 'test_first', 'test_last', 'pic');

INSERT INTO book VALUES
    (DEFAULT, '123-1-23', 'book_1', 136,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-24', 'book_2', 240,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-25', 'book_3', 335,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-26', 'book_4', 459,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-27', 'book_5', 161,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-28', 'book_6', 925,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-29', 'book_7', 832,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-30', 'book_8', 748,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-31', 'book_9', 567,  TIMESTAMP '2017-01-01 00:00:00', 'pic'),
    (DEFAULT, '123-1-32', 'book_10', 647,  TIMESTAMP '2017-01-01 00:00:00', 'pic');

INSERT INTO author VALUES
    (DEFAULT, 'author_1'),
    (DEFAULT, 'author_2'),
    (DEFAULT, 'author_3'),
    (DEFAULT, 'author_4'),
    (DEFAULT, 'author_5'),
    (DEFAULT, 'author_6'),
    (DEFAULT, 'author_7'),
    (DEFAULT, 'author_8'),
    (DEFAULT, 'author_9'),
    (DEFAULT, 'author_10');

INSERT INTO user_book VALUES
    (DEFAULT, 1, 1, TIMESTAMP '2018-01-01 00:00:00', 0, 120),
    (DEFAULT, 2, 1, TIMESTAMP '2018-01-01 00:00:00', 0, 110),
    (DEFAULT, 3, 2, TIMESTAMP '2018-01-01 00:00:00', 0, 125),
    (DEFAULT, 4, 3, TIMESTAMP '2018-01-01 00:00:00', 0, 200),
    (DEFAULT, 5, 1, TIMESTAMP '2018-01-01 00:00:00', 1, 136),
    (DEFAULT, 6, 5, TIMESTAMP '2018-01-01 00:00:00', 0, 200),
    (DEFAULT, 4, 4, TIMESTAMP '2018-01-01 00:00:00', 0, 100),
    (DEFAULT, 4, 8, TIMESTAMP '2018-01-01 00:00:00', 0, 130),
    (DEFAULT, 5, 9, TIMESTAMP '2018-01-01 00:00:00', 0, 123),
    (DEFAULT, 3, 8, TIMESTAMP '2018-01-01 00:00:00', 0, 640);

INSERT INTO book_author VALUES
    (DEFAULT, 1, 1),
    (DEFAULT, 2, 2),
    (DEFAULT, 3, 3),
    (DEFAULT, 1, 4),
    (DEFAULT, 5, 5),
    (DEFAULT, 6, 6),
    (DEFAULT, 7, 7),
    (DEFAULT, 8, 6),
    (DEFAULT, 9, 8),
    (DEFAULT, 8, 4);
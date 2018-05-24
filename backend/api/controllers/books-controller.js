// books-controller.js

// MARK: Imports

const db = require("../db/index");

// MARK: Controller Functions

function getAllBooks(req, res, next) {
    db.any('select book.id,\
                   book.isbn,\
                   book.title,\
                   book.number_of_pages,\
                   book.publish_date,\
                   book.cover,\
                   author.id as author_id,\
                   author.name as author_name\
            from book\
            inner join author on author.id = book.author_id\
            order by book.id')
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
}

function getBook(req, res) {
  db.one('select book.id,\
                 book.isbn,\
                 book.title,\
                 book.number_of_pages,\
                 book.publish_date,\
                 book.cover,\
                 author.id as author_id,\
                 author.name as author_name\
          from book\
          inner join author on author.id = book.author_id\
          where book.id = $1', [req.params.id])
  .then(function (data) {
    res.status(200)
      .json(data);
  })
  .catch(function (err) {
    return next(err);
  });
}

module.exports = {
    getAllBooks: getAllBooks,
    getBook: getBook
};
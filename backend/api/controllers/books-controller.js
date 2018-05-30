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

function addBook(req, res) {

  let author_id = 0

  let isbn = req.body.isbn
  let title = req.body.title
  let number_of_pages = req.body.number_of_pages
  let author_name = req.body.author_name
  let publish_date = req.body.publish_date
  let cover = req.body.cover

  if (typeof isbn != "string") {
    res.status(400).json({error: "Type error for \'isbn\'"});
  }
  else {
    db.one('select id from books where book.isbn = $1', [isbn])
      .then(data => {
        res.status(400).json({error: "ISBN error"});
      })
      .catch(err => {
      })
  }

  if (typeof title != "string") {
    res.status(400).json({error: "Type error for \'title\'"});
  }
  if (typeof number_of_pages != "number") {
    res.status(400).json({error: "Type error for \'number_of_pages\'"});
  }
  if (typeof author_name != "string") {
    res.status(400).json({error: "Type error for \'author_name\'"});
  }
  if (typeof publish_date != "string") {
    res.status(400).json({error: "Type error for \'publish_date\'"});
  }
  if (typeof cover != "string") {
    res.status(400).json({error: "Type error for \'cover\'"});
  }

  db.task(t => {
    return t.oneOrNone('select * from author where author.name = $1', [author_name])
    .then(data => {
      if (data) {
        return data.id
      }
      return -1
    })
  })
  .then(result => {
    db.task(y => {
      if (result == -1) {
        return y.oneOrNone('insert into author(name) values($1) returning id', [author_name])
          .then(datas => {
            return datas.id
          })
      }
      return result
    })
    .then(events => {
      console.log(events)
      db.one('insert into book(isbn, title, number_of_pages, publish_date, cover, author_id)\
      values ($1, $2, $3, $4, $5, $6)\
      returning id, isbn, title, number_of_pages, publish_date, cover, author_id',
      [isbn, title, number_of_pages, publish_date, cover, events])
      .then(data => {
        let book = {
          id: data.id,
          isbn: data.isbn,
          title: data.title,
          number_of_pages: data.number_of_pages,
          publish_date: data.publish_date,
          cover: data.cover,
          author_id: data.author_id
        }
        res.status(200).json({book});
      })
      .catch(err => {
        res.status(400).json({error: err.message});
      });
    })
  })
}

module.exports = {
    getAllBooks: getAllBooks,
    getBook: getBook,
    addBook: addBook
};
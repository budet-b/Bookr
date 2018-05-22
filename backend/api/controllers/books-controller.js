// books-controller.js

// MARK: Imports

const db = require("../db/index");

// MARK: Controller Functions

function getAllBooks(req, res, next) {
    db.any('select * from book')
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
}

module.exports = {
    getAllBooks: getAllBooks
};
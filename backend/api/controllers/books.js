var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/signet';
var db = pgp(connectionString);

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
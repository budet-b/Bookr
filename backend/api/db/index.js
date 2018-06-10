var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL
// var connectionString = 'postgres://localhost:5432/bookr';
var db = pgp(connectionString);

module.exports = db;
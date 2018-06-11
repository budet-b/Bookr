var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

let cn = null

if (process.env.connectionString != null) {
  cn = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}
else {
  cn = {
    connectionString: 'postgres://localhost:5432/bookr'
  }
}

console.log(cn)

var db = pgp(cn);
module.exports = db;
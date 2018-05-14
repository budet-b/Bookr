var express = require('express');
var router = express.Router();

var books = require('./data_access/books');

router.get('/api/books', books.getAllBooks);

module.exports = router;
var express = require('express');
var router = express.Router();

var books = require('./controllers/books');

router.get('/api/books', books.getAllBooks);

module.exports = router;
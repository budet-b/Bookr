var express = require('express');
var router = express.Router();

var books = require('./controllers/books-controller');
var book = require('./controllers/book-controller');
var friends = require('./controllers/friends-controller');
var timeline = require('./controllers/timeline-controller');
var user = require('./controllers/user-controller');

router.get('/api/books', books.getAllBooks);

module.exports = router;
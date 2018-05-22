// index.js

// MARK: Imports

var express         = require('express');
var jwt             = require('jsonwebtoken');
var passport        = require("passport");
var passportJWT     = require("passport-jwt");

// MARK: Import controllers

var books           = require('./controllers/books-controller');
var book            = require('./controllers/book-controller');
var friends         = require('./controllers/friends-controller');
var timeline        = require('./controllers/timeline-controller');
var user            = require('./controllers/user-controller');

// MARK: Configure router

var router = express.Router();

// MARK: User Router

router.post('/login', (req, res) => {
    user.login(req, res)
});

router.get('/secret',
    passport.authenticate('jwt', { session: false }),
    function(req, res){
        res.json("Success! You can not see this without a token");
    }
);

router.post('/signup', (req, res) => {
    user.createUser(req, res)
});

router.get('/getUser',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        user.getUser(req, res)
    }
);

// MARK: Book Router

router.get('/api/books', books.getAllBooks);

// MARK: Other Router

router.get('/', (req, res) => {
    res.json({message: "Express is up!"});
});

module.exports = router;
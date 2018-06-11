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

router.post('/api/user/login', (req, res) => {
    user.login(req, res)
});

router.get('/secret',
    passport.authenticate('jwt', { session: false }),
    function(req, res){
        res.json("Success! You can not see this without a token");
    }
);

router.post('/api/user/signup', (req, res) => {
    user.createUser(req, res)
});

router.get('/api/user',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        user.getUser(req, res)
    }
);

// MARK: Book Router

router.get(
    '/api/books',
    books.getAllBooks
);

router.get(
    '/api/book/:id',
    books.getBook
);

router.post(
    '/api/books/book',
    books.addBook
);

router.put(
    '/api/books/:id/:page',
    passport.authenticate('jwt', { session: false }),
    books.updateBookUser
);

router.get(
    '/api/user/book/:id',
    passport.authenticate('jwt', { session: false }),
    books.getBookUserFriends
);

router.get(
    '/api/user/books',
    passport.authenticate('jwt', { session: false }),
    books.getBooksUser
);

// MARK: Friends Router

router.put(
    '/api/friends/add/:id',
    passport.authenticate('jwt', {session: false}),
    friends.addFriend
);

router.put(
    '/api/friends/accept/:id',
    passport.authenticate('jwt', {session: false}),
    friends.acceptFriend
);

router.get(
    '/api/friends/received',
    passport.authenticate('jwt', {session: false}),
    friends.receivedInvitationList
);

router.get(
    '/api/friends/sent',
    passport.authenticate('jwt', {session: false}),
    friends.sentInvitationList
);

router.get(
    '/api/user/friends',
    passport.authenticate('jwt', {session: false}),
    friends.friendList
);

router.get(
    '/api/friends/:id',
    passport.authenticate('jwt', {session: false}),
    friends.friendWithId
);

router.get(
    '/api/users',
    friends.usersList
);

router.get(
    '/api/timeline',
    passport.authenticate('jwt', {session: false}),
    timeline.getTimeline
);

// MARK: Other Router

router.get('/', (req, res) => {
    res.json({message: "Express is up!"});
});

module.exports = router;
// index.js

// MARK: Imports

var express         = require('express');
var jwt             = require('jsonwebtoken');
var passport        = require("passport");
var passportJWT     = require("passport-jwt");

// MARK: Import controllers

var books           = require('./controllers/books-controller');
var friends         = require('./controllers/friends-controller');
var timeline        = require('./controllers/timeline-controller');
var user            = require('./controllers/user-controller');

// MARK: Configure router

var router = express.Router();

// MARK: Auth Router

router.post(
    '/api/user/login',
    user.login
);

router.post(
    '/api/user/signup',
    user.createUser
);

// MARK: User Router

router.get(
    '/api/user',
    passport.authenticate('jwt', { session: false }),
    user.getUser
);

router.get(
    '/api/user/books',
    passport.authenticate('jwt', { session: false }),
    books.getBooksUser
);

router.get(
    '/api/user/books/finished',
    passport.authenticate('jwt', { session: false }),
    books.getFinishedBooksUser
);

router.get(
    '/api/user/books/current',
    passport.authenticate('jwt', { session: false }),
    books.getCurrentBooksUser
);

router.get(
    '/api/user/friends',
    passport.authenticate('jwt', {session: false}),
    friends.friendList
);

// MARK: Books Router

router.get(
    '/api/books',
    books.getAllBooks
);

router.post(
    '/api/books/book',
    books.addBook
);

// MARK: Book Router

router.get(
    '/api/book/:id',
    books.getBook
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
    '/api/friends/:id',
    passport.authenticate('jwt', {session: false}),
    friends.friendWithId
);

router.get(
    '/api/users',
    passport.authenticate('jwt', {session: false}),
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
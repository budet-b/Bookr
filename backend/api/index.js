var express = require('express');
var router = express.Router();

var _ = require("lodash");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var books = require('./controllers/books-controller');
var book = require('./controllers/book-controller');
var friends = require('./controllers/friends-controller');
var timeline = require('./controllers/timeline-controller');
var user = require('./controllers/user-controller');

var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/signet';
var db = pgp(connectionString);


router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json())

router.get('/api/books', books.getAllBooks);

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  console.log(jwt_payload.id)
  db.one('select * from user_profile where id = $1', [jwt_payload.id])
    .then(function(data) {
        console.log(data)
        next(null, data)
    })
    .catch(function(data) {
        console.log(data)
        next(null, false)
    })
});

passport.use(strategy);
router.use(passport.initialize());

router.post("/login", function(req, res) {
    if(req.body.username && req.body.password){
      var username = req.body.username;
      var password = req.body.password;
    }
    console.log(username)
    console.log(password)
    db.one('select * from user_profile where username = $1', [username])
        .then(function(data) {
            console.log(data)
            if(data.password === req.body.password) {
                var payload = {id: data.id};
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({message: "ok", token: token, user: data});
            }
            else {
                res.status(401).json({message:"passwords did not match"});
            }
        })
        .catch(function(data) {
            res.status(401).json({message:"no such user found"});
        })
  });

router.get('/', (req, res) => {
    res.json({message: "Express is up!"});
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
});

router.get("/secretDebug", function(req, res, next){
  console.log(req.get('Authorization'));
  next();
}, function(req, res){
  res.json("debugging");
});


module.exports = router;
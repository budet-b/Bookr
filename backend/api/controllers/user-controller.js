// user-controller.js

// MARK: Imports

const db = require("../db/index");

var express = require('express');
var router = express.Router();
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');

// MARK: Configure passport/jwt

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  db.one('select * from user_profile where id = $1', [jwt_payload.id])
    .then(function(data) {
        next(null, data)
    })
    .catch(function(data) {
        next(null, false)
    })
});

passport.use(strategy);
router.use(passport.initialize());

// MARK: Controller Functions

function login(req, res) {
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
};

module.exports = {
    login: login
};
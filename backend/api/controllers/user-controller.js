// user-controller.js

// MARK: Imports

const db = require("../db/index");

var express = require('express');
var router = express.Router();
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

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
    db.one('select * from user_profile where username = $1', [username])
        .then((data) => {
            bcrypt.compare(password, data.password, function(err, resp) {
                if(resp) {
                    var date = new Date()
                    var exp_date = date.setDate(date.getDate() + 30)
                    var payload = {id: data.id, expiration: exp_date};
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    var user = {
                        id: data.id,
                        username: data.username,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        picture: data.picture
                    }
                    res.json({token: token, user: user});
                } else {
                    res.status(401).json({error:"password did not match"});
                }
            });
        })
        .catch((err) => {
            res.status(400).json({error: err.message});
        })
};

function createUser(req, res) {
    let username = req.body.username
    if (!username) {
        return res.status(400).json({error: "username is missing"});
    }
    let email = req.body.email
    if (!email) {
        return res.status(400).json({error: "email is missing"});
    }
    let password = req.body.password
    if (!password) {
        return res.status(400).json({error: "password is missing"});
    }
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let picture = req.body.picture

    bcrypt.hash(password, 10, function(err, hash) {
        db.one('insert into user_profile(email, username, firstname, lastname, picture, password)\
            values ($1, $2, $3, $4, $5, $6)\
            returning id, email, username, firstname, lastname, picture',
            [email, username, firstname, lastname, picture, hash])
        .then((data) => {
            let user = {
                id: data.id,
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                picture: data.picture
            }
            res.status(200).json({user});
        })
        .catch((err) => {
            res.status(400).json({error: err.message});
        })
    });
}

function getUser(req, res) {
    let user = {
        id: req.user.id,
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        picture: req.user.picture
    }
    res.send({user});
}


module.exports = {
    login: login,
    createUser: createUser,
    getUser: getUser
};
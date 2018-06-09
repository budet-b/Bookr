// friends-controller.js

// MARK: Imports

const db = require("../db/index");

//TYPE:
//0	Pending
//1	Accepted
//2	Declined
//3	Blocked

// MARK: Controller Functions

function addFriend(req, res) {

  if (req.user.id === parseInt(req.params.id)) {
    res.status(400).json({
      "success": "false",
      "error": "You can't add yourself!"
    })
  }
  else {
    db.oneOrNone('insert into user_relationship(\
                  user_1_id,\
                  user_2_id,\
                  friend_type,\
                  action_user_id)\
                select $1, $2, $3, $1\
                where not exists(\
                select id from user_relationship\
                where user_1_id = $1\
                and user_2_id = $2)\
                returning id', [req.user.id, req.params.id, 0])
      .then((data) => {
        if (data != null) {
          res.status(200).json({
            "success": true,
            "status": 0
          })
        }
        else {
          res.status(400).json({
            "success": false,
            "error": "Error while adding"
          })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          "success": "false",
          "error": err.detail
        })
      })
  }
}


function acceptFriend(req, res) {

  let arr = [req.user.id, parseInt(req.params.id)]

  db.oneOrNone('update user_relationship\
           set friend_type = 1,\
           action_user_id = $1\
           where user_1_id = $2\
             and user_2_id = $1\
           returning *',
    [arr[0], arr[1]])
    .then((data) => {
      if (data != null) {
        res.status(200).json({
          "success": true,
          "status": 1
        })
      }
      else {
        res.status(400).json({
          "success": false,
          "status": "Error"
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        "success": false,
        "error": err.detail
      })
    })
}

function receivedInvitationList(req, res) {

  db.any('select user_profile.id,\
                 user_profile.email,\
                 user_profile.username,\
                 user_profile.firstname,\
                 user_profile.lastname,\
                 user_profile.picture\
         from user_relationship\
         left join user_profile on\
         (user_profile.id = user_relationship.user_1_id \
          or user_profile.id = user_relationship.user_2_id)\
        and user_profile.id != $1\
          where (user_relationship.user_1_id = $1 or user_relationship.user_2_id = $1)\
          and friend_type = $2\
          and action_user_id != $1', [req.user.id, 0])
    .then(data => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

function sentInvitationList(req, res) {
  db.any('select user_profile.id,\
                 user_profile.email,\
                 user_profile.username,\
                 user_profile.firstname,\
                 user_profile.lastname,\
                 user_profile.picture\
                 from user_relationship\
         left join user_profile on\
         (user_profile.id = user_relationship.user_1_id\
          or user_profile.id = user_relationship.user_2_id)\
          and user_profile.id != $1\
          where (user_relationship.user_1_id = $1 or user_relationship.user_2_id = $1)\
          and friend_type = $2\
          and action_user_id = $1', [req.user.id, 0])
    .then(data => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

function friendList(req, res) {
  db.any('select user_profile.id,\
                 user_profile.email,\
                 user_profile.username,\
                 user_profile.firstname,\
                 user_profile.lastname,\
                 user_profile.picture\
          from user_relationship\
          left join user_profile on\
          (user_profile.id = user_relationship.user_1_id\
            or user_profile.id = user_relationship.user_2_id)\
            and user_profile.id != $1\
          where (user_relationship.user_1_id = $1 or user_relationship.user_2_id = $1)\
          and friend_type = $2', [req.user.id, 1])
    .then(data => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

function usersList(req, res) {
  db.any('select user_profile.id,\
                 user_profile.email,\
                 user_profile.username,\
                 user_profile.firstname,\
                 user_profile.lastname,\
                 user_profile.picture\
          from user_profile')
    .then(data => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

function friendWithId(req, res) {
  if (req.user.id === parseInt(req.params.id)) {
    res.status(400).json({
      "success": false,
      "error": "You can't search yourself"
    })
  }
  else {
  db.oneOrNone('select user_profile.id,\
                       user_profile.email,\
                       user_profile.username,\
                       user_profile.firstname,\
                       user_profile.lastname,\
                       user_profile.picture,\
                       user_relationship.friend_type,\
                       user_relationship.action_user_id\
                       from user_relationship\
                       left join user_profile on\
                       (user_profile.id = user_relationship.user_1_id \
                        or user_profile.id = user_relationship.user_2_id)\
                        and user_profile.id != $1\
                        where (user_relationship.user_1_id = $1 or user_relationship.user_2_id = $1)\
                        and (user_relationship.user_1_id = $2 or user_relationship.user_2_id = $2)',
                        [req.user.id, req.params.id])
    .then(data => {
      if (data != null) {
        let user = {
          id: data.id,
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          picture: data.picture
        }
        let friend_type = 0
        if (data.friend_type === 1) { //friend
          friend_type = 0
        }
        else if (data.friend_type === 0)
        {
          if (data.id === data.action_user_id) { //sent
            friend_type = 1
          }
          else { //received
            friend_type = 2
          }
        }
        else {
          friend_type = 3
        }
        res.status(200).json({
          user: user,
          friend_type: friend_type
        })
      }
      else {
        db.oneOrNone('select * from user_profile\
                      where user_profile.id = $1', [req.params.id])
        .then(data => {
            if (data != null) {
              let user = {
                id: data.id,
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                picture: data.picture
              }
              res.status(200).json({
                user: user,
                friend_type: 3
              })
            }
            else {
              res.status(400).json({
                "success": false,
                "error": "User not in db"
              })
            }
        })
        .catch(err => {
          res.status(400).json({
            "success": false,
            "error": "Unknown error"
          })
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        "success": false,
        "error": "Unknown error"
      })
    })
  }
}

module.exports = {
  addFriend: addFriend,
  acceptFriend: acceptFriend,
  receivedInvitationList: receivedInvitationList,
  sentInvitationList: sentInvitationList,
  friendList: friendList,
  usersList: usersList,
  friendWithId: friendWithId
};
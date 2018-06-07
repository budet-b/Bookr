// friends-controller.js

// MARK: Imports

const db = require("../db/index");

//TYPE:
//0: id1 invite id2
//1: id2 invite id1
//2: id1 mutual id2
//3: id1 blocked id2
//4: id1 blocked id2

//NEW TYPE:
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

const userRelationshipList = (user_id, friend_type) => (
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
          and action_user_id = $1', [user_id, friend_type])
)

function invitationList(req, res) {

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

function pendingList(req, res) {
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


module.exports = {
  addFriend: addFriend,
  acceptFriend: acceptFriend,
  invitationList: invitationList,
  pendingList: pendingList,
  friendList: friendList
};
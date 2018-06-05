// friends-controller.js

// MARK: Imports

const db = require("../db/index");

//TYPE:
//0: id1 invite id2
//1: id2 invite id1
//2: id1 mutual id2
//3: id1 blocked id2
//4: id1 blocked id2

// MARK: Controller Functions

function addFriend(req, res) {

  let arr = [req.user.id, parseInt(req.params.id)]
  arr.sort((a, b) => a > b)
  if (req.user.id < req.params.id) {
    type = 0
  }
  else {
    type = 1
  }

  console.log(arr)

  if (arr[0] === arr[1]) {
    res.status(400).json({
      "success": "false",
      "error": "You can't add yourself!"
    })
  }
  else {
    db.oneOrNone('insert into user_relationship(\
                  user_1_id,\
                  user_2_id,\
                  friend_type)\
                select $1, $2, $3\
                where not exists(\
                select id from user_relationship\
                where user_1_id = $1\
                and user_2_id = $2)\
                returning id', [arr[0], arr[1], type])
      .then((data) => {
        if (data != null) {
          res.status(200).json({
            "success": "true",
            "status": type
          })
        }
        else {
          res.status(400).json({
            "success": "false",
            "error": "Error while adding"
          })
        }
      })
      .catch((err) => {
        res.status(400).json({
          "success": "false",
          "error": err.detail
        })
      })
  }
}


function acceptFriend(req, res) {

  let arr = [req.user.id, parseInt(req.params.id)]
  arr.sort((a, b) => a > b)

  console.log(arr)

  //TODO: Check if request
  db.none('update user_relationship\
           set friend_type = $1\
           where user_1_id = $2\
             and user_2_id = $3',
    [2, arr[0], arr[1]])
    .then(() => {
      res.status(200).json({
        "success": "true",
        "status": 1
      })
    })
    .catch((err) => {
      res.status(400).json({
        "success": "false",
        "error": err.detail
      })
    })
}

function sentInvitationList(req, res) {
}

function pendingList(req, res) {

}


module.exports = {
  addFriend: addFriend,
  acceptFriend: acceptFriend
};
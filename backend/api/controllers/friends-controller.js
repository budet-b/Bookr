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

  // let arr = [req.user.id, parseInt(req.params.id)]
  // arr.sort((a, b) => a > b)
  // if (req.user.id < req.params.id) {
  //   type = 0
  // }
  // else {
  //   type = 1
  // }

  // console.log(arr)
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
  // arr.sort((a, b) => a > b)

  console.log(arr)

  //TODO: Check if request
  db.none('update user_relationship\
           set friend_type = 1,\
           action_user_id = $1\
           where user_1_id = $2\
             and user_2_id = $1',
    [arr[0], arr[1]])
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

function getListFriend(user_id, friend_type) {
  db.any('select * from user_relationship\
          where (user_1_id = $1\
          or user_2_id = $1)\
          and friend_type = $2',
    [user_id, friend_type])
}

function sentInvitationList(req, res) {

  db.any("select * from user_relationship\
  where (user_1_id = $1 or user_2_id = $1)\
  and friend_type = 0\
  and action_user_id = $1", [req.user.id])
.then(data => {
res.status(200).json(data)
})
.catch((err) => {
res.status(400).json(err)
})

  // db.any('select user_profile.id, email, username, firstname, lastname, picture from user_profile\
  //         inner join user_relationship as u1 on u1.user_1_id = user_profile.id\
  //         inner join user_relationship as u2 on u2.user_2_id = user_profile.id\
  //         where user_profile.id != 11 and (u1.friend_type = 0 or u2.friend_type = 1)')
  // .then(data => {
  //   res.status(200).json(data)
  // })
  // .catch(err => {
  //   res.status(400).json(err)
  // })


  // let usersArr = []
  // let users = []
  // db.any('select * from user_relationship\
  //         where (user_1_id = $1\
  //         and friend_type = $2)\
  //         or (user_2_id = $1\
  //         and friend_type = $3)',
  //   [req.user.id, 0, 1])
  //   .then((data) => {
  //     data.forEach(element => {
  //       if (element.user_1_id !== req.user.id) {
  //         users.push(element.user_1_id)
  //       }
  //       else if (element.user_2_id !== req.user.id) {
  //         users.push(element.user_2_id)
  //       }})
  //       res.status(200).json(users)
  //     // })

  //     // users.forEach(element => {
  //     //   db.oneOrNone("select * from user_profile where id = $1", [element])
  //     //     .then(data => {
  //     //       usersArr.push(data)
  //     //     })
  //     // })
  //     // .then(() => {
  //     //   res.status(200).json(usersArr)
  //     // })
  //   })
  //   .catch((err) => {
  //     res.status(400).json({
  //       "success": "false",
  //       "error": err.detail
  //     })
  //   })

}

function pendingList(req, res) {

  db.any("select * from user_relationship\
  where (user_1_id = $1 or user_2_id = $1)\
  and friend_type = 0\
  and action_user_id != $1", [req.user.id])
.then(data => {
res.status(200).json(data)
})
.catch((err) => {
res.status(400).json(err)
})
}

function friendList(req, res) {
  db.any("select * from user_relationship\
          where (user_1_id = $1 or user_2_id = $1)\
          and friend_type = 1", [req.user.id])
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
  sentInvitationList: sentInvitationList,
  pendingList: pendingList,
  friendList: friendList
};
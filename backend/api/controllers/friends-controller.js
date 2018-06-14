// friends-controller.js

// MARK: Imports

const db = require("../db/index");

//TYPE:
//0	Pending
//1	Accepted
//2	Declined
//3	Blocked

// MARK: Controller Functions

const addFriend = (req, res, next) => {
  if (req.user.id === parseInt(req.params.id)) {
    let err = { message: "You can't add yourself!" };
    return next(err);
  }
  else {
    db.oneOrNone(
      "insert into user_relationship(\
                  user_1_id,\
                  user_2_id,\
                  friend_type,\
                  action_user_id)\
                select $1, $2, $3, $1\
                where not exists(\
                select id from user_relationship\
                where user_1_id = $1\
                and user_2_id = $2)\
                returning id",
      [req.user.id, req.params.id, 0]
    )
      .then(data => {
        if (data != null) {
          res.status(200).json({
            success: true,
            status: 0
          });
        }
        else {
          let err = { message: "Error while adding" };
          return next(err);
        }
      })
      .catch(err => {
        return next(err);
      });
  }
};

const acceptFriend = (req, res, next) => {
  let arr = [req.user.id, parseInt(req.params.id)];

  db.oneOrNone(
    "update user_relationship\
           set friend_type = 1,\
           action_user_id = $1\
           where user_1_id = $2\
             and user_2_id = $1\
           returning *",
    [arr[0], arr[1]]
  )
    .then(data => {
      if (data != null) {
        res.status(200).json({
          success: true,
          status: 1
        });
      }
      else {
        let err = { message: "No friend request found" };
        return next(err);
      }
    })
    .catch(err => {
      return next(err);
    });
};

const receivedInvitationList = (req, res, next) => {
  db.any(
    "select user_profile.id,\
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
          and action_user_id != $1",
    [req.user.id, 0]
  )
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      return next(err);
    });
}

const sentInvitationList = (req, res, next) => {
  db.any(
    "select user_profile.id,\
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
          and action_user_id = $1",
    [req.user.id, 0]
  )
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      return next(err);
    });
}

const friendList = (req, res, next) => {
  db.any(
    "select user_profile.id,\
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
          and friend_type = $2",
    [req.user.id, 1]
  )
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      return next(err);
    });
}

const usersList = (req, res, next) => {
  db.any("select user_profile.id,\
                 user_profile.email,\
                 user_profile.username,\
                 user_profile.firstname,\
                 user_profile.lastname,\
                 user_profile.picture\
          from user_profile")
  .then(data => {
    db.any(
      "select user_profile.id,\
              user_profile.email,\
              user_profile.username,\
              user_profile.firstname,\
              user_profile.lastname,\
              user_profile.picture,\
              user_relationship.friend_type,\
              user_relationship.action_user_id\
       from user_profile\
       left join user_relationship on\
       (user_relationship.user_1_id = user_profile.id or user_relationship.user_2_id = user_profile.id)\
       and user_profile.id != $1\
       where (user_relationship.user_1_id = $1 or user_relationship.user_2_id = $1)", [req.user.id])
    .then(user_rela_res => {
      let datas = []
      data.forEach(element => {
        let pushed = false
        user_rela_res.forEach(element_rela => {
          if (pushed === false && element.id === element_rela.id) {
            datas.push({user: {id: element_rela.id,
                        email: element_rela.email,
                        username: element_rela.username,
                        firstname: element_rela.firstname,
                        lastname: element_rela.lastname,
                        picture: element_rela.picture,
                      },
                      friend_type: convertFriendType(element_rela.id, element_rela.friend_type, element_rela.action_user_id)
                    })
              pushed = true
          }
        })
        if (pushed === false) {
          if (element.id !== req.user.id) {
            datas.push({user: {id: element.id,
              email: element.email,
              username: element.username,
              firstname: element.firstname,
              lastname: element.lastname,
              picture: element.picture,
            },
            friend_type: 3
          })
        }
      }
      })
      res.status(200).json(datas);
    })
    .catch(err => {
      return next(err)
    })
  })
  .catch(err => {
    return next(err)
  })
}

const friendWithId = (req, res, next) => {
  if (req.user.id === parseInt(req.params.id)) {
    let err = { message: "You can't add yourself!" };
    return next(err);
  }
  else {
    db.oneOrNone(
      "select user_profile.id,\
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
                       and (user_relationship.user_1_id = $2 or user_relationship.user_2_id = $2)",
      [req.user.id, req.params.id]
    )
      .then(data => {
        if (data != null) {
          let user = {
            id: data.id,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            picture: data.picture
          };
          let friend_type = convertFriendType(data.id, data.friend_type, data.action_user_id)
          res.status(200).json({
            user: user,
            friend_type: friend_type
          });
        }
        else {
          db.oneOrNone(
            "select * from user_profile\
                      where user_profile.id = $1",
            [req.params.id]
          )
            .then(data => {
              if (data != null) {
                let user = {
                  id: data.id,
                  username: data.username,
                  firstname: data.firstname,
                  lastname: data.lastname,
                  email: data.email,
                  picture: data.picture
                };
                res.status(200).json({
                  user: user,
                  friend_type: 3
                });
              }
              else {
                let err = { message: "User not in db" };
                return next(err);
              }
            })
            .catch(err => {
              return next(err);
            });
        }
      })
      .catch(err => {
        return next(err);
      });
  }
}

const convertFriendType = (id, friend_type, action_user_id) => {
  let type = 0;
  if (friend_type === 1) { //friend
    return 0;
    // type = 0;
  }
  else if (friend_type === 0) {
    if (id === action_user_id) { //sent
      return 2;
      // type = 2;
    }
    else { //received
      // type = 1;
      return 1;
    }
  }
  else {
    // type = 3;
    return 3;
  }
}



module.exports = {
  addFriend,
  acceptFriend,
  receivedInvitationList,
  sentInvitationList,
  friendList,
  usersList,
  friendWithId
};

// timeline-controller.js

// MARK: Imports

const db = require("../db/index");

// MARK: Controller Functions

const getTimeline = (req, res, next) => {
  let arr = []
  db.any('select newsfeed.book_id,\
                 newsfeed.date_added,\
                 newsfeed.user_status,\
                 newsfeed.user_position,\
                 user_profile.id,\
                 user_profile.email,\
                 user_profile.username,\
                 user_profile.firstname,\
                 user_profile.lastname,\
                 user_profile.picture,\
                 book.isbn,\
                 book.title,\
                 book.number_of_pages,\
                 book.publish_date,\
                 book.cover,\
                 book.author_id\
          from newsfeed\
          inner join book on newsfeed.book_id = book.id\
          inner join user_relationship on (user_relationship.user_1_id = newsfeed.user_id or user_relationship.user_2_id = newsfeed.user_id)\
          left join user_profile on user_profile.id = newsfeed.user_id\
          and user_profile.id != $1\
          where (user_relationship.user_1_id = $1 or user_relationship.user_2_id = $1)\
          and friend_type = 1 order by newsfeed.date_added desc', [req.user.id])
    .then(data => {
      data.forEach(element => {
        let book = {
          id: element.book_id,
          isbn: element.isbn,
          title: element.title,
          number_of_pages: element.number_of_pages,
          publish_date: element.publish_date,
          cover: element.cover
        }
        let user = {
          id: element.id,
          username: element.username,
          firstname: element.firstname,
          lastname: element.lastname,
          email: element.email,
          picture: element.picture
        }
        let new_elt = {
          book: book,
          user: user,
          user_position: element.user_position,
          user_status: element.user_status,
          date_added: element.date_added
        }
        arr.push(new_elt)
      })
      res.status(200).json(arr)
    })
    .catch(err => {
      next(err)
    })
}

module.exports = {
  getTimeline
};
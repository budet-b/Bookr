const dev = {
  books: {
    USERBOOK: "http://localhost:8080/api/user/books/",
    SPECIFIEDUSERBOOK: "http://localhost:8080/api/user/book/",
    STARTBOOK: "http://localhost:8080/api/books/",
    ALLBOOKS: "http://localhost:8080/api/books/"
  },
  user: {
    USERFRIENDS: "http://localhost:8080/api/user/friends",
    FRIENDSRECEIVED: "http://localhost:8080/api/friends/received",
    USERS: "http://localhost:8080/api/users",
    USER: "http://localhost:8080/api/user",
    LOGIN: "http://localhost:8080/api/user/login",
    SIGNUP: "http://localhost:8080/api/user/signup",
    FRIENDS: "http://localhost:8080/api/friends/",
    ACCEPTFRIEND: "http://localhost:8080/api/friends/accept/",
    ADDFRIEND: "http://localhost:8080/api/friends/add/"
  }
};

const prod = {
  books: {
    USERBOOK: "https://bookr-api.herokuapp.com/api/user/book/",
    STARTBOOK: "https://bookr-api.herokuapp.com/api/books/",
    ALLBOOKS: "https://bookr-api.herokuapp.com/api/books"
  },
  user: {
    USERFRIENDS: "https://bookr-api.herokuapp.com/api/user/friends",
    FRIENDSRECEIVED: "https://bookr-api.herokuapp.com/api/friends/received",
    USER: "https://bookr-api.herokuapp.com/api/users",
    LOGIN: "https://bookr-api.herokuapp.com/api/user/login",
    SIGNUP: "https://bookr-api.herokuapp.com/api/user/signup"
  }
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  ...config
};

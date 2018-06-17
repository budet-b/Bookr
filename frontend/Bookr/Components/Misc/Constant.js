const dev = {
  books: {
    USERBOOK: "http://localhost:8080/api/user/books/",
    CURRENTBOOK: "http://localhost:8080/api/user/books/current",
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
    ADDFRIEND: "http://localhost:8080/api/friends/add/",
    TIMELINE: "http://localhost:8080/api/timeline"
  }
};

const prod = {
  books: {
    USERBOOK: "https://bookr-api.herokuapp.com/api/user/books/",
    CURRENTBOOK: "https://bookr-api.herokuapp.com/api/user/books/current",
    SPECIFIEDUSERBOOK: "https://bookr-api.herokuapp.com/api/user/book/",
    STARTBOOK: "https://bookr-api.herokuapp.com/api/books/",
    ALLBOOKS: "https://bookr-api.herokuapp.com/api/books/"
  },
  user: {
    USERFRIENDS: "https://bookr-api.herokuapp.com/api/user/friends",
    FRIENDSRECEIVED: "https://bookr-api.herokuapp.com/api/friends/received",
    USERS: "https://bookr-api.herokuapp.com/api/users",
    USER: "https://bookr-api.herokuapp.com/api/user",
    LOGIN: "https://bookr-api.herokuapp.com/api/user/login",
    SIGNUP: "https://bookr-api.herokuapp.com/api/user/signup",
    FRIENDS: "https://bookr-api.herokuapp.com/api/friends/",
    ACCEPTFRIEND: "https://bookr-api.herokuapp.com/api/friends/accept/",
    ADDFRIEND: "https://bookr-api.herokuapp.com/api/friends/add/",
    TIMELINE: "https://bookr-api.herokuapp.com/api/timeline"
  }
};

const config = process.env.REACT_NATIVE_ENVIRONMENT_CURRENT === 'prod'
  ? prod
  : prod;

console.log(process.env.REACT_NATIVE_ENVIRONMENT_CURRENT)

export default {
  ...config
};

import React, { Component} from 'react';
import NavBar from '../../Components/NavBar//Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../../Components/Misc/Constant'
import {Table, Grid, Row, Col } from 'react-bootstrap';


export default class FriendsPageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false,
      isLoading: true,
      friends: [],
      friendRequest: [],
      users: []
    }
  }

  componentDidMount() {
    console.log(Cookies.get('token'))
    var header = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    axios.get(config.user.USERS, header)
    .then((response) => {
        this.setState({
          isLoggin: true
        });
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillMount() {
    var header = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    axios.get(config.user.USERFRIENDS, header)
    .then((response) => {
        this.setState({
          friends: response.data
        });
    })
    .catch((error) => {
      console.log(error)
    })


    axios.get(config.user.FRIENDSRECEIVED, header)
    .then((response) => {
      console.log(response)
      this.setState({
        friendRequest: response.data
      })
    }).catch((error) => {
      console.log(error)
    })


    axios.get(config.user.USERS, header)
    .then((response) => {
      console.log(response.data)
      this.setState({
        users: response.data
      })
    }).catch((error) => {
      console.log(error)
    })

    this.setState({
      isLoading: false
    })
  }

  handleClose(e) {
    let modal = "modal" + e.target.id;
    document.getElementById(modal).style.display = "none";
  }

  handleClick(e) {
    let modal = "modal" + e.target.id;
    document.getElementById(modal).style.display = "block";
  }

  renderFriends() {
    return this.state.friends.map((friend, index) => {
      return(
          <div>
          <Col xs={6} md={2}>
          <center>
            <img src={friend.picture} width={80} height={130} alt={friend.username} />
            <h4>{friend.username}</h4>
            <div className="middle">
            <button type="button"
              className="btn btn-success myBtn"
              id={index}
              data-modal={"modal" + index}
              onClick={this.handleClick}>
              Voir
            </button>
            </div>
            </center>
            </Col>
            <div id={"modal"+index} className="modal">
              <div className="modal-content" style={{width: '400px'}}>
                <span className="close" id={index} onClick={this.handleClose}>&times;</span>
                <center>
                  <h3>{friend.firstname} {friend.lastname}</h3>
                  <img src={friend.picture} alt={friend.username} title={friend.username} className="image" width={'200px'} height={'200px'}/>
                </center>
              </div>
            </div>
          </div>
      )
    });
  }

  friendRequest() {
    return this.state.friendRequest.map((friend, index) => {
      return(
          <div>
            <img src={friend.picture} width={80} height={130} alt={friend.username} />
            <h4>{friend.username}</h4>
            <div className="middle">
            <button type="button"
              className="btn btn-success myBtn"
              id={index}
              data-modal={"modal" + index}
              onClick={this.handleClick}>
              Voir
            </button>
            </div>
            <div id={"modal"+index} className="modal">
              <div className="modal-content" style={{width: '400px'}}>
                <span className="close" id={index} onClick={this.handleClose}>&times;</span>
                <center>
                <h3>{friend.firstname} {friend.lastname}</h3>
                  <img src={friend.picture} alt={friend.username} title={friend.username} className="image" width={'200px'} height={'200px'}/>
                </center>
              </div>
            </div>
          </div>
      )
    });
  }

  renderUsers() {
    return this.state.users.map((user, index) => {
      return(
          <div>
          <Col xs={6} md={2}>
          <center>
            <img src={user.user.picture} width={80} height={130} alt={user.user.username} />
            <h4>{user.user.username}</h4>
            <div className="middle">
            <button type="button"
              className="btn btn-success myBtn"
              id={index}
              data-modal={"modal" + index}
              onClick={this.handleClick}>
              Voir
            </button>
            </div>
            </center>
            </Col>
            <div id={"modal"+index} className="modal">
              <div className="modal-content" style={{width: '400px'}}>
                <span className="close" id={index} onClick={this.handleClose}>&times;</span>
                <center>
                <h3>{user.user.firstname} {user.user.lastname}</h3>
                  <img src={user.user.picture} alt={user.user.username} title={user.user.username} className="image" width={'200px'} height={'200px'}/>
                </center>
              </div>
            </div>
          </div>
      )
    });
  }

  renderFriendRequest() {
    if (this.state.friendRequest.length > 0)
    {
      let friendRequest = this.friendRequest();
      return(
        <div>
        <h3>Friend Requests</h3>
          {friendRequest}
        </div>
      )
    } else {
      return;
    }
  }


  render() {
    if (this.state.isLoading)
    {
      return (
        <div>
        <NavBar/>
        <div style={{paddingTop: 30}}>
        <h3>Loading...</h3>
        </div>
        </div>
      )
    }

    if (!this.state.isLoading)
      console.log(this.state.friends)
    let renderFriends = this.renderFriends();
    let rendreFriendRequests = this.renderFriendRequest();
    let renderAllUsers = this.renderUsers();
    return (
      <div>
      <NavBar/>
      <div style={{paddingTop: 30}}>
      <div>
      <h3>My Friends </h3>
      <Grid>
      <Row className="show-grid">
      {renderFriends}
      </Row>
      </Grid>
      </div>
      <div>
      {rendreFriendRequests}
      </div>
      <div>
      <h3>All users </h3>
      <Grid>
      <Row className="show-grid">
      {renderAllUsers}
      </Row>
      </Grid>
      </div>
      </div>
      </div>
    )
  }

}

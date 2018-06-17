import React, { Component} from 'react';
import { Navbar, Nav, NavItem, Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../Misc/Constant'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      LoginModalshow: false,
      showErrorLogin: false,
      redirectTo: null,
      password: '',
      email: '',
      firstname: '',
      isLoading: true
    };
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleCloseErrorLogin = this.handleCloseErrorLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailCheck = this.handleEmailCheck.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseLogin() {
    this.setState({ LoginModalshow: false });
  }

  handleShowLogin() {
    this.setState({ LoginModalshow: true });
  }

  handleCloseErrorLogin() {
    this.setState({ showErrorLogin: false });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleEmailCheck() {
    if (this.state.email.length <= 0) {
      return null;
    }
    var re = /\S+@\S+\.\S+/;
    if (re.test(this.state.email)) {
      return "success";
    }
    return "error";
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  componentWillMount() {
    console.log(Cookies.get('token'))
    var header = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    axios.get(config.user.USER, header)
    .then((response) => {
        this.setState({
          auth: true,
          firstname: response.data.user.firstname,
          isLoading: false
        });
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      isLoading: false
    })
  }

  handleSubmit(e) {
    if (this.state.email.length <= 0
      || this.state.password.length <= 0)
      return null;

      axios.post(config.user.LOGIN, {
        password: this.state.password,
        username: this.state.email
      }, {})
      .then(response => {
        if (response.status === 200) {
          Cookies.set('token', response.data.token);
          console.log("POST OK");
          this.setState({ auth : true})
          console.log('token cookie:' + Cookies.get('token'));
        }
      })
      .catch(error => {
        console.log(error.response)
      });
      console.log("end axios");
    }

  render() {
    return (
      <div>
      <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Bookr</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/#">
          Home
        </NavItem>
        <NavItem eventKey={2} href="/books">
          Books
        </NavItem>
        <NavItem eventKey={3} href="/friends">
          Friends
        </NavItem>
        <NavItem eventKey={4} href="/profil">
          Profil
        </NavItem>
      </Nav>
        <Nav pullRight>
        {(this.state.auth === false || this.state.isLoading) ?
            <NavItem eventKey={1} onClick={() => this.handleShowLogin()} className="login">
              Se connecter
            </NavItem>
            :
            <NavItem eventKey={1} href="/" className="login">
              Bonjour, {this.state.firstname}
            </NavItem>
        }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Modal show={this.state.LoginModalshow} onHide={this.handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="Login">
          <Modal show={this.state.showErrorLogin} onHide={this.handleCloseErrorLogin}>
                    <Modal.Header closeButton>
                      <Modal.Title>Error Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h3><center>Merci de vérifier vos informations</center></h3>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle="danger" onClick={this.handleCloseErrorLogin}>Close</Button>
                    </Modal.Footer>
          </Modal>

          <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
          autoFocus
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
          />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
          value={this.state.password}
          onChange={this.handleChange}
          type="password"
          />
          </FormGroup>
          <div>
          { this.state.redirectTo ?
            <Redirect to={{ pathname: this.state.redirectTo }} /> :
            (
              <div>
              <Button
              block
              bsSize="large"
              className="confirm"
              //disabled={!this.validateForm()}
              onClick={this.handleSubmit}
              >
              Se connecter
              </Button>
              </div>
            )
          }
          </div>
          </form>
          <div>
          <center>
          <br/>
          <Button
          className="new"
          bsSize="large"
          href="/signup"
          >
          No account ?
          </Button>
          </center>
          </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseLogin}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
    )
  }
}

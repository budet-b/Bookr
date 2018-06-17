import React, { Component} from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import { FormGroup, Button, FormControl, ControlLabel, Modal,Table, Grid, Row, Col  } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../../Components/Misc/Constant'

export default class ProfilPageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false,
      isLoading: true,
      username: '',
      firstname: '',
      lastname: '',
      picture: '',
      user: []
    }
  }

  componentDidMount() {
    console.log(Cookies.get('token'))
    var header = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    axios.get(config.user.USER, header)
    .then((response) => {
      console.log(response.data)
        this.setState({
          isLoggin: true,
          user: response.data,
          username: response.data.user.username,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          picture: response.data.user.picture
        });
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      isLoaded: false
    })
  }

  logout()
  {
    Cookies.remove('token');
    Cookies.set('token', '');
    console.log("Logout");
  }

  render() {
    return (
      <div>
      <NavBar/>
      <div style={{paddingTop: 70}}>
      <center>
      <h2>{this.state.firstname} {this.state.lastname}</h2>
      <img src={this.state.picture} width={300} height={300}style={{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:100,
        width: 300,
        height: 300,
        justifyContent: 'flex-end'}} />
      <br/>
      <div style={{paddingTop: '30px'}}>
      <Button
      bsSize="large"
      bsStyle="danger"
      onClick={() => this.logout()}
      href="/"
      >
      Logout
      </Button>
      </div>
      </center>
      </div>
      </div>
    )
  }

}

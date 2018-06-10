import React, { Component} from 'react';
import NavBar from '../../Components/NavBar//Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';

export default class HomePageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false,
      isLoading: true
    }
  }

  componentDidMount() {
    var config = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    axios.get("http://localhost:8080/api/user", config)
    .then((response) => {
        this.setState({
          isLoggin: true
        });
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      isLoaded: false
    })
  }

  render() {
    return (
      <div>
      <NavBar/>
      <h1>Didier</h1>
      </div>
    )
  }

}

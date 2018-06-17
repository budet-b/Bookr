import React, { Component} from 'react';
import NavBar from '../../Components/NavBar//Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../../Components/Misc/Constant'
import {Table, Grid, Row, Col } from 'react-bootstrap';

export default class HomePageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false,
      isLoading: true,
      timeline: []
    }
  }

  componentDidMount() {
    console.log(Cookies.get('token'))
    var header = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    console.log(config)
    axios.get(config.user.TIMELINE, header)
    .then((response) => {
        this.setState({
          isLoggin: true,
          timeline: response.data,
          isLoading: false
        });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        isLoading: false
      })
    })
  }

  renderTimeline() {
     if (this.state.timeline.length === 0) {
      return (
        <center><h3>  Sorry, please add some friend to have activity.</h3></center>
      )
    } else {
      return this.state.timeline.map((cell, index) => {
        var pos = ""
        console.log(cell.book.title)
        if (cell.book.title <= 1)  {
          pos = cell.user.username + "just start " + cell.book.title;
        } else if (cell.user_position >= cell.book.number_of_pages) {
          pos = cell.user.username + " just finished " + cell.book.title + "🎉";
        } else {
          pos = cell.user.username + " is now at page" + cell.user_position + " in " + cell.book.title
        }
        return (
          <tr>
            <td className="text-center"><img src={cell.user.picture} width={150} height={150}style={{
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'#fff',
              borderRadius:50,
              width: 100,
              height: 100,
              justifyContent: 'flex-end'}} /></td>
              <td className="text-center"><h3>{cell.user.username}</h3></td>
              <td className="text-center"><h3>{pos}</h3></td>
              <td className="text-center"><img src={cell.book.cover} width={150} height={150}style={{
                  width: 110,
                  height: 170,
                  justifyContent: 'flex-end',
                  paddingBottom: 10}} /></td>
          </tr>
        )
      })
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <div>
        <NavBar/>
        <div style={{paddingTop: 30}}>
        <h1>Loading, please wait...</h1>
        </div>
        </div>
      )
    }
    if (!this.state.isLoggin && !this.state.isLoading) {
      return (
        <div>
        <NavBar/>
        <div style={{paddingTop: 30}}>
        <h1>Sorry you have to be login to have a Timeline</h1>
        </div>
        </div>
      )
    }
    let timeline = this.renderTimeline();
    return (
      <div>
      <NavBar/>
      <div style={{paddingTop: 50}}>
        <Table   condensed hover>
      <tbody>
        {timeline}
      </tbody>
      </Table>
      </div>
      </div>
    )
  }

}

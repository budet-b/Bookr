import React, { Component} from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import './book.css';

export default class BooksPageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false,
      isLoading: true,
      books: []
    };
  }

  componentDidMount() {
    console.log(Cookies.get('token'))
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
  }

  componentWillMount() {
    var config = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    axios.get("http://localhost:8080/api/books", config)
    .then((response) => {
        this.setState({
          books: response.data
        });
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      isLoading: false
    })
    console.log(this.state.isLoading)
  }

  handleClose(e) {
    let modal = "modal" + e.target.id;
    document.getElementById(modal).style.display = "none";
  }

  handleClick(e) {
    let modal = "modal" + e.target.id;
    document.getElementById(modal).style.display = "block";
  }

  renderBooks() {

    console.log(this.state.books)
    return this.state.books.map((book, index) => {
      return <div>
          <Col xs={6} md={3}>
            <div className="book">
              <div className="container-book">
                <img src={book.cover} className="img_100" alt={book.title} />
              <div className="spacer5" />
              <p>
                <b>{book.title}</b>
                <br />
                {book.author_name}
              </p>
              <button type="button"
                      className="btn btn-success myBtn"
                      id={index}
                      data-modal={"modal" + index}
                      onClick={this.handleClick}>
                Voir
              </button>
              </div>
            </div>
          </Col>
          <div id={"modal" + index} className="modal">
            <div className="modal-content" style={{ width: "400px" }}>
              <span className="close" id={index} onClick={this.handleClose}>
                &times;
              </span>
              <center>
                <img src={book.cover} alt={book.title} title={book.title} className="image" width={"200px"} height={"200px"} />
              </center>
            </div>
          </div>
        </div>;
    });
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
    console.log(this.state.isLoading)
    let renderBooks = this.renderBooks()
    return (
      <div>
      <NavBar/>
      <div style={{paddingTop: 60}}>
      <Grid>
      <div className="container-books">
      <Row className="show-grid">
        {renderBooks}
      </Row>
      </div>
      </Grid>
      </div>
      </div>
    )
  }

}

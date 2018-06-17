import React, { Component} from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import './book.css';
import config from '../../Components/Misc/Constant'

export default class BooksPageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false,
      isLoading: true,
      books: [],
      currentBooks: []
    };
  }

  componentDidMount() {
    console.log(Cookies.get('token'))
    var header = {
      headers: {'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'}
    };
    axios.get(config.user.USER, header)
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
    axios.get(config.books.ALLBOOKS, header)
    .then((response) => {
        this.setState({
          books: response.data
        });
    })
    .catch((error) => {
      console.log(error)
    })
    axios.get(config.books.CURRENTBOOK, header)
    .then((response) => {
        this.setState({
          currentBooks: response.data,
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
              <center>
              <button type="button"
                      className="btn btn-success myBtn"
                      id={index}
                      data-modal={"modal" + index}
                      onClick={this.handleClick}>
                Voir
              </button>
              </center>
              </div>
            </div>
          </Col>
          <div id={"modal" + index} className="modal">
            <div className="modal-content" style={{ width: "400px" }}>
              <span className="close" id={index} onClick={this.handleClose}>
                &times;
              </span>
              <center>
                <h3>{book.title}</h3>
                <h3>{book.author_name}</h3>
                <img src={book.cover} alt={book.title} title={book.title} className="image" width={"200px"} height={"200px"} />
                <h4>{book.summary}</h4>
              </center>
            </div>
          </div>
        </div>;
    });
  }

  renderCurrentBooks() {
      return this.state.currentBooks.map((book, index) => {
        console.log(book.book)
        return <div>
            <Col xs={6} md={3}>
              <div className="book">
                <div className="container-book">
                  <img src={book.book.cover} className="img_100" alt={book.book.title} />
                <div className="spacer5" />
                <p>
                  <b>{book.book.title}</b>
                  <br />
                  {book.book.author_name}
                </p>
                <center>
                <button type="button"
                        className="btn btn-success myBtn"
                        id={index}
                        data-modal={"modal" + index}
                        onClick={this.handleClick}>
                  Voir
                </button>
                </center>
                </div>
              </div>
            </Col>
            <div id={"modal" + index} className="modal">
              <div className="modal-content" style={{ width: "400px" }}>
                <span className="close" id={index} onClick={this.handleClose}>
                  &times;
                </span>
                <center>
                  <h3>{book.book.title}</h3>
                  <h3>{book.book.author_name}</h3>
                  <img src={book.book.cover} alt={book.book.title} title={book.book.title} className="image" width={"200px"} height={"200px"} />
                  <h4>{book.book.summary}</h4>
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
    let renderCurrentBooks = this.renderCurrentBooks();
    return (
      <div>
      <NavBar/>
      <div style={{paddingTop: 60}}>
      <h2>My books</h2>
      <Grid>
      <div className="container-books">
      <Row className="show-grid">
        {renderCurrentBooks}
      </Row>
      </div>
      </Grid>
      <h2>All books</h2>
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

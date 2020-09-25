import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Books from "./Books";
import PropTypes from "prop-types";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
  };
  updateBook = (book, shelf) => {
    if (this.props.addBook) {
      this.props.addBook(book, shelf);
    }
  };
  render() {
    const { books } = this.props;

    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    return (
      <div className="wrapper">
        {console.log(books)}
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <Books books={currentlyReading} addBook={this.updateBook} />
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <Books books={wantToRead} addBook={this.updateBook} />
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <Books books={read} addBook={this.updateBook} />
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/Search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;

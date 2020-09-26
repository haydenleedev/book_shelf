import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Books extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleChange: PropTypes.func,
  };

  handleChange = (e, book) => {
    if (this.props.addBook) {
      this.props.addBook(book, e.target.value);
    }
  };

  render() {
    const { books } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks &&
                          book.imageLinks.thumbnail}")`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf !== undefined ? book.shelf : "none"}
                        onChange={(e) => this.handleChange(e, book)}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors && book.authors.map((author) => author)}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default Books;

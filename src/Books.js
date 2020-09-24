import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Books extends Component {
  handleChange = (e, book, index) => {
    if (this.props.category) {
      this.props.category(e.target.value);
    }

    console.log("target: ", e.target.value);
    if (this.props.addBook) {
      this.props.addBook(book, e.target.value, index);
    }
  };

  render() {
    const { books } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${
                          book.imageLinks.smallThumbnail
                        }")`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        onChange={(e) => this.handleChange(e, book, index)}
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
                  <div className="book-authors">{book.authors[0]}</div>
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

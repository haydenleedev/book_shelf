import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Books from "./Books";

class ListBooks extends Component {
  onSelectChange = (selectValue) => {
    if (this.props.handleCategory) {
      this.props.handleCategory(selectValue);
      console.log("ListBooks: ", selectValue);
    }
  };

  updateBook = (book, category, index) => {
    if (this.props.addBook) {
      this.props.addBook(book, category, index);
      console.log("book1: ", book, +"category1: " + category);
    }
  };
  render() {
    const { books, currentlyReading, wantToRead, read, none } = this.props;
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
                <Books
                  books={currentlyReading}
                  category={this.onSelectChange}
                  addBook={this.updateBook}
                />
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <Books
                  books={wantToRead}
                  category={this.onSelectChange}
                  addBook={this.updateBook}
                />
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <Books
                  books={read}
                  category={this.onSelectChange}
                  addBook={this.updateBook}
                />
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

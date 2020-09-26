import React, { Component } from "react";
import "./App.css";
import Books from "./Books";
import { Link } from "react-router-dom";

class AddaBook extends Component {
  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));

    if (this.props.search) {
      this.props.search(query);
      console.log("search: ", query);
    }
  };
  clearQuery = () => {
    this.updateQuery("");
  };

  handleChange = (e, book) => {
    if (this.props.addBook) {
      this.props.addBook(book, e.target.value);
    }
  };

  updateBook = (book, shelf) => {
    if (this.props.addBook) {
      this.props.addBook(book, shelf);
    }
  };

  render() {
    const { query } = this.state;
    const { books } = this.props;

    const showingBooks =
      query === ""
        ? []
        : books.filter((b) =>
            b.title.toLowerCase().includes(query.toLowerCase())
          );
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              className="close-search"
              onClick={() => this.setState({ showSearchPage: false })}
            >
              Close
            </button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Books books={showingBooks} addBook={this.updateBook} />
          </ol>
        </div>
      </div>
    );
  }
}

export default AddaBook;

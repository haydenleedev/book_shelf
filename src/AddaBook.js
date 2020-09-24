import React, { Component } from "react";
import "./App.css";
import Books from "./Books";

class AddaBook extends Component {
  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };
  clearQuery = () => {
    this.updateQuery("");
  };

  handleChange = (e, book, index) => {
    if (this.props.category) {
      this.props.category(e.target.value);
    }

    console.log("target2: ", e.target.value);
    if (this.props.addBook) {
      this.props.addBook(book, e.target.value, index);
    }
  };

  render() {
    const { query } = this.state;
    const { books } = this.props;

    const showingBooks =
      query === ""
        ? books
        : books.filter((b) =>
            b.title.toLowerCase().includes(query.toLowerCase())
          );
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </button>
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
            {showingBooks.map((book, index) => (
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
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default AddaBook;

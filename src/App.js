import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import AddaBook from "./AddaBook";
import ListBooks from "./ListBooks";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.map((book) =>
        this.setState(() => ({
          books,
        }))
      );
    });
  } // get all book lists via API and add it to books state.

  addBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((newBook) => {
      this.setState((currentState) => ({
        books: currentState.books
          .filter((b) => {
            return b.id !== book.id;
          })
          .concat({ ...book, shelf }),
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={this.state.books} addBook={this.addBook} />
          )}
        />
        <Route
          path="/Search"
          render={({ history }) => (
            <AddaBook
              books={this.state.books}
              addBook={(book, shelf) => {
                this.addBook(book, shelf);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

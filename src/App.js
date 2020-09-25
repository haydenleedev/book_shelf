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
    book: [],
    selectValue: "",
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
        books: currentState.books.filter((b) => {
          return b.id !== book.id;
        }),
      }));
    });

    /*
    if (category === "currentlyReading") {
      this.setState((currentState) => ({
        currentlyReading: currentState.currentlyReading.concat([book]),
      }));
    } else if (category === "wantToRead") {
      this.setState((currentState) => ({
        currentlyReading: currentState.wantToRead.concat([book]),
      }));
    } else if (category === "read") {
      this.setState((currentState) => ({
        currentlyReading: currentState.read.concat([book]),
      }));
    }
    */
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

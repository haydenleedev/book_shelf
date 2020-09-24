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
    currentlyReading: [],
    wantToRead: [],
    read: [],
    book: [],
    shelves: [
      {
        book: [],
        shelf: "",
      },
    ],
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

    BooksAPI.getAll().then((currentlyReading) => {
      currentlyReading.map(
        (book, index) =>
          book.shelf === "currentlyReading" &&
          this.setState((currentState) => ({
            currentlyReading: currentState.currentlyReading.concat([book]),
          }))
      );
    });

    BooksAPI.getAll().then((wantToRead) => {
      wantToRead.map(
        (book, index) =>
          book.shelf === "wantToRead" &&
          this.setState((currentState) => ({
            wantToRead: currentState.wantToRead.concat([book]),
          }))
      );
    });

    BooksAPI.getAll().then((read) => {
      read.map(
        (book, index) =>
          book.shelf === "read" &&
          this.setState((currentState) => ({
            read: currentState.read.concat([book]),
          }))
      );
    });
  } // get all book lists via API and add it to books state.

  addCategory = (book) => {
    this.setState((currentState) => ({
      // currentlyReading: currentState.currentlyReading.concat([book]),
    }));
  };

  addBook = (book, shelf, index) => {
    BooksAPI.update(book, shelf).then((book) => {
      this.setState((prevState) => {
        const books = [...prevState.books];
        books[index] = { ...books[index], [shelf]: shelf };
      });
      console.log("thumbnail: ", book);
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

    console.log("book: " + book + "category: " + shelf);
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={(history) => (
            <ListBooks
              books={this.state.books}
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              handleCategory={(book) => {
                this.addCategory(book);
                history.push("/");
              }}
              addBook={this.addBook}
            />
          )}
        />
        <Route
          path="/Search"
          render={(history) => (
            <AddaBook
              books={this.state.books}
              handleCategory={(book) => {
                this.addCategory(book);
                history.push("/");
              }}
              addBook={this.addBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

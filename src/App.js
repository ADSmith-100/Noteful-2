import React from "react";
import NoteList from "./components/NoteList/NoteList";
import NoteListNav from "./components/NoteList_Nav/NoteList_Nav";
import FolderList from "./components/FolderList/FolderList";
import NoteData from "./components/NoteData/NoteData";
import Note from "./components/Note/Note";
import dummyStore from "./dummy-store";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], folders: [] };
  }

  componentDidMount() {
    this.setState(dummyStore);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
            </h1>
          </header>
          <main>
            <section className="notes_main">
              <Route
                exact
                path="/"
                render={(rprops) => <NoteList {...rprops} {...this.state} />}
              />
              <Route
                path="/folder/:folderId"
                render={(rprops) => (
                  <NoteList
                    {...rprops}
                    Snotes={this.state.notes.filter(
                      (snote) => snote.folderId === rprops.match.params.folderId
                    )}
                  />
                )}
              />
              <Route
                path="/note/:noteid"
                render={(rprops) => (
                  <NoteData
                    {...rprops}
                    {...this.state}
                    note={this.state.notes.find(
                      (note) => note.id === rprops.match.params.noteid
                    )}
                  />
                )}
              />
            </section>
          </main>
          <section className="folders_main">
            <FolderList {...this.state} />
          </section>
        </div>
      </BrowserRouter>
    );
  }
}

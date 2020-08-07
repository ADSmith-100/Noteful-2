import React from "react";
import NoteList from "./components/NoteList/NoteList";
import NoteListNav from "./components/NoteList_Nav/NoteList_Nav";
import FolderList from "./components/FolderList/FolderList";
import NoteData from "./components/NoteData/NoteData";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Context from "./Context";

export default class App extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      deleteNote: (noteId) => {
        const newNotes = this.state.notes.filter((nt) => nt.id !== noteId);
        this.setState({
          notes: newNotes,
        });
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:9090/folders")
      .then((res) => res.json())
      .then((folders) => this.setState({ folders }));

    fetch("http://localhost:9090/notes")
      .then((res) => res.json())
      .then((notes) => this.setState({ notes }));
    //this.setState(dummyStore);
  }

  ////component={NoteList}
  render() {
    console.log(this.state);

    return (
      <Context.Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            <header className="App__header">
              <h1>
                <Link to="/">Noteful</Link>{" "}
              </h1>
            </header>
            <main>
              <section className="notes_main">
                <Route exact path="/" component={NoteList} />
                <Route
                  path="/folder/:folderId"
                  render={(rprops) => (
                    <NoteListNav
                      {...rprops}
                      Snotes={this.state.notes.filter(
                        (snote) =>
                          snote.folderId === rprops.match.params.folderId
                      )}
                    />
                  )}
                />
                <Route
                  path="/note/:noteid"
                  render={(rprops) => (
                    <NoteData
                      {...rprops}
                      note={this.state.notes.find(
                        (idnote) => idnote.id === rprops.match.params.noteid //is this an object?
                      )}
                    />
                  )}
                />
              </section>
            </main>
            <section className="folders_main">
              <Route
                path={["/note/:noteid", "/folder/:folderId", "/"]}
                render={(rprops) => <FolderList {...rprops} {...this.state} />}
              />
            </section>
          </div>
        </BrowserRouter>
      </Context.Provider>
    );
  }
}

import React from "react";
import NoteList from "./components/NoteList/NoteList";
import NoteListNav from "./components/NoteList_Nav/NoteList_Nav";
import FolderList from "./components/FolderList/FolderList";
import NoteData from "./components/NoteData/NoteData";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Context from "./Context";
import AddNote from "./components/AddNote/AddNote";
import AddFolder from "./components/AddFolder/AddFolder";

export default class App extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      deleteNote: (note_id) => {
        const newNotes = this.state.notes.filter((nt) => nt.id !== note_id);
        this.setState({
          notes: newNotes,
        });
        fetch("http://localhost:8000/api/notes")
          .then((res) => res.json())
          .then((notes) => this.setState({ notes }));

        //console.log(newNotes);
      },

      addFolder: () => {
        fetch("http://localhost:8000/api/folders")
          .then((res) => res.json())
          .then((folders) => this.setState({ folders }));
      },
      addNote: () => {
        fetch("http://localhost:8000/api/notes")
          .then((res) => res.json())
          .then((notes) => this.setState({ notes }));
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/folders")
      .then((res) => res.json())
      .then((folders) => this.setState({ folders }));

    fetch("http://localhost:8000/api/notes")
      .then((res) => res.json())
      .then((notes) => this.setState({ notes }));
  }

  render() {
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
              <section className="folders_main">
                <Route
                  path={["/api/note/:note_id", "/api/folder/:folder_id", "/"]}
                  render={(rprops) => (
                    <FolderList {...rprops} {...this.state} />
                  )}
                />
              </section>
              <section className="notes_main">
                <Route exact path="/" component={NoteList} />
                <Route
                  path="/api/folder/:folder_id"
                  render={(rprops) => (
                    <NoteListNav
                      {...rprops}
                      notes={this.state.notes.filter(
                        (snote) =>
                          snote.folderid ===
                          Number(rprops.match.params.folder_id)
                      )}
                    />
                  )}
                />
                <Route
                  path="/api/notes/:note_id"
                  render={(rprops) => (
                    <NoteData
                      {...rprops}
                      note={this.state.notes.find(
                        (idnote) =>
                          idnote.id === Number(rprops.match.params.note_id)
                      )}
                    />
                  )}
                />
                <Route path={["/AddNoteForm"]} component={AddNote}></Route>
                <Route path={["/AddFolderForm"]} component={AddFolder}></Route>
              </section>
            </main>
          </div>
        </BrowserRouter>
      </Context.Provider>
    );
  }
}

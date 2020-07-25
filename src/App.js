import React from "react";
import NoteList from "./components/NoteList/NoteList";
import FolderList from "./components/FolderList/FolderList";
import dummyStore from "./dummy-store";
import "./App.css";

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
      <div className="bothSections">
        <h1>Noteful is Stupid</h1>
        <section className="notes">
          <NoteList {...this.state} />
        </section>
        <section className="folders">
          <FolderList {...this.state} />
        </section>
      </div>
    );
  }
}

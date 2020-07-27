import React, { Component } from "react";

export default class NoteListNav extends Component {
  render() {
    console.log();

    const Notelist = this.props.notes.map((note, name) => (
      <li className="note_item" {...note} key={note.id} name={name}>
        <span className="noteName">{note.name}</span>
        <br></br>
        <br></br>
        Modified
        <span className="Date"> {note.modified}</span>
        <button className="delete">Delete Note</button>
      </li>
    ));
    return (
      <div className="note_list">
        <ul>{Notelist}</ul>
        <button className="addNote">Add Note</button>
      </div>
    );
  }
}

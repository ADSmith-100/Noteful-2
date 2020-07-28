import React from "react";
import "./NoteData.css";

export default class NoteData extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Notelist = this.props.note.map((note) => (
      <li className="note_item" {...note} key={note.id}>
        <span className="noteName">{note.name}</span>
        <br></br>
        <br></br>
        Modified
        <span className="Date"> {note.modified}</span>
        <button className="delete">Delete Note</button>
        <p>{note.content}</p>
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

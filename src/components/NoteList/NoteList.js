import React from "react";
import { NavLink } from "react-router-dom";
import "./NoteList.css";
import Context from "../../Context";

export default class NoteList extends React.Component {
  static contextType = Context;
  render() {
    const Notelist = this.context.notes.map((note) => (
      <NavLink key={note.id} className="NoteLink" to={`/api/notes/${note.id}`}>
        <li className="note_item" key={note.id}>
          <p className="noteName">{note.name}</p>
          <span className="Date">
            {" "}
            {new Date(note.modified).toDateString()}
          </span>
        </li>
      </NavLink>
    ));
    return (
      <div className="note_list">
        <ul>{Notelist}</ul>

        <NavLink
          className="AddNoteLink"
          to="/AddNoteForm"
          aria-label="To Add Note Form"
        >
          Add Note
        </NavLink>
      </div>
    );
  }
}

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context";
import propTypes from "prop-types";

export default class NoteListNav extends Component {
  static contextType = Context;
  render() {
    const Notelist = this.props.notes.map((note) => (
      <NavLink className="NoteLink" to={`/note/${note.id}`}>
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

NoteListNav.propTypes = {
  Notelist: propTypes.array,
};

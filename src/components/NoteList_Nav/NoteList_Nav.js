import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context";
import propTypes from "prop-types";

function deleteNoteRequest(noteId, cb) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then((error) => {
          // then throw it
          throw error;
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log({ data });
      cb(noteId);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default class NoteListNav extends Component {
  static contextType = Context;
  render() {
    const Notelist = this.props.notes.map((note) => (
      <li className="note_item" key={note.id}>
        <button
          className="deleteNav"
          onClick={() => {
            deleteNoteRequest(note.id, this.context.deleteNote);
          }}
        >
          {" "}
          X
        </button>
        <NavLink className="NoteLink" to={`/note/${note.id}`}>
          {" "}
          <p className="noteName">{note.name}</p>{" "}
          <span className="Date">
            {" "}
            {new Date(note.modified).toDateString()}
          </span>
        </NavLink>
      </li>
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

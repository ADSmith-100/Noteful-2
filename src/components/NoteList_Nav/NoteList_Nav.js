import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context";
import propTypes from "prop-types";

function deleteNoteRequest(note_id, cb) {
  fetch(`http://localhost:8000/api/notes/${note_id}`, {
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
    })
    .then((data) => {
      console.log({ data, cb });
      cb(note_id);
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
        <NavLink className="NoteLink" to={`/api/notes/${note.id}`}>
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

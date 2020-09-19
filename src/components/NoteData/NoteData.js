import React, { Component } from "react";
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
      console.log({ data });
      cb(note_id);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default class NoteData extends Component {
  static contextType = Context;
  render() {
    const { note } = this.props;
    return note ? (
      <div>
        <h2>{note.name}</h2>
        <p>{note.content}</p>
        <button onClick={() => this.props.history.goBack()}>Back</button>
        <button
          className="delete"
          onClick={() => {
            deleteNoteRequest(Number(note.id), this.context.deleteNote);
          }}
        >
          {" "}
          Delete Note
        </button>
      </div>
    ) : (
      ""
    );
  }
}

NoteData.propTypes = {
  note: propTypes.object.isRequired,
};

// Look how tj made the render with a const { note } destructured object = this.props
//then it's a ternary condition to either display the info if the object has been retrieved or
// nothing until then.  Could put a loading animation or something.

import React, { Component } from "react";
import "./NoteData.css";
import Context from "../../Context";
import { Link } from "react-router-dom";

export default class NoteData extends Component {
  static contextType = Context;
  render() {
    const { note } = this.props;
    return note ? (
      <div>
        <h2>{note.name}</h2>
        <p>{note.content}</p>
        <button onClick={() => this.props.history.goBack()}>Back</button>
      </div>
    ) : (
      ""
    );
  }
}

// Look how tj made the render with a const { note } destructured object = this.props
//then it's a ternary condition to either display the info if the object has been retrieved or
// nothing until then.  Could put a loading animation or something.

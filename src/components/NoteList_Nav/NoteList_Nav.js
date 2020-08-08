import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context";

export default class NoteListNav extends Component {
  static contextType = Context;
  render() {
    const Notelist = this.props.Snotes.map((MyNote, name) => (
      <NavLink className="NoteLink" to={`/note/${MyNote.id}`}>
        <li className="note_item" {...MyNote} key={MyNote.id} name={name}>
          <span className="noteName">{MyNote.name}</span>
          <br></br>
          <br></br>
          Modified
          <span className="Date"> {MyNote.modified}</span>
        </li>
      </NavLink>
    ));
    return (
      <div className="note_list">
        <ul>{Notelist}</ul>
        <button className="addNote">Add Note</button>
      </div>
    );
  }
}

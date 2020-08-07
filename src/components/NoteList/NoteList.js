import React from "react";
import { NavLink } from "react-router-dom";

import { format } from "date-fns";
import "./NoteList.css";
import Context from "../../Context";

export default class NoteList extends React.Component {
  static contextType = Context;
  render() {
    //console.log(typeof this.context);
    const NoteArray = Array.from(this.context.notes);
    console.log(typeof NoteArray);
    const Notelist = NoteArray.map((note) => (
      <NavLink className="NoteLink" to={`/note/${note.id}`}>
        <li className="note_item" {...note} key={note.id}>
          <span className="noteName">{note.name}</span>
          <br></br>
          <br></br>
          Modified
          <span className="Date"> {note.modified}</span>
          <button className="delete">Delete Note</button>
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

NoteList.defaultProps = {
  notes: [],
};

//Swap with NoteList Nav?
//Useless constructor - does it even need to be a class?  WHy?
//Why couldn't I get the format from date-fns to work to fix the dates?
//remove note.content just for testing
//Do I put the NavLinks for the notes here?  Click on note and see content

import React, { Component } from "react";
import "./NoteData.css";
import Context from "../../Context";

export default class NoteData extends Component {
  static contextType = Context;
  render() {
    console.log(this.props);
    console.log(this.context.notes);
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

//Can you or should you mess with the route props and convert them to context somehow?
// the callback functions that are props should get turned into context functions?
//the sorting of notes by id and folders by id - should that use context somehow?
